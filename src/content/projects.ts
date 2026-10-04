export interface Project {
  id: string;
  title: string;
  subtitle: string;
  type: string;
  featured: boolean;
  liveDemo?: string;
  githubUrl?: string;
  period?: string;
  purpose: string;
  problem: string;
  solution: string;
  highlights: string[];
  techStack: string[];
  decisions: string[];
  skillsShown: string[];
  professionalSide: string[];
}

export const projectsData: Project[] = [
  {
    id: "pocketarcadex",
    title: "Pocket ArcadeX",
    subtitle: "Cross-Platform Multiplayer Gaming Platform",
    type: "Self Project | Live Demo",
    featured: true,
    liveDemo: "https://pocketarcadex.vercel.app", // TODO: confirm exact link
    purpose: "Enable users to play popular board games cross-platform without installing a native application.",
    problem: "Traditional board game apps are fragmented, heavy, require app store installs, and lack lightweight offline capability or uniform minimax bot difficulty.",
    solution: "Built a high-performance Progressive Web App (PWA) in Next.js 16, React 19, TypeScript, and Capacitor integrating 5 classic board games into one lightweight shell.",
    highlights: [
      "Integrated 5 classic games: Ludo, Chess, Tic-Tac-Toe, Connect 4, and Snakes & Ladders into a single unified platform.",
      "Built Single Player mode with an AI bot supporting multiple difficulty levels powered by Minimax decision-making algorithms.",
      "Implemented Local Multiplayer for same-device play, plus Real-Time Online Multiplayer with room creation, room codes, synchronized state, and auto-recovery after refresh.",
      "Packaged as a Progressive Web App (PWA) with Capacitor, offline support, custom service workers, and automatic update prompts.",
      "Optimized state synchronization, fixed memory leaks, and refined responsiveness across Android, iOS, and desktop browsers."
    ],
    techStack: [
      "Next.js 16", "React 19", "TypeScript", "JavaScript", "HTML5", "CSS3",
      "Tailwind CSS", "Capacitor", "PWA", "Service Workers", "Vercel", "Git", "GitHub"
    ],
    decisions: [
      "Used pure HTML5 Canvas and custom minimax search trees rather than heavy 3D engines for instant page loads and zero lag on mobile browsers.",
      "Implemented delta state serialization for Firebase online rooms to guarantee fast state recovery even on low-bandwidth cellular networks."
    ],
    skillsShown: [
      "Game Logic & Algorithms",
      "Minimax Decision-Making",
      "Bot Difficulty Systems",
      "Multiplayer & Connection Handling (Firebase)",
      "PWA Architecture",
      "Capacitor Packaging",
      "Vercel Deployment",
      "Performance Optimization & QA",
      "UI/UX Design"
    ],
    professionalSide: [
      "Project Management",
      "Marketing & Sponsorship Handling",
      "Team Coordination",
      "Technical Documentation",
      "Cross-Platform Communication"
    ]
  },
  {
    id: "web-scraping-python",
    title: "Web Scraping Pipeline",
    subtitle: "Coursera / Duke University Project",
    type: "Course Project",
    featured: false,
    purpose: "Extract and structure web data at scale for downstream analysis.",
    problem: "Unstructured HTML web pages present inconsistent schemas and unpredictable network latency.",
    solution: "Engineered automated Python scraping scripts using Requests and BeautifulSoup to extract, clean, and organize 500+ structured data records.",
    highlights: [
      "Built robust Python scripts leveraging Requests and BeautifulSoup to parse complex nested HTML DOM nodes.",
      "Extracted over 500+ structured data points with error handling for HTTP timeouts and missing tags.",
      "Applied data cleaning, normalization, and structured export techniques for downstream ML and analytical workflows."
    ],
    techStack: ["Python", "Requests", "BeautifulSoup", "Data Parsing", "JSON", "CSV"],
    decisions: [
      "Selected Requests + BeautifulSoup for lightweight memory footprint during concurrent scraping passes."
    ],
    skillsShown: ["Web Scraping", "Python", "Data Cleaning", "HTML Parsing", "Data Pipelines"],
    professionalSide: ["Technical Reporting", "Data Quality Verification"]
  }
];
