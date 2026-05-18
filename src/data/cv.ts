export const PERSONAL = {
  name: "Mazhar Hayat",
  title: "AI Solutions Architect",
  subtitle:
    "Enterprise LLM Systems & AI Platform Architect | Vibe Coding Advocate",
  location: "Abu Dhabi, United Arab Emirates",
  email: "Mazhar1783@outlook.com",
  phone: "+971 556 127 178",
  linkedin: "https://www.linkedin.com/in/mazharhayyat/",
  cvUrl: "/Mazhar-Hayat-AI-Architect-CV.docx",
  cvLabel: "Mazhar Hayat — AI Architect CV",
  summary: `AI Solutions Architect with 15+ years of experience building production-grade intelligent systems, specializing in LLM integration, RAG architectures, and conversational AI. Expert in deploying GPT-4, Azure OpenAI, and vector search solutions for government and enterprise environments. Proven track record architecting scalable AI systems that reduce operational costs by 40%, process 100K+ documents, and handle 15K+ daily user interactions. Deep expertise bridging cutting-edge AI capabilities with secure, enterprise-grade full-stack architecture.`,
} as const;

export const METRICS = [
  { value: 15, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "K+", label: "Documents Processed" },
  { value: 15, suffix: "K+", label: "Daily AI Queries" },
  { value: 95, suffix: "%", label: "Time Reduction (RAG)" },
  { value: 40, suffix: "%", label: "Cost Reduction" },
  { value: 500, suffix: "+", label: "Daily Users Served" },
] as const;

export type SkillIcon =
  | "Brain"
  | "Database"
  | "Layers"
  | "Cloud"
  | "Code2"
  | "MessageSquare";

export const SKILLS: Record<
  string,
  { icon: SkillIcon; items: string[]; blurb: string }
> = {
  "Generative AI & LLMs": {
    icon: "Brain",
    blurb: "Building with frontier models in production.",
    items: [
      "GPT-4 / GPT-3.5-Turbo",
      "Claude 3.5",
      "Gemini Pro",
      "Mistral",
      "Azure OpenAI",
      "Prompt Engineering",
      "Few-shot Learning",
      "Chain-of-Thought Reasoning",
      "Function Calling",
    ],
  },
  "RAG & Vector Search": {
    icon: "Database",
    blurb: "Retrieval pipelines that scale to millions of docs.",
    items: [
      "Multi-stage Retrieval",
      "Hybrid Search",
      "Re-ranking",
      "Pinecone",
      "FAISS",
      "Chroma",
      "Azure Cognitive Search",
      "Weaviate",
      "OpenAI Embeddings",
      "Sentence Transformers",
    ],
  },
  "AI Frameworks": {
    icon: "Layers",
    blurb: "Orchestrating agents, tools, and memory.",
    items: [
      "LangChain",
      "Semantic Kernel",
      "LlamaIndex",
      "Haystack",
      "Azure Bot Framework",
      "MLflow",
      "Azure ML",
    ],
  },
  "Cloud & Architecture": {
    icon: "Cloud",
    blurb: "Secure, event-driven, cloud-native platforms.",
    items: [
      "Azure OpenAI",
      "Azure Functions",
      "Azure API Management",
      "Cosmos DB",
      "Azure DevOps",
      "Docker",
      "Kubernetes",
      "Microservices",
      "Event-Driven Architecture",
    ],
  },
  "Full Stack": {
    icon: "Code2",
    blurb: "End-to-end systems from API to UI.",
    items: [
      ".NET Core 8",
      "ASP.NET Web API",
      "Angular 17",
      "React",
      "TypeScript",
      "Node.js",
      "SQL Server",
      "Redis Cache",
      "CI/CD Pipelines",
    ],
  },
  "Conversational AI & NLP": {
    icon: "MessageSquare",
    blurb: "Natural dialogue that resolves real problems.",
    items: [
      "Multi-turn Dialogue",
      "Intent Classification",
      "Entity Extraction",
      "Sentiment Analysis",
      "Document Understanding",
      "Summarization",
      "Q&A Systems",
    ],
  },
};

export interface Project {
  title: string;
  company: string;
  year: string;
  featured: boolean;
  challenge: string;
  solution: string;
  impact: string[];
  metrics: Record<string, string>;
  stack: string[];
}

