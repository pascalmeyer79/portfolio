export type StackedImage = {
  src: string;
  heightOffset?: number;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  image: string | StackedImage[];
  tags: string[];
  protected?: boolean;
};

export const PROJECTS: Project[] = [
  {
    id: "tenzir",
    title: "Tenzir",
    description:
      "Building an AI-powered data pipelines platform for a leading cyber security startup",
    image: "/images/home/teaser_tenzir.jpg",
    tags: ["UX/UI Design", "Product Design", "Web Design"],
    protected: true,
  },
  {
    id: "porsche",
    title: "Porsche",
    description:
      "Transforming global learning and customer experience with AI and user centered design",
    image: "/images/home/teaser_porsche.jpg",
    tags: ["UX Design", "Product Design", "UX Consulting"],
    protected: true,
  },
  {
    id: "vario",
    title: "Vario",
    description:
      "Simplifying investing in stocks and crypto through gamification and AI",
    image: [
      { src: "/images/home/teaser_vario_01.png", heightOffset: 0 },
      { src: "/images/home/teaser_vario_02.png", heightOffset: 20 },
      { src: "/images/home/teaser_vario_03.png", heightOffset: 40 },
    ],
    tags: ["Product Concept"],
  },
  {
    id: "vw",
    title: "VW Group",
    description:
      "Developing a human machine interface and design system for a new electric vehicle brand",
    image: "/images/home/teaser_vw.png",
    tags: ["UI Design", "Design Systems"],
  },
];

export const FOOTER_LINKS = {
  email: "hi@pascalmey.com",
  links: [
    { label: "Work", href: "/", id: "work" },
    { label: "About", href: "/about", id: "about" },
    { label: "Contact", href: "/contact", id: "contact" },
  ],
};

export const COMPANY_DETAILS = [
  "Pascal Meyer GmbH",
  "HRB 213189",
  "DE359124851",
  "CHE-231.531.352",
];

export const ADDRESSES = [
  {
    country: "🇨🇭 Switzerland",
    lines: ["Gerbestrasse 17", "8805 Richterswil", "+41 78 252 7919"],
  },
  {
    country: "🇩🇪 Germany",
    lines: ["Mohnblumenweg 26", "28832 Achim", "+49 176 747 1337 8"],
  },
];
