import React from "react";
import Link from "next/link";
import ParallaxText from "./parallax";

export default function Education(){
    return(
        <section className="education glass-slab">
            <p className="ed-title">Education</p>
            <div className="ed-card">
                <p className="institute"><Link href="/">Trinity College Dublin</Link></p>
                <p className="grad-date">Graduated October 2023</p>
                <p className="degree">Bachelors in Computer Engineering</p>
                <p className="ed-description">Short description</p>
                <p className="ed-description">Short description</p>
                <p className="ed-description">Short description</p>
            </div>
            <div className="ed-card">
                <p className="institute"><Link href="/">St. George's College</Link></p>
                <p className="grad-date">Graduated March 2018</p>
                <p className="degree">Indian School Ceritificate (ISC)</p>
                <p className="ed-description">Short Description</p>
                <p className="ed-description">Short description</p>
                <p className="ed-description">Short description</p>
            </div>
        </section>
    );
}