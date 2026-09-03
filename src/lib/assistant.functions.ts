import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const messageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(4000),
});

const inputSchema = z.object({
  messages: z.array(messageSchema).min(1).max(20),
});

export type AssistantMessage = z.infer<typeof messageSchema>;

const SYSTEM_PROMPT = `You are MEMENTO's assistant, helping customers of a Kuwait-based personalized gift studio
(photo albums, engraved keepsakes, custom prints). Be warm, concise and practical.
Facts you may use: production takes 3-5 working days, delivery across Kuwait costs 2.000 KD,
personalized items cannot be returned but damaged pieces are remade free of charge,
customers can personalize a gift on the /customize page and follow their order on the /track page.
Reply in the same language the customer writes in (Arabic or English).`;

export const askAssistant = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => inputSchema.parse(data))
  .handler(async ({ data }) => {
    const apiKey = process.env["OPENROUTER_API_KEY"];
    if (!apiKey) {
      return { ok: false as const, error: "Assistant is not configured yet." };
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "X-Title": "MEMENTO Assistant",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...data.messages],
        max_tokens: 800,
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error(`OpenRouter error ${response.status}: ${detail.slice(0, 500)}`);
      const error =
        response.status === 429
          ? "The assistant is busy right now. Please try again in a moment."
          : response.status === 401 || response.status === 403
            ? "The assistant key was rejected. Please check the OpenRouter API key."
            : "The assistant couldn't answer right now. Please try again.";
      return { ok: false as const, error };
    }

    const payload = (await response.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const reply = payload.choices?.[0]?.message?.content?.trim();
    if (!reply) {
      return { ok: false as const, error: "The assistant returned an empty answer." };
    }

    return { ok: true as const, reply };
  });
