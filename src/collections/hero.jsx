import React from "react";
import ToolsCarousel from "./toolsCarousel";
import GlitchText from "./glitch";

export default function Hero(){
    return (
        <section className="glass-slab hero">
            <p className="hello">Hello There!</p>
            <p className="name">I am Apnatva</p>
            <p className="short-hook">If you are reading this, I am happy to have your attention</p>
            <p className="showcase">This is to showcase my <GlitchText /></p>
            <ToolsCarousel />
        </section>
    );
}