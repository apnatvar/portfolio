import React from "react";
import Link from "next/link";
import { SiGithub, SiInstagram, SiLinkedin } from "react-icons/si";
import BottomSlab from "./bottomSlab";

export default function Footer(){
    return(
        <footer className="footer">
            <div className="website-info left-div glass-slab">
                <h2 className="medium-title center">A Final Message</h2>
                <p className="small-long-text center">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae temporibus et nobis minima aliquid inventore a facilis amet animi, corrupti, voluptates doloremque numquam ut veritatis aspernatur! Recusandae consectetur fugit accusamus.</p>
                <p className="small-long-text center">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est, reprehenderit. Similique sint ex laudantium est, eum eaque libero odio a vitae? Quia voluptas ratione natus et est similique tempore quos?</p>
                <p className="small-long-text center">Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
                <p className="small-long-text center">Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
            </div>
            <div className="contact-me right-div glass-slab">
                <h2 className="medium-title center">Get in touch</h2>
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