"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { ChatIcon } from "@/components/ui/Button";
import { openDemoBooking } from "@/components/ui/BookDemoButton";
import ChatMarkdown from "@/components/layout/ChatMarkdown";
import { contactHref } from "@/lib/contact";
import { actionError, actionNote, contextWindow, tools, type AgentEvent, type Message, type ToolCall } from "@/lib/chat/protocol";

// Floating chat assistant on every page (rendered by app/layout.tsx when GEMINI_API_KEY is set). It is an AG-UI
// client: each visitor message starts a run on /api/chat, and the assistant's actions (tool calls) run here once
// the run finishes. Not in Figma; added at the client's request. The look (capsule launcher, header with status and
// reset, bubbles, chips) and the per-tab history follow the chatbot blueprint the team adopted (23 Oct 2026), in
// TruePas colours

type Assistant = Extract<Message, { role: "assistant" }>;

const suggestions = ["What is TruePas?", "How do I enroll?", "Which systems does it integrate with?", "Book a demo"];
const focus = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const headerButton = `flex size-[30px] items-center justify-center rounded-lg border border-line bg-sky-50 text-ink-3 transition-colors disabled:opacity-40 ${focus}`;

// The conversation survives reloads and page changes in this tab (sessionStorage), and is gone when the tab closes
const STORAGE_KEY = "truepas-chat-v1";
const STORED_MESSAGES = 50;

function loadChat(): { threadId: string; messages: Message[] } {
  try {
    const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "null");
    if (saved && typeof saved.threadId === "string" && Array.isArray(saved.messages)) return saved;
  } catch {}
  return { threadId: "", messages: [] };
}

const newId = () => crypto.randomUUID();

