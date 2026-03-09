import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Github } from 'lucide-react';

const projects = [
  {
    title: 'HarmonySet',
    description: 'An algorithm-based tool I developed to help DJs build their playlists. Launched on Peerlist Launchpad (Top 10 ranked). Built for scale with Next.js and Supabase.',
    tags: ['Next.js', 'Supabase', 'TypeScript'],
    status: 'Live / Production',
    link: 'https://harmonyset.com',
    github: 'https://github.com/roneni/harmonic-flow',
    featured: true,
  },
  {
    title: 'Psychedelic Universe',
    description: 'An initiative started in 2013 out of a love for electronic music born in India. What began as a YouTube channel (634K subscribers, 165M views) is now expanding into a full ecosystem and community household backed by Firebase and GCP.',
    tags: ['Firebase', 'GCP', 'Gemini API'],
    status: 'Live',
    link: 'https://psychedelic-universe.com',
    github: 'https://github.com/roneni/psychedelic-universe-portal',
    featured: false,
  },
  {
    title: 'Visionary Studio',
    description: 'A creative sandbox exploring the boundaries of generative AI. Powered by the Gemini API, featuring an "Essence Transmutation" engine to analyze and replicate source images with new artistic interpretations. Sleek, tech-forward UX.',
    tags: ['React', 'Tailwind', 'Gemini API'],
    status: 'Active Development',
    link: 'https://github.com/roneni/universe-diffusion',
    github: 'https://github.com/roneni/universe-diffusion',
    featured: false,
  },
  {
    title: 'Content Creation Engine',
    description: 'A brand new, comprehensive SEO and content analysis tool. Built with Next.js, Supabase, and Drizzle ORM. Analyzes websites and outputs actionable improvements.',
    tags: ['Next.js', 'Supabase', 'Drizzle ORM'],
    status: 'In Development',
    link: 'https://github.com/roneni/Content-Creation-Management',
    github: 'https://github.com/roneni/Content-Creation-Management',
    featured: false,
  }
];

export default function Projects() {
  return (
    <section className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="font-display text-5xl md:text-6xl font-bold tracking-tight mb-12 border-b border-[var(--theme-border)] pb-4 inline-block">
          Selected Works
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
            className={`modern-card p-6 md:p-8 flex flex-col ${project.featured ? 'md:col-span-2 bg-[var(--theme-text)] text-white' : ''}`}
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-4">
                <div className={`w-2 h-2 rounded-full ${project.status.includes('Live') ? 'bg-[var(--theme-accent)] animate-pulse' : 'bg-gray-400'}`}></div>
                <span className={`text-xs font-medium uppercase tracking-wider ${project.featured ? 'text-gray-300' : 'text-gray-500'}`}>
                  {project.status}
                </span>
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-semibold mb-3 tracking-tight">
                {project.title}
              </h3>
              <p className={`text-base mb-6 font-light leading-relaxed ${project.featured ? 'text-gray-200' : 'text-gray-600'}`}>
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map(tag => (
                  <span 
                    key={tag} 
                    className={`px-3 py-1 text-xs font-medium rounded-full border ${
                      project.featured ? 'border-gray-600 text-gray-200' : 'border-gray-200 text-gray-600 bg-gray-50'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex gap-4 mt-auto">
              <a 
                href={project.link}
                className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 font-medium rounded-xl transition-all ${
                  project.featured 
                    ? 'bg-[var(--theme-accent)] text-white hover:opacity-90' 
                    : 'bg-gray-50 text-gray-900 border border-gray-200 hover:bg-gray-100'
                }`}
              >
                Live App <ArrowUpRight className="w-4 h-4" />
              </a>
              <a 
                href={project.github}
                className={`p-3 flex items-center justify-center rounded-xl transition-all ${
                  project.featured 
                    ? 'bg-gray-800 text-white hover:bg-gray-700' 
                    : 'bg-gray-50 text-gray-900 border border-gray-200 hover:bg-gray-100'
                }`}
                aria-label="GitHub Repository"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
