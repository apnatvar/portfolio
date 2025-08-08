import React from "react";

export default function Experience(){
    return (
        <section className="exp">
            experienceCards()
            <button className="nav-button left" onClick={handlePrev}>
            &#9664;
            </button>
            <button className="nav-button right" onClick={handleNext}>
            &#9654;
            </button>
        </section>
    );
    function experienceCards(){
        return (
            <div className="exp-cards">
                <div className="exp-card">
                    <p className="job-title">Job Title</p>
                    <p className="job-dates">Date-Date</p>
                    <p className="company">Company</p>
                    <p className="job-tools">Tools1, Tools2</p>
                    <p className="job-description">Short Job Description</p>
                    <p className="job-description">Short Job Description</p>
                    <p className="job-description">Short Job Description</p>
                    <p className="job-description">Short Job Description</p>
                    <p className="job-description">Short Job Description</p>
                </div>
            </div>
        );
    }
}