export const PROJECTS: Project[] = [
  {
    title: "Enterprise RAG Document Intelligence System",
    company: "SCAD — Statistics Centre Abu Dhabi",
    year: "2025",
    featured: true,
    challenge:
      "100K+ government documents scattered across legacy systems with no unified search.",
    solution:
      "Architected end-to-end RAG pipeline using Azure OpenAI and Cognitive Search with hybrid retrieval and re-ranking.",
    impact: [
      "Reduced information retrieval time from 2–3 hours to under 10 seconds",
      "Achieved 92% accuracy on complex multi-document queries",
      "Processing 5K+ queries monthly with 87% user satisfaction",
      "Cut document research costs by 65% through automation",
    ],
    metrics: {
      time: "10s",
      accuracy: "92%",
      cost: "-65%",
      queries: "5K+/mo",
    },
    stack: [
      "GPT-4",
      "Azure Cognitive Search",
      "LangChain",
      "Pinecone",
      "Azure Functions",
      ".NET Core",
      "Angular",
    ],
  },
  {
    title: "Intelligent Conversational Analytics Platform",
    company: "SCAD — Statistics Centre Abu Dhabi",
    year: "2023 – Present",
    featured: true,
    challenge:
      "Non-technical users needed SQL database access without coding knowledge.",
    solution:
      "Built natural language to SQL query system with conversational interface and automatic error correction.",
    impact: [
      "Enabled 200+ non-technical staff to query databases using plain English",
      "Handles 15K+ queries monthly across 8 different databases",
      "Reduced analytics request backlog by 70%",
      "85% query accuracy with automatic error correction",
    ],
    metrics: {
      users: "200+",
      queries: "15K+/mo",
      backlog: "-70%",
      accuracy: "85%",
    },
    stack: [
      "GPT-4",
      "Semantic Kernel",
      "Azure OpenAI",
      ".NET Core Web API",
      "Angular",
      "SQL Server",
    ],
  },
  {
    title: "Document Processing & Vision AI Pipeline",
    company: "SCAD — Statistics Centre Abu Dhabi",
    year: "2025",
    featured: true,
    challenge:
      "Manual processing of 1000+ daily documents (PDFs, scanned images, forms).",
    solution:
      "Built intelligent document processing pipeline using GPT-4 Vision and Azure Form Recognizer.",
    impact: [
      "Automated 80% of document classification and data extraction tasks",
      "Reduced processing time from 15 minutes to 30 seconds per document",
      "94% accuracy on structured form extraction",
      "Saved 2000+ staff hours monthly",
    ],
    metrics: {
      automation: "80%",
      time: "30s",
      accuracy: "94%",
      saved: "2K+/mo hrs",
    },
    stack: [
      "GPT-4 Vision",
      "Azure Form Recognizer",
      "Azure Functions",
      "Blob Storage",
      "Cosmos DB",
    ],
  },
  {
    title: "AI Conversational Chatbot (18K+ Monthly Queries)",
    company: "SCAD — Statistics Centre Abu Dhabi",
    year: "2023",
    featured: false,
    challenge: "High-volume support queries overwhelming human agents.",
    solution:
      "Deployed conversational AI chatbot with context-aware multi-turn dialogue and intent routing.",
    impact: [
      "Handling 18K+ monthly queries with 90% first-contact resolution",
      "Cut support costs by 43%",
      "Serving 500+ users daily",
    ],
    metrics: { queries: "18K+/mo", resolution: "90%", cost: "-43%" },
    stack: [
      "Azure Bot Framework",
      "GPT-4",
      "Azure OpenAI",
      "LangChain",
      ".NET Core",
    ],
  },
];

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  location: string;
  type: string;
  highlights: string[];
  stack: string[];
}

export const EXPERIENCE: ExperienceItem[] = [
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
      "Led migration of 8 legacy monolithic applications to AI-enhanced microservices",
    ],
    stack: [
      "GPT-4",
      "Azure OpenAI",
      "LangChain",
      "Semantic Kernel",
      "Pinecone",
      ".NET Core 8",
      "Angular 17",
      "Kubernetes",
    ],
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
      "Led team of 6 developers using Agile/Scrum with 95%+ sprint completion rate",
    ],
    stack: [
      ".NET Core 5/6",
      "Angular 12-14",
      "React",
      "Docker",
      "Kubernetes",
      "Azure DevOps",
      "Redis",
      "AWS",
    ],
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
      "Architected data pipelines processing 1M+ records daily for business intelligence",
    ],
    stack: [
      ".NET Framework 4.6",
      "Angular",
      "Node.js",
      "SQL Server",
      "Social Media APIs",
      "Sentiment Analysis",
    ],
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
      "Reduced bug count by 35% through code refactoring and unit testing",
    ],
    stack: [
      ".NET Framework 4.5",
      "ASP.NET MVC",
      "AngularJS",
      "SQL Server",
      "Crystal Reports",
    ],
  },
];

export interface Certification {
  name: string;
  code: string;
  issuer: string;
  color: "cyan" | "violet" | "blue";
}

export const CERTIFICATIONS: Certification[] = [
  {
    name: "Azure AI Engineer Associate",
    code: "AI-102",
    issuer: "Microsoft",
    color: "cyan",
  },
  {
    name: "Develop Custom Copilots with AI Studio",
    code: "AI-3016",
    issuer: "Microsoft",
    color: "violet",
  },
  {
    name: "Azure Solutions Architect",
    code: "AZ-305",
    issuer: "Microsoft",
    color: "blue",
  },
];

export const DIFFERENTIATORS = [
  "Deep production experience with LLM systems at government scale",
  "Architect-level fluency across cloud, RAG, vector search, and full stack",
  "Track record of measurable impact — cost down, throughput up",
  "Bridges cutting-edge AI capabilities with enterprise security & governance",
  "Vibe-coding advocate — ships polished products fast, end-to-end",
];

