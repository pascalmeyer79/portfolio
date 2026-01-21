import { Metadata } from "next";
import { PROJECTS } from "../../data";

type Props = {
    params: Promise<{ slug: string }>;
    children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const project = PROJECTS.find((p) => p.id === slug);

    if (!project) {
        return {
            title: "Project Not Found",
        };
    }

    return {
        title: project.title,
        description: project.description,
        openGraph: {
            title: `${project.title} | Pascal Meyer`,
            description: project.description,
            images: [
                {
                    url: Array.isArray(project.image) ? project.image[0].src : project.image,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: `${project.title} | Pascal Meyer`,
            description: project.description,
        },
    };
}

export default async function ProjectLayout({ children }: Props) {
    return <>{children}</>;
}
