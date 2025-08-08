import React from "react";
import Link from "next/link";

export default function Education(){
    return(
        <section className="education glass-slab">
            <div className="college">
                <p><Link href="/">Trinity College Dublin</Link></p>
                <p>Graduated October 2023</p>
                <p>Bachelors in Computer Engineering</p>
                <p>Short description</p>
            </div>
            <div>
                <p><Link href="/">St. George's College</Link></p>
                <p>Graduated March 2018</p>
                <p>Short Description</p>
            </div>
        </section>
    );
}