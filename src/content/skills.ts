export interface CapabilityNode {
  id: string;
  name: string;
  category: "AI/ML" | "Data & Analytics" | "Engineering & Automation" | "Core Systems";
  depth: "Applied" | "Foundation" | "Learning";
  description: string;
  connections: string[];
}

export const capabilitiesData: CapabilityNode[] = [
  {
    id: "algorithms",
    name: "Algorithms & State Space Search",
    category: "Core Systems",
    depth: "Applied",
    description: "Minimax decision trees, heuristic scoring, game state search, dynamic programming.",
    connections: ["game-ai", "problem-solving"]
  },
  {
    id: "game-ai",
    name: "Game AI & Heuristics",
    category: "AI/ML",
    depth: "Applied",
    description: "Multi-difficulty bot algorithms, state-space evaluation, search tree pruning.",
    connections: ["algorithms", "application-dev"]
  },
  {
    id: "ml-foundations",
    name: "Machine Learning Foundations",
    category: "AI/ML",
    depth: "Foundation",
    description: "Supervised learning, model evaluation metrics, regression, classification algorithms.",
    connections: ["feature-eng", "deep-learning"]
  },
  {
    id: "data-processing",
    name: "Data Processing & Preprocessing",
    category: "Data & Analytics",
    depth: "Applied",
    description: "NumPy, Pandas, missing value imputation, normalization, exploratory data analysis.",
    connections: ["ml-foundations", "feature-eng"]
  },
  {
    id: "feature-eng",
    name: "Feature Engineering & EDA",
    category: "Data & Analytics",
    depth: "Foundation",
    description: "Extracting signals from raw tabular & text data, statistical distribution checks.",
    connections: ["data-processing", "ml-foundations"]
  },
  {
    id: "web-scraping",
    name: "Web Scraping & Automation",
    category: "Engineering & Automation",
    depth: "Applied",
    description: "Playwright, Puppeteer browser automation, BeautifulSoup, pipeline resiliency.",
    connections: ["data-processing", "application-dev"]
  },
  {
    id: "application-dev",
    name: "Frontend & Web Engineering",
    category: "Engineering & Automation",
    depth: "Applied",
    description: "Next.js 15, React 19, TypeScript, modular component architecture, state management.",
    connections: ["web-scraping", "pwa-capacitor"]
  },
  {
    id: "pwa-capacitor",
    name: "PWA & Mobile Packaging",
    category: "Engineering & Automation",
    depth: "Applied",
    description: "Capacitor native shell integration, service worker caching, offline capability.",
    connections: ["application-dev"]
  },
  {
    id: "deep-learning",
    name: "Deep Learning Foundations",
    category: "AI/ML",
    depth: "Learning",
    description: "TensorFlow neural network architecture basics, tensor operations.",
    connections: ["ml-foundations", "generative-ai"]
  },
  {
    id: "generative-ai",
    name: "Generative AI Applications",
    category: "AI/ML",
    depth: "Learning",
    description: "Exploring LLM API integrations, prompt engineering workflows, AI assistant loops.",
    connections: ["deep-learning", "application-dev"]
  },
  {
    id: "problem-solving",
    name: "System Design & Problem Solving",
    category: "Core Systems",
    depth: "Applied",
    description: "Modular API structure, Postman endpoint validation, Git version workflow.",
    connections: ["algorithms", "application-dev"]
  }
];

export const toolsData = [
  { name: "Next.js", category: "Framework" },
  { name: "React", category: "Library" },
  { name: "TypeScript", category: "Language" },
  { name: "Python", category: "Language" },
  { name: "Tailwind CSS", category: "Styling" },
  { name: "Playwright / Puppeteer", category: "Automation" },
  { name: "Git / GitHub", category: "Version Control" },
  { name: "Capacitor & PWA", category: "Mobile" },
  { name: "MongoDB / PostgreSQL / MySQL", category: "Database" },
  { name: "Vercel", category: "Deployment" },
  { name: "Postman / REST APIs", category: "Integration" },
  { name: "n8n / UiPath", category: "Workflow Automation" }
];
