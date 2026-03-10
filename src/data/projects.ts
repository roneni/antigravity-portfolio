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
        id: 'harmony-set',
        title: 'HarmonySet',
        description: 'An algorithm-based tool I developed to help DJs build their playlists. Launched on Peerlist Launchpad (Top 10 ranked). Built for scale with Next.js and Supabase.',
        tags: ['Next.js', 'Supabase', 'TypeScript'],
        status: 'Live / Production',
        link: 'https://harmonyset.com',
        github: 'https://github.com/roneni/harmonic-flow',
        featured: true,
    },
    {
        id: 'psychedelic-universe',
        title: 'Psychedelic Universe',
        description: 'An initiative started in 2013 out of a love for electronic music born in India. What began as a YouTube channel (634K subscribers, 165M views) is now expanding into a full ecosystem and community household backed by Firebase and GCP.',
        tags: ['Firebase', 'GCP', 'Gemini API'],
        status: 'Live',
        link: 'https://psychedelic-universe.com',
        github: 'https://github.com/roneni/psychedelic-universe-portal',
        featured: false,
    },
    {
        id: 'visionary-studio',
        title: 'Visionary Studio',
        description: 'A creative sandbox exploring the boundaries of generative AI. Powered by the Gemini API, featuring an "Essence Transmutation" engine to analyze and replicate source images with new artistic interpretations. Sleek, tech-forward UX.',
        tags: ['React', 'Tailwind', 'Gemini API'],
        status: 'Active Development',
        link: 'https://github.com/roneni/universe-diffusion',
        github: 'https://github.com/roneni/universe-diffusion',
        featured: false,
    },
    {
        id: 'content-creation-engine',
        title: 'Content Creation Engine',
        description: 'A brand new, comprehensive SEO and content analysis tool. Built with Next.js, Supabase, and Drizzle ORM. Analyzes websites and outputs actionable improvements.',
        tags: ['Next.js', 'Supabase', 'Drizzle ORM'],
        status: 'In Development',
        link: 'https://github.com/roneni/Content-Creation-Management',
        github: 'https://github.com/roneni/Content-Creation-Management',
        featured: false,
    }
];

// Combine all tags dynamically for tech stack graph nodes
export const allTechStacks = Array.from(new Set(projects.flatMap((p) => p.tags)));
