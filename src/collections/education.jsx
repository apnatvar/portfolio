import React from "react";
import Link from "next/link";
import ParallaxText from "./parallax";

export default function Education(){
    return(
        <section className="education glass-slab" id="education">
            <p className="ed-title">Education</p>
            <div className="ed-card">
                <p className="medium-title"><Link href="/" target="_blank">Trinity College Dublin</Link></p>
                <p className="small-subtitle">Graduated October 2023</p>
                <p className="medium-subtitle">Bachelors in Computer Engineering</p>
                <p className="small-long-text">Short description</p>
                <p className="small-long-text">Short description</p>
                <p className="small-long-text">Short description</p>
            </div>
            <div className="ed-card">
                <p className="medium-title"><Link href="/" target="_blank">St. George's College</Link></p>
                <p className="small-subtitle">Graduated March 2018</p>
                <p className="medium-subtitle">Indian School Ceritificate (ISC)</p>
                <p className="small-long-text">Short Description</p>
                <p className="small-long-text">Short description</p>
                <p className="small-long-text">Short description</p>
            </div>
        </section>
    );
}