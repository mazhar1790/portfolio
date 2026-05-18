# CLAUDE.md — Mazhar Hayat Portfolio Build Instructions

> This file guides Claude Code through building Mazhar Hayat's AI-powered portfolio website.
> Read this entire file before writing any code. Follow all instructions in order.

---

## 🎯 Project Overview

Build a **stunning, production-grade personal portfolio website** for Mazhar Hayat — an AI Solutions Architect based in Abu Dhabi with 15+ years of experience. The site must feel like it was built *by* an AI expert, not just *about* one.

**Live demo target:** Deploy to Vercel. Domain: replace existing site at `mazharcv.runasp.net`

---

## 🛠️ Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | **Next.js 14 (App Router)** | SEO, performance, streaming |
| Language | **TypeScript** | Type safety throughout |
| Styling | **Tailwind CSS** | Rapid, consistent utility classes |
| Animations | **Framer Motion** | Scroll reveals, hero animations |
| AI Chat | **Anthropic SDK (`@anthropic-ai/sdk`)** | Streaming chat widget |
| Icons | **Lucide React** | Clean, consistent icon set |
| Fonts | **Google Fonts: Syne (headings) + DM Sans (body)** | Premium, distinctive pairing |
| Deployment | **Vercel** | Zero-config Next.js deploy |

### Install command
```bash
npx create-next-app@latest mazhar-portfolio --typescript --tailwind --app --src-dir
cd mazhar-portfolio
npm install framer-motion @anthropic-ai/sdk lucide-react
```

---

## 🎨 Design Direction

**Aesthetic: "Dark Intelligence"** — Premium tech executive feel.

- **Background:** Deep space black `#050810` with subtle blue-tinted dark sections `#080f1a`
- **Primary accent:** Electric cyan `#00d4ff`
- **Secondary accent:** Violet `#7c3aed`
- **Text primary:** `#f0f4ff` (near white, slightly cool)
- **Text muted:** `#6b7fa3`
- **Card backgrounds:** `#0d1526` with `1px solid rgba(0,212,255,0.12)` borders
- **Gradients:** `from-cyan-400 via-blue-500 to-violet-600` for key highlights

**Typography:**
- Headings: `Syne` — bold, geometric, futuristic
- Body: `DM Sans` — clean, highly readable
- Code/labels: `JetBrains Mono` — for tech stack badges

**Key visual details:**
- Subtle animated dot-grid background on hero (CSS only)
- Glowing cyan underlines on section headings
- Cards with hover glow effect (`box-shadow: 0 0 30px rgba(0,212,255,0.15)`)
- Animated gradient border on the AI chat widget
- Counter animations on impact metrics (use Intersection Observer)
- Smooth scroll behavior throughout

---

## 📁 File Structure

```
src/
├── app/
│   ├── layout.tsx           # Fonts, metadata, global styles
│   ├── page.tsx             # Main page (all sections)
│   └── api/
│       └── chat/
│           └── route.ts     # Anthropic streaming API route
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Skills.tsx
│   ├── Projects.tsx
│   ├── Experience.tsx
│   ├── Certifications.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   └── AiChat/
│       ├── ChatWidget.tsx   # Floating button + panel
│       ├── ChatMessages.tsx # Message list with streaming
│       └── ChatInput.tsx    # Input + send button
├── data/
│   └── cv.ts                # ALL CV data as typed constants
└── lib/
    └── utils.ts             # cn() helper, formatters
```

---

## 📊 CV Data (`src/data/cv.ts`)

Create this file first. All components import from here.

