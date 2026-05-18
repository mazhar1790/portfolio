import About from "@/components/About";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Testimonials from "@/components/Testimonials";
import Ticker from "@/components/Ticker";
import Writing from "@/components/Writing";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Ticker />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Certifications />
        <Testimonials />
        <Writing />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
