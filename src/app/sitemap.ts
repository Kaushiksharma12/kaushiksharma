import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kaushiksharma.vercel.app";

  const routes = [
    "",
    "/work/pocketarcadex",
    "/ai-lab",
    "/skills",
    "/vibe-coding",
    "/experience",
    "/education",
    "/about",
    "/resume",
    "/contact",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : route === "/work/pocketarcadex" ? 0.9 : 0.8,
  }));
}
