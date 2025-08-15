import Education from "@/collections/education";
import Hero from "@/collections/hero";
import Footer from "@/collections/footer";
import SmartNavSlab from "@/collections/navSlab";
import Experience from "@/collections/experience";
import Projects from "@/collections/projects";
import ParallaxSpark from "@/collections/parallax";
import LoadingScreenWithBackgroundVideo from "@/collections/bgVideoWithLoading";

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
    </main>
  );
}
