import { Metadata } from "next";
import { PROJECTS } from "../../data";

type Props = {
    params: { slug: string };
    children: React.ReactNode;
};

export async function generateStaticParams() {
    return PROJECTS.map((project) => ({
        slug: project.id,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const project = PROJECTS.find((p) => p.id === params.slug);

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

export default function ProjectLayout({ children }: Props) {
    return <>{children}</>;
}
