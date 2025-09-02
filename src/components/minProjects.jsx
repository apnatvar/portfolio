import React from "react";
import ScrollReveal from "./verticalScrollReveal";
import SequentialFadeIn from "./sequentialFadeIn";
import SlideInText from "./slideInAnimation";
import TiltCard from "./gridAnimation";
import Link from "next/link";

export default function MinProjects() {
    return (
        <>
            <ScrollReveal className="exp">
                <h1 className="section-title glass-slab" id="projects"><SlideInText text="Projects" /></h1>
            </ScrollReveal>
            <div className="smaller-cards">
                <TiltCard>
                    <SequentialFadeIn>
                    <h2 className="name">AI Model for Adaptive Traffic Control</h2>
                    <h3 className="short-hook"><Link href="https://github.com/apnatvar" target="_blank">See Code</Link></h3>
                    <p className="showcase">Python, PyTorch, SUMO, MatPlotLib</p>
                    </SequentialFadeIn>
                </TiltCard>
                <TiltCard>
                    <SequentialFadeIn>
                    <h2 className="name">Cyclistic Data Analysis</h2>
                    <h3 className="short-hook"><Link href="https://github.com/apnatvar/analytics/tree/main/Cyclistic" target="_blank">See Code</Link></h3>
                    <p className="showcase">Python, SQL, Excel, PowerPoint, Tableau</p>
                    </SequentialFadeIn>
                </TiltCard>
                <TiltCard>
                    <SequentialFadeIn>
                    <h2 className="name">S&P500 Dashboard</h2>
                    <h3 className="short-hook"><Link href="https://github.com/apnatvar/analytics/tree/main/Shiny_Stock" target="_blank">See Code</Link></h3>
                    <p className="showcase">R, RShiny, DPLYR, RStudio, Plotly</p>
                    </SequentialFadeIn>
                </TiltCard>
                <TiltCard>
                    <SequentialFadeIn>
                    <h2 className="name">Morse Code Game</h2>
                    <h3 className="short-hook"><Link href="https://github.com/apnatvar/Microprocessor-Raspberry-Pi-Pico/tree/main/Pi%20Pico%20Coding/assign02" target="_blank">See Code</Link></h3>
                    <p className="showcase">ARM, C, RaspberryPi, CMake, Doxygen</p>
                    </SequentialFadeIn>
                </TiltCard>                
                <TiltCard>
                    <SequentialFadeIn>
                    <h2 className="name">Blockchain based Emission Logger</h2>
                    <h3 className="short-hook"><Link href="https://github.com/apnatvar/Computer-Networking/tree/main/Project%202" target="_blank">See Code</Link></h3>
                    <p className="showcase">Python, SQLite, Socket Programming</p>
                    </SequentialFadeIn>
                </TiltCard>
            </div>
        </>
    )
}