import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowLeft,
  Bot,
  CheckCircle2,
  Code2,
  Cpu,
  Github,
  Sparkles,
  Terminal,
} from "lucide-react";

export const metadata: Metadata = {
  title: "MCP Server — Mazhar Hayat's CV",
  description:
    "A Model Context Protocol server exposing my CV, projects, and live RAG corpus as tools any AI agent can query directly.",
};

const TOOLS = [
  { name: "get_profile", desc: "Name, title, location, availability, contact, book-a-call link." },
  { name: "list_projects", desc: "Flagship projects with slugs and one-line impact metrics." },
  { name: "get_project(slug)", desc: "Full structured case study for one project." },
  { name: "list_skills", desc: "Categorised skills — Gen AI, RAG, frameworks, cloud, full-stack." },
  { name: "search_cv(query)", desc: "Keyword search across the corpus — returns ranked chunks." },
  { name: "check_fit", desc: "Hands off JD analysis to the live /fit analyser." },
];

const CONFIG_JSON = `{
  "mcpServers": {
    "mazhar-cv": {
      "command": "node",
      "args": [
        "/absolute/path/to/Portfolio/scripts/mcp-server/server.mjs"
      ]
    }
  }
}`;

export default function McpPage() {
  return (
    <main className="min-h-screen bg-ink pt-24 pb-32">
      <div className="mx-auto w-full max-w-4xl px-5 sm:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-paper-dim transition hover:text-signal"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Portfolio
        </Link>

        <header className="mt-10">
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-signal">
            <Cpu className="h-3 w-3" />
            <span>Model Context Protocol · agent-native CV</span>
          </div>
          <h1 className="display-1 mt-5">
            Most candidates put their CV{" "}
            <span className="display-italic text-signal/90">on a website.</span>
            <br />I put mine in a protocol.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-paper-muted">
            If you&apos;re hiring AI engineers in 2026, you probably use AI
            assistants. Why not let your assistant interview my CV directly —
            structured, grounded, citation-friendly — instead of copy-pasting my
            résumé into a prompt?
          </p>
          <p className="mt-4 max-w-3xl text-paper-muted">
            This is a working{" "}
            <a
              href="https://modelcontextprotocol.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-signal underline-offset-4 hover:underline"
            >
              Model Context Protocol
            </a>{" "}
            server. Six tools, two resources. Point your MCP-compatible agent
            (Claude Desktop, Cursor, Cline, etc.) at it and ask questions.
          </p>
        </header>

        {/* Tools */}
        <section className="mt-14">
          <div className="flex items-center gap-2">
            <Bot className="h-4 w-4 text-signal" />
            <h2 className="display-3">Tools exposed</h2>
          </div>
          <ul className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-ink-line bg-ink-line sm:grid-cols-2">
            {TOOLS.map((t) => (
              <li key={t.name} className="bg-ink-card p-5">
                <code className="font-mono text-sm text-signal">{t.name}</code>
                <p className="mt-2 text-sm leading-relaxed text-paper-muted">
                  {t.desc}
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-widest text-paper-dim">
            Plus 2 resources · <code className="text-signal">cv://summary</code>{" "}
            (plain text) · <code className="text-signal">cv://corpus</code> (full JSON)
          </p>
        </section>

        {/* Wire-up */}
        <section className="mt-16">
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-signal" />
            <h2 className="display-3">
              Wire it up in{" "}
              <span className="display-italic">two minutes.</span>
            </h2>
          </div>

          <ol className="mt-8 space-y-6">
            <Step n={1} title="Clone the repo">
              <CodeBlock>
                {`git clone https://github.com/mazhar1790/portfolio
cd portfolio/scripts/mcp-server
npm install`}
              </CodeBlock>
            </Step>

            <Step n={2} title="Smoke-test the server">
              <CodeBlock>
                {`npm test
# Should print: ◆ Response #1, #2 … listing tools and a profile JSON.`}
              </CodeBlock>
            </Step>

            <Step n={3} title="Add to Claude Desktop config">
              <p className="mb-3 text-sm text-paper-muted">
                Edit{" "}
                <code className="font-mono text-xs text-signal">
                  ~/Library/Application Support/Claude/claude_desktop_config.json
                </code>{" "}
                (macOS) or{" "}
                <code className="font-mono text-xs text-signal">
                  %APPDATA%\Claude\claude_desktop_config.json
                </code>{" "}
                (Windows):
              </p>
              <CodeBlock>{CONFIG_JSON}</CodeBlock>
              <p className="mt-3 text-sm text-paper-muted">
                Restart Claude. The <code className="text-signal">mazhar-cv</code>{" "}
                tools appear in the tools palette.
              </p>
            </Step>

            <Step n={4} title="Ask your agent">
              <CodeBlock>
                {`"Use the mazhar-cv tools to tell me about his RAG production experience and whether he's available."`}
              </CodeBlock>
            </Step>
          </ol>
        </section>

        {/* Why */}
        <section className="mt-20 grid gap-6 sm:grid-cols-3">
          <Why
            icon={CheckCircle2}
            title="Read-only"
            body="No writes anywhere. Safe to point any agent at it."
          />
          <Why
            icon={Sparkles}
            title="Zero hallucination"
            body="Tools return structured data. Agents quote chunks, not invent them."
          />
          <Why
            icon={Code2}
            title="Reusable pattern"
            body="MIT-licensed. Fork it. Adapt it. Make your own agent-native CV."
          />
        </section>

        {/* CTA */}
        <section className="mt-20 rounded-2xl border border-signal/20 bg-signal/[0.04] p-8 text-center">
          <h3 className="display-3">
            This is the kind of move I bring to{" "}
            <span className="display-italic">your team.</span>
          </h3>
          <p className="mt-3 max-w-xl mx-auto text-paper-muted">
            Recognising MCP early. Shipping a working integration in an
            afternoon. Documenting it well enough that anyone can fork it.
            That&apos;s the bar.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://github.com/mazhar1790/portfolio/tree/main/scripts/mcp-server"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <Github className="h-3.5 w-3.5 text-ink" />
              View on GitHub
            </a>
            <Link href="/for-recruiters" className="btn-secondary">
              For recruiters →
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

function Step({
  n,
  title,
  children,
}: {
  n: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <li className="rounded-2xl border border-ink-line bg-ink-card p-6">
      <div className="flex items-center gap-3">
        <span className="flex h-7 w-7 items-center justify-center rounded-full border border-signal/40 bg-signal/10 font-mono text-xs text-signal">
          {n}
        </span>
        <h3 className="font-display text-xl text-paper">{title}</h3>
      </div>
      <div className="mt-4">{children}</div>
    </li>
  );
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-lg border border-ink-line bg-ink p-4 font-mono text-xs leading-relaxed text-paper">
      <code>{children}</code>
    </pre>
  );
}

function Why({
  icon: Icon,
  title,
  body,
}: {
  icon: typeof CheckCircle2;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl border border-ink-line bg-ink-card p-6">
      <Icon className="h-5 w-5 text-signal" />
      <p className="mt-4 font-display text-lg text-paper">{title}</p>
      <p className="mt-1.5 text-sm leading-relaxed text-paper-muted">{body}</p>
    </div>
  );
}
