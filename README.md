# Antigravity Portfolio

An interactive developer portfolio built with React, TypeScript, and Tailwind CSS. Features an **Elegant Brutalism** design aesthetic, AI-powered theme generation, a conversational chatbot, and an interactive project ecosystem graph.

**Live site:** [antigravity-portfolio-eta.vercel.app](https://antigravity-portfolio-eta.vercel.app)

---

## Features

### AI-Powered Theme Generator
Describe a vibe in natural language (e.g., "Midnight Ocean", "Minimalist Zen") and the site's entire color palette -- background, text, accent -- regenerates in real time using Gemini 3 Flash.

### Conversational Chatbot (Ronen-Bot)
A floating chat assistant powered by Gemini that answers questions about skills, projects, and experience. Maintains conversation context across the session using a persistent chat instance.

### Interactive Ecosystem Graph
A React Flow-based node graph that maps every project to its tech stack. Projects appear as interactive cards with animated edges connecting them to their technologies. Click any project node to open a detail side panel.

### Smooth Motion Design
Section entries, hero text, and UI elements animate on mount using Framer Motion (via the `motion` library) with custom cubic-bezier easing curves.

### Dynamic CSS Theming
All components reference CSS custom properties (`--theme-bg`, `--theme-text`, `--theme-accent`, `--theme-border`), allowing the AI theme generator to restyle the entire site without a page reload.

---

## Tech Stack

| Layer        | Technology                                    |
|--------------|-----------------------------------------------|
| Framework    | React 19, TypeScript 5.8                      |
| Build        | Vite 6                                        |
| Styling      | Tailwind CSS v4                               |
| Animation    | Motion (Framer Motion)                        |
| AI           | Google Gemini 3 Flash (`@google/genai`)       |
| Graph        | React Flow (`@xyflow/react`)                  |
| Icons        | Lucide React                                  |
| Hosting      | Vercel                                        |

---

## Project Structure

```
src/
  App.tsx                       -- Root layout, section composition
  main.tsx                      -- Entry point
  index.css                     -- Global styles and CSS custom properties
  components/
    Hero.tsx                    -- Animated hero section with gradient heading
    About.tsx                   -- About section
    Projects.tsx                -- Project cards grid
    ProjectSidePanel.tsx        -- Slide-out detail panel for selected projects
    TechStack.tsx               -- Tech stack display
    EcosystemGraph.tsx          -- React Flow node graph (projects + technologies)
    ThemeGenerator.tsx          -- AI-powered color palette generator
    ChatBot.tsx                 -- Gemini-powered conversational assistant
    Contact.tsx                 -- Contact section
  data/
    projects.ts                 -- Project definitions and tag aggregation
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [Gemini API key](https://aistudio.google.com/apikey) (required for the theme generator and chatbot)

### Installation

```bash
git clone https://github.com/roneni/antigravity-portfolio.git
cd antigravity-portfolio
npm install
```

### Configuration

Copy the example environment file and add your API key:

```bash
cp .env.example .env
```

Then edit `.env`:

```
GEMINI_API_KEY=your_gemini_api_key_here
```

### Development

```bash
npm run dev
```

The dev server starts on `http://localhost:3000`.

### Build

```bash
npm run build
```

### Type Checking

```bash
npm run lint
```

---

## License

This project is provided as a portfolio reference. All rights reserved.
