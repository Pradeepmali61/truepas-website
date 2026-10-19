import { ApiError, FunctionCallingConfigMode, GoogleGenAI, ThinkingLevel, type Content, type FunctionCall, type Part } from "@google/genai";
import { systemPrompt } from "@/lib/chat/knowledge";
import { actionNote, tools, type AgentEvent, type Message, type RunAgentInput } from "@/lib/chat/protocol";

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

// AG-UI history -> Gemini contents. Earlier actions go back as real functionCall / functionResponse parts. They used
// to be "[Action: ...]" notes in the assistant's text, and the model then copied that format (or just said "I am
// opening...") instead of calling the function, so the action never ran. The browser doesn't keep Gemini's thought
// signatures, so replayed calls carry Google's documented placeholder that skips their validation
const REPLAYED = "skip_thought_signature_validator";

function toContents(messages: Message[]): Content[] {
  const out: Content[] = [];
  const push = (role: "user" | "model", part: Part) => {
    const last = out.at(-1);
    if (last?.role === role) last.parts!.push(part);
    else out.push({ role, parts: [part] });
  };
  // Calls still waiting for their result, so one the browser never ran is still answered before the next turn
  const open = new Map<string, string>();
  const answer = (id: string, response: Record<string, unknown>) => {
    push("user", { functionResponse: { id, name: open.get(id), response } });
    open.delete(id);
  };
  for (const m of messages) {
    if (m.role === "user") {
      for (const id of [...open.keys()]) answer(id, { error: "not run" });
      push("user", { text: m.content });
    }
    // The history must open with a user turn
    if (m.role === "assistant" && out.length) {
      const text = m.content?.replace(actionNote, "").trim();
      if (text) push("model", { text });
      for (const c of m.toolCalls ?? []) {
        let args: Record<string, unknown> = {};
        try {
          args = JSON.parse(c.function.arguments || "{}");
        } catch {}
        push("model", { functionCall: { id: c.id, name: c.function.name, args }, thoughtSignature: REPLAYED });
        open.set(c.id, c.function.name);
      }
    }
    if (m.role === "tool" && open.has(m.toolCallId)) answer(m.toolCallId, m.error ? { error: m.error } : { result: m.content });
  }
  return out;
}

// A reply that says it is opening something ("I am taking you to the users page") as a statement, not an offer.
// Flash-Lite sometimes writes this without calling the function; the route then asks it again for just the call
const claimsAction = (text: string) =>
  !/\?\s*$/.test(text.trim()) &&
  (/\b(?:I am|I'm|I'll|I will|let me)\s+(?:now\s+)?(?:open|opening|tak(?:e|ing) you|bring(?:ing)? you|navigat|redirect|show(?:ing)? you)/i.test(text) ||
    /\bopen kar (?:raha|rahi|rha|rhi)\b/i.test(text));

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
  const contents = toContents(input.messages);
  const config = {
    systemInstruction: systemPrompt,
    tools: [{ functionDeclarations }],
    // Short website answers
    thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
    maxOutputTokens: 2048,
    abortSignal: request.signal,
  };
  const startStream = async () => {
    for (const [i, model] of MODELS.entries()) {
      try {
        return { model, stream: await ai.models.generateContentStream({ model, contents, config }) };
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
      let replyText = "";
      // Gemini sends each call whole, so its arguments go out as a single TOOL_CALL_ARGS
      const sendCall = (call: FunctionCall) => {
        toolCalls++;
        const toolCallId = call.id || `call_${runId}_${toolCalls}`;
        send({ type: "TOOL_CALL_START", toolCallId, toolCallName: call.name!, parentMessageId: messageId });
        send({ type: "TOOL_CALL_ARGS", toolCallId, delta: JSON.stringify(call.args ?? {}) });
        send({ type: "TOOL_CALL_END", toolCallId });
      };

      send({ type: "RUN_STARTED", threadId, runId });
      try {
        const { model, stream } = await startStream();

        for await (const chunk of stream) {
          if (chunk.promptFeedback?.blockReason) promptBlocked = true;
          const candidate = chunk.candidates?.[0];
          finishReason = candidate?.finishReason ?? finishReason;
          for (const part of candidate?.content?.parts ?? []) {
            if (part.thought) continue;
            if (part.text) {
              if (!textOpen) send({ type: "TEXT_MESSAGE_START", messageId, role: "assistant" });
              textOpen = true;
              replyText += part.text;
              send({ type: "TEXT_MESSAGE_CONTENT", messageId, delta: part.text });
            }
            if (part.functionCall?.name) sendCall(part.functionCall);
          }
        }

        // The reply promised an action but made no call: ask the same model for only the call (mode ANY)
        if (!toolCalls && finishReason === "STOP" && claimsAction(replyText)) {
          try {
            const forced = await ai.models.generateContent({
              model,
              contents,
              config: { ...config, toolConfig: { functionCallingConfig: { mode: FunctionCallingConfigMode.ANY } } },
            });
            const call = forced.functionCalls?.[0];
            if (call?.name) sendCall(call);
          } catch (err) {
            if (!request.signal.aborted) console.error("Chat forced action failed:", err);
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
          console.error("Chat run ended with finish reason", finishReason);
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
