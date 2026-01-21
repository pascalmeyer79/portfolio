import { MetadataRoute } from "next";
import { PROJECTS } from "./data";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://www.pascalmey.com";

    // Base routes
    const routes = ["", "/about", "/contact", "/imprint"].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: route === "" ? 1 : 0.8,
    }));

    // Project routes
    const projectRoutes = PROJECTS.map((project) => ({
        url: `${baseUrl}/work/${project.id}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
    }));

    return [...routes, ...projectRoutes];
}
