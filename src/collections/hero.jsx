import React from "react";
import ToolsCarousel from "./toolsCarousel";
import GlitchText from "./glitch";

export default function Hero(){
    return (
        <section className="glass-slab">
            <div className="spark"></div>
            <p>Hello There!</p>
            <p>I am Apnatva</p>
            <p>If you are reading this, I am happy to have your attention</p>
            <p>This is to showcase my <GlitchText /></p>
            <ToolsCarousel />
        </section>
    );
}