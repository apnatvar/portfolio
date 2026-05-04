"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RedirectPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/visual");
    }, 1000);
    return () => clearTimeout(timer);
  }, [router]);

  return <p>Redirecting...</p>;
}
// "use client";
// import HeroAP from "@/components/final/hero";
// import RolesScrollRevealSection from "@/components/final/hero-box";
// import SocialDiagonalGrid from "@/components/final/media";
// import MediumArticlesList from "@/components/final/medium";
// import PricingOverlapSection from "@/components/final/prices";
// import VelocityTextReveal from "@/components/final/text-fancy";
// import Stacked3DShowcase from "@/components/final/work";
// import Image from "next/image";

// export default function Page() {
//   return (
//     <>
//       <div className="overflow-hidden">
//         {/* <DrawInlineSvgOnScroll
//           svgFileName="circle-13.svg"
//           className="fixed inset-0 w-full h-dvh -z-40"
//           scrub
//         /> */}
//         <div className="relative">
//           <HeroAP />
//           <RolesScrollRevealSection />
//           <Image
//             src="/happy-cloud.svg"
//             alt="decorative"
//             width={224}
//             height={224}
//             className="pointer-events-none absolute left-0 bottom-0 scale-200 animate-pulse transition-opacity"
//           />
//         </div>
//         <div className="relative w-full py-24">
//           <VelocityTextReveal
//             sentence="I help you deploy <c>websites</c> that <f>command</f> <u><i>attention</u></i>, streamline your workflows with <c>automation</c>, and build <c>content and strategy</c> that converts <i>audience to customers.</i>"
//             className="text-4xl font-semibold tracking-tight md:text-6xl"
//           />
//           <Image
//             src="/smile.svg"
//             alt="decorative"
//             width={200}
//             height={200}
//             className="pointer-events-none absolute right-0 md:top-0 md:-translate-x-1/2 max-md:-translate-y-1/2"
//           />
//         </div>
//         <PricingOverlapSection />
//         <VelocityTextReveal
//           sentence="<i>Design and engineering</i> define the product experience. Fast,<c> reliable systems</c> capture<f> attention</f>, save time through <c> automation</c>, and turn visits into meaningful,<u>high-converting</u> interactions."
//           className="text-3xl font-semibold tracking-tight md:text-5xl py-16"
//         />
//         <Stacked3DShowcase />
//         <VelocityTextReveal
//           sentence="Every <c>word</c> shapes <i>the perception</i> around your brand.<f> Good writing</f> builds <u>trust</u> and  promotes <u>action </u>. Explore my Medium blogs covering <c>Tech</c>, <i>Software Development</i>, <u>Psychology</u>, and more."
//           className="text-3xl font-semibold tracking-tight md:text-5xl py-16"
//         />
//         <MediumArticlesList />
//         <VelocityTextReveal
//           sentence="Content defines how your <i>audience engages</i> with <f>your brand</f>. The right <c>monetisation</c> strategy turns <u>attention</u> into <f> trust</f>, and <i>audience</i> into <c>consistent customers.</c>"
//           className="text-3xl font-semibold tracking-tight md:text-5xl py-16"
//         />
//         <SocialDiagonalGrid />
//         <div className="h-dvh"></div>
//       </div>
//     </>
//   );
// }
