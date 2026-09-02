import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

export type ChatProvider = {
  model: ReturnType<ReturnType<typeof createOpenAICompatible>> | ReturnType<ReturnType<typeof createGoogleGenerativeAI>>;
  label: string;
};

/** Default Gemini API key for the Heaven Furniture Mart chat concierge. */
const GEMINI_API_KEY = "AIzaSyA_VGzWf7JUvsDhzIXCwyhnO5GzVQN7cVM";

/**
 * Resolves a chat model, server-only.
 * Priority: 1) Lovable gateway  2) OpenAI  3) Google Gemini (hardcoded key).
 */
export function resolveChatProvider(): ChatProvider | null {
  const lovableKey = process.env["LOVABLE_API_KEY"];
  if (lovableKey) {
    const gateway = createOpenAICompatible({
      name: "lovable",
      baseURL: "https://ai.gateway.lovable.dev/v1",
      headers: { "Lovable-API-Key": lovableKey },
    });
    return { model: gateway("google/gemini-3.7-flash"), label: "lovable-gateway" };
  }

  const openaiKey = process.env["OPENAI_API_KEY"];
  if (openaiKey) {
    const provider = createOpenAICompatible({
      name: "openai",
      baseURL: process.env["OPENAI_BASE_URL"] ?? "https://api.openai.com/v1",
      headers: { Authorization: `Bearer ${openaiKey}` },
    });
    return { model: provider(process.env["OPENAI_MODEL"] ?? "gpt-4o-mini"), label: "openai" };
  }

  /* ── Google Gemini (direct) ── */
  const geminiKey = process.env["GEMINI_API_KEY"] ?? GEMINI_API_KEY;
  if (geminiKey) {
    const google = createGoogleGenerativeAI({ apiKey: geminiKey });
    return { model: google("gemini-2.0-flash"), label: "google-gemini" };
  }

  return null;
}
