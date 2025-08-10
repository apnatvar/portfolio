import React from "react";
import Link from "next/link";
import { SiGithub, SiInstagram, SiLinkedin } from "react-icons/si";
import BottomSlab from "./bottomSlab";

export default function Footer(){
    return(
        <footer className="footer">
            <div className="website-info left-div glass-slab">
                <p className="medium-title center">A Final Message</p>
                <p className="small-long-text center">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae temporibus et nobis minima aliquid inventore a facilis amet animi, corrupti, voluptates doloremque numquam ut veritatis aspernatur! Recusandae consectetur fugit accusamus.</p>
                <p className="small-long-text center">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est, reprehenderit. Similique sint ex laudantium est, eum eaque libero odio a vitae? Quia voluptas ratione natus et est similique tempore quos?</p>
                <p className="small-long-text center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio tempore a quos impedit libero voluptate, recusandae voluptatem consequatur et. Labore nostrum porro aliquid totam odit eos nihil similique quos quae!</p>
                <p className="small-long-text center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque iure consequatur doloribus autem vel aperiam fugit eaque, id libero cumque omnis sequi obcaecati ducimus corporis pariatur consectetur ex deserunt maxime!</p>
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