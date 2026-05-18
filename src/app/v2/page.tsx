import V2Nav from "@/components/v2/V2Nav";
import V2Hero from "@/components/v2/V2Hero";
import V2LogoStrip from "@/components/v2/V2LogoStrip";
import V2Services from "@/components/v2/V2Services";
import V2Portfolio from "@/components/v2/V2Portfolio";
import V2About from "@/components/v2/V2About";
import V2Contact from "@/components/v2/V2Contact";
import V2Footer from "@/components/v2/V2Footer";

export default function V2Home() {
  return (
    <>
      <V2Nav />
      <main>
        <V2Hero />
        <V2LogoStrip />
        <V2Services />
        <V2Portfolio />
        <V2About />
        <V2Contact />
      </main>
      <V2Footer />
    </>
  );
}
