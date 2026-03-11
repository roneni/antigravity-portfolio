export interface Project {
    id: string;
    title: string;
    description: string;
    tags: string[];
    status: string;
    link: string;
    github: string;
    featured: boolean;
}

export const projects: Project[] = [
    {
        id: 'design-super-agent',
        title: 'Design Super Agent',
        description: 'A multi-agent AI system that designs professional websites autonomously. A Director agent (Claude Opus) orchestrates 3 specialized sub-agents through a 6-round "corridor narrowing" methodology — eliminating 97% of the design space before execution. Includes a 39-module knowledge base (6,200+ lines), programmatic safety guardrails that block deployment at code level, and a score calibration system that closed a 42-point gap between AI self-assessment and reality. Nominated for AI Breakthrough Awards 2026 — Multi-Agent AI System of the Year.',
        tags: ['TypeScript', 'Claude Agent SDK', 'MCP', 'Multi-Agent AI'],
        status: 'In Development — Award Nominated',
        link: 'https://github.com/roneni/design-super-agent',
        github: 'https://github.com/roneni/design-super-agent',
        featured: true,
    },
    {
        id: 'harmony-set',
        title: 'HarmonySet',
        description: 'An algorithm-based tool I developed to help DJs build their playlists. Launched on Peerlist Launchpad (Top 10 ranked). Built for scale with Next.js and Supabase.',
        tags: ['Next.js', 'Supabase', 'TypeScript'],
        status: 'Live / Production',
        link: 'https://harmonyset.com',
        github: 'https://github.com/roneni/harmonic-flow',
        featured: false,
    },
    {
        id: 'universe-diffusion',
        title: 'Universe Diffusion',
        description: 'The official AI Image Generation Studio by Psychedelic Universe. Converts existing images into psychedelic art using an image-to-image pipeline — shortcutting the entire generative process. Powered by Nano Banana 2 and Gemini 3.1 Pro.',
        tags: ['React', 'Tailwind', 'Gemini 3.1', 'Nano Banana 2'],
        status: 'Live',
        link: 'https://universe-diffusion.vercel.app/',
        github: 'https://github.com/roneni/universe-diffusion',
        featured: false,
    },
    {
        id: 'content-creation-engine',
        title: 'Content Creation Engine',
        description: 'A comprehensive SEO and content analysis tool that crawls websites and outputs actionable improvements for content strategy, technical SEO, and development. Built with Next.js, Supabase, and Drizzle ORM.',
        tags: ['Next.js', 'Supabase', 'Drizzle ORM'],
        status: 'In Development',
        link: 'https://github.com/roneni/Content-Creation-Management',
        github: 'https://github.com/roneni/Content-Creation-Management',
        featured: false,
    }
];

// Combine all tags dynamically for tech stack graph nodes
export const allTechStacks = Array.from(new Set(projects.flatMap((p) => p.tags)));
