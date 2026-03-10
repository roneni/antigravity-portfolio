import React from 'react';
import { motion } from 'motion/react';
import EcosystemGraph from './EcosystemGraph';

export default function Projects() {
  return (
    <section className="py-20 relative z-10 w-full">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full flex justify-between items-end mb-8 border-b border-[var(--theme-border)] pb-4"
      >
        <h2 className="font-display text-5xl md:text-6xl font-bold tracking-tight inline-block">
          The Ecosystem
        </h2>
        <div className="text-[var(--theme-text)] opacity-60 text-sm pb-2 hidden md:block">
          Interactive Node Graph • Click projects for details
        </div>
      </motion.div>

      <div className="w-full h-[600px] md:h-[700px]">
        <EcosystemGraph />
      </div>
    </section>
  );
}
