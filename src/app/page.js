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
      <TopSlab />
      <ParallaxSpark speed={-20} moveDuration={50} />
      <Hero />
      <Experience />
      <Download />
      <ParallaxSpark speed={-50} moveDuration={100} />
      <Education />
      <Projects />
      <Footer />
      <ParallaxSpark speed={-10} moveDuration={60} />
      <BottomSlab />
    </main>
  );
}
