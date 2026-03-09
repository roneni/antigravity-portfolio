import React from 'react';
import { motion } from 'motion/react';

export default function About() {
  return (
    <section className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="font-display text-5xl md:text-6xl font-bold tracking-tight mb-12 border-b border-[var(--theme-border)] pb-4 inline-block">
          About Me
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="md:col-span-8 text-lg md:text-xl font-light leading-relaxed space-y-6 text-gray-700"
        >
          <p>
            I focus on shipping reliable products. I'm a full-stack developer dedicated to building fast, scalable, and intelligent applications.
          </p>
          <p>
            Recently, I launched <a href="https://harmonyset.com" target="_blank" rel="noreferrer" className="text-[var(--theme-accent)] font-medium hover:underline transition-colors">HarmonySet</a> on Peerlist Launchpad and got it ranked. I'm also currently enrolled in Google's <span className="font-medium text-[var(--theme-text)]">GEAR Developer Program</span>, focusing on building AI agents that make it to production.
          </p>
          <p>
            My stack is centered around Next.js, TypeScript, and Supabase. Whether I'm wiring up the Gemini API for <span className="italic">Psychedelic Universe</span> or building out a new Content Creation Management engine with Drizzle ORM, my goal is always the same: build robust, well-designed applications and get them live.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="md:col-span-4 modern-card p-6 h-fit"
        >
          <h3 className="font-display text-xl font-semibold mb-4 border-b border-[var(--theme-border)] pb-2">Current Status</h3>
          <ul className="space-y-4 font-medium text-base text-gray-600">
            <li className="flex items-center gap-3">
              <div className="w-3 h-3 bg-[var(--theme-accent)] rounded-full animate-pulse"></div>
              Building Visionary Studio
            </li>
            <li className="flex items-center gap-3">
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
              Google GEAR Program
            </li>
            <li className="flex items-center gap-3">
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
              Scaling HarmonySet
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
