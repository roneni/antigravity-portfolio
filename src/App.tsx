import ThemeGenerator from './components/ThemeGenerator';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import TechStack from './components/TechStack';
import Contact from './components/Contact';
import ChatBot from './components/ChatBot';

export default function App() {
  return (
    <div className="min-h-screen selection:bg-[var(--theme-accent)] selection:text-[var(--theme-text)] overflow-x-hidden">
      <main className="max-w-7xl mx-auto px-6 md:px-12 pt-12 pb-24">
        <ThemeGenerator />
        <Hero />
        <About />
        <Projects />
      </main>
      
      <TechStack />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <Contact />
      </div>
      
      <ChatBot />
    </div>
  );
}