```typescript
export const PERSONAL = {
  name: "Mazhar Hayat",
  title: "AI Solutions Architect",
  subtitle: "Enterprise LLM Systems & AI Platform Architect | Vibe Coding Advocate",
  location: "Abu Dhabi, United Arab Emirates",
  email: "Mazhar1783@outlook.com",
  phone: "+971 556 127 178",
  linkedin: "https://www.linkedin.com/in/mazharhayyat/",
  summary: `AI Solutions Architect with 15+ years of experience building production-grade intelligent systems, specializing in LLM integration, RAG architectures, and conversational AI. Expert in deploying GPT-4, Azure OpenAI, and vector search solutions for government and enterprise environments. Proven track record architecting scalable AI systems that reduce operational costs by 40%, process 100K+ documents, and handle 15K+ daily user interactions. Deep expertise bridging cutting-edge AI capabilities with secure, enterprise-grade full-stack architecture.`
};

export const METRICS = [
  { value: 15, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "K+", label: "Documents Processed" },
  { value: 15, suffix: "K+", label: "Daily AI Queries" },
  { value: 95, suffix: "%", label: "Time Reduction (RAG)" },
  { value: 40, suffix: "%", label: "Cost Reduction" },
  { value: 500, suffix: "+", label: "Daily Users Served" },
];

export const SKILLS = {
  "Generative AI & LLMs": {
    icon: "Brain",
    items: ["GPT-4 / GPT-3.5-Turbo", "Claude 3.5", "Gemini Pro", "Mistral", "Azure OpenAI", "Prompt Engineering", "Few-shot Learning", "Chain-of-Thought Reasoning", "Function Calling"]
  },
  "RAG & Vector Search": {
    icon: "Database",
    items: ["Multi-stage Retrieval", "Hybrid Search", "Re-ranking", "Pinecone", "FAISS", "Chroma", "Azure Cognitive Search", "Weaviate", "OpenAI Embeddings", "Sentence Transformers"]
  },
  "AI Frameworks": {
    icon: "Layers",
    items: ["LangChain", "Semantic Kernel", "LlamaIndex", "Haystack", "Azure Bot Framework", "MLflow", "Azure ML"]
  },
  "Cloud & Architecture": {
    icon: "Cloud",
    items: ["Azure OpenAI", "Azure Functions", "Azure API Management", "Cosmos DB", "Azure DevOps", "Docker", "Kubernetes", "Microservices", "Event-Driven Architecture"]
  },
  "Full Stack": {
    icon: "Code2",
    items: [".NET Core 8", "ASP.NET Web API", "Angular 17", "React", "TypeScript", "Node.js", "SQL Server", "Redis Cache", "CI/CD Pipelines"]
  },
  "Conversational AI & NLP": {
    icon: "MessageSquare",
    items: ["Multi-turn Dialogue", "Intent Classification", "Entity Extraction", "Sentiment Analysis", "Document Understanding", "Summarization", "Q&A Systems"]
  }
};

export const PROJECTS = [
  {
    title: "Enterprise RAG Document Intelligence System",
    company: "SCAD — Statistics Centre Abu Dhabi",
    year: "2025",
    featured: true,
    challenge: "100K+ government documents scattered across legacy systems with no unified search",
    solution: "Architected end-to-end RAG pipeline using Azure OpenAI and Cognitive Search",
    impact: [
      "Reduced information retrieval time from 2–3 hours to under 10 seconds",
      "Achieved 92% accuracy on complex multi-document queries",
      "Processing 5K+ queries monthly with 87% user satisfaction",
      "Cut document research costs by 65% through automation"
    ],
    metrics: { time: "10s", accuracy: "92%", cost: "-65%", queries: "5K+/mo" },
    stack: ["GPT-4", "Azure Cognitive Search", "LangChain", "Pinecone", "Azure Functions", ".NET Core", "Angular"]
  },
  {
    title: "Intelligent Conversational Analytics Platform",
    company: "SCAD — Statistics Centre Abu Dhabi",
    year: "2023–Present",
    featured: true,
    challenge: "Non-technical users needed SQL database access without coding knowledge",
    solution: "Built natural language to SQL query system with conversational interface",
    impact: [
      "Enabled 200+ non-technical staff to query databases using plain English",
      "Handles 15K+ queries monthly across 8 different databases",
      "Reduced analytics request backlog by 70%",
      "85% query accuracy with automatic error correction"
    ],
    metrics: { users: "200+", queries: "15K+/mo", backlog: "-70%", accuracy: "85%" },
    stack: ["GPT-4", "Semantic Kernel", "Azure OpenAI", ".NET Core Web API", "Angular", "SQL Server"]
  },
  {
    title: "Document Processing & Vision AI Pipeline",
    company: "SCAD — Statistics Centre Abu Dhabi",
    year: "2025",
    featured: true,
    challenge: "Manual processing of 1000+ daily documents (PDFs, scanned images, forms)",
    solution: "Built intelligent document processing pipeline using GPT-4 Vision and Form Recognizer",
    impact: [
      "Automated 80% of document classification and data extraction tasks",
      "Reduced processing time from 15 minutes to 30 seconds per document",
      "94% accuracy on structured form extraction",
      "Saved 2000+ staff hours monthly"
    ],
    metrics: { automation: "80%", time: "30s", accuracy: "94%", hours: "2K+/mo saved" },
    stack: ["GPT-4 Vision", "Azure Form Recognizer", "Azure Functions", "Blob Storage", "Cosmos DB"]
  },
  {
    title: "AI Conversational Chatbot (18K+ Monthly Queries)",
    company: "SCAD — Statistics Centre Abu Dhabi",
    year: "2023",
    featured: false,
    challenge: "High-volume support queries overwhelming human agents",
    solution: "Deployed conversational AI chatbot with context-aware multi-turn dialogue",
    impact: [
      "Handling 18K+ monthly queries with 90% first-contact resolution",
      "Cut support costs by 43%",
      "Serving 500+ users daily"
    ],
    metrics: { queries: "18K+/mo", resolution: "90%", cost: "-43%" },
    stack: ["Azure Bot Framework", "GPT-4", "Azure OpenAI", "LangChain", ".NET Core"]
  }
];

export const EXPERIENCE = [
  {
    role: "Senior System Analyst / AI Platforms",
    company: "Statistics Centre — Abu Dhabi (SCAD)",
    period: "Nov 2022 – Present",
    location: "Abu Dhabi, UAE",
    type: "Full-time",
    highlights: [
      "Architected enterprise RAG system processing 100K+ documents using GPT-4 and Azure Cognitive Search, reducing research time by 95%",
      "Deployed conversational AI chatbot handling 18K+ monthly queries with 90% first-contact resolution, cutting support costs by 43%",
      "Built natural language SQL query interface enabling non-technical users to access 8 databases, processing 15K+ queries monthly",
      "Designed prompt engineering framework reducing GPT-4 API costs by 38% while improving response quality by 15%",
      "Led migration of 8 legacy monolithic applications to AI-enhanced microservices"
    ],
    stack: ["GPT-4", "Azure OpenAI", "LangChain", "Semantic Kernel", "Pinecone", ".NET Core 8", "Angular 17", "Kubernetes"]
  },
  {
    role: "Senior Full Stack Engineer / Team Lead",
    company: "Ministry of Human Resources & Emiratisation (MoHRE)",
    period: "July 2018 – Nov 2022",
    location: "UAE",
    type: "Full-time",
    highlights: [
      "Led development of Tasheel Systems — 50+ labor and HR services applications serving 2M+ users annually",
      "Modernized legacy codebase to microservices architecture, improving performance by 45%",
      "Designed RESTful APIs consumed by 30+ internal and external systems with OAuth 2.0",
      "Implemented Redis caching strategy reducing database load by 55%",
      "Led team of 6 developers using Agile/Scrum with 95%+ sprint completion rate"
    ],
    stack: [".NET Core 5/6", "Angular 12-14", "React", "Docker", "Kubernetes", "Azure DevOps", "Redis", "AWS"]
  },
  {
    role: "Senior Software Engineer / Technical Lead",
    company: "TRG Tech",
    period: "June 2015 – June 2018",
    location: "Lahore, Pakistan",
    type: "Full-time",
    highlights: [
      "Led cross-functional team of 8 developers (Full Stack, iOS, Android)",
      "Built real-time sentiment analysis engine processing 100K+ social media posts daily",
      "Developed social media monitoring platform integrating Twitter, Facebook, Instagram APIs",
      "Architected data pipelines processing 1M+ records daily for business intelligence"
    ],
    stack: [".NET Framework 4.6", "Angular", "Node.js", "SQL Server", "Social Media APIs", "Sentiment Analysis"]
  },
  {
    role: "Software Developer",
    company: "NETSOL Technologies",
    period: "Dec 2012 – June 2015",
    location: "Lahore, Pakistan",
    type: "Full-time",
    highlights: [
      "Maintained and enhanced large-scale financial leasing suite for international clients (FIAT, CNH Industrial)",
      "Delivered 20+ features for enterprise financial management system",
      "Reduced bug count by 35% through code refactoring and unit testing"
    ],
    stack: [".NET Framework 4.5", "ASP.NET MVC", "AngularJS", "SQL Server", "Crystal Reports"]
  }
];

export const CERTIFICATIONS = [
  {
    name: "Azure AI Engineer Associate",
    code: "AI-102",
    issuer: "Microsoft",
    color: "cyan"
  },
  {
    name: "Develop Custom Copilots with AI Studio",
    code: "AI-3016",
    issuer: "Microsoft",
    color: "violet"
  },
  {
    name: "Azure Solutions Architect",
    code: "AZ-305",
    issuer: "Microsoft",
    color: "blue"
  }
];

// Full CV text used as AI chat system prompt context
export const CV_CONTEXT = `
You are an AI assistant for Mazhar Hayat's portfolio website. Answer questions about Mazhar professionally, accurately, and concisely. Use first-person plural ("Mazhar has..." or "He has..."). Be enthusiastic about his work but factual.

