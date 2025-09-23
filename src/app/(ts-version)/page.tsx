"use client";

import FooterNote from "@/components/minimal-version/footerNote";
import Header from "@/components/minimal-version/header";
import {
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

        <SectionBlock title="Work">
          <WorkList />
        </SectionBlock>

        <Separator className="my-6" />

        <SectionBlock title="Education">
          <EducationList />
        </SectionBlock>

        <Separator className="my-6" />

        <SectionBlock title="Toolbox">
          <SkillsList />
        </SectionBlock>

        <Separator className="my-6" />

        <SectionBlock
          title="About Me"
          subtitle1="The three As in my name stand for Americanos, AI, and Açaí. Good at spotting bugs, excellent at fixing them. I make playlists, travel content, content for others, websites, web-apps, and whatever project that interests me."
          subtitle2="Currently building a personal backtesting app, social-media marketing automations, and providing freelance website consulting and development services."
        >
          {/* <AboutList /> */}
        </SectionBlock>

        <Separator className="my-6" />

        <SectionBlock title="Find Me">
          <SocialList />
        </SectionBlock>

        <FooterNote />
      </article>
    </main>
  );
}
