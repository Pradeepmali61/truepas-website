"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { ChatIcon } from "@/components/ui/Button";
import { openDemoBooking } from "@/components/ui/BookDemoButton";
import { contactHref, industries, inquiryTypes } from "@/lib/contact";
import { actionNote, tools, type AgentEvent, type Message, type ToolCall } from "@/lib/chat/protocol";
import { publicRoutes } from "@/lib/site";

// Floating chat assistant on every page (rendered by app/layout.tsx when GEMINI_API_KEY is set). It is an AG-UI
// client: each visitor message starts a run on /api/chat, and the assistant's actions (tool calls) run here once
// the run finishes. Not in Figma; added at the client's request

type Assistant = Extract<Message, { role: "assistant" }>;

const suggestions = ["What is TruePas?", "How do I enroll?", "Which systems does it integrate with?", "Book a demo"];
const focus = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

const newId = () => crypto.randomUUID();

/** Runs one assistant action; returns what happened, which is also what the assistant sees on its next turn */
function runAction(call: ToolCall, navigate: (href: string) => void): { content: string; error?: string } {
  let args: Record<string, unknown>;
  try {
    args = JSON.parse(call.function.arguments || "{}");
  } catch {
    return { content: "", error: "invalid arguments" };
  }
  switch (call.function.name) {
    case "book_demo":
      openDemoBooking();
      return { content: "Opened the demo booking calendar" };
    case "open_contact_form": {
      const { inquiryType, industry } = args;
      if (typeof inquiryType !== "string" || !inquiryTypes.includes(inquiryType)) return { content: "", error: "unknown inquiry type" };
      if (industry !== undefined && (typeof industry !== "string" || !industries.includes(industry))) return { content: "", error: "unknown industry" };
      navigate(contactHref({ inquiryType, industry }));
      return { content: `Opened the contact form (${[inquiryType, industry].filter(Boolean).join(", ")})` };
    }
    case "open_page": {
      const { page } = args;
      if (typeof page !== "string" || !publicRoutes.includes(page)) return { content: "", error: "unknown page" };
      navigate(page);
      return { content: `Opened ${page === "/" ? "the home page" : page}` };
    }
    default:
      return { content: "", error: "unknown action" };
  }
}

/** Reads a server-sent event stream, calling onEvent for each JSON `data:` payload */
async function readEvents(body: ReadableStream<Uint8Array>, onEvent: (e: AgentEvent) => void) {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  for (;;) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const chunks = buffer.split("\n\n");
    buffer = chunks.pop() ?? "";
    for (const chunk of chunks) {
      const data = chunk
        .split("\n")
        .filter((l) => l.startsWith("data:"))
        .map((l) => l.slice(5).trimStart())
        .join("\n");
      if (data) onEvent(JSON.parse(data));
    }
  }
}

