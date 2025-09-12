"use client";
import { motion } from "motion/react";

const items = [
  "Personal Portfolio Websites",
  "Content Management System",
  "Hosting",
  "Data Analysis",
  "Data Visualisation",
  "AI Integration",
  "Shopify Store Setup",
  "DevOps",
  "Full Stack Development",
  "Python Automations",
  "n8n Automations",
  "Excel Automations",
  "API Development",
  "Search Engine Optimisation",
  "Social Media Automations",
  "Generative Engine Optimisation"
];

export default function ScrollGrid() {
  return (
    <div className="work-grid">
      {items.sort(() => Math.random() - 0.5).map((text, idx) => (
        <motion.p
          key={idx}
          initial={{ opacity: 0, y: -40, x: -60 }}
          whileInView={{ opacity: 1, y: 0, x: 0}}
          exit={{ opacity: 0, y: 40, x: 60 }}
          transition={{ duration: 2, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.8 }}
          className="short-hook glass-slab mini"
        >
          {text}
        </motion.p>
      ))}
    </div>
  );
}
