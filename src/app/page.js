import Download from "@/collections/download";
import Education from "@/collections/education";
import Hero from "@/collections/hero";
import BackgroundVideo from "@/collections/backgroundVideo";
import Footer from "@/collections/footer";
import TopSlab from "@/collections/topSlab";
import Experience from "@/collections/experience";
import Projects from "@/collections/projects";

export default function Home() {
  return (
    <main>
      <BackgroundVideo />
      <TopSlab />
      <Hero />
      <Experience />
      <Download />
      <Education />
      <Projects />
      <Footer />
    </main>
  );
}
