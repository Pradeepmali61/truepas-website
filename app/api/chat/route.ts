import { ApiError, GoogleGenAI, ThinkingLevel, type Content } from "@google/genai";
import { systemPrompt } from "@/lib/chat/knowledge";
import { tools, type AgentEvent, type Message, type RunAgentInput } from "@/lib/chat/protocol";

// AG-UI agent endpoint for the chat assistant: takes a RunAgentInput, streams the run back as server-sent events.
// Needs GEMINI_API_KEY (Vercel env var); without it the widget isn't rendered and this returns 503
export const maxDuration = 60;

// Gemini API free tier, chosen by the client (15 Oct 2026). Free-tier prompts may be used by Google to improve its
// products, and its rate limits (shown in Google AI Studio) cap how many replies the site can give per day.
// Flash answers first; when it is overloaded (503) or out of quota (429), Flash-Lite, which has its own quota, answers
const MODELS = ["gemini-3.8-flash", "gemini-3.5-flash-lite"];
const unavailable = (err: unknown) => err instanceof ApiError && (err.status === 429 || err.status === 503);

// Public endpoint on a quota-limited free tier, so cap what one visitor can send. The rate limit is per server
// instance (in memory), a speed bump rather than a guarantee
const LIMITS = { messages: 40, userChars: 1500, totalChars: 30_000, requestsPerWindow: 20, windowMs: 10 * 60_000 };
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < LIMITS.windowMs);
  if (hits.size > 5000) hits.clear();
  hits.set(ip, [...recent, now]);
  return recent.length >= LIMITS.requestsPerWindow;
}

const isString = (v: unknown, max: number): v is string => typeof v === "string" && v.length <= max;

function parseInput(body: unknown): RunAgentInput | null {
  if (typeof body !== "object" || body === null) return null;
  const { threadId, runId, messages } = body as Record<string, unknown>;
  if (!isString(threadId, 100) || !isString(runId, 100) || !Array.isArray(messages)) return null;
  if (messages.length === 0 || messages.length > LIMITS.messages) return null;
  let total = 0;
  for (const m of messages as Message[]) {
    if (typeof m !== "object" || m === null) return null;
    if (m.role === "user" && !isString(m.content, LIMITS.userChars)) return null;
    if (m.role === "tool" && !isString(m.content, 500)) return null;
    if (m.role === "assistant" && m.content !== undefined && typeof m.content !== "string") return null;
    if (m.role !== "user" && m.role !== "assistant" && m.role !== "tool") return null;
    total += (m.content?.length ?? 0) + JSON.stringify(m.role === "assistant" ? (m.toolCalls ?? []) : []).length;
  }
  if (total > LIMITS.totalChars || messages.at(-1)?.role !== "user") return null;
  return { threadId, runId, messages, tools: [], context: [] };
}

// AG-UI history -> Gemini contents. Earlier actions become "[Action: ...]" notes in the assistant's text: each run
// ends at its function call and the browser runs it, so there is no pending call to answer
function toContents(messages: Message[]): Content[] {
  const results = new Map(messages.flatMap((m) => (m.role === "tool" ? [[m.toolCallId, m.error ? `failed: ${m.error}` : m.content]] : [])));
  const out: Content[] = [];
  const push = (role: "user" | "model", text: string) => {
    const last = out.at(-1);
    if (last?.role === role) last.parts!.push({ text });
    else out.push({ role, parts: [{ text }] });
  };
  for (const m of messages) {
    if (m.role === "user") push("user", m.content);
    if (m.role === "assistant") {
      const actions = (m.toolCalls ?? []).map(
        (c) => `[Action: ${c.function.name} ${c.function.arguments} -> ${results.get(c.id) ?? "not run"}]`,
      );
      const text = [m.content, ...actions].filter(Boolean).join("\n");
      // The history must open with a user turn
      if (text && out.length) push("model", text);
    }
  }
  return out;
}

const functionDeclarations = tools.map((t) => ({ name: t.name, description: t.description, parametersJsonSchema: t.parameters }));

// Finish reasons for a reply Gemini blocked; the browser drops any partial text on RUN_ERROR
const blocked = new Set(["SAFETY", "RECITATION", "BLOCKLIST", "PROHIBITED_CONTENT", "SPII", "IMAGE_SAFETY"]);

const encoder = new TextEncoder();
const sse = (event: AgentEvent) => encoder.encode(`data: ${JSON.stringify(event)}\n\n`);

