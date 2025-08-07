import React from "react";
import { SiPython, SiDocker } from 'react-icons/si'

export default function ToolsCarousel(){
    return (
        <div className="tools">
            Tools and programming languages I have worked with.
            <div className="tools-carousel">
                <SiPython />
                <SiDocker />
            </div>
        </div>
    );
}