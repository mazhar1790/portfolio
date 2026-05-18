import About from "@/components/About";
import Certifications from "@/components/Certifications";
import CommandPalette from "@/components/CommandPalette";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Lesson from "@/components/Lesson";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import RagSection from "@/components/RagSection";
import Skills from "@/components/Skills";
import Testimonials from "@/components/Testimonials";
import Ticker from "@/components/Ticker";
import TrustStrip from "@/components/TrustStrip";
import Writing from "@/components/Writing";

export default function Home() {
  return (
    <>
      <CommandPalette />
      <Navbar />
      <main>
        <Hero />
        <Ticker />
        <TrustStrip />
        <About />
        <Lesson
          number="Lesson · 01"
          text="A demo is a hypothesis. Production is the only evidence."
        />
        <Projects />
        <Lesson
          number="Lesson · 02"
          text="The bottleneck is never the model — it's chunking, retrieval, and prompts."
        />
        <Skills />
        <Experience />
        <Certifications />
        <RagSection />
        <Lesson
          number="Lesson · 03"
          text="Measure or it didn't happen. Latency, accuracy, cost — define them first."
        />
        <Testimonials />
        <Writing />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
