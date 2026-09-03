import { createGoogleGenerativeAI } from "@ai-sdk/google";
import type { LanguageModel } from "ai";

export type ChatProvider = {
  model: LanguageModel;
  label: string;
};

/**
 * Resolves the Google Gemini chat model. Server-only.
 * The API key is read exclusively from process.env.GEMINI_API_KEY and is never
 * exposed to the browser.
 */
export function resolveChatProvider(): ChatProvider | null {
  const apiKey = process.env["GEMINI_API_KEY"];
  if (!apiKey) return null;

  const google = createGoogleGenerativeAI({ apiKey });
  return { model: google("gemini-2.5-flash"), label: "google-gemini" };
}
