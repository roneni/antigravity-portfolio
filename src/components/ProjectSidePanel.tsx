import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Github, FolderDown } from 'lucide-react';
import type { Project } from '../data/projects';

interface ProjectSidePanelProps {
    project: Project | null;
    onClose: () => void;
}

export default function ProjectSidePanel({ project, onClose }: ProjectSidePanelProps) {
    // Derive the GitHub repository main zip archive URL 
    const getDownloadUrl = (githubUrl: string) => {
        // Assuming standard github urls: https://github.com/username/repo
        if (!githubUrl || !githubUrl.includes('github.com')) return null;
        // Strip trailing slashes, if any
        const cleanUrl = githubUrl.endsWith('/') ? githubUrl.slice(0, -1) : githubUrl;
        return `${cleanUrl}/archive/refs/heads/main.zip`;
    };

    const downloadUrl = project ? getDownloadUrl(project.github) : null;

    return (
        <AnimatePresence>
            {project && (
                <>
                    {/* Backdrop overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
                    />

                    {/* Sliding Panel */}
                    <motion.div
                        initial={{ x: '100%', opacity: 0, scale: 0.95 }}
                        animate={{ x: 0, opacity: 1, scale: 1 }}
                        exit={{ x: '100%', opacity: 0, scale: 0.95 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full sm:w-[500px] z-50 bg-[var(--theme-bg)] border-l border-[var(--theme-border)] shadow-2xl flex flex-col overflow-y-auto"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-[var(--theme-border)]">
                            <div className="flex items-center gap-3">
                                <div className={`w-3 h-3 rounded-full ${project.status.includes('Live') ? 'bg-[var(--theme-accent)] animate-pulse shadow-[0_0_10px_var(--theme-accent)]' : 'bg-gray-400'}`}></div>
                                <span className="text-sm font-medium uppercase tracking-wider text-[var(--theme-text)] opacity-70">
                                    {project.status}
                                </span>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full hover:bg-[var(--theme-border)] transition-colors text-[var(--theme-text)]"
                                aria-label="Close panel"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-8 flex-1 flex flex-col">
                            <h2 className="font-display text-4xl font-bold mb-4 tracking-tight leading-tight text-[var(--theme-text)]">
                                {project.title}
                            </h2>

                            <div className="flex flex-wrap gap-2 mb-8">
                                {project.tags.map(tag => (
                                    <span
                                        key={tag}
                                        className="px-3 py-1 text-xs font-semibold rounded-full border border-[var(--theme-accent)] text-[var(--theme-accent)] bg-[var(--theme-accent)]/10"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <p className="text-lg leading-relaxed text-[var(--theme-text)] opacity-80 mb-10">
                                {project.description}
                            </p>

                            <div className="mt-auto flex flex-col gap-4">
                                {downloadUrl && (
                                    <a
                                        href={downloadUrl}
                                        className="group relative flex items-center justify-center gap-3 w-full py-4 px-6 rounded-xl font-medium text-white bg-gradient-to-r from-[var(--theme-accent)] to-[#4a80ff] shadow-lg shadow-[var(--theme-accent)]/25 hover:shadow-[var(--theme-accent)]/40 hover:-translate-y-0.5 transition-all overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                                        <FolderDown className="w-5 h-5 relative z-10" />
                                        <span className="relative z-10">Download Source Code (.zip)</span>
                                    </a>
                                )}

                                <div className="flex gap-4">
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex-1 py-4 flex items-center justify-center gap-2 font-medium rounded-xl border border-[var(--theme-accent)] text-[var(--theme-accent)] hover:bg-[var(--theme-accent)]/10 transition-colors"
                                    >
                                        Visit App <ExternalLink className="w-4 h-4" />
                                    </a>
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex-1 py-4 flex items-center justify-center gap-2 font-medium rounded-xl border border-[var(--theme-border)] text-[var(--theme-text)] hover:bg-[var(--theme-border)] transition-colors"
                                    >
                                        GitHub <Github className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
