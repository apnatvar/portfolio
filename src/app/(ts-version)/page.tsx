"use client";

import FooterNote from "@/components/minimal-version/footerNote";
import Header from "@/components/minimal-version/header";
import {
  AboutList,
  EducationList,
  SkillsList,
  SocialList,
  WorkList,
} from "@/components/minimal-version/lists";
import SectionBlock from "@/components/minimal-version/sectionBlock";
import TagRow from "@/components/minimal-version/tagRow";
import { Separator } from "@/components/ui/separator";
import React from "react";

export default function Page() {
  return (
    <main className="container mx-auto px-4 py-10 md:py-14 w-full p-10">
      <article className="mx-auto w-full p-4">
        <Header />

        <TagRow />

        <Separator className="my-6" />

        <SectionBlock
          title="Work"
          subtitle="I’ve contributed across startups and boutique teams, focusing on shipping reliable features, performance tuning, and meaningful UX improvements. Below is a concise snapshot with dates."
        >
          <WorkList />
        </SectionBlock>

        <Separator className="my-6" />

        <SectionBlock
          title="Education"
          subtitle="Formal education and certifications that shaped my fundamentals in computer engineering and practical problem-solving."
        >
          <EducationList />
        </SectionBlock>

        <Separator className="my-6" />

        <SectionBlock
          title="Skills"
          subtitle="Primary tools and technologies I use repeatedly. Icons indicate the ecosystem or tool family."
        >
          <SkillsList />
        </SectionBlock>

        <Separator className="my-6" />

        <SectionBlock
          title="About Me"
          subtitle="A quick timeline-style summary of notable milestones and personal highlights relevant to my work."
          lead
        >
          <AboutList />
        </SectionBlock>

        <Separator className="my-6" />

        <SectionBlock
          title="Social Links"
          subtitle="Find me around the web. These links point to my public profiles for work, community, and learning."
        >
          <SocialList />
        </SectionBlock>

        <FooterNote />
      </article>
    </main>
  );
}
