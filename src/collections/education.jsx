import React from "react";
import Link from "next/link";
import ParallaxText from "./parallax";

export default function Education(){
    return(
        <section className="education glass-slab" id="education">
            <p className="section-title">Education</p>
            <div className="ed-card">
                <p className="medium-title"><Link href="/" target="_blank">Trinity College Dublin</Link></p>
                <p className="small-subtitle">Graduated October 2023</p>
                <p className="medium-subtitle">Bachelors in Computer Engineering</p>
                <p className="small-long-text">Doloremque iure consequatur doloribus autem vel aperiam fugit eaque, id libero cumque omnis sequi obcaecati ducimus corporis pariatur consectetur ex deserunt maxime!</p>
                <p className="small-long-text">Doloremque iure consequatur doloribus autem vel aperiam fugit eaque, id libero cumque omnis sequi obcaecati ducimus corporis pariatur consectetur ex deserunt maxime!</p>
                <p className="small-long-text">Doloremque iure consequatur doloribus autem vel aperiam fugit eaque, id libero cumque omnis sequi obcaecati ducimus corporis pariatur consectetur ex deserunt maxime!</p>
            </div>
            <div className="ed-card">
                <p className="medium-title"><Link href="/" target="_blank">St. George's College</Link></p>
                <p className="small-subtitle">Graduated March 2018</p>
                <p className="medium-subtitle">Indian School Ceritificate (ISC)</p>
                <p className="small-long-text">Doloremque iure consequatur doloribus autem vel aperiam fugit eaque, id libero cumque omnis sequi obcaecati ducimus corporis pariatur consectetur ex deserunt maxime!</p>
                <p className="small-long-text">Doloremque iure consequatur doloribus autem vel aperiam fugit eaque, id libero cumque omnis sequi obcaecati ducimus corporis pariatur consectetur ex deserunt maxime!</p>
                <p className="small-long-text">Doloremque iure consequatur doloribus autem vel aperiam fugit eaque, id libero cumque omnis sequi obcaecati ducimus corporis pariatur consectetur ex deserunt maxime!</p>
            </div>
        </section>
    );
}