ABOUT MAZHAR:
Name: Mazhar Hayat
Title: AI Solutions Architect | Enterprise LLM Systems & AI Platform Architect | Vibe Coding Advocate
Location: Abu Dhabi, UAE
Email: Mazhar1783@outlook.com
Phone: +971 556 127 178
LinkedIn: https://www.linkedin.com/in/mazharhayyat/
Experience: 15+ years

SUMMARY:
AI Solutions Architect with 15+ years building production-grade intelligent systems. Specializes in LLM integration, RAG architectures, and conversational AI. Expert in GPT-4, Azure OpenAI, and vector search for government and enterprise. Proven track record: 40% cost reduction, processing 100K+ documents, handling 15K+ daily user interactions.

KEY AI PROJECTS:
1. Enterprise RAG Document Intelligence (SCAD 2025): Processed 100K+ government documents. Retrieval time: 2-3 hours → 10 seconds. 92% accuracy. Costs cut 65%. Stack: GPT-4, LangChain, Pinecone, Azure Cognitive Search.
2. Conversational Analytics Platform (SCAD 2023-Present): Natural language to SQL. 200+ non-technical users. 15K+ monthly queries across 8 databases. 70% backlog reduction. Stack: GPT-4, Semantic Kernel, Azure OpenAI.
3. Document Processing Vision AI Pipeline (SCAD 2025): 1000+ daily docs automated. 30 seconds vs 15 minutes. 94% extraction accuracy. 2000+ staff hours saved monthly. Stack: GPT-4 Vision, Azure Form Recognizer.
4. AI Chatbot (SCAD 2023): 18K+ monthly queries. 90% first-contact resolution. 43% cost reduction.

