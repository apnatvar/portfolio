import ProfileSplitSection from "@/components/about";
import CollegeSplitSection from "@/components/education";
import { MorphingNav } from "@/components/navbar";
import InfinitePinnedWords from "@/components/services";
import SkillsExplosionSection from "@/components/skills";

export default function CreativeAbout() {
  return (
    <div className="max-w-[1400px] mx-auto">
      <MorphingNav />
      <div className="h-24" />
      <ProfileSplitSection />
      <CollegeSplitSection />
      <SkillsExplosionSection />
      <InfinitePinnedWords />
    </div>
  );
}
