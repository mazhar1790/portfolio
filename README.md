# Mazhar Hayat — Personal Portfolio

A premium, editorial-style personal portfolio for **Mazhar Hayat**, AI Solutions Architect, Abu Dhabi.

**Design concept: "Signal"** — true black, signal-green accent, Instrument Serif + Inter + JetBrains Mono, animated SVG architecture diagrams, streaming Claude AI chat, editorial typography.

Live target: `mazharcv.runasp.net` → deploy to Vercel.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router, `src/`) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| AI Chat | Anthropic SDK (`@anthropic-ai/sdk`) streaming |
| Analytics | Vercel Analytics + Speed Insights |
| Icons | Lucide React |
| Fonts | Instrument Serif · Inter · JetBrains Mono |

---

## Running locally

```bash
cd Portfolio

# 1 — Install
npm install

# 2 — Environment (only needed for the AI chat widget)
cp .env.example .env.local
# Edit .env.local and add:
# ANTHROPIC_API_KEY=sk-ant-...

# 3 — Dev server
npm run dev
# → http://localhost:3000
```

The site renders fully without an API key. The AI chat widget will show
"AI is not configured" until `ANTHROPIC_API_KEY` is set.

---

## Deploying to Vercel

### First time

```bash
# Push the Portfolio folder as its own repo (or subfolder of a monorepo)
git init
git add .
git commit -m "Initial portfolio"
gh repo create mazhar-portfolio --private --push --source=.
```

Then on [vercel.com](https://vercel.com):

1. **New Project** → Import the `mazhar-portfolio` repo
2. Framework: **Next.js** (auto-detected)
3. Root directory: `.` (it's already the Next.js root)
4. **Environment Variables** → add `ANTHROPIC_API_KEY`
5. **Deploy**

### Custom domain (`mazharcv.runasp.net`)

In Vercel project → **Settings → Domains** → add `mazharcv.runasp.net` →
follow the DNS instructions (CNAME `cname.vercel-dns.com`).

### Subsequent deploys

```bash
git add . && git commit -m "update" && git push
# Vercel auto-deploys on every push to main
```

---

## Updating your CV

The `.docx` is served directly from `public/Mazhar-Hayat-AI-Architect-CV.docx`.

To update:
1. Replace the file at that path
2. Commit and push — Vercel redeploys automatically

---

## All content lives in one file

`src/data/cv.ts` — edit this file and everything updates:
- All CV data (skills, projects, experience, certifications, metrics)
- AI chat system prompt (`CV_CONTEXT`)
- Articles, testimonials, principles, "Now" status

---

## Enabling the AI chat

1. Get an API key at [console.anthropic.com](https://console.anthropic.com) (free tier is enough for portfolio traffic)
2. **Locally:** add `ANTHROPIC_API_KEY=sk-ant-...` to `.env.local`
3. **Vercel:** Project → Settings → Environment Variables → add `ANTHROPIC_API_KEY`

The chat uses `claude-sonnet-4-20250514` with streaming and is limited to the last 20 messages per session.

---

## Adding your photo (when ready)

1. Save photo to `public/images/mazhar.jpg` (800×800 min, or 1200×1500 portrait)
2. Add to `cv.ts`:
   ```typescript
   photo: "/images/mazhar.jpg",
   ```
3. Use the `Avatar` component (create from `src/components/Avatar.tsx`) in Hero + About

---

## Project structure

```
src/
├── app/
│   ├── layout.tsx              # Fonts, Analytics, ChatProvider
│   ├── page.tsx                # All sections composed
│   ├── globals.css             # Tailwind + design tokens
│   ├── opengraph-image.tsx     # Auto OG image (1200×630)
│   └── api/chat/route.ts       # Anthropic streaming endpoint
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx                # AI prompt input + profile card
│   ├── Ticker.tsx              # Scrolling marquee strip
│   ├── About.tsx               # Bio + operating principles
│   ├── Projects.tsx            # Case studies + diagrams
│   ├── Skills.tsx              # Editorial stack table
│   ├── Experience.tsx          # git-log style timeline
│   ├── Certifications.tsx
│   ├── Testimonials.tsx
│   ├── Writing.tsx             # Article stubs
│   ├── Contact.tsx             # + CV download
│   ├── Footer.tsx
│   ├── Counter.tsx             # Intersection Observer counter
│   └── AiChat/
│       ├── ChatContext.tsx
│       ├── ChatWidget.tsx
│       ├── ChatMessages.tsx
│       └── ChatInput.tsx
│   └── diagrams/
│       ├── DiagramShell.tsx    # Reusable terminal chrome + node primitives
│       ├── RagDiagram.tsx      # Animated RAG pipeline SVG
│       ├── NlSqlDiagram.tsx    # Animated NL→SQL pipeline SVG
│       └── VisionDiagram.tsx   # Animated Vision AI pipeline SVG
├── data/
│   └── cv.ts                   # Single source of truth for all content
└── lib/
    └── utils.ts
public/
├── Mazhar-Hayat-AI-Architect-CV.docx   # CV download
└── (images/ — add mazhar.jpg when ready)
```

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript (no emit) |

---

© Mazhar Hayat · Abu Dhabi, UAE
