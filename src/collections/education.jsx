import React from "react";
import Link from "next/link";
import SlideInText from "./slideInAnimation";
import SequentialFadeIn from "./sequentialFadeIn";

export default function Education(){
    return(
        <section className="education glass-slab" id="education">
            <h1 className="section-title"><SlideInText text="Education" initialX={50} /></h1>
            <div className="general-card">
                <h2 className="medium-title"><Link href="/" target="_blank">Trinity College Dublin</Link></h2>
                <h4 className="small-subtitle">Graduated October 2023</h4>
                <h3 className="medium-subtitle">Bachelors in Computer Engineering</h3>
                <SequentialFadeIn>
                <p className="small-long-text">Doloremque iure consequatur doloribus autem vel aperiam fugit eaque, id libero cumque omnis sequi obcaecati ducimus corporis pariatur consectetur ex deserunt maxime!</p>
                <p className="small-long-text">Doloremque iure consequatur doloribus autem vel aperiam fugit eaque, id libero cumque omnis sequi obcaecati ducimus corporis pariatur consectetur ex deserunt maxime!</p>
                <p className="small-long-text">Doloremque iure consequatur doloribus autem vel aperiam fugit eaque, id libero cumque omnis sequi obcaecati ducimus corporis pariatur consectetur ex deserunt maxime!</p>
                </SequentialFadeIn>
            </div>
            <div className="general-card">
                <h2 className="medium-title"><Link href="/" target="_blank">Trinity College Dublin</Link></h2>
                <h4 className="small-subtitle">Graduated October 2023</h4>
                <h3 className="medium-subtitle">Bachelors in Computer Engineering</h3>
                <SequentialFadeIn>
                <p className="small-long-text">Doloremque iure consequatur doloribus autem vel aperiam fugit eaque, id libero cumque omnis sequi obcaecati ducimus corporis pariatur consectetur ex deserunt maxime!</p>
                <p className="small-long-text">Doloremque iure consequatur doloribus autem vel aperiam fugit eaque, id libero cumque omnis sequi obcaecati ducimus corporis pariatur consectetur ex deserunt maxime!</p>
                <p className="small-long-text">Doloremque iure consequatur doloribus autem vel aperiam fugit eaque, id libero cumque omnis sequi obcaecati ducimus corporis pariatur consectetur ex deserunt maxime!</p>
                </SequentialFadeIn>
            </div>
        </section>
    );
}