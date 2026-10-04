export interface Education {
  id: string;
  degree: string;
  specialization?: string;
  fieldOfStudy?: string;
  institution: string;
  university?: string;
  location: string;
  period: string;
  startYear: string;
  endYear: string;
  score: string;
  grade?: string;
  scoreLabel: string;
  details?: string;
  relevantCourses?: string[];
  highlights: string[];
}

export const educationData: Education[] = [
  {
    id: "bsc-cs-aiml",
    degree: "Bachelor of Science in Computer Science",
    specialization: "Artificial Intelligence & Machine Learning",
    institution: "Nagindas Khandwala College",
    university: "Mumbai University",
    location: "Mumbai, Maharashtra",
    period: "2023 – 2026",
    startYear: "2023",
    endYear: "2026",
    score: "7.83",
    scoreLabel: "CGPA",
    highlights: [
      "Rigorous academic coursework in Data Structures, Algorithms, Supervised Learning, Model Evaluation, Mathematics for Machine Learning, and Database Management Systems.",
      "Specialized capstone projects in AI decision trees and Web Scraping pipelines."
    ]
  },
  {
    id: "hsc",
    degree: "Higher Secondary Certificate (HSC)",
    institution: "Durgadevi Saraf College",
    location: "Mumbai, Maharashtra",
    period: "2021 – 2023",
    startYear: "2021",
    endYear: "2023",
    score: "46.83%",
    scoreLabel: "Percentage",
    highlights: [
      "Focus on Science, Mathematics, and Computer Fundamentals."
    ]
  },
  {
    id: "ssc",
    degree: "Secondary School Certificate (SSC)",
    institution: "Aacharya Narendra Dev Vidya High School & Jr. College",
    location: "Mumbai, Maharashtra",
    period: "2021",
    startYear: "2020",
    endYear: "2021",
    score: "72.81%",
    scoreLabel: "Percentage",
    highlights: [
      "General secondary education with distinction in Mathematics and Science."
    ]
  }
];
