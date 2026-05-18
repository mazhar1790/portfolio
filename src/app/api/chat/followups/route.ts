import Anthropic from "@anthropic-ai/sdk";
import { CV_CONTEXT } from "@/data/cv";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface ClientMessage {
  role: "user" | "assistant";
  content: string;
}

export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json({ followups: [] });
  }

  let payload: { messages?: ClientMessage[] } = {};
  try {
    payload = await req.json();
  } catch {
    return Response.json({ followups: [] });
  }

  const messages = (payload.messages ?? [])
    .filter(
      (m): m is ClientMessage =>
        !!m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim().length > 0,
    )
    .slice(-6);

  if (messages.length === 0) return Response.json({ followups: [] });

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  try {
    const result = await client.messages.create({
      model: "claude-haiku-4-20250514",
      max_tokens: 200,
      system: `${CV_CONTEXT}\n\nYou generate short follow-up questions a visitor might want to ask next. Return ONLY a JSON array of exactly 3 short strings (max 8 words each). No explanation, no markdown, just valid JSON like: ["question 1", "question 2", "question 3"]`,
      messages: [
        ...messages,
        {
          role: "user",
          content:
            "Generate 3 natural follow-up questions I might want to ask next, based on our conversation.",
        },
      ],
    });

    const raw =
      result.content[0]?.type === "text" ? result.content[0].text.trim() : "[]";

    const match = raw.match(/\[.*\]/s);
    const followups: string[] = match ? JSON.parse(match[0]) : [];

    return Response.json({ followups: followups.slice(0, 3) });
  } catch {
    return Response.json({ followups: [] });
  }
}
