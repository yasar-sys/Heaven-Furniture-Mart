import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

export type ChatProvider = {
  model: ReturnType<ReturnType<typeof createOpenAICompatible>>;
  label: string;
};

/**
 * Resolves a chat model, server-only.
 * On Lovable, LOVABLE_API_KEY is injected and routes through the Lovable AI Gateway.
 * On any other host (Vercel, Netlify, self-hosted), set OPENAI_API_KEY
 * (optionally OPENAI_BASE_URL / OPENAI_MODEL) instead.
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

  return null;
}
