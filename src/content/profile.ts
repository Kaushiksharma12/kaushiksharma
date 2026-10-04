export interface Profile {
  name: string;
  firstName: string;
  lastName: string;
  tagline: string;
  editorialStatement: string;
  location: string;
  phone?: string;
  email: string;
  linkedin: string;
  github: string;
  resumePdf: string;
  positioning: string[];
}

export const profileData: Profile = {
  name: "KAUSHIK SHARMA",
  firstName: "KAUSHIK",
  lastName: "SHARMA",
  tagline: "AI/ML Engineer & Developer",
  positioning: [
    "AI/ML",
    "Data Analytics",
    "Software Development"
  ],
  editorialStatement: "Building intelligent applications at the intersection of data, algorithms, and human experience. Computer Science graduate specializing in AI & Machine Learning, converting theoretical data structures into responsive production systems.",
  location: "Mumbai, Maharashtra",
  email: "kaushiksharma1432@gmail.com",
  linkedin: "https://www.linkedin.com/in/kaushiksharma22",
  github: "https://github.com/Kaushiksharma12",
  resumePdf: "/resume.pdf"
};
