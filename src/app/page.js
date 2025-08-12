import Download from "@/collections/download";
import Education from "@/collections/education";
import Hero from "@/collections/hero";
import Footer from "@/collections/footer";
import TopSlab from "@/collections/topSlab";
import Experience from "@/collections/experience";
import Projects from "@/collections/projects";
import ParallaxSpark from "@/collections/parallax";
import BottomSlab from "@/collections/bottomSlab";
import LoadingScreenWithBackgroundVideo from "@/collections/bgVideoWithLoading";

export default function Home() {
  return (
    <main>
      <LoadingScreenWithBackgroundVideo />
      <ParallaxSpark />
      <TopSlab />
      <Hero />
      <ParallaxSpark />
      <Experience />
      <Download />
      <ParallaxSpark />
      <Education />
      <Projects />
      <ParallaxSpark />
      <Footer />
      <BottomSlab />
    </main>
  );
}
