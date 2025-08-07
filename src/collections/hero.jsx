import React from "react";
import ToolsCarousel from "./toolsCarousel";
import GlitchText from "./glitch";

export default function Hero(){
    return (
        <section className="glass-slab">
            <div className="spark"></div>
            <title>Hello There!</title>
            <h2>I am Apnatva</h2>
            <h4>If you are reading this, I am happy to have your attention</h4>
            <p>This is to showcase my <GlitchText Text="hobbies" /></p>
            <ToolsCarousel />
        </section>
    );
}