export default function ChatWidget() {
  const id = useId();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const threadId = useRef("");
  const abort = useRef<AbortController | null>(null);
  const launcher = useRef<HTMLButtonElement>(null);
  const field = useRef<HTMLTextAreaElement>(null);
  const log = useRef<HTMLDivElement>(null);

  useEffect(() => () => abort.current?.abort(), []);
  useEffect(() => {
    if (open) field.current?.focus();
  }, [open]);
  useEffect(() => {
    log.current?.scrollTo({ top: log.current.scrollHeight });
  }, [messages, busy, error]);

  const close = () => {
    setOpen(false);
    launcher.current?.focus();
  };

  // On phones the panel covers the page, so it steps aside when an action changes what's behind it
  const navigate = (href: string) => {
    router.push(href);
    if (window.matchMedia("(width < 48rem)").matches) setOpen(false);
  };

  async function send(text: string) {
    text = text.trim().slice(0, 1500);
    if (!text || busy) return;
    threadId.current ||= newId();
    const history: Message[] = [...messages, { id: newId(), role: "user", content: text }];
    setMessages(history);
    setInput("");
    setError("");
    setBusy(true);

    // Filled in by the event stream callback
    const run: { reply: Assistant | null; outcome: "finished" | "error" | null } = { reply: null, outcome: null };
    const show = () => setMessages(run.reply ? [...history, { ...run.reply }] : history);

    abort.current = new AbortController();
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ threadId: threadId.current, runId: newId(), messages: history, tools, context: [] }),
        signal: abort.current.signal,
      });
      if (!res.ok || !res.body) {
        const { error: message } = await res.json().catch(() => ({ error: "" }));
        throw new Error(message || "Sorry, something went wrong. Please try again.");
      }
      await readEvents(res.body, (e) => {
        if (e.type === "TEXT_MESSAGE_START") run.reply ??= { id: e.messageId, role: "assistant", content: "" };
        else if (e.type === "TEXT_MESSAGE_CONTENT" && run.reply) run.reply.content = (run.reply.content ?? "") + e.delta;
        else if (e.type === "TOOL_CALL_START") {
          run.reply ??= { id: e.parentMessageId ?? newId(), role: "assistant", content: "" };
          const call: ToolCall = { id: e.toolCallId, type: "function", function: { name: e.toolCallName, arguments: "" } };
          run.reply.toolCalls = [...(run.reply.toolCalls ?? []), call];
        } else if (e.type === "TOOL_CALL_ARGS") {
          const call = run.reply?.toolCalls?.find((c) => c.id === e.toolCallId);
          if (call) call.function.arguments += e.delta;
        } else if (e.type === "RUN_FINISHED") run.outcome = "finished";
        else if (e.type === "RUN_ERROR") {
          // A failed run (e.g. a declined request) leaves no partial reply behind
          run.outcome = "error";
          run.reply = null;
          setError(e.message);
        }
        show();
      });
      if (!run.outcome) throw new Error("The connection was interrupted. Please try again.");
    } catch (err) {
      if (abort.current?.signal.aborted) return;
      // Keep any text that arrived, but never run actions from an incomplete run
      if (run.reply) run.reply = { ...run.reply, toolCalls: undefined };
      run.outcome = "error";
      show();
      setError(err instanceof Error ? err.message : "Sorry, something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }

    const calls = run.outcome === "finished" ? (run.reply?.toolCalls ?? []) : [];
    if (calls.length) {
      const results: Message[] = calls.map((call) => ({ id: newId(), role: "tool", toolCallId: call.id, ...runAction(call, navigate) }));
      setMessages((m) => [...m, ...results]);
    }
  }

  const empty = messages.length === 0;
  const waiting = busy && messages.at(-1)?.role === "user";

  return (
    <>
      <button
        ref={launcher}
        type="button"
        onClick={() => (open ? close() : setOpen(true))}
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        aria-label={open ? "Close the TruePas Assistant" : "Chat with the TruePas Assistant"}
        className={`fixed right-5 bottom-5 z-40 flex size-14 items-center justify-center rounded-full bg-primary text-white shadow-card-strong transition-transform hover:scale-105 md:right-8 md:bottom-8 ${focus} ${open ? "max-md:hidden" : ""}`}
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        ) : (
          <span className="scale-125">
            <ChatIcon />
          </span>
        )}
      </button>

      {open && (
        <div
          id={`${id}-panel`}
          role="dialog"
          aria-labelledby={`${id}-title`}
          onKeyDown={(e) => e.key === "Escape" && close()}
          className="fixed inset-0 z-[60] flex flex-col bg-white md:inset-auto md:right-8 md:bottom-26 md:h-[min(600px,calc(100svh-140px))] md:w-[400px] md:overflow-hidden md:rounded-2xl md:border md:border-line md:shadow-card-strong"
        >
          <div className="flex items-center gap-3 bg-linear-to-b from-sky-200 to-sky-50 px-5 py-4">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-white">
              <ChatIcon />
            </span>
            <div className="min-w-0 flex-1">
              <h2 id={`${id}-title`} className="text-base leading-6 font-semibold">
                TruePas Assistant
              </h2>
              <p className="text-xs leading-4 text-ink-3">AI assistant, answers may be inaccurate</p>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Close the assistant"
              className={`flex size-10 items-center justify-center rounded-lg text-ink-3 hover:bg-white/60 ${focus}`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          </div>

          <div ref={log} role="log" aria-live="polite" aria-busy={busy} className="flex flex-1 flex-col gap-3 overflow-y-auto px-5 py-4">
            <p className="max-w-[85%] rounded-2xl rounded-tl-sm bg-sky-50 px-4 py-3 text-sm leading-[22px] text-ink-3">
              Hi! I can answer questions about TruePas for businesses and app users, or help you book a demo.
            </p>
            {empty && (
              <ul className="flex flex-wrap gap-2" aria-label="Suggested questions">
                {suggestions.map((s) => (
                  <li key={s}>
                    <button
                      type="button"
                      onClick={() => send(s)}
                      className={`rounded-full border border-line-2 bg-white px-3 py-1.5 text-sm leading-5 text-ink-3 hover:border-primary hover:text-primary ${focus}`}
                    >
                      {s}
                    </button>
                  </li>
                ))}
              </ul>
            )}
            {messages.map((m) =>
              m.role === "user" ? (
                <p key={m.id} className="max-w-[85%] self-end rounded-2xl rounded-tr-sm bg-primary px-4 py-3 text-sm leading-[22px] whitespace-pre-wrap text-white">
                  {m.content}
                </p>
              ) : m.role === "assistant" ? (
                // Safety net: an action note the model wrote as text is never shown
                m.content?.replace(actionNote, "").trim() && (
                  <p key={m.id} className="max-w-[85%] rounded-2xl rounded-tl-sm bg-sky-50 px-4 py-3 text-sm leading-[22px] whitespace-pre-wrap text-ink-3">
                    {m.content.replace(actionNote, "").trim()}
                  </p>
                )
              ) : (
                <p key={m.id} className={`flex items-center gap-1.5 text-xs leading-4 ${m.error ? "text-danger" : "text-ink-3"}`}>
                  <span aria-hidden>{m.error ? "!" : "✓"}</span>
                  {m.error ? "That action couldn't be completed." : m.content}
                </p>
              ),
            )}
            {waiting && (
              <p className="flex w-fit gap-1 rounded-2xl rounded-tl-sm bg-sky-50 px-4 py-4" aria-label="The assistant is typing">
                {[0, 150, 300].map((delay) => (
                  <span key={delay} className="size-1.5 animate-bounce rounded-full bg-ink-3/50" style={{ animationDelay: `${delay}ms` }} />
                ))}
              </p>
            )}
            {error && (
              <p role="alert" className="rounded-lg border border-danger bg-[#fff1f1] px-3.5 py-2.5 text-sm leading-5 text-[#9a1f1f]">
                {error}
              </p>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="border-t border-line px-4 pt-3 pb-[max(12px,env(safe-area-inset-bottom))]"
          >
            <div className="flex items-end gap-2">
              <label htmlFor={`${id}-input`} className="sr-only">
                Your message
              </label>
              <textarea
                ref={field}
                id={`${id}-input`}
                rows={1}
                maxLength={1500}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
                    e.preventDefault();
                    send(input);
                  }
                }}
                placeholder="Ask about TruePas…"
                className="max-h-32 min-h-11 flex-1 resize-none rounded-lg border border-line-2 px-3.5 py-2.5 text-base leading-6 outline-none [field-sizing:content] focus:border-primary focus:shadow-[0_0_0_3px_rgba(0,122,255,0.12)]"
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                aria-label="Send"
                className={`flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary text-white transition-colors hover:bg-[#006ae0] disabled:cursor-not-allowed disabled:opacity-50 ${focus}`}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden fill="currentColor">
                  <path d="M3.4 20.4 21 12 3.4 3.6 3.39 10.13 15 12 3.39 13.87z" />
                </svg>
              </button>
            </div>
            <p className="mt-2 text-[11px] leading-4 text-ink-3/80">
              Please don&apos;t share sensitive personal details. Messages are processed by Google Gemini and may be used to improve it; see our{" "}
              <Link href="/privacy-policy" className="underline hover:text-primary">
                Privacy Policy
              </Link>
              .
            </p>
          </form>
        </div>
      )}
    </>
  );
}
