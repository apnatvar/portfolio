'use client';
import { React, useState } from 'react';
import { SlArrowLeft, SlArrowRight} from 'react-icons/sl';
import Link from 'next/link';
import SlideInText from './slideInAnimation';
import SequentialFadeIn from './sequentialFadeIn';

export default function Projects(){
    const cards=[
        <div className="general-card" key="0">
            <h2 className="medium-title">Title 1</h2>
            <h4 className="small-subtitle">Summary - <Link href="/" target="_blank">Project Link</Link></h4>
            <h4 className="small-subtitle">Tools1, Tools2</h4>
            <SequentialFadeIn>
                <p className="small-long-text">Doloremque iure consequatur doloribus autem vel aperiam fugit eaque, id libero cumque omnis sequi obcaecati ducimus corporis pariatur consectetur ex deserunt maxime!</p>
                <p className="small-long-text">Doloremque iure consequatur doloribus autem vel aperiam fugit eaque, id libero cumque omnis sequi obcaecati ducimus corporis pariatur consectetur ex deserunt maxime!</p>
                <p className="small-long-text">Doloremque iure consequatur doloribus autem vel aperiam fugit eaque, id libero cumque omnis sequi obcaecati ducimus corporis pariatur consectetur ex deserunt maxime!</p>
                <p className="small-long-text">Doloremque iure consequatur doloribus autem vel aperiam fugit eaque, id libero cumque omnis sequi obcaecati ducimus corporis pariatur consectetur ex deserunt maxime!</p>
                <p className="small-long-text">Doloremque iure consequatur doloribus autem vel aperiam fugit eaque, id libero cumque omnis sequi obcaecati ducimus corporis pariatur consectetur ex deserunt maxime!</p>
            </SequentialFadeIn>
        </div>,
        <div className="general-card" key="1">
            <h2 className="medium-title">Title 2</h2>
            <h4 className="small-subtitle">Summary - <Link href="/" target="_blank">Project Link</Link></h4>
            <h4 className="small-subtitle">Tools1, Tools2</h4>
            <SequentialFadeIn>
                <p className="small-long-text">Doloremque iure consequatur doloribus autem vel aperiam fugit eaque, id libero cumque omnis sequi obcaecati ducimus corporis pariatur consectetur ex deserunt maxime!</p>
                <p className="small-long-text">Doloremque iure consequatur doloribus autem vel aperiam fugit eaque, id libero cumque omnis sequi obcaecati ducimus corporis pariatur consectetur ex deserunt maxime!</p>
                <p className="small-long-text">Doloremque iure consequatur doloribus autem vel aperiam fugit eaque, id libero cumque omnis sequi obcaecati ducimus corporis pariatur consectetur ex deserunt maxime!</p>
                <p className="small-long-text">Doloremque iure consequatur doloribus autem vel aperiam fugit eaque, id libero cumque omnis sequi obcaecati ducimus corporis pariatur consectetur ex deserunt maxime!</p>
                <p className="small-long-text">Doloremque iure consequatur doloribus autem vel aperiam fugit eaque, id libero cumque omnis sequi obcaecati ducimus corporis pariatur consectetur ex deserunt maxime!</p>
            </SequentialFadeIn>
        </div>,
        <div className="general-card" key="2">
            <h2 className="medium-title">Title 3</h2>
            <h4 className="small-subtitle">Summary - <Link href="/" target="_blank">Project Link</Link></h4>
            <h4 className="small-subtitle">Tools1, Tools2</h4>
            <SequentialFadeIn>
                <p className="small-long-text">Doloremque iure consequatur doloribus autem vel aperiam fugit eaque, id libero cumque omnis sequi obcaecati ducimus corporis pariatur consectetur ex deserunt maxime!</p>
                <p className="small-long-text">Doloremque iure consequatur doloribus autem vel aperiam fugit eaque, id libero cumque omnis sequi obcaecati ducimus corporis pariatur consectetur ex deserunt maxime!</p>
                <p className="small-long-text">Doloremque iure consequatur doloribus autem vel aperiam fugit eaque, id libero cumque omnis sequi obcaecati ducimus corporis pariatur consectetur ex deserunt maxime!</p>
                <p className="small-long-text">Doloremque iure consequatur doloribus autem vel aperiam fugit eaque, id libero cumque omnis sequi obcaecati ducimus corporis pariatur consectetur ex deserunt maxime!</p>
                <p className="small-long-text">Doloremque iure consequatur doloribus autem vel aperiam fugit eaque, id libero cumque omnis sequi obcaecati ducimus corporis pariatur consectetur ex deserunt maxime!</p>
            </SequentialFadeIn>
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
            <h1 className="section-title"><SlideInText text="Side Projects" /></h1>
            <div className="exp-cards">
                {cards[current]}
            </div>
            <button className="nav-button left glass-slab" onClick={handlePrev}>
            <SlArrowLeft aria-label="previous project"/>
            </button>
            <button className="nav-button right glass-slab" onClick={handleNext}>
            <SlArrowRight aria-label="next project"/>
            </button>
        </section>
    );
}