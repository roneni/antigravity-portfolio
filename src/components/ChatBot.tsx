import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Loader2 } from 'lucide-react';

type Message = {
  role: 'user' | 'model';
  text: string;
};

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Hi! I'm Ronen-Bot, Ronen's personal AI recruiter and assistant. Ask me about his skills, experience, or his flagship project 'Visionary Studio'." }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Store the chat instance
  const chatRef = useRef<any>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const initChat = () => {
    if (!chatRef.current) {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      chatRef.current = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: `You are Ronen-Bot, the personal recruiter and assistant for Ronen, a Full-Stack Developer & AI Engineer.
          Your tone should be professional, welcoming, and helpful.
          Key information about Ronen:
          - He focuses on shipping reliable products. Recently launched "HarmonySet" (an algorithm-based DJ tool) on Peerlist Launchpad (ranked!).
          - Creator of "Psychedelic Universe", an electronic music initiative started in 2013 with a massive YouTube presence (634K subscribers, 165M views), now expanding into a full web ecosystem.
          - Enrolled in Google's GEAR Developer Program to build production-ready AI agents.
          - Writes technical articles on Dev.to (dev.to/brainstorm_).
          - Active Projects: Visionary Studio (Gemini-powered generative AI sandbox), Content Creation Engine.
          - Tech Stack: React, Next.js, TypeScript, Tailwind CSS, Supabase, Firebase, Gemini API, Drizzle ORM.
          - Design Philosophy: Clean, modern, and highly functional.
          Keep your answers concise, confident, and persuasive. Encourage the user to hire Ronen or check out his GitHub (github.com/roneni).`,
        },
      });
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userText = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setLoading(true);

    try {
      initChat();
      const response = await chatRef.current.sendMessage({ message: userText });
      setMessages(prev => [...prev, { role: 'model', text: response.text }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'model', text: "Error connecting to my neural net. Try again later." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 w-14 h-14 modern-button-primary rounded-full flex items-center justify-center z-50 p-0 shadow-lg"
            aria-label="Open chat"
          >
            <MessageSquare className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-6 right-6 w-[350px] sm:w-[400px] h-[500px] max-h-[80vh] modern-card flex flex-col z-50 overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="p-4 border-b border-[var(--theme-border)] flex justify-between items-center bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <h3 className="font-display font-semibold text-lg text-gray-800">Ronen-Bot</h3>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-gray-200 rounded-full transition-colors text-gray-500 hover:text-gray-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[85%] p-3 text-sm font-medium rounded-2xl ${
                      msg.role === 'user' 
                        ? 'bg-[var(--theme-accent)] text-white rounded-tr-sm' 
                        : 'bg-gray-100 text-gray-800 rounded-tl-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="max-w-[85%] p-3 bg-gray-100 rounded-2xl rounded-tl-sm">
                    <Loader2 className="w-4 h-4 animate-spin text-gray-500" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-4 border-t border-[var(--theme-border)] bg-white flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 px-4 py-2 text-sm modern-input"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="p-2 modern-button-primary w-10 h-10 rounded-full flex items-center justify-center disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
