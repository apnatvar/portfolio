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
    distort={15.0}
    paused={false}
    offset={{ x: 0, y: 0 }}
    hoverDampness={0.25}
    rayCount={40}
    mixBlendMode="lighten"
    colors={['#ff0101ff', '#000', '#000']}
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
