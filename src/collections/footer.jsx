import React from "react";
import Link from "next/link";

export default function Footer(){
    return(
        <footer className="footer glass-slab">
            <div className="website-info left glass-slab">
                <p className="institute">A Final Message</p>
                <p className="web-desc ed-description">This website is also written completely by me!</p>
                <p className="web-desc ed-description">Tools: Next.js, JavaScript, GitHub Actions</p>
                <p className="web-desc ed-description">I am looking for fully remote roles and freelancing opportunities.</p>
                <p className="web-desc ed-description">If you are hiring, get in touch with me using the links on the right.</p>
            </div>
            <div className="contact-me right glass-slab">
                <p className="institute">Get in touch</p>
                <p className="ed-description centre"><Link href="mailto:arawat@tcd.ie">arawat@tcd.ie</Link></p>
                <p className="ed-description centre"><Link href="tel:+918791414856">+918791414856</Link></p>
                <p className="ed-description centre"><Link href="https://www.linkedin.com/in/apnatva-singh-rawat/" target="_blank">LinkedIn</Link></p>
                <p className="ed-description centre"><Link href="https://github.com/apnatvar/" target="_blank">GitHub</Link></p>
                <p className="ed-description centre"><Link href="https://www.instagram.com/nattupi/" target="_blank">instagram</Link></p>
                <p className="ed-description centre"><Link href="/ApnatvaSinghRawatCV.pdf">Download CV</Link></p>                        
            </div>
        </footer>
    );
}