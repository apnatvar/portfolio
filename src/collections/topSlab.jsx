import Link from "next/link";
import React from "react";

export default function TopSlab(){
    return(
        <section className="bottom-slab glass-slab">
            <div className="spark"></div>
            <div className="horizontal-list">
                <p className="horizontal-list-element"><Link target="_blank" href="https://www.linkedin.com/in/apnatva-singh-rawat/">LinkedIn</Link></p>
                <p className="horizontal-list-element"><Link target="_blank" href="https://github.com/apnatvar/">GitHub</Link></p>
                <p className="horizontal-list-element"><Link href="/#experience">Experience</Link></p>
                <p className="horizontal-list-element"><Link href="/#education">Education</Link></p>
                <p className="horizontal-list-element"><Link href="/#project">Projects</Link></p>
            </div>
        </section>
    );
}