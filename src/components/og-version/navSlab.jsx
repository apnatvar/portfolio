"use client";

import * as motion from "motion/react-client";
import React, { useEffect, useRef, useState } from "react";
import useSmoothScroll from "@/hooks/smoothScroll";

function NavSlab(){
    const handleScrollTo = useSmoothScroll();
    return(
        <section className="nav-slab glass-slab">
            <div className="horizontal-list">
                <p className="glass-button" onClick={() => handleScrollTo('home', 2000)}>Home</p>
                <p className="glass-button" onClick={() => handleScrollTo('social', 2000)}>Connect</p>
                <p className="glass-button" onClick={() => handleScrollTo('experience', 2000)}>Experience</p>
                <p className="glass-button" onClick={() => handleScrollTo('education', 2500)}>Education</p>
                <p className="glass-button" onClick={() => handleScrollTo('projects', 3000)}>Projects</p>
            </div>
        </section>
    );
}


export default function SmartNavBar() {
  const heroRef = useRef(null);
  const [heroInView, setHeroInView] = useState(true);

  useEffect(() => {
    const heroElement = document.getElementById("home");
    if (heroElement) {
      heroRef.current = heroElement;

      const observer = new IntersectionObserver(
        ([entry]) => {
          setHeroInView(entry.isIntersecting);
        },
        { threshold: 0.7 } 
      );

      observer.observe(heroElement);
      return () => observer.disconnect();
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: heroInView ? 0 : 1 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <NavSlab />
    </motion.div>
  );
}
