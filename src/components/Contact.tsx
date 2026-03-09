import React from 'react';
import { motion } from 'motion/react';
import { Github, Globe, Mail, BookOpen } from 'lucide-react';

export default function Contact() {
  return (
    <section className="py-24 md:py-32">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-16"
      >
        <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tight mb-6">
          Let's Build.
        </h2>
        <p className="text-lg md:text-xl font-light max-w-2xl mx-auto text-gray-600">
          Currently open for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
        </p>
      </motion.div>

      <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 max-w-5xl mx-auto">
        <motion.a
          href="https://github.com/roneni"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="modern-button py-4 px-8 flex items-center justify-center gap-3 text-lg flex-1 min-w-[200px]"
        >
          <Github className="w-6 h-6" />
          GitHub
        </motion.a>
        
        <motion.a
          href="https://peerlist.io/brainstorm"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="modern-button py-4 px-8 flex items-center justify-center gap-3 text-lg flex-1 min-w-[200px]"
        >
          <Globe className="w-6 h-6" />
          Peerlist
        </motion.a>

        <motion.a
          href="https://dev.to/brainstorm_"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="modern-button py-4 px-8 flex items-center justify-center gap-3 text-lg flex-1 min-w-[200px]"
        >
          <BookOpen className="w-6 h-6" />
          Dev.to
        </motion.a>
        
        <motion.a
          href="mailto:katzronen1709@gmail.com"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="modern-button py-4 px-8 flex items-center justify-center gap-3 text-lg flex-1 min-w-[200px]"
        >
          <Mail className="w-6 h-6" />
          Email
        </motion.a>
      </div>
    </section>
  );
}
