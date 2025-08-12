'use client'
import React from "react";
import useSmoothScroll from "@/hooks/smoothScroll";

export default function NavSlab(){
    const handleScrollTo = useSmoothScroll();

    return(
        <section className="nav-slab glass-slab" id="home">
            <div className="horizontal-list">
                {/* <p className="horizontal-list-element"><Link target="_blank" href="https://www.linkedin.com/in/apnatva-singh-rawat/">LinkedIn</Link></p> */}
                {/* <p className="horizontal-list-element"><Link target="_blank" href="https://github.com/apnatvar/">GitHub</Link></p> */}
                <p className="glass-button" onClick={() => handleScrollTo('home', 2000)}>Home</p>
                <p className="glass-button" onClick={() => handleScrollTo('social', 2000)}>Connect</p>
                <p className="glass-button" onClick={() => handleScrollTo('experience', 2000)}>Experience</p>
                <p className="glass-button" onClick={() => handleScrollTo('education', 2500)}>Education</p>
                <p className="glass-button" onClick={() => handleScrollTo('projects', 3000)}>Projects</p>
            </div>
        </section>
    );
}