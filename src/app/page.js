import Hero from "@/components/hero";
import Footer from "@/components/footer";
import SmartNavSlab from "@/components/navSlab";
import Education from "@/components/education";
import ParallaxSpark from "@/components/parallax";
// import LoadingScreenWithBackgroundVideo from "@/components/bgVideoWithLoading";
import Download from "@/components/download";
import MinExperience from "@/components/minExperience";
import MinProjects from "@/components/minProjects";
import PrismaticBurst from "@/components/prism";
export default function Home() {
  return (
    <main>
      {/* <LoadingScreenWithBackgroundVideo /> */}

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <PrismaticBurst
    animationType="rotate3d"
    intensity={2}
    speed={0.3}
    distort={20.0}
    paused={false}
    offset={{ x: 200, y: 100 }}
    hoverDampness={0}
    rayCount={60}
    mixBlendMode="darken"
    colors={['#ff0101ff', '#000', '#0dff00ff']}
  />
  <Hero />
  </div>

<SmartNavSlab />
      

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
