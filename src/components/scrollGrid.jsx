"use client";
import { motion } from "motion/react";

const items = [
  "Personal Portfolio Websites",
  "Business Websites",
  "Content Management System",
  "Hosting",
  "Data Analysis and Visualisation",
  "AI Integration",
  "Shopify Store Setup",
  "DevOps",
  "Full Stack Development",
  "Python Automations and Applications",
  "Excel Automations",
  "API Development",
  "Automated Quality Analysis",
  "Search Engine Optimisation",
  "Social Media Automation"
];

export default function ScrollGrid() {
  return (
    <div className="work-grid">
      {items.sort(() => Math.random() - 0.5).map((text, idx) => (
        <motion.p
          key={idx}
          initial={{ opacity: 0, y: -40, x: 100 }}
          whileInView={{ opacity: 1, y: 0, x: 0}}
          exit={{ opacity: 0, y: 90, x: -100 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.8 }}
          className="short-hook glass-slab mini"
        >
          {text}
        </motion.p>
      ))}
    </div>
  );
}