export const TYPEWRITER_PHRASES = [
  "AI Solutions Architect",
  "Enterprise LLM Systems",
  "RAG & Vector Search Specialist",
  "Conversational AI Builder",
  "Vibe Coding Advocate",
];

export const ROTATING_HEADLINES = [
  "Cut document research time from 2 hours to 10 seconds.",
  "Built an AI chatbot now handling 18K+ queries a month.",
  "Made 200+ non-technical staff fluent in SQL — without SQL.",
  "Shipped a vision pipeline saving 2,000 staff hours every month.",
  "Reduced GPT-4 API costs by 38% while improving response quality.",
];

export const PRINCIPLES = [
  {
    n: "01",
    title: "Production beats prototype.",
    body: "A demo is a hypothesis. Shipped software in front of real users is the only reliable signal.",
  },
  {
    n: "02",
    title: "Architecture is a forcing function.",
    body: "Choose the system shape that makes the right thing easy and the wrong thing visible.",
  },
  {
    n: "03",
    title: "Measure or it didn't happen.",
    body: "Latency, accuracy, cost, satisfaction — define them, instrument them, then iterate on numbers.",
  },
  {
    n: "04",
    title: "AI is plumbing, not magic.",
    body: "Retrieval, evaluation, guardrails, observability — the boring layers are what make the magic work.",
  },
];

export const NOW = {
  building: "Enterprise multi-agent orchestrator on Azure OpenAI",
  reading: "Engineering AI Systems — production patterns for LLM apps",
  available: "Open to senior AI architecture roles & consulting",
};

export const CV_CONTEXT = `
You are an AI assistant for Mazhar Hayat's portfolio website. Answer questions about Mazhar professionally, accurately, and concisely. Use third-person ("Mazhar has..." or "He has..."). Be enthusiastic about his work but factual.

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

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  relation: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Mazhar architected our RAG document intelligence system from scratch — 100K+ government documents, retrievable in seconds. His ability to translate a vague business problem into a precise, production-ready AI architecture is rare. He delivered on time, measured everything, and the system has run without issues for over a year.",
    name: "Senior Director",
    role: "Digital Transformation",
    company: "Statistics Centre Abu Dhabi (SCAD)",
    relation: "Direct stakeholder",
  },
  {
    quote:
      "He built the NL-to-SQL analytics platform that changed how 200+ of our non-technical staff work. What impressed me most wasn't the technology — it was his insistence on measuring accuracy before and after every change. He doesn't ship until the numbers say it's ready.",
    name: "Head of Analytics",
    role: "Data & Analytics",
    company: "SCAD",
    relation: "Internal client",
  },
  {
    quote:
      "Mazhar led the backend architecture for Tasheel — one of the highest-traffic government service platforms in the UAE. He brought the kind of calm, systematic thinking that made a complex distributed system feel simple. His code reviews alone upskilled the entire team.",
    name: "Engineering Manager",
    role: "Platform Engineering",
    company: "MoHRE UAE",
    relation: "Direct manager",
  },
];

export interface Article {
  slug: string;
  title: string;
  summary: string;
  date: string;
  readMin: number;
  tags: string[];
  comingSoon?: boolean;
}

export const ARTICLES: Article[] = [
  {
    slug: "rag-from-prototype-to-production",
    title: "RAG from prototype to production: what nobody tells you",
    summary:
      "Chunking strategies, re-ranking, hybrid search, eval frameworks — the six decisions that separate a demo from a system that runs 24/7 in front of thousands of users.",
    date: "2025-11",
    readMin: 12,
    tags: ["RAG", "LangChain", "Azure OpenAI", "Production"],
    comingSoon: true,
  },
  {
    slug: "prompt-engineering-patterns",
    title: "Prompt engineering patterns I actually use in production",
    summary:
      "Few-shot, chain-of-thought, function calling, and system-prompt hygiene — with real examples from the systems I've shipped and the cost/quality trade-offs of each.",
    date: "2025-09",
    readMin: 9,
    tags: ["GPT-4", "Prompt Engineering", "Azure OpenAI"],
    comingSoon: true,
  },
  {
    slug: "nl-to-sql-accuracy",
    title: "Getting NL-to-SQL to 85%+ accuracy without fine-tuning",
    summary:
      "How schema injection, intent classification, execution-aware repair loops, and a good evaluation harness got our conversational analytics platform to production-grade accuracy.",
    date: "2025-07",
    readMin: 10,
    tags: ["Semantic Kernel", "SQL", "GPT-4", "NLP"],
    comingSoon: true,
  },
  {
    slug: "ai-cost-optimisation",
    title: "Cutting GPT-4 API costs 38% without hurting quality",
    summary:
      "The prompt engineering framework we built at SCAD — caching, token budgeting, model routing, and eval-driven iteration — that saved tens of thousands annually.",
    date: "2025-05",
    readMin: 7,
    tags: ["Cost Optimisation", "GPT-4", "LLMOps"],
    comingSoon: true,
  },
];
