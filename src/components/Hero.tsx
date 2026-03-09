import { motion } from 'motion/react';

export default function Hero() {
  return (
    <section className="py-24 md:py-32 flex flex-col justify-center min-h-[70vh]">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      >
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-tight mb-6 text-gray-900">
          Hi, I'm <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--theme-accent)] to-blue-500">
            Ronen.
          </span>
        </h1>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
      >
        <p className="text-xl md:text-2xl font-light max-w-3xl leading-relaxed border-l-2 border-[var(--theme-accent)] pl-6 py-2 text-gray-600">
          Full-Stack Developer & AI Engineer. <br />
          Building clean, modern interfaces and intelligent systems.
        </p>
      </motion.div>
    </section>
  );
}
