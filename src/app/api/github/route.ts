export const runtime = "nodejs";
export const dynamic = "force-dynamic";
// Revalidate every 30 minutes
export const revalidate = 1800;

const GITHUB_USER = "mazhar1790";

interface GitHubEvent {
  id: string;
  type: string;
  repo: { name: string };
  created_at: string;
  payload: {
    commits?: { message: string }[];
    action?: string;
    ref_type?: string;
    ref?: string;
  };
}

export interface FeedItem {
  id: string;
  type: string;
  repo: string;
  message: string;
  date: string;
}

function summarize(event: GitHubEvent): string {
  switch (event.type) {
    case "PushEvent":
      return event.payload.commits?.[0]?.message?.split("\n")[0] ?? "Pushed commits";
    case "CreateEvent":
      return `Created ${event.payload.ref_type ?? "branch"} ${event.payload.ref ?? ""}`.trim();
    case "WatchEvent":
      return "Starred a repository";
    case "ForkEvent":
      return "Forked a repository";
    case "IssuesEvent":
      return `${event.payload.action ?? "Updated"} an issue`;
    case "PullRequestEvent":
      return `${event.payload.action ?? "Updated"} a pull request`;
    default:
      return event.type.replace("Event", "");
  }
}

export async function GET() {
  try {
    const headers: HeadersInit = {
      "User-Agent": "portfolio-site",
      Accept: "application/vnd.github.v3+json",
    };

    if (process.env.GITHUB_TOKEN) {
      headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/events/public?per_page=20`,
      { headers, next: { revalidate: 1800 } },
    );

    if (!res.ok) {
      return Response.json({ events: [], error: res.statusText }, { status: 200 });
    }

    const events: GitHubEvent[] = await res.json();
    const feed: FeedItem[] = events.slice(0, 10).map((e) => ({
      id: e.id,
      type: e.type.replace("Event", ""),
      repo: e.repo.name.replace(`${GITHUB_USER}/`, ""),
      message: summarize(e),
      date: e.created_at,
    }));

    return Response.json({ events: feed });
  } catch {
    return Response.json({ events: [] });
  }
}
