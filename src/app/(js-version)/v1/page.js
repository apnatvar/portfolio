import Download from "../../../components/og-version/download";
import Education from "../../../components/og-version/education";
import Footer from "../../../components/og-version/footer";
import Hero from "../../../components/og-version/hero";
import MinProjects from "../../../components/og-version/minProjects";
import SmartNavBar from "../../../components/og-version/navSlab";
import ParallaxSpark from "../../../components/og-version/parallax";
import PrismaticBurst from "@/components/og-version/prism";

export default function HomeV1() {
  return (
    <main>
      {/* <LoadingScreenWithBackgroundVideo /> */}
      <PrismaticBurst
        animationType="hover"
        intensity={5}
        speed={1}
        hoverDampness={1}
        rayCount={10}
      />
      <Hero />
      <SmartNavBar />
      <ParallaxSpark />
      <MinProjects />
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