EXPERIENCE:
- Senior System Analyst / AI Platforms @ Statistics Centre Abu Dhabi (Nov 2022 - Present)
- Senior Full Stack Engineer / Team Lead @ MoHRE UAE (July 2018 - Nov 2022)
- Senior Software Engineer / Technical Lead @ TRG Tech Pakistan (June 2015 - June 2018)
- Software Developer @ NETSOL Technologies (Dec 2012 - June 2015)

SKILLS:
- AI/ML: GPT-4, Claude 3.5, Gemini Pro, LangChain, Semantic Kernel, LlamaIndex, Haystack, MLflow
- RAG: Multi-stage retrieval, Pinecone, FAISS, Chroma, Azure Cognitive Search, Weaviate
- Cloud: Azure OpenAI, Azure Functions, Cosmos DB, Azure DevOps, Docker, Kubernetes, AWS
- Full Stack: .NET Core 8, Angular 17, React, TypeScript, Node.js, SQL Server

CERTIFICATIONS:
- Microsoft Azure AI Engineer Associate (AI-102)
- AI-3016: Develop Custom Copilots with AI Studio
- Azure Solutions Architect (AZ-305)

AVAILABILITY: Open to senior AI architecture roles, consulting engagements, and speaking opportunities in the UAE and globally.

If asked about salary, say Mazhar is open to discussing based on the role and scope.
If asked something you don't know, say you'd recommend reaching out directly via email or LinkedIn.
Keep responses under 150 words unless a detailed technical explanation is requested.
`;
```

---

## 🤖 AI Chat API Route (`src/app/api/chat/route.ts`)

```typescript
import Anthropic from "@anthropic-ai/sdk";
import { CV_CONTEXT } from "@/data/cv";

const client = new Anthropic();

export async function POST(req: Request) {
  const { messages } = await req.json();

  const stream = await client.messages.stream({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    system: CV_CONTEXT,
    messages,
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        if (
          chunk.type === "content_block_delta" &&
          chunk.delta.type === "text_delta"
        ) {
          controller.enqueue(encoder.encode(chunk.delta.text));
        }
      }
      controller.close();
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Transfer-Encoding": "chunked",
    },
  });
}
```

---

## 💬 AI Chat Widget (`src/components/AiChat/ChatWidget.tsx`)

Build a floating chat widget with these requirements:

