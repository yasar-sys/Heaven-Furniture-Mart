import { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { MessageCircle, X } from "lucide-react";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { useT } from "@/lib/i18n";
import { useConsultation } from "./consultation-context";
import { cn } from "@/lib/utils";

const SUGGESTIONS = [
  "Design a living room for a 12x14 ft space",
  "How long does a custom wardrobe take?",
  "Do you deliver outside Chattogram?",
];

const MATERIAL_OPTIONS = [
  "Hand-Carved Solid Teak",
  "Diamond-Tufted Velvet",
  "Imported Marble & Lacquer",
  "Antique Brass Fittings",
] as const;

const ENQUIRY_TOPICS = [
  "Finishes & colours available",
  "Durability & care",
  "Lead time",
  "Indicative price range",
] as const;

export function Concierge() {
  const t = useT();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [material, setMaterial] = useState<string>(MATERIAL_OPTIONS[0]);
  const [topic, setTopic] = useState<string>(ENQUIRY_TOPICS[0]);
  const [note, setNote] = useState("");
  const { openConsultation } = useConsultation();

  const retriedRef = useRef(false);
  const [retrying, setRetrying] = useState(false);

  const { messages, sendMessage, regenerate, status, error, clearError } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  // A dropped stream or a transient gateway hiccup should not become a dead end:
  // retry once automatically, and only then fall back to the contact message.
  useEffect(() => {
    if (!error || retriedRef.current) return;
    retriedRef.current = true;
    setRetrying(true);
    const timer = setTimeout(() => {
      void Promise.resolve(regenerate()).finally(() => setRetrying(false));
    }, 900);
    return () => clearTimeout(timer);
  }, [error, regenerate]);

  const retryNow = () => {
    clearError?.();
    setRetrying(true);
    void Promise.resolve(regenerate()).finally(() => setRetrying(false));
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const busy = status === "submitted" || status === "streaming" || retrying;

  const send = (text: string) => {
    const value = text.trim();
    if (!value || busy) return;
    retriedRef.current = false;
    clearError?.();
    setInput("");
    void sendMessage({ text: value });
  };

  const sendEnquiry = () => {
    if (busy) return;
    retriedRef.current = false;
    clearError?.();
    const detail = note.trim();
    const question = `Materials enquiry — ${material}. I'd like to know about: ${topic}.${
      detail ? ` Details: ${detail}` : ""
    }`;
    setNote("");
    setEnquiryOpen(false);
    void sendMessage({ text: question });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? t("Close design concierge") : t("Ask our design concierge")}
        className={cn(
          "fixed bottom-24 right-5 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-ink text-ivory shadow-[0_18px_44px_-18px_rgba(0,0,0,0.65)] transition-all duration-500 ease-[var(--ease-luxe)] hover:bg-brown lg:bottom-8 lg:right-8",
          open && "rotate-90 bg-brass text-ink",
        )}
      >
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
      </button>

      {open && (
        <div
          role="dialog"
          aria-label={t("Design concierge")}
          className="fixed bottom-40 right-4 z-[60] flex h-[min(560px,72vh)] w-[calc(100vw-2rem)] max-w-[400px] flex-col overflow-hidden rounded-sm border border-border bg-card shadow-[0_40px_90px_-40px_rgba(0,0,0,0.55)] animate-in fade-in slide-in-from-bottom-4 duration-500 lg:bottom-28 lg:right-8"
        >
          <header className="flex items-baseline justify-between gap-3 border-b border-border px-5 py-4">
            <div>
              <p className="font-serif text-xl leading-none text-foreground">{t("Aria")}</p>
              <p className="eyebrow mt-2 text-brass">{t("Design concierge")}</p>
            </div>
            <button
              type="button"
              onClick={() => openConsultation()}
              className="text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground underline-offset-4 transition-colors hover:text-brass hover:underline"
            >
              {t("Book a visit")}
            </button>
          </header>

          <Conversation className="flex-1">
            <ConversationContent className="gap-4 px-5 py-5">
              {messages.length === 0 && (
                <div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {t(
                      "Tell me about your space and I'll suggest what we could craft for it.",
                    )}
                  </p>
                  <div className="mt-5 flex flex-col items-start gap-2">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => send(t(s))}
                        className="border border-border px-3 py-2 text-left text-xs leading-snug text-foreground/80 transition-colors hover:border-brass hover:text-brass"
                      >
                        {t(s)}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((m) => (
                <Message from={m.role} key={m.id}>
                  <MessageContent
                    className={cn(
                      "text-sm",
                      m.role === "user"
                        ? "bg-ink text-ivory"
                        : "bg-transparent p-0 text-foreground",
                    )}
                  >
                    {m.parts.map((part, i) =>
                      part.type === "text" ? (
                        <MessageResponse key={i}>{part.text}</MessageResponse>
                      ) : null,
                    )}
                  </MessageContent>
                </Message>
              ))}

              {status === "submitted" && <Shimmer className="text-sm">{t("Thinking...")}</Shimmer>}

              {error && (
                <div className="border border-border/70 p-3">
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {t(
                      "Our concierge is unavailable right now. Please call +880 1960-481983 or request a free design consultation and our designer will reply.",
                    )}
                  </p>
                  <button
                    type="button"
                    onClick={() => openConsultation()}
                    className="mt-3 text-[0.65rem] uppercase tracking-[0.18em] text-brass underline-offset-4 hover:underline"
                  >
                    {t("Request Consultation")}
                  </button>
                </div>
              )}
            </ConversationContent>
            <ConversationScrollButton />
          </Conversation>

          <div className="border-t border-border px-3 pt-3">
            <button
              type="button"
              onClick={() => setEnquiryOpen((v) => !v)}
              aria-expanded={enquiryOpen}
              className="flex w-full items-center justify-between text-[0.62rem] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-brass"
            >
              {t("Materials enquiry")}
              <span className="text-brass">{enquiryOpen ? "—" : "+"}</span>
            </button>

            {enquiryOpen && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendEnquiry();
                }}
                className="mt-3 space-y-2 border border-border p-3"
              >
                <label className="block">
                  <span className="text-[0.58rem] uppercase tracking-[0.18em] text-brass">
                    {t("Material")}
                  </span>
                  <select
                    value={material}
                    onChange={(e) => setMaterial(e.currentTarget.value)}
                    className="mt-1 w-full border border-border bg-transparent px-2 py-2 text-xs text-foreground outline-none focus:border-brass"
                  >
                    {MATERIAL_OPTIONS.map((m) => (
                      <option key={m} value={m}>
                        {t(m)}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="text-[0.58rem] uppercase tracking-[0.18em] text-brass">
                    {t("I want to know about")}
                  </span>
                  <select
                    value={topic}
                    onChange={(e) => setTopic(e.currentTarget.value)}
                    className="mt-1 w-full border border-border bg-transparent px-2 py-2 text-xs text-foreground outline-none focus:border-brass"
                  >
                    {ENQUIRY_TOPICS.map((tp) => (
                      <option key={tp} value={tp}>
                        {t(tp)}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="text-[0.58rem] uppercase tracking-[0.18em] text-brass">
                    {t("Your piece or room (optional)")}
                  </span>
                  <input
                    value={note}
                    onChange={(e) => setNote(e.currentTarget.value)}
                    placeholder={t("e.g. king bed for a 12x14 ft room")}
                    className="mt-1 w-full border border-border bg-transparent px-2 py-2 text-xs text-foreground outline-none placeholder:text-muted-foreground focus:border-brass"
                  />
                </label>

                <button
                  type="submit"
                  disabled={busy}
                  className="mt-1 w-full bg-ink px-3 py-2 text-[0.62rem] uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-brown disabled:opacity-50"
                >
                  {t("Send enquiry")}
                </button>
              </form>
            )}
          </div>

          <div className="p-3">
            <PromptInput
              onSubmit={(_message, event) => {
                event.preventDefault();
                send(input);
              }}
            >
              <PromptInputTextarea
                value={input}
                onChange={(e) => setInput(e.currentTarget.value)}
                placeholder={t("Ask about your space...")}
              />
              <PromptInputFooter className="justify-end">
                <PromptInputSubmit status={status} disabled={!input.trim() || busy} />
              </PromptInputFooter>
            </PromptInput>
          </div>
        </div>
      )}
    </>
  );
}
