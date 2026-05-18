import type { Metadata } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { PERSONAL } from "@/data/cv";
import { ChatProvider } from "@/components/AiChat/ChatContext";
import ScrollProgress from "@/components/ScrollProgress";
import ThemeProvider from "@/components/ThemeProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument",
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mazharcv.runasp.net"),
  title: `${PERSONAL.name} — ${PERSONAL.title}`,
  description: PERSONAL.summary,
  keywords: [
    "AI Solutions Architect",
    "LLM",
    "RAG",
    "Azure OpenAI",
    "GPT-4",
    "Vector Search",
    "Conversational AI",
    "Mazhar Hayat",
    "Abu Dhabi",
  ],
  authors: [{ name: PERSONAL.name }],
  openGraph: {
    title: `${PERSONAL.name} — ${PERSONAL.title}`,
    description: PERSONAL.summary,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${PERSONAL.name} — ${PERSONAL.title}`,
    description: PERSONAL.summary,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-ink text-paper antialiased noise">
        <ScrollProgress />
        <ThemeProvider>
        <ChatProvider>{children}</ChatProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
