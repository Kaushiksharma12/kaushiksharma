export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date?: string;
  description: string;
}

export const certificationsData: Certification[] = [
  {
    id: "eduskills-aiml",
    title: "AI-ML Virtual Internship",
    issuer: "EduSkills",
    description: "Comprehensive hands-on training program covering machine learning pipeline implementation, dataset preprocessing, and model validation."
  },
  {
    id: "coursera-duke-webscraping",
    title: "Web Scraping with Python",
    issuer: "Coursera / Duke University",
    description: "Automated parsing of HTTP responses, handling dynamic DOM structures with Requests & BeautifulSoup, data cleaning and structured export."
  },
  {
    id: "infosys-python",
    title: "Basics of Python",
    issuer: "Infosys Springboard",
    description: "Core Python programming principles, data structures, object-oriented concepts, and algorithmic logic."
  },
  {
    id: "great-learning-ai-mysql-uipath",
    title: "AI, MySQL & UiPath",
    issuer: "Great Learning",
    description: "Fundamentals of artificial intelligence concepts, relational database queries with MySQL, and Robotic Process Automation (RPA) workflow design using UiPath."
  }
];