export async function POST(request: Request) {
  if (!process.env.GEMINI_API_KEY) return Response.json({ error: "Chat is not configured" }, { status: 503 });

  // Only the site's own pages may call this endpoint
  const origin = request.headers.get("origin");
  if (origin && new URL(origin).host !== request.headers.get("host")) return Response.json({ error: "Forbidden" }, { status: 403 });

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "local";
  if (rateLimited(ip)) return Response.json({ error: "Too many messages. Please try again in a few minutes." }, { status: 429 });

  const input = parseInput(await request.json().catch(() => null));
  if (!input) return Response.json({ error: "Invalid request" }, { status: 400 });
  const { threadId, runId } = input;

  // One quick retry per model for momentary errors, then the next model
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: { retryOptions: { attempts: 2, initialDelay: 1, maxDelay: 2, httpStatusCodes: [429, 500, 503] } },
  });
  const startStream = async () => {
    for (const [i, model] of MODELS.entries()) {
      try {
        return await ai.models.generateContentStream({
          model,
          contents: toContents(input.messages),
          config: {
            systemInstruction: systemPrompt,
            tools: [{ functionDeclarations }],
            // Short website answers
            thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
            maxOutputTokens: 2048,
            abortSignal: request.signal,
          },
        });
      } catch (err) {
        if (!unavailable(err) || i === MODELS.length - 1) throw err;
      }
    }
    throw new Error("No model available");
  };
  const body = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (event: AgentEvent) => {
        // Enqueueing after the visitor disconnects throws; nothing is listening by then
        try {
          controller.enqueue(sse(event));
        } catch {}
      };
      const messageId = `msg_${runId}`;
      let textOpen = false;
      let toolCalls = 0;
      let finishReason: string | undefined;
      let promptBlocked = false;

      send({ type: "RUN_STARTED", threadId, runId });
      try {
        const stream = await startStream();

        for await (const chunk of stream) {
          if (chunk.promptFeedback?.blockReason) promptBlocked = true;
          const candidate = chunk.candidates?.[0];
          finishReason = candidate?.finishReason ?? finishReason;
          for (const part of candidate?.content?.parts ?? []) {
            if (part.thought) continue;
            if (part.text) {
              if (!textOpen) send({ type: "TEXT_MESSAGE_START", messageId, role: "assistant" });
              textOpen = true;
              send({ type: "TEXT_MESSAGE_CONTENT", messageId, delta: part.text });
            }
            if (part.functionCall?.name) {
              // Gemini sends each call whole, so its arguments go out as a single TOOL_CALL_ARGS
              toolCalls++;
              const toolCallId = part.functionCall.id || `call_${runId}_${toolCalls}`;
              send({ type: "TOOL_CALL_START", toolCallId, toolCallName: part.functionCall.name, parentMessageId: messageId });
              send({ type: "TOOL_CALL_ARGS", toolCallId, delta: JSON.stringify(part.functionCall.args ?? {}) });
              send({ type: "TOOL_CALL_END", toolCallId });
            }
          }
        }

        if (textOpen) send({ type: "TEXT_MESSAGE_END", messageId });
        if (promptBlocked || (finishReason && blocked.has(finishReason))) {
          send({ type: "RUN_ERROR", code: "refusal", message: "Sorry, I can't help with that. You can reach the TruePas team through the Contact page." });
        } else if (finishReason === "MAX_TOKENS" && toolCalls) {
          // A cut-off reply must not trigger an action
          send({ type: "RUN_ERROR", code: "incomplete", message: "Sorry, that reply was cut off. Please try again." });
        } else if (finishReason && finishReason !== "STOP" && finishReason !== "MAX_TOKENS") {
          // e.g. MALFORMED_FUNCTION_CALL
          send({ type: "RUN_ERROR", code: "failed", message: "Sorry, something went wrong. Please try again." });
        } else {
          send({ type: "RUN_FINISHED", threadId, runId });
        }
      } catch (err) {
        if (!request.signal.aborted) {
          console.error("Chat run failed:", err);
          // Every model was overloaded or out of its free quota
          const busy = unavailable(err);
          send({
            type: "RUN_ERROR",
            code: busy ? "busy" : "failed",
            message: busy ? "The assistant is busy right now. Please try again in a little while." : "Sorry, something went wrong. Please try again.",
          });
        }
      } finally {
        try {
          controller.close();
        } catch {}
      }
    },
  });

  return new Response(body, {
    headers: { "Content-Type": "text/event-stream; charset=utf-8", "Cache-Control": "no-cache, no-transform", "X-Accel-Buffering": "no" },
  });
}