/** Runs one assistant action; returns what happened, which is also what the assistant sees on its next turn */
function runAction(call: ToolCall, navigate: (href: string) => void): { content: string; error?: string } {
  let args: Record<string, unknown>;
  try {
    args = JSON.parse(call.function.arguments || "{}");
  } catch {
    return { content: "", error: "invalid arguments" };
  }
  const error = actionError(call.function.name, args);
  if (error) return { content: "", error };
  switch (call.function.name) {
    case "book_demo":
      openDemoBooking();
      return { content: "Opened the demo booking calendar" };
    case "open_contact_form": {
      const { inquiryType, industry } = args as { inquiryType: string; industry?: string };
      navigate(contactHref({ inquiryType, industry }));
      return { content: `Opened the contact form (${[inquiryType, industry].filter(Boolean).join(", ")})` };
    }
    default: {
      const page = args.page as string;
      navigate(page);
      return { content: `Opened ${page === "/" ? "the home page" : page}` };
    }
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

export function OnlineDot({ className = "" }: { className?: string }) {
  return (
    <span className={`relative flex ${className}`} aria-hidden>
      <span className="absolute inline-flex size-full animate-ping rounded-full bg-online opacity-60 motion-reduce:hidden" />
      <span className="relative size-full rounded-full border-2 border-white bg-online" />
    </span>
  );
}

export default function ChatWidget() {
  const id = useId();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  // The panel only renders once opened, so reading the saved chat on the first client render can't cause a mismatch
  const [saved] = useState(() => (typeof window === "undefined" ? null : loadChat()));
  const [messages, setMessages] = useState<Message[]>(saved?.messages ?? []);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const threadId = useRef(saved?.threadId ?? "");
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
  }, [messages, busy, error, open]);
  // Saved between runs only, so a reload mid-reply doesn't keep a half-written answer
  useEffect(() => {
    if (busy) return;
    try {
      if (messages.length) sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ threadId: threadId.current, messages: messages.slice(-STORED_MESSAGES) }));
      else sessionStorage.removeItem(STORAGE_KEY);
    } catch {}
  }, [messages, busy]);

  const close = () => {
    setOpen(false);
    launcher.current?.focus();
  };

  // On phones the panel covers the page, so it steps aside when an action or a link changes what's behind it
  const stepAside = () => {
    if (window.matchMedia("(width < 48rem)").matches) setOpen(false);
  };
  const navigate = (href: string) => {
    router.push(href);
    stepAside();
  };

  const reset = () => {
    abort.current?.abort();
    threadId.current = "";
    setMessages([]);
    setInput("");
    setError("");
    field.current?.focus();
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
        body: JSON.stringify({ threadId: threadId.current, runId: newId(), messages: history.slice(-contextWindow), tools, context: [] }),
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
  const bubble = "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-[21px]";
  const botBubble = `${bubble} self-start rounded-tl-[4px] border border-sky-100 bg-sky-50 text-ink-2`;

  return (
    <>
      <button
        ref={launcher}
        type="button"
        onClick={() => (open ? close() : setOpen(true))}
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        aria-label={open ? "Close the TruePas Assistant" : "Chat with the TruePas Assistant"}
        className={`group fixed right-5 bottom-5 z-40 flex items-center gap-3 rounded-full border border-primary/20 bg-white py-2 pr-[18px] pl-2.5 text-left shadow-[0_4px_6px_-1px_rgba(0,0,0,0.04),0_12px_28px_-4px_rgba(0,122,255,0.16)] transition-[translate,scale,border-color,box-shadow] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:scale-[1.015] hover:border-primary/50 hover:shadow-[0_18px_36px_-4px_rgba(0,122,255,0.24)] motion-reduce:transition-none md:right-8 md:bottom-8 ${focus} ${open ? "max-md:hidden" : ""}`}
      >
        <span className="relative flex size-9 shrink-0 items-center justify-center rounded-full border-[1.5px] border-sky-100 bg-sky-50 text-primary">
          {open ? (
            <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          ) : (
            <ChatIcon />
          )}
          <OnlineDot className="absolute right-0 bottom-0 size-2.5" />
        </span>
        <span className="flex flex-col">
          <span className="text-[10px] leading-3 font-bold tracking-[0.06em] text-primary uppercase">AI Assistant</span>
          <span className="text-sm leading-5 font-extrabold text-ink">{open ? "Close chat" : "Ask Questions"}</span>
        </span>
        <span aria-hidden className="text-sm leading-5 text-primary">
          ✦
        </span>
      </button>

      {open && (
        <div
          id={`${id}-panel`}
          role="dialog"
          aria-labelledby={`${id}-title`}
          onKeyDown={(e) => e.key === "Escape" && close()}
          className="fixed inset-0 z-[60] flex flex-col bg-white transition-[opacity,translate,scale] duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] starting:translate-y-5 starting:scale-[0.96] starting:opacity-0 motion-reduce:transition-none md:inset-auto md:right-8 md:bottom-[100px] md:h-[min(600px,calc(100svh-130px))] md:w-[390px] md:overflow-hidden md:rounded-[20px] md:border md:border-line md:shadow-[0_20px_45px_-10px_rgba(15,23,42,0.16)]"
        >
          <div className="flex items-center justify-between gap-3 border-b border-line/70 bg-white/95 px-[18px] py-4 backdrop-blur-lg">
            <div className="flex min-w-0 items-center gap-2.5">
              <span className="flex size-[38px] shrink-0 items-center justify-center rounded-full bg-sky-100 text-[13px] leading-4 font-extrabold text-primary">
                AI
              </span>
              <div className="min-w-0">
                <h2 id={`${id}-title`} className="flex items-center gap-1.5 text-[15px] leading-5 font-extrabold">
                  TruePas Assistant
                  <span aria-hidden className="flex size-4 items-center justify-center rounded-full bg-primary text-[9px] leading-none text-white">
                    ✓
                  </span>
                </h2>
                <p className="mt-0.5 flex items-center gap-1.5 text-[11px] leading-4 text-ink-3/70">
                  <span className="inline-flex items-center gap-1 rounded-full border border-[#a7f3d0] bg-[#ecfdf5] px-1.5 text-[10px] leading-4 font-bold text-[#059669]">
                    <span aria-hidden className="size-1 rounded-full bg-online" />
                    Online
                  </span>
                  <span className="truncate">• AI, may be inaccurate</span>
                </p>
              </div>
            </div>
            <div className="flex shrink-0 gap-1">
              <button type="button" onClick={reset} disabled={empty} aria-label="Start a new chat" title="New chat" className={`${headerButton} hover:bg-sky-100 hover:text-ink`}>
                <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
                  <path d="M3 3v5h5" />
                </svg>
              </button>
              <button type="button" onClick={close} aria-label="Close the assistant" title="Close" className={`${headerButton} hover:bg-[#fee2e2] hover:text-danger`}>
                <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
            </div>
          </div>

          <div ref={log} role="log" aria-live="polite" aria-busy={busy} className="flex flex-1 flex-col gap-3 overflow-y-auto p-4">
            <p className={botBubble}>Hi there! 👋 Ask me anything about TruePas, for businesses or app users, or I can help you book a demo.</p>
            {empty && (
              <ul className="flex flex-col gap-1.5" aria-label="Suggested questions">
                {suggestions.map((s) => (
                  <li key={s}>
                    <button
                      type="button"
                      onClick={() => send(s)}
                      className={`flex w-full items-center justify-between gap-2 rounded-[10px] border border-line bg-white px-3 py-2 text-left text-[13px] leading-5 text-ink-3 transition-[background-color,border-color,color,translate] duration-150 hover:translate-x-0.5 hover:border-primary hover:bg-sky-50 hover:text-primary motion-reduce:transition-none ${focus}`}
                    >
                      {s}
                      <span aria-hidden>→</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
            {messages.map((m) => {
              if (m.role === "user")
                return (
                  <p key={m.id} className={`${bubble} self-end rounded-tr-[4px] bg-primary whitespace-pre-wrap text-white`}>
                    {m.content}
                  </p>
                );
              if (m.role === "assistant") {
                // Safety net: an action note the model wrote as text is never shown
                const text = m.content?.replace(actionNote, "").trim();
                return (
                  text && (
                    <div key={m.id} className={botBubble}>
                      <ChatMarkdown text={text} onLink={stepAside} />
                    </div>
                  )
                );
              }
              return (
                <p key={m.id} className={`flex items-center gap-1.5 text-xs leading-4 ${m.error ? "text-danger" : "text-ink-3"}`}>
                  <span aria-hidden>{m.error ? "!" : "✓"}</span>
                  {m.error ? "That action couldn't be completed." : m.content}
                </p>
              );
            })}
            {waiting && (
              <p className="flex w-fit gap-1 rounded-2xl rounded-tl-[4px] border border-sky-100 bg-sky-50 px-4 py-4" aria-label="The assistant is typing">
                {[0, 150, 300].map((delay) => (
                  <span key={delay} className="size-1.5 animate-bounce rounded-full bg-primary/50" style={{ animationDelay: `${delay}ms` }} />
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
            className="border-t border-line/70 bg-white px-3 pt-3 pb-[max(12px,env(safe-area-inset-bottom))]"
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
                placeholder="Ask a question…"
                className="max-h-32 min-h-10 flex-1 resize-none rounded-xl border border-line px-3.5 py-2 text-base leading-6 transition-colors outline-none [field-sizing:content] focus:border-primary md:text-sm md:leading-6"
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                aria-label="Send"
                className={`flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 ${focus}`}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" aria-hidden fill="currentColor">
                  <path d="M3.4 20.4 21 12 3.4 3.6 3.39 10.13 15 12 3.39 13.87z" />
                </svg>
              </button>
            </div>
            <p className="mt-2 text-[11px] leading-4 text-ink-3/70">
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
