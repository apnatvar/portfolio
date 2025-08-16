import Education from "@/components/education";
import Hero from "@/components/hero";
import Footer from "@/components/footer";
import SmartNavSlab from "@/components/navSlab";
import Experience from "@/components/experience";
import Projects from "@/components/projects";
import ParallaxSpark from "@/components/parallax";
import LoadingScreenWithBackgroundVideo from "@/components/bgVideoWithLoading";
import Download from "@/components/download";

export default function Home() {
  return (
    <main>
      <LoadingScreenWithBackgroundVideo />
      <SmartNavSlab />
      <Hero />
      <ParallaxSpark />
      <Experience />
      <ParallaxSpark />
      <Download />
      <ParallaxSpark />
      <Education />
      <ParallaxSpark />
      <Projects />
      <ParallaxSpark />
      <Footer />
      <ParallaxSpark />
    </main>
  );
}
