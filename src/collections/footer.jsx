import React from "react";
import Link from "next/link";

export default function Footer(){
    return(
        <footer className="footer glass-slab">
            <div className="website-info left">
                <p className="web-desc">Tools: Next.js, JavaScript, GitHub Actions</p>
                <p className="web-desc">I am looking for fully remote roles and freelancing opportunities.</p>
                <p className="web-desc">If you are hiring, get in touch with me using the links on the right.</p>
                <p className="web-desc">This website is also written completely by me!</p>
            </div>
            <div className="contact-me right">
                <p>Get in touch</p>
                <p><Link href="mailto:arawat@tcd.ie">arawat@tcd.ie</Link></p>
                <p><Link href="tel:+918791414856">+918791414856</Link></p>
                <p><Link href="/">Instagram</Link></p>
                <p><Link href="/">LinkedIn</Link></p>            
            </div>
        </footer>
    );
}