# Optional media for the hero

Drop any of these files into `public/` to light up the matching buttons on the
hero. The site detects each file at runtime via a HEAD request — no missing
buttons appear if the file isn't present.

## Voice intro

`public/intro.mp3` — recommended length **60-90 seconds**.

Suggested script:

> Hi, I'm Mazhar. I'm an AI Solutions Architect based in Abu Dhabi. For the
> past three years I've been shipping production LLM systems for government —
> RAG over 100K+ documents, natural-language SQL across 8 databases, and a
> vision pipeline that processes thousands of forms a day. Before that, 12
> years of full-stack and team leadership at MoHRE, TRG, and NETSOL. I'm
> available from June 2026 for senior AI architecture or hands-on principal
> roles. Anywhere remote, or hybrid in the UAE. Thanks for listening — there's
> a chat widget on this page if you want to dig deeper.

Free recording options:
- macOS Voice Memos, then export as M4A and convert with `ffmpeg`
- Audacity (free, desktop)
- vocaroo.com (browser, no install)

Convert to MP3 at ~96 kbps mono to keep file size <1 MB:

```bash
ffmpeg -i intro.m4a -ac 1 -b:a 96k -ar 44100 intro.mp3
```

## Demo video

`public/demo.mp4` — recommended length **30-45 seconds**.

Loom or OBS works. Walk through:
1. Home page (3 sec)
2. Click "See live RAG demo" → ask a question, show retrieved chunks (10 sec)
3. Click "Fit analyser" → paste a JD, show the report (10 sec)
4. Click "Case study" → show one project page with the diagram (5 sec)
5. End on the contact CTA

Export at 720p, then compress with:

```bash
ffmpeg -i raw.mp4 -vcodec libx264 -crf 28 -preset slow -acodec aac -b:a 96k demo.mp4
```

Aim for <8 MB final size. Add `public/demo-poster.jpg` (a screenshot) for an
instant preview frame.
