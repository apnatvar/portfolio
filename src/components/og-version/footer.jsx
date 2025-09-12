import React from "react";
import Link from "next/link";
import { SiGithub, SiInstagram, SiLinkedin, SiWhatsapp } from "react-icons/si";
import SlideInText from "./slideInAnimation";
import SequentialFadeIn from "./sequentialFadeIn";
import ScrollReveal from "./verticalScrollReveal";

export default function Footer(){
    return(
        <ScrollReveal >
            <div className="glass-slab website-info">
                <h2 className="medium-title center"><SlideInText text="The Last Word" /></h2>
                <SequentialFadeIn>
                    <p className="short-hook">I made this website using Next.js, JavaScript, and Motion.dev. I went for a minamalistic glass-morphism "spark in the dark" theme. There some eye-candy animations and some subtle background ones.</p>
                    <p className="short-hook">If you are a recruiter and want to get in touch, I am avaialble on various Socials and directly.</p>
                    <p className="short-hook">If you need helping building and deploying interesting ideas or need some contract work done, I would love to have a chat.</p>
                    <p className="small-long-text center">Thank you for your time spent reading this. Have a wonderful day.</p>
                </SequentialFadeIn>
            </div>
            <div className="glass-slab contact-me" id="social">
                <h2 className="medium-title center"><SlideInText text="Get in Touch" initialX={50} /></h2>
                <p className="small-long-text center"><Link href="mailto:arawat@tcd.ie">arawat@tcd.ie</Link></p>
                <p className="small-long-text center"><Link href="tel:+918791414856"><SiWhatsapp /> +918791414856</Link></p>
                <p className="small-long-text center"><Link href="https://www.linkedin.com/in/apnatva-singh-rawat/" target="_blank"><SiLinkedin /> LinkedIn</Link></p>
                <p className="small-long-text center"><Link href="https://github.com/apnatvar/" target="_blank"><SiGithub /> GitHub</Link></p>
                <p className="small-long-text center"><Link href="https://www.instagram.com/nattupi/" target="_blank"><SiInstagram /> Instagram</Link></p>
                <p className="small-long-text center"><Link href="/ApnatvaSinghRawatCV.pdf" download="ApnatvaSinghRawatCV.pdf">Download CV</Link></p>                        
            </div>
        </ScrollReveal>
    );
}