import { profileData } from "@/content/profile";

export function JsonLd() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kaushiksharma.vercel.app";

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": profileData.name,
    "givenName": profileData.firstName,
    "familyName": profileData.lastName,
    "jobTitle": profileData.tagline,
    "email": profileData.email,
    "url": baseUrl,
    "sameAs": [profileData.github, profileData.linkedin],
    "alumniOf": {
      "@type": "CollegeOrUniversity",
      "name": "Nagindas Khandwala College, Mumbai University",
    },
    "knowsAbout": [
      "Artificial Intelligence",
      "Machine Learning",
      "Next.js",
      "TypeScript",
      "Python",
      "Web Automation",
      "Playwright",
      "Game Algorithms",
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Mumbai",
      "addressRegion": "Maharashtra",
      "addressCountry": "IN",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
    />
  );
}
