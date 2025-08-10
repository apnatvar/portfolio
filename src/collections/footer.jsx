import React from "react";
import Link from "next/link";
import { SiGithub, SiInstagram, SiLinkedin } from "react-icons/si";
import BottomSlab from "./bottomSlab";

export default function Footer(){
    return(
        <footer className="footer">
            <div className="website-info left-div glass-slab">
                <p className="medium-title center">A Final Message</p>
                <p className="small-long-text center">This website is also written completely by me!</p>
                <p className="small-long-text center">Tools: Next.js, JavaScript, GitHub Actions</p>
                <p className="small-long-text center">I am looking for fully remote roles and freelancing opportunities.</p>
                <p className="small-long-text center">If you are hiring, get in touch with me using the links on the right.</p>
            </div>
            <div className="contact-me right-div glass-slab">
                <p className="medium-title center">Get in touch</p>
                <p className="small-long-text center"><Link href="mailto:arawat@tcd.ie">arawat@tcd.ie</Link></p>
                <p className="small-long-text center"><Link href="tel:+918791414856">+918791414856</Link></p>
                <p className="small-long-text center"><Link href="https://www.linkedin.com/in/apnatva-singh-rawat/" target="_blank"><SiLinkedin /> LinkedIn</Link></p>
                <p className="small-long-text center"><Link href="https://github.com/apnatvar/" target="_blank"><SiGithub /> GitHub</Link></p>
                <p className="small-long-text center"><Link href="https://www.instagram.com/nattupi/" target="_blank"><SiInstagram /> Instagram</Link></p>
                <p className="small-long-text center"><Link href="/ApnatvaSinghRawatCV.pdf">Download CV</Link></p>                        
            </div>
        </footer>
    );
}