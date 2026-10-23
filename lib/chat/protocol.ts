// The subset of the AG-UI protocol (https://docs.ag-ui.com, spec 1.0) the chat assistant speaks. The browser posts
// a RunAgentInput to /api/chat and reads the run back as server-sent events, one JSON event per `data:` line.
// Written by hand rather than importing @ag-ui/core, to keep runtime deps to next/react and the Gemini SDK

import { industries, inquiryTypes } from "@/lib/contact";
import { publicRoutes } from "@/lib/site";

export type ToolCall = { id: string; type: "function"; function: { name: string; arguments: string } };

export type Message =
  | { id: string; role: "user"; content: string }
  | { id: string; role: "assistant"; content?: string; toolCalls?: ToolCall[] }
  | { id: string; role: "tool"; content: string; toolCallId: string; error?: string };

export type Tool = { name: string; description: string; parameters: Record<string, unknown> };

export type RunAgentInput = {
  threadId: string;
  runId: string;
  messages: Message[];
  tools: Tool[];
  context: { description: string; value: string }[];
};

export type AgentEvent =
  | { type: "RUN_STARTED"; threadId: string; runId: string }
  | { type: "RUN_FINISHED"; threadId: string; runId: string }
  | { type: "RUN_ERROR"; message: string; code?: string }
  | { type: "TEXT_MESSAGE_START"; messageId: string; role: "assistant" }
  | { type: "TEXT_MESSAGE_CONTENT"; messageId: string; delta: string }
  | { type: "TEXT_MESSAGE_END"; messageId: string }
  | { type: "TOOL_CALL_START"; toolCallId: string; toolCallName: string; parentMessageId?: string }
  | { type: "TOOL_CALL_ARGS"; toolCallId: string; delta: string }
  | { type: "TOOL_CALL_END"; toolCallId: string };

/** How many recent messages a run carries (the blueprint's context memory, 7 exchanges); the browser sends at most
 *  this many and the route keeps at most this many */
export const contextWindow = 14;

/** An action note the model sometimes writes into its text instead of calling a tool, e.g. `[Action: open_page {...} -> ...]`.
 *  Also matches an unclosed note at the end of a reply that is still streaming */
export const actionNote = /\s*\[(?:Action|Website)\b[^\]]*(?:\]|$)/gi;

/** Why an action can't run, or null when its name and arguments are on the allow-lists. The route checks each call
 *  before sending it and the browser again before running it, so a manipulated reply can't open anything else */
export function actionError(name: string, args: Record<string, unknown>): string | null {
  switch (name) {
    case "book_demo":
      return null;
    case "open_contact_form": {
      const { inquiryType, industry } = args;
      if (typeof inquiryType !== "string" || !inquiryTypes.includes(inquiryType)) return "unknown inquiry type";
      if (industry !== undefined && (typeof industry !== "string" || !industries.includes(industry))) return "unknown industry";
      return null;
    }
    case "open_page":
      return typeof args.page === "string" && publicRoutes.includes(args.page) ? null : "unknown page";
    default:
      return "unknown action";
  }
}

// Frontend tools: the assistant asks for them and the browser runs them (components/layout/ChatWidget.tsx)
export const tools: Tool[] = [
  {
    name: "book_demo",
    description:
      "Open the TruePas demo booking calendar in a popup on the current page. Use when the visitor asks to book, schedule or see a demo, or agrees to your offer of one.",
    parameters: { type: "object", properties: {}, additionalProperties: false },
  },
  {
    name: "open_contact_form",
    description:
      "Take the visitor to the inquiry form on the Contact page with the inquiry type (and industry, when known) already selected. Use for sales, partnership, integration or support questions the visitor wants to send to the TruePas team.",
    parameters: {
      type: "object",
      properties: {
        inquiryType: { type: "string", enum: inquiryTypes },
        industry: { type: "string", enum: industries, description: "The visitor's industry, only if they said it" },
      },
      required: ["inquiryType"],
      additionalProperties: false,
    },
  },
  {
    name: "open_page",
    description:
      "Navigate the visitor to a page of the TruePas website. Use when they ask to see a page or want more detail that a page covers.",
    parameters: {
      type: "object",
      properties: { page: { type: "string", enum: publicRoutes } },
      required: ["page"],
      additionalProperties: false,
    },
  },
];
