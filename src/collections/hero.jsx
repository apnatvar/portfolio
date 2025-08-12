import React from "react";
import ToolsCarousel from "./toolsCarousel";
import GlitchText from "./glitch";

export default function Hero(){
    return (
        <section className="glass-slab hero">
            <h1 className="hello">normal text</h1>
            <h2 className="name">Name/Intro</h2>
            <h4 className="short-hook">funny hook/If you are reading this, I am happy to have your attention</h4>
            <h3 className="showcase">Showcasing/or something <GlitchText /></h3>
            <ToolsCarousel />
        </section>
    );
}