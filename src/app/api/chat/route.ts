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
    return new Response(
      "AI is not configured. Set ANTHROPIC_API_KEY to enable the chat.",
      { status: 500 },
    );
  }

  let payload: { messages?: ClientMessage[] } = {};
  try {
    payload = await req.json();
  } catch {
    return new Response("Invalid JSON body.", { status: 400 });
  }

  const messages = (payload.messages ?? [])
    .filter(
      (m): m is ClientMessage =>
        !!m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim().length > 0,
    )
    .slice(-20);

  if (messages.length === 0) {
    return new Response("No messages provided.", { status: 400 });
  }

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const messageStream = client.messages.stream({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1024,
          system: CV_CONTEXT,
          messages,
        });

        for await (const event of messageStream) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        controller.close();
      } catch (err) {
        const msg =
          err instanceof Error ? err.message : "Unexpected AI error.";
        controller.enqueue(encoder.encode(`\n\n[error] ${msg}`));
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      "Transfer-Encoding": "chunked",
    },
  });
}
