export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  type: string;
  period: string;
  startDate: string;
  endDate: string;
  summary?: string;
  highlights: string[];
  skills: string[];
}

export const experienceData: Experience[] = [
  {
    id: "autowhat-ai-intern",
    role: "Artificial Intelligence Intern",
    company: "Autowhat (APML)",
    location: "On-site, Mumbai, Maharashtra",
    type: "Internship",
    period: "Dec 2025 – Feb 2026",
    startDate: "2025-12",
    endDate: "2026-02",
    highlights: [
      "Developed 10+ responsive frontend interfaces in Next.js with reusable UI components and modular routing, reducing page development time by approximately 30% through a scalable project architecture.",
      "Built core features of the TenderMatch System, an AI-driven tender matching platform, contributing to system design and workflow planning that automated matching across 100+ tender listings.",
      "Engineered a lead scraping pipeline using Playwright and Puppeteer browser automation, collecting and storing 1,000+ structured lead records in MongoDB while eliminating manual data entry.",
      "Developed the Attendance Bot X-force Dashboard with attendance tracking logic, dashboard UI, and 5+ REST API integrations, enabling real-time monitoring of employee attendance data.",
      "Conducted REST API testing across 20+ endpoints with Postman and managed version control using Git."
    ],
    skills: ["Next.js", "React", "TypeScript", "Playwright", "Puppeteer", "MongoDB", "REST APIs", "Postman", "Git"]
  }
];
