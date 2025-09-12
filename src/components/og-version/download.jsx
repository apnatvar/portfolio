import React from "react";
import SlideInText from "./slideInAnimation";
import ScrollReveal from "./verticalScrollReveal";
import ScrollGrid from "./scrollGrid";

export default function Download() {
    return (
        <>
        <ScrollReveal>
            <h1 className="section-title glass-slab" id="Summary"><SlideInText text="Summary" initialX={50}/></h1>
            <div className="glass-slab">
                <h3 className="medium-title center work-grid-title">What I can help you with</h3>
                <h4 className="short-hook center">
                    Tech is constantly evolving and it is hard for even developers to keep track of the best tools currently available.
                    I keep tabs on the tech world so you can focus on what matters most, your ideas. 
                </h4>
                <h4 className="small-long-text center">
                    I can help you formulate technical requirements and offer tailored solutions to minimise costs and maximise output.
                </h4>
                <h4 className="small-long-text center">
                    Below is a list of various ways I can help you out.
                </h4>
            </div>
        </ScrollReveal>
        <ScrollGrid />
        </>
    );
}