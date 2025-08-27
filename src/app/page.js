import Hero from "@/components/hero";
import Footer from "@/components/footer";
import SmartNavSlab from "@/components/navSlab";
import Education from "@/components/education";
import ParallaxSpark from "@/components/parallax";
import LoadingScreenWithBackgroundVideo from "@/components/bgVideoWithLoading";
import Download from "@/components/download";
import MinExperience from "@/components/minExperience";
import MinProjects from "@/components/minProjects";
export default function Home() {
  return (
    <main>
      <LoadingScreenWithBackgroundVideo />
      <SmartNavSlab />
      <Hero />
      <ParallaxSpark />
      <MinExperience />
      {/* <Experience /> */}
      <ParallaxSpark />
      <Download />
      <ParallaxSpark />
      <Education />
      <ParallaxSpark />
      <MinProjects />
      {/* <Projects /> */}
      <ParallaxSpark />
      <Footer />
      <ParallaxSpark />
    </main>
  );
}
