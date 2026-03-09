import { motion } from 'motion/react';

const skills = [
  'React', 'TypeScript', 'Tailwind CSS', 'Firebase', 'Gemini API', 'Node.js', 
  'Framer Motion', 'Next.js', 'PostgreSQL', 'GraphQL', 'Docker', 'AWS'
];

export default function TechStack() {
  // Duplicate skills to ensure smooth infinite scroll
  const marqueeItems = [...skills, ...skills, ...skills];

  return (
    <section className="py-20 overflow-hidden bg-gray-50 border-y border-[var(--theme-border)]">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="py-8"
      >
        <div className="flex whitespace-nowrap overflow-hidden">
          <div className="flex animate-marquee items-center">
            {marqueeItems.map((skill, index) => (
              <div key={index} className="flex items-center">
                <span className="font-display text-3xl md:text-5xl font-semibold px-8 text-gray-800">
                  {skill}
                </span>
                <span className="text-[var(--theme-accent)] text-3xl md:text-5xl opacity-50">
                  •
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
