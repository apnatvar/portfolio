import React from "react";
import ToolsCarousel from "./toolsCarousel";
import GlitchText from "./glitch";

export default function Hero(){
    return (
        <section className="glass-slab hero">
            <p className="hello">Greeting Text!</p>
            <p className="name">Name/Intro</p>
            <p className="short-hook">funny hook/If you are reading this, I am happy to have your attention</p>
            <p className="showcase">Showcasing/or something <GlitchText /></p>
            <ToolsCarousel />
        </section>
    );
}