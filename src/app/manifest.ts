import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "KAUSHIK SHARMA — Editorial AI/ML Portfolio",
    short_name: "Kaushik AI",
    description: "Art-directed editorial portfolio of Kaushik Sharma, AI/ML Engineer & Developer.",
    start_url: "/",
    display: "standalone",
    background_color: "#efe9dc",
    theme_color: "#a3201a",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
