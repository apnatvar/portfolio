import Download from "@/collections/download";
import Education from "@/collections/education";
import Hero from "@/collections/hero";
import BackgroundVideo from "@/collections/backgroundVideo";
import Footer from "@/collections/footer";
import BottomSlab from "@/collections/bottomSlab";

export default function Home() {
  return (
    <main>
      <BackgroundVideo />
      <Hero />
      <BottomSlab />
      <Education />
      <Download />
      <Footer />
    </main>
  );
}
