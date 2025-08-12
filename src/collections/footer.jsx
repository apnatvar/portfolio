import React from "react";
import Link from "next/link";
import { SiGithub, SiInstagram, SiLinkedin, SiWhatsapp } from "react-icons/si";
import SlideInText from "./slideInAnimation";
import SequentialFadeIn from "./sequentialFadeIn";

export default function Footer(){
    return(
        <footer className="footer">
            <div className="website-info left-div glass-slab">
                <h2 className="medium-title center"><SlideInText text="The Last Word" /></h2>
                <SequentialFadeIn>
                    <p className="small-long-text center">I made this website using Next.js, JavaScript, and Motion.dev. I went for a minamalistic glass-morphism "spark in the dark" theme, hope you liked it.</p>
                    <p className="small-long-text center">If you are a recruiter and want to get in touch, the links should be visible if you are reading this. I prefer to be fully remote, but I am not completely against hybrid work.</p>
                    <p className="small-long-text center">If you need helping building and deploying any interesting idea or have a technical requirement or just want to connect on Social Media, I would be happy to recieve a message.</p>
                    <p className="small-long-text center">Thank you for your time spent reading this. Writing code is a big part of my life and hopefully you were able to recognise that. Have a good day. </p>
                </SequentialFadeIn>
            </div>
            <div className="contact-me right-div glass-slab" id="social">
                <h2 className="medium-title center"><SlideInText text="Get in Touch" initialX={50} /></h2>
                <p className="small-long-text center"><Link href="mailto:arawat@tcd.ie">arawat@tcd.ie</Link></p>
                <p className="small-long-text center"><Link href="tel:+918791414856"><SiWhatsapp /> +918791414856</Link></p>
                <p className="small-long-text center"><Link href="https://www.linkedin.com/in/apnatva-singh-rawat/" target="_blank"><SiLinkedin /> LinkedIn</Link></p>
                <p className="small-long-text center"><Link href="https://github.com/apnatvar/" target="_blank"><SiGithub /> GitHub</Link></p>
                <p className="small-long-text center"><Link href="https://www.instagram.com/nattupi/" target="_blank"><SiInstagram /> Instagram</Link></p>
                <p className="small-long-text center"><Link href="/ApnatvaSinghRawatCV.pdf">Download CV</Link></p>                        
            </div>
        </footer>
    );
}