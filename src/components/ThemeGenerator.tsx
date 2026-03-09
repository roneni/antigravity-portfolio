import React, { useState } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import { motion } from 'motion/react';
import { Sparkles, Loader2 } from 'lucide-react';

export default function ThemeGenerator() {
  const [vibe, setVibe] = useState('');
  const [loading, setLoading] = useState(false);

  const generateTheme = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!vibe.trim()) return;

    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Generate a clean, modern, and elegant color palette based on this vibe: "${vibe}". 
        The aesthetic should be highly professional, minimalist, and accessible.
        Return a JSON object with three hex color codes:
        - bg: A clean background color (usually very light or very dark).
        - text: A text color with high contrast against the bg color.
        - accent: A tasteful accent color used for buttons, links, and highlights.`,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              bg: { type: Type.STRING, description: 'Hex color for background' },
              text: { type: Type.STRING, description: 'Hex color for text and borders' },
              accent: { type: Type.STRING, description: 'Hex color for accents' },
            },
            required: ['bg', 'text', 'accent'],
          },
        },
      });

      if (response.text) {
        const colors = JSON.parse(response.text);
        document.documentElement.style.setProperty('--theme-bg', colors.bg);
        document.documentElement.style.setProperty('--theme-text', colors.text);
        document.documentElement.style.setProperty('--theme-accent', colors.accent);
        document.documentElement.style.setProperty('--theme-border', colors.text);
      }
    } catch (error) {
      console.error('Failed to generate theme:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-2xl mx-auto mb-16"
    >
      <form onSubmit={generateTheme} className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <input
            type="text"
            value={vibe}
            onChange={(e) => setVibe(e.target.value)}
            placeholder="Describe a vibe (e.g., 'Midnight Ocean', 'Minimalist Zen')..."
            className="w-full px-4 py-3 text-base modern-input font-medium"
            disabled={loading}
          />
        </div>
        <button
          type="submit"
          disabled={loading || !vibe.trim()}
          className="px-6 py-3 text-base modern-button-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Sparkles className="w-5 h-5" />
          )}
          <span>Generate Theme</span>
        </button>
      </form>
    </motion.div>
  );
}
