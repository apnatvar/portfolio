'use client'
import Link from "next/link";
import React from "react";
import useSmoothScroll from "@/hooks/smoothScroll";

export default function TopSlab(){
    const handleScrollTo = useSmoothScroll();
    return(
        <section className="bottom-slab glass-slab">
            <div className="spark"></div>
            <div className="horizontal-list">
                <p className="horizontal-list-element"><Link target="_blank" href="https://www.linkedin.com/in/apnatva-singh-rawat/">LinkedIn</Link></p>
                <p className="horizontal-list-element"><Link target="_blank" href="https://github.com/apnatvar/">GitHub</Link></p>
                <p className="horizontal-list-element" onClick={() => handleScrollTo('experience', 2000)}>Experience</p>
                <p className="horizontal-list-element" onClick={() => handleScrollTo('education', 2500)}>Education</p>
                <p className="horizontal-list-element" onClick={() => handleScrollTo('projects', 3000)}>Projects</p>
            </div>
        </section>
    );
}