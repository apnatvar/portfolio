import Download from "@/collections/download";
import Education from "@/collections/education";
import Hero from "@/collections/hero";
import BackgroundVideo from "@/collections/backgroundVideo";
import Footer from "@/collections/footer";
import ToolsCarousel from "@/collections/toolsCarousel";

export default function Home() {
  return (
    <main>
      <BackgroundVideo />
      <Hero />
      <ToolsCarousel />
      <Education />
      <Download />
      <Footer />
    </main>
  );
}
