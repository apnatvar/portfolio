import React from "react";
import Link from "next/link";
import SlideInText from "./slideInAnimation";
import SequentialFadeIn from "./sequentialFadeIn";
import ScrollReveal from "./verticalScrollReveal";

export default function Education(){
    return(
        <ScrollReveal className="education" id="education">
            <h1 className="section-title glass-slab"><SlideInText text="Education" initialX={50} /></h1>
            <div className="general-card glass-slab">
                <h2 className="medium-title"><Link href="/" target="_blank">Trinity College Dublin</Link></h2>
                <h4 className="small-subtitle">Graduated October 2023</h4>
                <h3 className="medium-subtitle">Bachelors in Computer Engineering</h3>
                <SequentialFadeIn>
                <p className="small-long-text">Completed my bachelor's with a First Class Honours (1:1 UK/Ireland Grade). Got awarded an additional Bachelor of Arts as part of the tradition of the University.</p>
                <p className="small-long-text">Wrote a thesis on minimising inputs without compromising on output quality from a Deep Reinforcement Learning model in Adaptive Traffic Control context. Detailed information in the Side Projects Section.</p>
                <p className="small-long-text">Led multiple teams to scucesfully deliver software packages ranging from AR games to Blockchain based projects.</p>
                <p className="small-long-text">Trained Self-Driving models with the Formula Trinity Autonomous team and was an active member in the Trinity Hiking Society.</p>
                </SequentialFadeIn>
            </div>
            <div className="general-card glass-slab">
                <h2 className="medium-title"><Link href="/" target="_blank">St. George's College</Link></h2>
                <h4 className="small-subtitle">Graduated March 2018</h4>
                <h3 className="medium-subtitle">Indian School Certificate (ISC)</h3>
                <SequentialFadeIn>
                <p className="small-long-text">Graduated high school with a 91% aggregate in national exams (ISC), building a solid foundation in advance physics and mathematics.</p>
                <p className="small-long-text">Performed exceptionally well in Mathematics and Computer Science with an aggreate of 98% in national exams.</p>
                </SequentialFadeIn>
            </div>
        </ScrollReveal>
    );
}