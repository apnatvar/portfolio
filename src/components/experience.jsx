'use client';
import { React, useState } from 'react';
import SlideInText from './slideInAnimation';
import SequentialFadeIn from './sequentialFadeIn';
import Download from './download';
import ScrollReveal from './verticalScrollReveal';
import HorizontalScrollOnVertical from './horizontalScroll';

export default function Experience(){
    const cards=[
        <div className="general-card glass-slab" key="0"> 
            <h2 className="medium-title">Full-Stack Developer</h2>
            <h4 className="small-subtitle">March 2025 - Current</h4>
            <h3 className="medium-subtitle">Photography Studio</h3>
            <h4 className="small-subtitle">Next.js, JavaScript, TypeScript, PayloadCMS, PostgreSQL, Supabase, Vercel, Git</h4>
            <SequentialFadeIn>
                <p className="small-long-text">Architected a full-stack Next.js(React) app using JavaScript(JSX) and TypeScript to build dynamic webpages with PayloadCMS to enable quick SEO changes enabled via an ORM(PostgreSQL) storing data in an S3 Bucket.</p>
                <p className="small-long-text">Managed versions via Git(Hub) and deployed on Vercel enabling SSR, Static Pages, and Dynamic Page Creation. Optimised media storage and ORM via Supabase to minimise loading times and improve SEO.</p>
            </SequentialFadeIn>
        </div>,
        <div className="general-card glass-slab" key="1">
            <h2 className="medium-title">Python Developer</h2>
            <h4 className="small-subtitle">November 2024 - April 2025</h4>
            <h3 className="medium-subtitle">Finance Company</h3>
            <h4 className="small-subtitle">Python, Pandas, Excel, Git</h4>
            <SequentialFadeIn>
                <p className="small-long-text">Developed a Python-based Windows standalone application to automate consolidation of financial data with over $10M in yearly transactions, utilising Pandas for data manipulation and Tkinter for generating a GUI.</p>
                <p className="small-long-text">Reduced processing time from 5 days to ~17 minutes in consolidating Excel data from 34 sites, and generating 11 reports to aid auditors in analysing and providing valuable insights.</p>
                <p className="small-long-text"></p>
            </SequentialFadeIn>
        </div>,
        <div className="general-card glass-slab" key="2">
            <h2 className="medium-title">Junior Cloud Engineer</h2>
            <h4 className="small-subtitle">May 2023 - July 2024</h4>
            <h3 className="medium-subtitle">Avaya International</h3>
            <h4 className="small-subtitle">GO, Java, Docker, Kubernetes, Azure, Kafka, Loki, Prometheus, Grafana, Jenkins, Git</h4>
            <SequentialFadeIn>
                <p className="small-long-text">Maintained a multi-tenanted Kubernetes-based web application with Docker and Spring Boot, containerised micro-services deployed on Azure Cloud, requiring 99.9% uptime across multiple regions.</p>
                <p className="small-long-text">Developed and maintained 16 real-time Go and Java(Maven) based micro-services integrated with Apache Kafka and NATS while utilising Git(Bitbucket) and Helm for version management and deployment.</p>
                <p className="small-long-text">Led development of 2 new full-stack features utilising JIRA to track progress and assign work.</p>
                <p className="small-long-text">Upgraded Jenkins CI/CD pipelines for automated QA testing and deployment of services to test environments.</p>
            </SequentialFadeIn>
        </div>,
        <div className="general-card glass-slab" key="3">
            <h2 className="medium-title">Python Developer Intern</h2>
            <h4 className="small-subtitle">May 2022 - August 2022</h4>
            <h3 className="medium-subtitle">Mount Technics Consultancy</h3>
            <h4 className="small-subtitle">Python, (MS)SQL, Selenium, REST APIs</h4>
            <SequentialFadeIn>
                <p className="small-long-text">Engineered an automated data pipeline using Python and Selenium to retrieve information via web scraping and REST APIs, removing the need for manual intervention by 95%.</p>
                <p className="small-long-text">Developed a script to scrape and process JSON data in multiple languages from Twitter, Google News, and Facebook, cleaning and compiling it into an (MS)SQL database for sentiment analysis in ~2 minutes.</p>
                <p className="small-long-text">Collaborated 1:1 with a senior manager to meet weekly targets, ensuring high-quality deliverables and fulfilling 100% of the project requirements earlier than expected.</p>
            </SequentialFadeIn>
        </div>,  
        // <div className="general-card glass-slab" key="4">
        //     <h2 className="medium-title">Woops</h2>
        //     <h4 className="small-subtitle">If you are reading this, I am still adding more projects</h4>
        //     <h3 className="medium-subtitle">Come back later for more</h3>
        //     <h4 className="small-subtitle">Placeholder</h4>
        //     <SequentialFadeIn>
        //         <p className="small-long-text">Placeholder</p>
        //         <p className="small-long-text">Placeholder</p>
        //         <p className="small-long-text">Placeholder</p>
        //         <p className="small-long-text">Placeholder</p>
        //     </SequentialFadeIn>
        // </div>    
    ];

    return (
        <>
            <ScrollReveal className="exp">
                <h1 className="section-title glass-slab" id="experience"><SlideInText text="Previous Work" /></h1>
            </ScrollReveal>

            <HorizontalScrollOnVertical className="general-cards" length={cards.length}>
                {cards.map((card, _blank) => (
                    card
                ))}
            </HorizontalScrollOnVertical>
        </>
    );
}