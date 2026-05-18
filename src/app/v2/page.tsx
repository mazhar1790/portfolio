import CommandPalette from "@/components/CommandPalette";
import V2Nav from "@/components/v2/V2Nav";
import V2Hero from "@/components/v2/V2Hero";
import V2Ticker from "@/components/v2/V2Ticker";
import V2LogoStrip from "@/components/v2/V2LogoStrip";
import V2TrustStrip from "@/components/v2/V2TrustStrip";
import V2About from "@/components/v2/V2About";
import V2Lesson from "@/components/v2/V2Lesson";
import V2Services from "@/components/v2/V2Services";
import V2Portfolio from "@/components/v2/V2Portfolio";
import V2Pipelines from "@/components/v2/V2Pipelines";
import V2Skills from "@/components/v2/V2Skills";
import V2Experience from "@/components/v2/V2Experience";
import V2Certifications from "@/components/v2/V2Certifications";
import V2RagSection from "@/components/v2/V2RagSection";
import V2McpStrip from "@/components/v2/V2McpStrip";
import V2Testimonials from "@/components/v2/V2Testimonials";
import V2Writing from "@/components/v2/V2Writing";
import V2EmailSignup from "@/components/v2/V2EmailSignup";
import V2Contact from "@/components/v2/V2Contact";
import V2Footer from "@/components/v2/V2Footer";
import V2MobileCta from "@/components/v2/V2MobileCta";

export default function V2Home() {
  return (
    <>
      <CommandPalette />
      <V2Nav />
      <main>
        <V2Hero />
        <V2Ticker />
        <V2LogoStrip />
        <V2TrustStrip />
        <V2About />
        <V2Lesson
          number="Lesson · 01"
          text="A demo is a hypothesis. Production is the only evidence."
        />
        <V2Services />
        <V2Portfolio />
        <V2Lesson
          number="Lesson · 02"
          text="The bottleneck is never the model — it's chunking, retrieval, and prompts."
        />
        <V2Pipelines />
        <V2Skills />
        <V2Experience />
        <V2Certifications />
        <V2RagSection />
        <V2McpStrip />
        <V2Lesson
          number="Lesson · 03"
          text="Measure or it didn't happen. Latency, accuracy, cost — define them first."
        />
        <V2Testimonials />
        <V2Writing />
        <V2EmailSignup />
        <V2Contact />
      </main>
      <V2Footer />
      <V2MobileCta />
    </>
  );
}
