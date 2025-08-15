import Education from "@/components/education";
import Hero from "@/components/hero";
import Footer from "@/components/footer";
import SmartNavSlab from "@/components/navSlab";
import Experience from "@/components/experience";
import Projects from "@/components/projects";
import ParallaxSpark from "@/components/parallax";
import LoadingScreenWithBackgroundVideo from "@/components/bgVideoWithLoading";

export default function Home() {
  return (
    <main>
      <LoadingScreenWithBackgroundVideo />
      <SmartNavSlab />
      <Hero />
      <ParallaxSpark />
      <Experience />
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
