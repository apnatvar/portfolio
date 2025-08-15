import React from "react";
import ToolsCarousel from "./toolsCarousel";
import GlitchText from "./glitch";

export default function Hero(){
    return (
        <section className="glass-slab hero" id="home">
            <h1 className="hello">Hello. Namaste.</h1>
            <h2 className="name">I am Apnatva</h2>
            <h4 className="short-hook">I help bring your ideas to life without leaving my room.</h4>
            <h3 className="showcase">This portfolio showcases my <p className="glitch-span"><GlitchText /></p></h3>
            <ToolsCarousel />
            <h4 className="short-hook">Learning is a big part of my life. I am constantly </h4>
        </section>
    );
}