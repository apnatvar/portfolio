'use client'
import Link from "next/link";
import React from "react";
import useSmoothScroll from "@/hooks/smoothScroll";

export default function BottomSlab(){
    const handleScrollTo = useSmoothScroll();
    return(
        <section className="bottom-slab glass-slab">
            <div className="horizontal-list">
                <p className="horizontal-list-element" onClick={() => handleScrollTo('home', 4000)}>Home</p>
                <p className="horizontal-list-element" onClick={() => handleScrollTo('experience', 3000)}>Experience</p>
                <p className="horizontal-list-element" onClick={() => handleScrollTo('education', 2500)}>Education</p>
                <p className="horizontal-list-element" onClick={() => handleScrollTo('projects', 2000)}>Projects</p>
            </div>
        </section>
    );
}