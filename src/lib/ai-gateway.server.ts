import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import type { LanguageModel } from "ai";

export type ChatProvider = {
  model: LanguageModel;
  label: string;
};

/**
 * Resolves a chat model, server-only.
 * On Lovable, LOVABLE_API_KEY is injected and routes through the Lovable AI Gateway.
 * On any other host (Vercel, Netlify, self-hosted), set OPENAI_API_KEY
 * (optionally OPENAI_BASE_URL / OPENAI_MODEL) instead.
 */
export function resolveChatProvider(): ChatProvider | null {
  // Direct Google Gemini API key (works on Lovable, Vercel, or any host).
  const googleKey = process.env["GOOGLE_API_KEY"] ?? process.env["GOOGLE_GENERATIVE_AI_API_KEY"];
  if (googleKey) {
    const google = createGoogleGenerativeAI({ apiKey: googleKey });
    return {
      model: google(process.env["GOOGLE_MODEL"] ?? "gemini-2.5-flash"),
      label: "google-gemini",
    };
  }

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

  return null;
}
