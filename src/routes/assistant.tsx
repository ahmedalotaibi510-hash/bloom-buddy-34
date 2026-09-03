import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useRef, useState } from "react";

import { Icon } from "@/components/Icon";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { askAssistant, type AssistantMessage } from "@/lib/assistant.functions";

export const Route = createFileRoute("/assistant")({
  head: () => ({
    meta: [
      { title: "MEMENTO Assistant | Gift Ideas & Order Help" },
      {
        name: "description",
        content:
          "Chat with the MEMENTO assistant for personalized gift ideas, engraving advice, delivery times and order help in Kuwait.",
      },
      { property: "og:title", content: "MEMENTO Assistant" },
      {
        property: "og:description",
        content: "Gift ideas, personalization advice and order help, answered instantly.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AssistantPage,
});

const SUGGESTIONS = [
  "اقترح لي هدية لذكرى زواج",
  "How long does delivery take in Kuwait?",
  "What can I engrave on a keepsake box?",
];

function AssistantPage() {
  const ask = useServerFn(askAssistant);
  const [messages, setMessages] = useState<AssistantMessage[]>([]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, pending]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || pending) return;
    const next: AssistantMessage[] = [...messages, { role: "user", content }];
    setMessages(next);
    setInput("");
    setError(null);
    setPending(true);
    try {
      const result = await ask({ data: { messages: next.slice(-12) } });
      if (result.ok) {
        setMessages([...next, { role: "assistant", content: result.reply }]);
      } else {
        setError(result.error);
      }
    } catch {
      setError("Connection failed. Please try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <SiteHeader />
      <main id="main-content" className="page-x mx-auto w-full max-w-page flex-grow py-10 md:py-16">
        <header className="mb-8 max-w-2xl">
          <h1 className="text-display-sm text-primary md:text-display-lg">Smart gift assistant</h1>
          <p className="mt-3 text-body-lg text-on-surface-variant">
            Ask anything about personalization, engraving, delivery or your order — in Arabic or English.
          </p>
        </header>

        <div className="rounded-2xl bg-surface-lowest p-4 shadow-soft md:p-6">
          <div
            className="flex min-h-[320px] flex-col gap-4 overflow-y-auto md:min-h-[420px] md:max-h-[520px]"
            aria-live="polite"
            aria-busy={pending}
          >
            {messages.length === 0 && !pending && (
              <p className="text-body-md text-on-surface-variant">
                Start the conversation, or pick one of the ideas below.
              </p>
            )}
            {messages.map((m, i) => (
              <div
                key={i}
                className={
                  m.role === "user"
                    ? "ml-auto max-w-[85%] rounded-2xl bg-primary px-4 py-3 text-body-md text-on-primary"
                    : "mr-auto max-w-[85%] whitespace-pre-wrap rounded-2xl bg-surface-high/60 px-4 py-3 text-body-md text-on-surface-variant"
                }
              >
                {m.content}
              </div>
            ))}
            {pending && (
              <div className="mr-auto rounded-2xl bg-surface-high/60 px-4 py-3 text-body-md text-on-surface-variant">
                Thinking…
              </div>
            )}
            <div ref={endRef} />
          </div>

          {error && (
            <p role="alert" className="mt-4 rounded-lg bg-surface-high/60 px-4 py-3 text-body-md text-primary">
              {error}
            </p>
          )}

          <form
            className="mt-6 flex items-end gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              void send(input);
            }}
          >
            <label htmlFor="assistant-input" className="sr-only">
              Your message
            </label>
            <textarea
              id="assistant-input"
              rows={2}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  void send(input);
                }
              }}
              placeholder="Ask about gifts, engraving or delivery…"
              className="min-h-[56px] flex-1 resize-none rounded-xl border border-outline-variant/30 bg-surface px-4 py-3 text-body-md text-on-surface-variant outline-none focus:border-primary"
            />
            <button
              type="submit"
              disabled={pending || input.trim().length === 0}
              className="flex h-14 items-center gap-2 rounded-xl bg-primary px-6 text-label-lg text-on-primary transition-colors hover:bg-inverse-surface disabled:opacity-50"
            >
              <Icon name="send" />
              <span className="hidden sm:inline">Send</span>
            </button>
          </form>

          <div className="mt-4 flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => void send(s)}
                disabled={pending}
                className="rounded-full border border-outline-variant/30 px-4 py-2 text-label-lg text-on-surface-variant transition-colors hover:border-primary hover:text-primary disabled:opacity-50"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
