import About from "@/components/About";
import Certifications from "@/components/Certifications";
import CommandPalette from "@/components/CommandPalette";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import RagSection from "@/components/RagSection";
import Skills from "@/components/Skills";
import Testimonials from "@/components/Testimonials";
import Ticker from "@/components/Ticker";
import Writing from "@/components/Writing";

export default function Home() {
  return (
    <>
      <CommandPalette />
      <Navbar />
      <main>
        <Hero />
        <Ticker />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Certifications />
        <RagSection />
        <Testimonials />
        <Writing />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
