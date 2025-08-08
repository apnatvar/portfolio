'use client';
import { React, useState } from 'react';
import { SlArrowLeft, SlArrowRight} from 'react-icons/sl';
import Link from 'next/link';

export default function Projects(){
    const cards=[
        <div className="ed-card" key="0">
            <p className="institute">Title 1</p>
            <p className="grad-date"><Link href="/">Project Link</Link></p>
            <p className="grad-date">Tools1, Tools2</p>
            <p className="ed-description">Short ed Description</p>
            <p className="ed-description">Short ed Description</p>
            <p className="ed-description">Short ed Description</p>
            <p className="ed-description">Short ed Description</p>
            <p className="ed-description">Short ed Description</p>
        </div>,
        <div className="ed-card" key="1">
            <p className="institute">Title 2</p>
            <p className="grad-date"><Link href="/">Project Link</Link></p>
            <p className="grad-date">Tools1, Tools2</p>
            <p className="ed-description">Short ed Description</p>
            <p className="ed-description">Short ed Description</p>
            <p className="ed-description">Short ed Description</p>
            <p className="ed-description">Short ed Description</p>
            <p className="ed-description">Short ed Description</p>
        </div>,
        <div className="ed-card" key="2">
            <p className="institute">Title 3</p>
            <p className="grad-date"><Link href="/">Project Link</Link></p>
            <p className="grad-date">Tools1, Tools2</p>
            <p className="ed-description">Short ed Description</p>
            <p className="ed-description">Short ed Description</p>
            <p className="ed-description">Short ed Description</p>
            <p className="ed-description">Short ed Description</p>
            <p className="ed-description">Short ed Description</p>
        </div>    
    ];

    const [current, setCurrent] = useState(0);
    const handlePrev = () => {
        setCurrent(prev => (prev - 1 + cards.length) % cards.length);
    };

    const handleNext = () => {
        setCurrent(prev => (prev + 1) % cards.length);
    };

    return (
        <section className="exp glass-slab" id="projects">
            <p className="ed-title">Previous Work</p>
            <div className="exp-cards">
                {cards[current]}
            </div>
            <button className="nav-button left glass-slab" onClick={handlePrev}>
            <SlArrowLeft />
            </button>
            <button className="nav-button right glass-slab" onClick={handleNext}>
            <SlArrowRight />
            </button>
        </section>
    );
}