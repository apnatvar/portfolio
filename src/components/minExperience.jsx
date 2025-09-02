import React from "react";
import ScrollReveal from "./verticalScrollReveal";
import SlideInText from "./slideInAnimation";
import TiltCard from "./gridAnimation";
import SequentialFadeIn from "./sequentialFadeIn";
import Link from "next/link";

export default function MinExperience() {
    return (
        <>
            <ScrollReveal className="exp">
                <h1 className="glass-slab section-title" id="experience"><SlideInText text="Professional Work" /></h1>
            </ScrollReveal>
            <div className="smaller-cards">
                <TiltCard>
                    <SequentialFadeIn>
                    <h2 className="name">Content and Branding</h2>
                    <h3 className="short-hook">June 2025 - Current</h3>
                    <p className="showcase">Python, n8n, Excel, Powerpoint</p>
                    </SequentialFadeIn>
                </TiltCard>
                <TiltCard>
                    <SequentialFadeIn>
                    <h2 className="name">Full-Stack Developer</h2>
                    <h3 className="short-hook">March 2025 - Aug 2025</h3>
                    <p className="showcase">Next.js, PayloadCMS, Supabase, PostgreSQL, Git</p>
                    </SequentialFadeIn>
                </TiltCard>
                <TiltCard>
                    <SequentialFadeIn>
                    <h2 className="name">Python Developer</h2>
                    <h3 className="short-hook">September 2024 - April 2025</h3>
                    <p className="showcase">Python, Pandas, Excel, Tkinter</p>
                    </SequentialFadeIn>
                </TiltCard>
                <TiltCard>
                    <SequentialFadeIn>
                    <h2 className="name">Junior Cloud Engineer</h2>
                    <h3 className="short-hook">May 2023 - July 2024</h3>
                    <p className="showcase">Java, Go, Kubernetes, Docker, Git</p>
                    </SequentialFadeIn>
                </TiltCard>                
                <TiltCard>
                    <SequentialFadeIn>
                    <h2 className="name">Python Developer Intern</h2>
                    <h3 className="short-hook">May 2022 - August 2022</h3>
                    <p className="showcase">Python, Selenium, (MS)SQL</p>
                    </SequentialFadeIn>
                </TiltCard>
            </div>
            <ScrollReveal>
                <div className="glass-slab">
                    <h3 className="PDF">A PDF version of my CV is available <Link href="/ApnatvaSinghRawatCV.pdf" className="download-link" download="ApnatvaSinghRawatCV.pdf">here</Link></h3>
                </div>
            </ScrollReveal>
        </>
    )
}