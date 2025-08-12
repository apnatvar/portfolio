import React from "react";
import Link from "next/link";
import ParallaxText from "./parallax";

export default function Education(){
    return(
        <section className="education glass-slab" id="education">
            <h1 className="section-title">Education</h1>
            <div className="general-card">
                <h2 className="medium-title"><Link href="/" target="_blank">Trinity College Dublin</Link></h2>
                <h4 className="small-subtitle">Graduated October 2023</h4>
                <h3 className="medium-subtitle">Bachelors in Computer Engineering</h3>
                <p className="small-long-text">Doloremque iure consequatur doloribus autem vel aperiam fugit eaque, id libero cumque omnis sequi obcaecati ducimus corporis pariatur consectetur ex deserunt maxime!</p>
                <p className="small-long-text">Doloremque iure consequatur doloribus autem vel aperiam fugit eaque, id libero cumque omnis sequi obcaecati ducimus corporis pariatur consectetur ex deserunt maxime!</p>
                <p className="small-long-text">Doloremque iure consequatur doloribus autem vel aperiam fugit eaque, id libero cumque omnis sequi obcaecati ducimus corporis pariatur consectetur ex deserunt maxime!</p>
            </div>
            <div className="general-card">
                <h2 className="medium-title"><Link href="/" target="_blank">Trinity College Dublin</Link></h2>
                <h4 className="small-subtitle">Graduated October 2023</h4>
                <h3 className="medium-subtitle">Bachelors in Computer Engineering</h3>
                <p className="small-long-text">Doloremque iure consequatur doloribus autem vel aperiam fugit eaque, id libero cumque omnis sequi obcaecati ducimus corporis pariatur consectetur ex deserunt maxime!</p>
                <p className="small-long-text">Doloremque iure consequatur doloribus autem vel aperiam fugit eaque, id libero cumque omnis sequi obcaecati ducimus corporis pariatur consectetur ex deserunt maxime!</p>
                <p className="small-long-text">Doloremque iure consequatur doloribus autem vel aperiam fugit eaque, id libero cumque omnis sequi obcaecati ducimus corporis pariatur consectetur ex deserunt maxime!</p>
            </div>
        </section>
    );
}