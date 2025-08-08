import React from "react";
import Link from "next/link";

export default function Footer(){
    return(
        <footer className="footer glass-slab">
            <div className="some-info">
                <p>This website is also written completely by me!</p>
                <p>Tools: Next.js, JavaScript, GitHub Actions</p>
                <p>I am looking for fully remote roles and freelancing opportunities.</p>
                <p>If you are hiring, get in touch with me using the links on the right.</p>
            </div>
            <div className="contact-me">
                <p>Get in touch</p>
                <ul>
                    <li><Link href="/">arawat@tcd.ie</Link></li>
                    <li><Link href="/">+918791414856</Link></li>
                    <li><Link href="/">Instagram</Link></li>
                    <li><Link href="/">LinkedIn</Link></li>
                </ul>
            </div>
        </footer>
    );
}