- **Trigger:** Floating button, bottom-right corner, pulsing cyan glow animation
- **Panel:** 380px wide, 520px tall, slides up with spring animation
- **Header:** "Ask about Mazhar" + AI brain icon + close button
- **Quick chips (shown before first message):**
  - "What AI projects has he built?"
  - "Tell me about his RAG experience"
  - "Is he open to opportunities?"
  - "What's his tech stack?"
- **Messages:** User messages right-aligned (cyan bg), AI messages left-aligned (dark card)
- **Streaming:** Show a blinking cursor while streaming, then fade it out
- **Powered by badge:** Small "Powered by Claude" text at bottom of panel
- **Error handling:** Show friendly error if API call fails

```typescript
// Message type
interface Message {
  role: "user" | "assistant";
  content: string;
}
```

---

## 📄 Page Sections (build in this order)

### 1. Navbar
- Fixed top, blur backdrop, transparent → solid on scroll
- Logo: "MH" monogram in cyan
- Links: About, Projects, Experience, Contact
- CTA button: "Chat with AI" that opens chat widget

### 2. Hero Section
- Full viewport height
- Animated background: CSS dot-grid pattern that subtly pulses
- Staggered text reveal with Framer Motion
- Main headline: `"Building AI Systems That Actually Work"`
- Sub-headline: Mazhar's title with typewriter cycling effect
- Two CTAs: `"View My Work"` (primary, cyan) + `"Chat with AI"` (secondary, outlined)
- Animated metrics row below (counters animate on load): 15+ Years, 100K+ Docs, 15K+ Queries/day

### 3. About Section
- Two-column layout: text left, visual right
- Visual right: animated "skill constellation" or tech logo cloud
- Bullet points with cyan check icons for key differentiators

### 4. Skills Section
- 6 skill category cards in a grid
- Each card: icon, category name, pill badges for each skill
- Cards have hover glow effect

### 5. Featured Projects Section
- Top 3 projects as large cards with full challenge/solution/impact
- Impact metrics displayed as mini stat cards inside each project
- Tech stack shown as pill badges
- Each card has a subtle gradient border

### 6. Experience Timeline
- Vertical timeline with connecting line
- Each entry: role, company, period, highlights as bullet points
- Tech stack badges at bottom of each entry
- Alternating left/right on desktop, stacked on mobile

### 7. Certifications
- 3 certification cards with Microsoft badge styling
- Cyan/violet/blue color coding per cert

### 8. Contact Section
- Simple, bold CTA section
- Email + LinkedIn + Phone links with icons
- Background with subtle gradient

### 9. Footer
- Copyright, social links, "Built with Next.js + Claude AI"

---

## 📱 Responsiveness

- Mobile-first Tailwind classes
- Hamburger menu on mobile
- Timeline stacks vertically on mobile
- Project cards go single column on mobile
- Chat widget full-screen on mobile (< 640px)

---

## ⚙️ Environment Variables

Create `.env.local`:
```
ANTHROPIC_API_KEY=your_key_here
```

Add to `.env.example`:
```
ANTHROPIC_API_KEY=
```

---

## 🚀 Build Order for Claude Code Sessions

Run these prompts in Claude Code **one session at a time**:

**Session 1:** "Read CLAUDE.md and set up the Next.js project, install dependencies, create `src/data/cv.ts` with all the data, and build the Navbar and Hero section."

**Session 2:** "Read CLAUDE.md and build the About, Skills, and Projects sections."

**Session 3:** "Read CLAUDE.md and build the Experience Timeline, Certifications, and Contact/Footer sections."

**Session 4:** "Read CLAUDE.md and build the AI Chat widget and API route at `/api/chat`."

**Session 5:** "Polish pass — add all Framer Motion scroll animations, ensure full mobile responsiveness, fix any layout issues, and prepare for Vercel deploy."

---

## ✅ Definition of Done

- [ ] All 9 sections render correctly on desktop and mobile
- [ ] AI chat widget streams responses from Claude API
- [ ] All CV data sourced from `src/data/cv.ts` (no hardcoded strings in components)
- [ ] Metrics counters animate on scroll into view
- [ ] Framer Motion scroll reveals on all major sections
- [ ] Dark theme consistent throughout
- [ ] No TypeScript errors (`npm run build` passes)
- [ ] Deployed to Vercel with `ANTHROPIC_API_KEY` set in environment variables

---

*Generated for Mazhar Hayat | Abu Dhabi, UAE | AI Solutions Architect*
