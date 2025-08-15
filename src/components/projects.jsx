'use client';
import { React, useState } from 'react';
import Link from 'next/link';
import SlideInText from './slideInAnimation';
import SequentialFadeIn from './sequentialFadeIn';
import ScrollReveal from './verticalScrollReveal';
import HorizontalScrollOnVertical from './horizontalScroll';

export default function Projects(){
    const cards=[
        <div className="general-card glass-slab" key="0">
            <h2 className="medium-title">AI Model for Adaptive Traffic Control</h2>
            <h4 className="small-subtitle">Python, PyTorch, SUMO, MatPlotLib <Link href="/" target="_blank">- Project Link</Link></h4>
            <SequentialFadeIn>
                <p className="small-long-text">Built a Deep Reinforcement Learning agent to automate traffic lights across multiple scenarios.</p>
                <p className="small-long-text">Developed the agent using PyTorch Neural Layers to record inputs like possible direction, traffic congestion in current and next lane.</p>
                <p className="small-long-text">Used SUMO simulator with a Python connector to run train the agent and run simulations.</p>
                <p className="small-long-text">Utilised MatPlotLib to record metrics like average wait times, reward function, congestions to track success of the agent.</p>
            </SequentialFadeIn>
        </div>,
        <div className="general-card glass-slab" key="1">
            <h2 className="medium-title">Cyclistic Data Analysis</h2>
            <h4 className="small-subtitle">Python, SQL, Excel, PowerPoint, Tableau <Link href="https://github.com/apnatvar/analytics/tree/main/Cyclistic" target="_blank">- Project Link</Link></h4>
            <SequentialFadeIn>
                <p className="small-long-text">This project was built as part of my Google Data Analytics Certificate Program.</p>
                <p className="small-long-text">Consolidated multiple CSV files into an SQL database for cleaning and ETL operations.</p>
                <p className="small-long-text">Cleaned data was exported to Python for statistical analysis, Excel for basic charts, and Tableau for complex geographical representation and analysis.</p>
                <p className="small-long-text">Prepared a final PowerPoint to aggregate generated insights and convey findings on customer use and suggest improvements to the business model.</p>
            </SequentialFadeIn>
        </div>,
        <div className="general-card glass-slab" key="2">
            <h2 className="medium-title">S&P500 Dashboard</h2>
            <h4 className="small-subtitle">R, RShiny, DPLYR, RStudio, Plotly <Link href="https://github.com/apnatvar/analytics/tree/main/Shiny_Stock" target="_blank">Project Link</Link></h4>
            <SequentialFadeIn>
                <p className="small-long-text">Built a standalone platform to view stock prices and volume changes over a period. Can be expanded to use any stock and any data by changing the ticker.</p>
                <p className="small-long-text">Scrapes historical data from Yahoo Finance, can alternatively work with existing CSVs or alternate timelines and summaries.</p>
                <p className="small-long-text">Developed in RStudio and written completely in R with some add-on libraries to make scraping data easier.</p>
            </SequentialFadeIn>
        </div>,
        <div className="general-card glass-slab" key="3">
            <h2 className="medium-title">Morse Code Game</h2>
            <h4 className="small-subtitle">ARM, C, RaspberryPi, CMake, Doxygen <Link href="https://github.com/apnatvar/Microprocessor-Raspberry-Pi-Pico/tree/main/Pi%20Pico%20Coding/assign02" target="_blank">Project Link</Link></h4>
            <SequentialFadeIn>
                <p className="small-long-text">Led a team of 5 to build a Morse Code with multiple levels and taking input from a Raspberry Pi.</p>
                <p className="small-long-text">Wrote the entire ARM code to retrieve '-' and '.' based Morse Code from the button on the Raspberry Pi.</p>
                <p className="small-long-text">Collaborated with a team member to implement string matching in C using a Trie inspired data structure.</p>
                <p className="small-long-text">Produced clear and useful documentation and functional flow charts using Doxygen and managed versions using Git</p>
            </SequentialFadeIn>
        </div>,
        <div className="general-card glass-slab" key="4">
            <h2 className="medium-title">Blockchain based Emission Logger</h2>
            <h4 className="small-subtitle">Python, SQLite, Socket Programming <Link href="https://github.com/apnatvar/Computer-Networking/tree/main/Project%202" target="_blank">Project Link</Link></h4>
            <SequentialFadeIn>
                <p className="small-long-text">Developed the concept of an immutable emission logger based on blockchain technology that can be shared and validated via a P2P network.</p>
                <p className="small-long-text">Led a team of 3 individuals to develop this concept into project using Python for development, SQLite for database handling, and SHA256 for encryption. </p>
                <p className="small-long-text">Built a peer application to help new clients retrieve latest blocks and add new blocks to the decentralised blockchain. </p>
            </SequentialFadeIn>
        </div>,
        <div className="general-card glass-slab" key="4">
            <h2 className="medium-title">Hi, working on adding more</h2>
            <h4 className="small-subtitle">Placeholder<Link href="/" target="_blank">Project Link</Link></h4>
            <SequentialFadeIn>
                <p className="small-long-text">Placeholder</p>
                <p className="small-long-text">Placeholder</p>
                <p className="small-long-text">Placeholder</p>
                <p className="small-long-text">Placeholder</p>
                <p className="small-long-text">Placeholder</p>
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
        <ScrollReveal className="exp">
            <h1 className="section-title glass-slab" id="projects"><SlideInText text="Side Projects" /></h1>
            <HorizontalScrollOnVertical className="exp-cards">
                {cards.map((card, _blank) => (
                    card
                ))}
            </HorizontalScrollOnVertical>
        </ScrollReveal>
    );
}