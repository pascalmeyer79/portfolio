"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTheme } from "../../theme-provider";
import { Footer } from "../../components/Footer";
import { FooterBackground } from "../../components/FooterBackground";
import { ImageComparison } from "../../components/ImageComparison";
import { CounterAnimation } from "../../components/CounterAnimation";
import { PrimaryButton } from "../../components/PrimaryButton";

type WorkConfig = {
  title: string;
  overline: string;
  description: string;
  tags: string[];
  role: string;
  timeline: string;
  company: string;
  year: string;
  contributions: string;
  heroImage: string;
  heroImageDark: string;
  sections: Array<{
    type: "text" | "image" | "grid" | "text-image" | "comparison" | "results";
    title?: string;
    subtitle?: string;
    overline?: string;
    text?: string;
    backgroundColor: "white" | "gray" | "light";
    image?: string;
    imageDark?: string;
    images?: Array<{ src: string; srcDark?: string; caption?: string }>;
    gridCols?: 2 | 3;
    beforeImage?: string;
    afterImage?: string;
    beforeLabel?: string;
    afterLabel?: string;
    fullWidthImage?: string;
    fullWidthImageDark?: string;
    imageRows?: Array<Array<{ src: string; srcDark?: string; caption?: string }>>;
    fullWidthImages?: Array<{ src: string; srcDark?: string; noBorder?: boolean; isVideo?: boolean; fallbackImage?: string }>;
    metrics?: Array<{ value: string; label: string }>;
  }>;
};

const WORKS: Record<string, WorkConfig> = {
  tenzir: {
    title: "Building an AI-powered data pipeline platform for cyber security teams",
    overline: "Tenzir",
    description: "I joined Tenzir as Design Lead with a focus on UX, UI, and Product Design to guide the transition from an alpha-stage developer tool to a scalable enterprise SaaS product. Facing a market dominated by a massive incumbent, my role was to overhaul the entire user experience. I led the product design from the initial interface redesign to the development of a visual pipeline builder, established a comprehensive design system, and managed the brand relaunch to support the company's growth trajectory.",
    tags: ["UX/UI Design", "Product Design", "Web Design"],
    role: "Lead Designer (Freelance)",
    timeline: "2024 - today",
    company: "Tenzir",
    year: "2024 – today",
    contributions: "UX, UI, Product, Research, Prototyping",
    heroImage: "/images/tenzir/Tenzir_01.jpg",
    heroImageDark: "/images/tenzir/Tenzir_02.jpg",
    sections: [
      {
        type: "text-image",
        backgroundColor: "light",
        title: "David vs. Goliath in the\ndata observability market",
        overline: "Context & Challenge",
        text: "When I joined Tenzir, it was an early-stage challenger in a market controlled by a well-funded incumbent. The platform was a feature-limited alpha, while the main competitor, Cribl, already held significant market share with over 100x the ARR.\n\nThe core challenge was to translate Tenzir's architectural superiority into tangible user value. While the market leader offered a complex suite of fragmented tools, Tenzir provided a unified open-source solution. My objective was to design an interface that proved this unified approach was not just more powerful, but significantly easier to use.",
        images: [
          { src: "/images/tenzir/Tenzir_02.jpg", caption: "Cribl Stream (2024)" },
          { src: "/images/tenzir/Tenzir_03.jpg", caption: "Tenzir Early Access (2024)" },
        ],
      },
      {
        type: "text-image",
        backgroundColor: "light",
        title: "From technical utility to\nuser-centered design",
        overline: "Process",
        text: "When I took over as Design Lead, the platform was a robust engineering tool but raw and intimidating for non-experts. My mission was to bridge the gap to a market-ready SaaS application.\n\nTo achieve modern enterprise standards, I grounded design decisions in continuous user research with SecOps teams. We prioritized features that established a clear mental model, introducing a unified user dashboard, system diagnostics, and a modular package library. We refined the interaction layer with keyboard shortcuts and improved workspace handling, while reducing cognitive load through distinct system feedback like toasts, tooltips, and educational empty states. Combined with custom icons and responsive layout, this user-validated approach transformed the platform into a structured, intuitive workflow tool.",
        images: [],
        beforeImage: "/images/tenzir/Tenzir_04.jpg",
        afterImage: "/images/tenzir/Tenzir_05.jpg",
        beforeLabel: "Tenzir Early Access",
        afterLabel: "First Iteration",
      },
      {
        type: "text-image",
        backgroundColor: "light",
        title: "From data chaos to clarity\nwith AI and smart visualization",
        overline: "Solution",
        text: "To truly compete with the incumbent, we needed to simplify and enhance the product functionality even further. This strategic decision was directly informed by feedback from product demos for new potential clients and user feedback.\n\nThe centerpiece of this strategy was the Data Fabric, an AI-powered visual pipeline builder. We evolved the interaction model to support a hybrid workflow: a drag-and-drop interface working in sync with the code editor. A key feature was the integration of a MCP server, which drastically reduced setup time for new data sources through AI acceleration.",
        images: [],
        fullWidthImage: "/images/tenzir/Tenzir_01.jpg",
        imageRows: [
          [
            { src: "/images/tenzir/Tenzir_06.jpg" },
            { src: "/images/tenzir/Tenzir_07.jpg" },
          ],
          [
            { src: "/images/tenzir/Tenzir_08.jpg" },
            { src: "/images/tenzir/Tenzir_09.jpg" },
          ],
          [
            { src: "/images/tenzir/Tenzir_10.jpg" },
            { src: "/images/tenzir/Tenzir_11.jpg" },
          ],
        ],
      },
      {
        type: "text-image",
        backgroundColor: "light",
        title: "Establishing a design system\nand a sales-driven presence",
        overline: "Growth & Scalability",
        text: "To ensure consistency throughout the app for the frontend team and for corporate communication, I built a comprehensive 30-page Design System in Figma. This unified library accelerated the development cycle and enabled faster frontend development with Claude.\n\nExtending this visual identity beyond the product, I collaborated with the founder to reimagine the company website, evolving it from a basic landing page into a multi-layered SaaS platform with a dedicated sales funnel. To empower the sales team, I also produced high-fidelity collateral, including solution briefs and investor decks.",
        images: [],
        fullWidthImages: [
          { 
            src: "/images/tenzir/Tenzir_12_Light.png", 
            srcDark: "/images/tenzir/Tenzir_12_Dark.png",
            noBorder: true 
          },
          { 
            src: "/images/tenzir/Tenzir_13.mp4", 
            fallbackImage: "/images/tenzir/Tenzir_13_Fallback.jpg",
            noBorder: false,
            isVideo: true
          },
        ],
      },
      {
        type: "results",
        backgroundColor: "light",
        title: "Unlocking enterprise adoption and securing Series A",
        overline: "Results",
        text: "This strategic transformation evolved the platform from a raw utility into a strategic asset that investors and users value. These product interventions delivered immediate business impact, helping to quadruple the customer base and win major clients like Swiss Post and the German government (BSI). This validated product maturity played a decisive role in securing a $5M Series A funding.",
        metrics: [
          { value: "4x", label: "Increase in customer base" },
          { value: "3x", label: "ARR from 700k to 2M" },
          { value: "$5M", label: "Series A funding raised" },
        ],
      },
    ],
  },
  porsche: {
    title: "Transforming global learning and customer experience",
    overline: "Porsche — Automotive",
    description: "Leading the design of multiple global platforms at Porsche, transforming how employees learn and how customers experience the brand across digital touchpoints.",
    tags: ["Product Design", "UX Strategy", "Research"],
    role: "Lead UX and Product Designer",
    timeline: "2022 - 2024",
    company: "Porsche",
    year: "2022 – 2024",
    contributions: "UX, UI, Product, Research",
    heroImage: "/images/porsche/Porsche_01.jpg",
    heroImageDark: "/images/porsche/Porsche_02.jpg",
    sections: [],
  },
  vario: {
    title: "Simplifying investing in stocks and crypto",
    overline: "Vario — Fintech",
    description: "Designing a seamless investment platform that makes trading stocks and crypto accessible to everyone.",
    tags: ["Product Design", "UX/UI", "Brand"],
    role: "Product Designer",
    timeline: "2023",
    company: "Vario",
    year: "2023",
    contributions: "UX, UI, Product, Brand",
    heroImage: "/images/vario/Vario_01.png",
    heroImageDark: "/images/vario/Vario_02.png",
    sections: [],
  },
  vw: {
    title: "Designing digital experiences for global audiences",
    overline: "Volkswagen — Automotive",
    description: "Creating digital experiences for one of the world's largest automotive brands.",
    tags: ["UX/UI Design", "Product Design"],
    role: "UX/UI Designer",
    timeline: "2022 - 2023",
    company: "Volkswagen",
    year: "2022 – 2023",
    contributions: "UX, UI, Product",
    heroImage: "/images/vw/VW_01.png",
    heroImageDark: "/images/vw/VW_02.jpg",
    sections: [],
  },
};

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: [0.22, 0.61, 0.36, 1],
    },
  },
};

export default function WorkPage({
  params,
}: {
  params: { slug: string };
}) {
  const config = WORKS[params.slug];
  const { theme } = useTheme();
  const heroContainerRef = useRef<HTMLDivElement>(null);

  // Scroll animation for hero container
  const { scrollYProgress } = useScroll({
    target: heroContainerRef,
    offset: ["start end", "start start"]
  });

  // Transform values for the outer container margin
  const containerMarginX = useTransform(scrollYProgress, [0.3, 1], [60, 0]);
  // Transform values for the inner padding
  const containerPaddingX = useTransform(scrollYProgress, [0.3, 1], [40, 100]);
  const containerPaddingY = useTransform(scrollYProgress, [0.3, 1], [40, 120]);
  const containerBorderRadius = useTransform(scrollYProgress, [0.3, 1], [20, 0]);

  if (!config) {
    notFound();
  }

  const currentHeroImage = theme === "dark" ? config.heroImageDark : config.heroImage;

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-transparent pt-[160px] pb-[80px] md:pb-0">
        <div className="max-w-[1920px] mx-auto px-0">
          <div className="w-full px-[100px] mb-[100px] grid grid-cols-1 lg:grid-cols-3 gap-[80px] items-end">
            {/* Left side: Tenzir + Headline - 2 columns */}
            <div className="lg:col-span-2 flex flex-col">
              <motion.p
                className="font-sans text-[22px] font-semibold text-[var(--color-8)] mb-[16px]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
              >
                {config.overline}
              </motion.p>

              <motion.h1
                className="font-serif text-[40px] sm:text-[48px] md:text-[56px] lg:text-[64px] xl:text-[72px] text-[var(--color-8)] tracking-[-0.2px] sm:tracking-[-0.48px] md:tracking-[-0.56px] lg:tracking-[-0.64px] xl:tracking-[-0.72px] leading-[50px] sm:leading-[60px] md:leading-[70px] lg:leading-[80px] xl:leading-[88px]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 0.61, 0.36, 1] }}
              >
                {config.title}
              </motion.h1>
            </div>

            {/* Right side: Tags - 1 column */}
            <motion.div
              className="flex flex-wrap gap-[6px] lg:justify-end lg:content-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
            >
              {config.tags.map((tag) => {
                // Remove " Design" from tags on mobile
                const mobileTag = tag.replace(/ Design$/, '');
                
                return (
                  <div
                    key={tag}
                    className="border border-[var(--color-94)] flex h-[28px] items-center px-[12px] py-[6px] rounded-[40px] shrink-0"
                  >
                    {/* Mobile version - without "Design" */}
                    <p className="block md:hidden font-sans text-sans-12-medium text-[var(--color-8)] text-center tracking-[-0.12px] leading-[20px] whitespace-pre">
                      {mobileTag}
                    </p>
                    {/* Desktop version - full tag */}
                    <p className="hidden md:block font-sans text-sans-12-medium text-[var(--color-8)] text-center tracking-[-0.12px] leading-[20px] whitespace-pre">
                      {tag}
                    </p>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Hero Image Container with Scroll Animation */}
          <motion.div
            ref={heroContainerRef}
            style={{
              paddingLeft: containerMarginX,
              paddingRight: containerMarginX,
            }}
          >
            <motion.div
              className="relative w-full bg-[var(--color-94)] overflow-hidden"
              style={{
                paddingLeft: containerPaddingX,
                paddingRight: containerPaddingX,
                paddingTop: containerPaddingY,
                paddingBottom: containerPaddingY,
                borderRadius: containerBorderRadius,
              }}
            >
            <style dangerouslySetInnerHTML={{
              __html: `
                .hero-image {
                  border-radius: 12px;
                }
                @media (min-width: 768px) {
                  .hero-image {
                    border-radius: 16px;
                  }
                }
                @media (min-width: 1024px) {
                  .hero-image {
                    border-radius: 20px;
                  }
                }
              `
            }} />
            <motion.div
              className="hero-image relative w-full overflow-hidden border-4"
              style={{ 
                backgroundColor: 'transparent',
                borderColor: 'var(--color-0-80)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                boxSizing: 'border-box'
              }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
            >
              <Image
                src={currentHeroImage}
                alt={config.title}
                width={1920}
                height={1080}
                className="w-full h-auto object-cover"
                priority
                quality={100}
                unoptimized={true}
              />
            </motion.div>
          </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="relative bg-[var(--color-96)] py-[80px] md:py-[120px] xl:py-[160px]">
        <div className="max-w-[1920px] mx-auto px-[16px] sm:px-[40px] lg:px-[60px] 2xl:px-[100px]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-[40px] mb-[120px]">
            {/* Column 1-2: Summary (spans 2 columns) */}
            <motion.div
              className="flex flex-col gap-[24px] lg:col-span-2 max-w-[880px]"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUpVariants}
            >
              <h2 className="font-sans text-[16px] sm:text-[17px] md:text-[18px] font-semibold text-[var(--color-8)] tracking-[-0.24px] sm:tracking-[-0.255px] md:tracking-[-0.27px] leading-[26px] sm:leading-[28px] md:leading-[30px]">
                Summary
              </h2>
              <p className="font-sans text-[22px] text-[var(--color-8)] font-normal tracking-[-0.33px] leading-[35px]">
                {config.description}
              </p>
            </motion.div>

            {/* Column 3: Year, Roles and Contributions */}
            <motion.div
              className="flex flex-col gap-[32px]"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                ...fadeInUpVariants,
                visible: {
                  ...fadeInUpVariants.visible,
                  transition: {
                    ...fadeInUpVariants.visible.transition,
                    delay: 0.1,
                  },
                },
              }}
            >
              <div className="flex flex-col gap-[8px]">
                <p className="font-sans text-[16px] sm:text-[17px] md:text-[18px] font-semibold text-[var(--color-8)] tracking-[-0.24px] sm:tracking-[-0.255px] md:tracking-[-0.27px] leading-[26px] sm:leading-[28px] md:leading-[30px]">
                  Year
                </p>
                <p className="font-sans text-[16px] sm:text-[17px] md:text-[18px] font-normal text-[var(--color-8)] tracking-[-0.24px] sm:tracking-[-0.255px] md:tracking-[-0.27px] leading-[26px] sm:leading-[28px] md:leading-[30px]">
                  {config.year}
                </p>
              </div>

              <div className="flex flex-col gap-[8px]">
                <p className="font-sans text-[16px] sm:text-[17px] md:text-[18px] font-semibold text-[var(--color-8)] tracking-[-0.24px] sm:tracking-[-0.255px] md:tracking-[-0.27px] leading-[26px] sm:leading-[28px] md:leading-[30px]">
                  Roles
                </p>
                <p className="font-sans text-[16px] sm:text-[17px] md:text-[18px] font-normal text-[var(--color-8)] tracking-[-0.24px] sm:tracking-[-0.255px] md:tracking-[-0.27px] leading-[26px] sm:leading-[28px] md:leading-[30px]">
                  {config.role}
                </p>
              </div>

              <div className="flex flex-col gap-[8px]">
                <p className="font-sans text-[16px] sm:text-[17px] md:text-[18px] font-semibold text-[var(--color-8)] tracking-[-0.24px] sm:tracking-[-0.255px] md:tracking-[-0.27px] leading-[26px] sm:leading-[28px] md:leading-[30px]">
                  Contributions
                </p>
                <p className="font-sans text-[16px] sm:text-[17px] md:text-[18px] font-normal text-[var(--color-8)] tracking-[-0.24px] sm:tracking-[-0.255px] md:tracking-[-0.27px] leading-[26px] sm:leading-[28px] md:leading-[30px]">
                  {config.contributions}
                </p>
              </div>
            </motion.div>
          </div>

          {/* 2x3 Grid with 6 images - Full Width */}
          <div className="grid grid-cols-3 grid-rows-2 gap-[40px]">
            <style dangerouslySetInnerHTML={{
              __html: `
                .summary-grid-image {
                  border-radius: 6px;
                }
                @media (min-width: 768px) {
                  .summary-grid-image {
                    border-radius: 8px;
                  }
                }
                @media (min-width: 1024px) {
                  .summary-grid-image {
                    border-radius: 10px;
                  }
                }
              `
            }} />
            <motion.div 
              className="summary-grid-image relative overflow-hidden border-4" 
              style={{ 
                backgroundColor: 'transparent',
                borderColor: 'var(--color-0-80)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                boxSizing: 'border-box'
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                ...fadeInUpVariants,
                visible: {
                  ...fadeInUpVariants.visible,
                  transition: {
                    ...fadeInUpVariants.visible.transition,
                    delay: 0,
                  },
                },
              }}
            >
              <Image
                src="/images/tenzir/Tenzir_07.jpg"
                alt="Tenzir Screen 1"
                width={400}
                height={300}
                className="w-full h-auto object-cover"
                quality={100}
                unoptimized={true}
              />
            </motion.div>
            <motion.div 
              className="summary-grid-image relative overflow-hidden border-4" 
              style={{ 
                backgroundColor: 'transparent',
                borderColor: 'var(--color-0-80)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                boxSizing: 'border-box'
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                ...fadeInUpVariants,
                visible: {
                  ...fadeInUpVariants.visible,
                  transition: {
                    ...fadeInUpVariants.visible.transition,
                    delay: 0.1,
                  },
                },
              }}
            >
              <Image
                src="/images/tenzir/Tenzir_06.jpg"
                alt="Tenzir Screen 2"
                width={400}
                height={300}
                className="w-full h-auto object-cover"
                quality={100}
                unoptimized={true}
              />
            </motion.div>
            <motion.div 
              className="summary-grid-image relative overflow-hidden border-4" 
              style={{ 
                backgroundColor: 'transparent',
                borderColor: 'var(--color-0-80)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                boxSizing: 'border-box'
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                ...fadeInUpVariants,
                visible: {
                  ...fadeInUpVariants.visible,
                  transition: {
                    ...fadeInUpVariants.visible.transition,
                    delay: 0.2,
                  },
                },
              }}
            >
              <Image
                src="/images/tenzir/Tenzir_09.jpg"
                alt="Tenzir Screen 3"
                width={400}
                height={300}
                className="w-full h-auto object-cover"
                quality={100}
                unoptimized={true}
              />
            </motion.div>
            <motion.div 
              className="summary-grid-image relative overflow-hidden border-4" 
              style={{ 
                backgroundColor: 'transparent',
                borderColor: 'var(--color-0-80)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                boxSizing: 'border-box'
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                ...fadeInUpVariants,
                visible: {
                  ...fadeInUpVariants.visible,
                  transition: {
                    ...fadeInUpVariants.visible.transition,
                    delay: 0.3,
                  },
                },
              }}
            >
              <Image
                src="/images/tenzir/Tenzir_10.jpg"
                alt="Tenzir Screen 4"
                width={400}
                height={300}
                className="w-full h-auto object-cover"
                quality={100}
                unoptimized={true}
              />
            </motion.div>
            <motion.div 
              className="summary-grid-image relative overflow-hidden border-4" 
              style={{ 
                backgroundColor: 'transparent',
                borderColor: 'var(--color-0-80)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                boxSizing: 'border-box'
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                ...fadeInUpVariants,
                visible: {
                  ...fadeInUpVariants.visible,
                  transition: {
                    ...fadeInUpVariants.visible.transition,
                    delay: 0.4,
                  },
                },
              }}
            >
              <Image
                src="/images/tenzir/Tenzir_08.jpg"
                alt="Tenzir Screen 5"
                width={400}
                height={300}
                className="w-full h-auto object-cover"
                quality={100}
                unoptimized={true}
              />
            </motion.div>
            <motion.div 
              className="summary-grid-image relative overflow-hidden border-4" 
              style={{ 
                backgroundColor: 'transparent',
                borderColor: 'var(--color-0-80)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                boxSizing: 'border-box'
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                ...fadeInUpVariants,
                visible: {
                  ...fadeInUpVariants.visible,
                  transition: {
                    ...fadeInUpVariants.visible.transition,
                    delay: 0.5,
                  },
                },
              }}
            >
              <Image
                src="/images/tenzir/Tenzir_11.jpg"
                alt="Tenzir Screen 6"
                width={400}
                height={300}
                className="w-full h-auto object-cover"
                quality={100}
                unoptimized={true}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      {config.sections.map((section, index) => {
        const bgColor = section.backgroundColor === "white" 
          ? "var(--color-100)" 
          : section.backgroundColor === "light" 
          ? "var(--color-96)" 
          : "var(--color-98)";
        
        return (
          <section
            key={index}
            className="relative py-[80px] md:py-[120px]"
            style={{ backgroundColor: bgColor }}
          >
            <div className="max-w-[1920px] mx-auto px-[16px] sm:px-[40px] lg:px-[60px] 2xl:px-[100px]">
              {section.type === "text" && (
                <motion.div
                  className="max-w-[800px] mx-auto text-center"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={fadeInUpVariants}
                >
                  {section.title && (
                    <h2 className="font-serif text-[32px] sm:text-[36px] md:text-[40px] lg:text-[44px] xl:text-[48px] text-[var(--color-8)] tracking-[-0.16px] sm:tracking-[-0.18px] md:tracking-[-0.20px] lg:tracking-[-0.22px] xl:tracking-[-0.24px] leading-[40px] sm:leading-[45px] md:leading-[50px] lg:leading-[55px] xl:leading-[60px] mb-[16px]">
                      {section.title}
                    </h2>
                  )}
                  {section.subtitle && (
                    <p className="font-sans text-[16px] sm:text-[17px] md:text-[18px] lg:text-[20px] xl:text-[22px] text-[var(--color-8)] font-medium tracking-[-0.24px] sm:tracking-[-0.255px] md:tracking-[-0.27px] lg:tracking-[-0.35px] xl:tracking-[-0.44px] leading-[26px] sm:leading-[28px] md:leading-[30px] lg:leading-[33px] xl:leading-[36px] mb-[24px]">
                      {section.subtitle}
                    </p>
                  )}
                  {section.text && (
                    <p className="font-sans text-[20px] text-[var(--color-8)] font-normal tracking-[-0.3px] leading-[32px]">
                      {section.text}
                    </p>
                  )}
                </motion.div>
              )}

              {section.type === "image" && section.image && (
                <>
                  <style dangerouslySetInnerHTML={{
                    __html: `
                      .content-image {
                        border-radius: 12px;
                      }
                      @media (min-width: 768px) {
                        .content-image {
                          border-radius: 16px;
                        }
                      }
                      @media (min-width: 1024px) {
                        .content-image {
                          border-radius: 20px;
                        }
                      }
                    `
                  }} />
                  <motion.div
                    className="content-image relative w-full overflow-hidden border-4"
                    style={{ 
                      backgroundColor: 'transparent',
                      borderColor: 'var(--color-0-80)',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      boxSizing: 'content-box'
                    }}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUpVariants}
                  >
                    <Image
                      src={theme === "dark" && section.imageDark ? section.imageDark : section.image}
                      alt={section.title || "Content image"}
                      width={1920}
                      height={1080}
                      className="w-full h-auto object-cover"
                      quality={100}
                      unoptimized={true}
                    />
                  </motion.div>
                </>
              )}

              {section.type === "grid" && section.images && (
                <div
                  className={`grid gap-[20px] ${
                    section.gridCols === 2
                      ? "grid-cols-1 md:grid-cols-2"
                      : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                  }`}
                >
                  <style dangerouslySetInnerHTML={{
                    __html: `
                      .grid-image {
                        border-radius: 6px;
                      }
                      @media (min-width: 768px) {
                        .grid-image {
                          border-radius: 8px;
                        }
                      }
                      @media (min-width: 1024px) {
                        .grid-image {
                          border-radius: 10px;
                        }
                      }
                    `
                  }} />
                  {section.images.map((img, imgIndex) => (
                    <motion.div
                      key={imgIndex}
                      className="grid-image relative overflow-hidden border-4"
                      style={{ 
                        backgroundColor: 'transparent',
                        borderColor: 'var(--color-0-80)',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                        boxSizing: 'content-box'
                      }}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-100px" }}
                      variants={{
                        ...fadeInUpVariants,
                        visible: {
                          ...fadeInUpVariants.visible,
                          transition: {
                            ...fadeInUpVariants.visible.transition,
                            delay: imgIndex * 0.1,
                          },
                        },
                      }}
                    >
                      <Image
                        src={theme === "dark" && img.srcDark ? img.srcDark : img.src}
                        alt={`Screen ${imgIndex + 1}`}
                        width={800}
                        height={600}
                        className="w-full h-auto object-cover"
                        quality={100}
                        unoptimized={true}
                      />
                    </motion.div>
                  ))}
                </div>
              )}

              {section.type === "text-image" && (
                <div className="flex flex-col gap-[80px]">
                  {/* First Row: Headlines (left) + Text (right) */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-[40px] lg:gap-[80px] items-start">
                    {/* Left: Overline + Title */}
                    <motion.div
                      className="flex flex-col gap-[16px]"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-100px" }}
                      variants={fadeInUpVariants}
                    >
                      {section.overline && (
                        <p className="font-sans text-[16px] sm:text-[17px] md:text-[18px] font-semibold text-[var(--color-8)] tracking-[-0.24px] sm:tracking-[-0.255px] md:tracking-[-0.27px] leading-[26px] sm:leading-[28px] md:leading-[30px]">
                          {section.overline}
                        </p>
                      )}
                      {section.title && (
                        <h2 className="font-serif text-[32px] sm:text-[36px] md:text-[40px] lg:text-[44px] xl:text-[48px] text-[var(--color-8)] tracking-[-0.16px] sm:tracking-[-0.18px] md:tracking-[-0.20px] lg:tracking-[-0.22px] xl:tracking-[-0.24px] leading-[40px] sm:leading-[45px] md:leading-[50px] lg:leading-[55px] xl:leading-[60px]">
                          {section.title.split('\n').map((line, idx) => (
                            <span key={idx}>
                              {line}
                              {idx < section.title.split('\n').length - 1 && <br />}
                            </span>
                          ))}
                        </h2>
                      )}
                    </motion.div>

                    {/* Right: Text */}
                    <div className="flex flex-col gap-[24px] pt-[48px]">
                      {section.text && section.text.split('\n\n').map((paragraph, idx) => (
                        <motion.p
                          key={idx}
                          className="font-sans text-[20px] text-[var(--color-8)] font-normal tracking-[-0.3px] leading-[32px]"
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true, margin: "-100px" }}
                          variants={{
                            ...fadeInUpVariants,
                            visible: {
                              ...fadeInUpVariants.visible,
                              transition: {
                                ...fadeInUpVariants.visible.transition,
                                delay: 0.2 + idx * 0.1,
                              },
                            },
                          }}
                        >
                          {paragraph}
                        </motion.p>
                      ))}
                    </div>
                  </div>

                  {/* Second Row: Comparison slider or regular images */}
                  {section.beforeImage && section.afterImage ? (
                    <motion.div
                      className="flex flex-col gap-[24px]"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-100px" }}
                      variants={{
                        ...fadeInUpVariants,
                        visible: {
                          ...fadeInUpVariants.visible,
                          transition: {
                            ...fadeInUpVariants.visible.transition,
                            delay: 0.4,
                          },
                        },
                      }}
                    >
                      <ImageComparison
                        beforeImage={section.beforeImage}
                        afterImage={section.afterImage}
                        beforeLabel={section.beforeLabel}
                        afterLabel={section.afterLabel}
                      />
                      {(section.beforeLabel || section.afterLabel) && (
                        <p className="font-sans text-[16px] text-[var(--color-8)] font-medium tracking-[-0.24px] leading-[26px] text-left">
                          {section.beforeLabel} vs. {section.afterLabel}
                        </p>
                      )}
                    </motion.div>
                  ) : section.images && section.images.length > 0 && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-[40px] lg:gap-[80px]">
                    <style dangerouslySetInnerHTML={{
                      __html: `
                        .text-image-container {
                          border-radius: 6px;
                        }
                        @media (min-width: 768px) {
                          .text-image-container {
                            border-radius: 8px;
                          }
                        }
                        @media (min-width: 1024px) {
                          .text-image-container {
                            border-radius: 10px;
                          }
                        }
                      `
                    }} />
                    {section.images?.map((img, imgIndex) => (
                      <motion.div
                        key={imgIndex}
                        className="flex flex-col gap-[24px]"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={{
                          ...fadeInUpVariants,
                          visible: {
                            ...fadeInUpVariants.visible,
                            transition: {
                              ...fadeInUpVariants.visible.transition,
                              delay: 0.2 + imgIndex * 0.1,
                            },
                          },
                        }}
                      >
                        <div className="text-image-container relative overflow-hidden border-4" style={{ 
                          backgroundColor: 'transparent',
                          borderColor: 'var(--color-0-80)',
                          backdropFilter: 'blur(10px)',
                          WebkitBackdropFilter: 'blur(10px)',
                          boxSizing: 'content-box'
                        }}>
                          <Image
                            src={theme === "dark" && img.srcDark ? img.srcDark : img.src}
                            alt={img.caption || `Image ${imgIndex + 1}`}
                            width={800}
                            height={600}
                            className="w-full h-auto object-cover"
                            quality={100}
                            unoptimized={true}
                          />
                        </div>
                        {img.caption && (
                          <p className="font-sans text-[16px] text-[var(--color-8)] font-medium tracking-[-0.24px] leading-[26px] text-left">
                            {img.caption}
                          </p>
                        )}
                      </motion.div>
                    ))}
                  </div>
                  )}

                  {/* Multiple Full Width Images */}
                  {section.fullWidthImages && section.fullWidthImages.length > 0 && (
                    <div className="flex flex-col gap-[80px]">
                      <style dangerouslySetInnerHTML={{
                        __html: `
                          .full-width-image-multi {
                            border-radius: 12px;
                          }
                          @media (min-width: 768px) {
                            .full-width-image-multi {
                              border-radius: 16px;
                            }
                          }
                          @media (min-width: 1024px) {
                            .full-width-image-multi {
                              border-radius: 20px;
                            }
                          }
                        `
                      }} />
                      {section.fullWidthImages.map((img, imgIndex) => (
                        <motion.div
                          key={imgIndex}
                          className={`full-width-image-multi relative w-full overflow-hidden ${!img.noBorder ? 'border-4' : ''}`}
                          style={!img.noBorder ? { 
                            backgroundColor: 'transparent',
                            borderColor: 'var(--color-0-80)',
                            backdropFilter: 'blur(10px)',
                            WebkitBackdropFilter: 'blur(10px)',
                            boxSizing: 'border-box'
                          } : {}}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true, margin: "-100px" }}
                          variants={{
                            ...fadeInUpVariants,
                            visible: {
                              ...fadeInUpVariants.visible,
                              transition: {
                                ...fadeInUpVariants.visible.transition,
                                delay: 0.4 + imgIndex * 0.1,
                              },
                            },
                          }}
                        >
                          {img.isVideo ? (
                            <video
                              autoPlay
                              loop
                              muted
                              playsInline
                              poster={img.fallbackImage}
                              className="w-full h-auto object-cover"
                              onLoadedMetadata={(e) => {
                                const video = e.currentTarget;
                                const observer = new IntersectionObserver(
                                  (entries) => {
                                    entries.forEach((entry) => {
                                      if (entry.isIntersecting) {
                                        video.play();
                                      } else {
                                        video.pause();
                                      }
                                    });
                                  },
                                  { threshold: 0.5 }
                                );
                                observer.observe(video);
                              }}
                            >
                              <source src={img.src} type="video/mp4" />
                              {img.fallbackImage && (
                                <Image
                                  src={img.fallbackImage}
                                  alt={`Fallback image ${imgIndex + 1}`}
                                  width={1920}
                                  height={1080}
                                  className="w-full h-auto object-cover"
                                  quality={100}
                                  unoptimized={true}
                                />
                              )}
                            </video>
                          ) : (
                            <Image
                              src={theme === "dark" && img.srcDark ? img.srcDark : img.src}
                              alt={`Full width image ${imgIndex + 1}`}
                              width={1920}
                              height={1080}
                              className="w-full h-auto object-cover"
                              quality={100}
                              unoptimized={true}
                            />
                          )}
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/* Full Width Image and Image Rows */}
                  {section.fullWidthImage && (
                    <motion.div
                      className="flex flex-col gap-[80px]"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-100px" }}
                      variants={{
                        ...fadeInUpVariants,
                        visible: {
                          ...fadeInUpVariants.visible,
                          transition: {
                            ...fadeInUpVariants.visible.transition,
                            delay: 0.4,
                          },
                        },
                      }}
                    >
                      <style dangerouslySetInnerHTML={{
                        __html: `
                          .full-width-image {
                            border-radius: 12px;
                          }
                          @media (min-width: 768px) {
                            .full-width-image {
                              border-radius: 16px;
                            }
                          }
                          @media (min-width: 1024px) {
                            .full-width-image {
                              border-radius: 20px;
                            }
                          }
                        `
                      }} />
                      {/* Full Width Image */}
                      <div className="full-width-image relative w-full overflow-hidden border-4" style={{ 
                        backgroundColor: 'transparent',
                        borderColor: 'var(--color-0-80)',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                        boxSizing: 'border-box'
                      }}>
                        <Image
                          src={theme === "dark" && section.fullWidthImageDark ? section.fullWidthImageDark : section.fullWidthImage}
                          alt={section.title || "Full width image"}
                          width={1920}
                          height={1080}
                          className="w-full h-auto object-cover"
                          quality={100}
                          unoptimized={true}
                        />
                      </div>

                      {/* Image Rows */}
                      {section.imageRows?.map((row, rowIndex) => (
                        <div key={rowIndex} className="grid grid-cols-1 lg:grid-cols-2 gap-[40px] lg:gap-[80px]">
                          <style dangerouslySetInnerHTML={{
                            __html: `
                              .row-image {
                                border-radius: 6px;
                              }
                              @media (min-width: 768px) {
                                .row-image {
                                  border-radius: 8px;
                                }
                              }
                              @media (min-width: 1024px) {
                                .row-image {
                                  border-radius: 10px;
                                }
                              }
                            `
                          }} />
                          {row.map((img, imgIndex) => (
                            <div key={imgIndex} className="row-image relative overflow-hidden border-4" style={{ 
                              backgroundColor: 'transparent',
                              borderColor: 'var(--color-0-80)',
                              backdropFilter: 'blur(10px)',
                              WebkitBackdropFilter: 'blur(10px)',
                              boxSizing: 'border-box'
                            }}>
                              <Image
                                src={theme === "dark" && img.srcDark ? img.srcDark : img.src}
                                alt={img.caption || `Image ${imgIndex + 1}`}
                                width={800}
                                height={600}
                                className="w-full h-auto object-cover"
                                quality={100}
                                unoptimized={true}
                              />
                            </div>
                          ))}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </div>
              )}

              {section.type === "results" && (
                <div className="flex flex-col items-center">
                  {/* Overline and Title Group */}
                  <div className="flex flex-col gap-[16px] items-center mb-[24px]">
                    {/* Overline */}
                    {section.overline && (
                      <motion.p
                        className="font-sans text-[16px] sm:text-[17px] md:text-[18px] font-semibold text-[var(--color-8)] tracking-[-0.24px] sm:tracking-[-0.255px] md:tracking-[-0.27px] leading-[26px] sm:leading-[28px] md:leading-[30px] text-center"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={{
                          ...fadeInUpVariants,
                          visible: {
                            ...fadeInUpVariants.visible,
                            transition: {
                              ...fadeInUpVariants.visible.transition,
                              delay: 0,
                            },
                          },
                        }}
                      >
                        {section.overline}
                      </motion.p>
                    )}
                    
                    {/* Title */}
                    {section.title && (
                      <motion.h2
                        className="font-serif text-[32px] sm:text-[36px] md:text-[40px] lg:text-[44px] xl:text-[48px] text-[var(--color-8)] tracking-[-0.16px] sm:tracking-[-0.18px] md:tracking-[-0.20px] lg:tracking-[-0.22px] xl:tracking-[-0.24px] leading-[40px] sm:leading-[45px] md:leading-[50px] lg:leading-[55px] xl:leading-[60px] text-center"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={{
                          ...fadeInUpVariants,
                          visible: {
                            ...fadeInUpVariants.visible,
                            transition: {
                              ...fadeInUpVariants.visible.transition,
                              delay: 0.1,
                            },
                          },
                        }}
                      >
                        {section.title}
                      </motion.h2>
                    )}
                  </div>

                  {/* Text with max-width */}
                  {section.text && (
                    <motion.p
                      className="font-sans text-[20px] text-[var(--color-8)] font-normal tracking-[-0.3px] leading-[32px] text-center max-w-[960px] mb-[120px]"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-100px" }}
                      variants={{
                        ...fadeInUpVariants,
                        visible: {
                          ...fadeInUpVariants.visible,
                          transition: {
                            ...fadeInUpVariants.visible.transition,
                            delay: 0.2,
                          },
                        },
                      }}
                    >
                      {section.text}
                    </motion.p>
                  )}

                  {/* Metrics Grid */}
                  {section.metrics && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-[60px] w-full">
                      {section.metrics.map((metric, idx) => (
                        <motion.div
                          key={idx}
                          className="flex flex-col items-center gap-[16px]"
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true, margin: "-100px" }}
                          variants={{
                            ...fadeInUpVariants,
                            visible: {
                              ...fadeInUpVariants.visible,
                              transition: {
                                ...fadeInUpVariants.visible.transition,
                                delay: 0.3 + idx * 0.1,
                              },
                            },
                          }}
                        >
                          <CounterAnimation
                            value={metric.value}
                            className="font-serif text-[64px] md:text-[72px] lg:text-[80px] text-[var(--color-8)] tracking-[-0.64px] leading-[1]"
                          />
                          <p className="font-sans text-[18px] text-[var(--color-8)] font-normal tracking-[-0.27px] leading-[30px] text-center">
                            {metric.label}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>
        );
      })}

      {/* Project Footer Section */}
      <section className="relative bg-[var(--color-96)] py-[40px]">
        <div className="max-w-[960px] mx-auto px-[16px] sm:px-[40px] lg:px-[60px] 2xl:px-[100px]">
          <div className="flex flex-col items-center gap-[32px]">
            <motion.p
              className="font-sans text-[20px] text-[var(--color-8)] font-semibold tracking-[-0.3px] leading-[32px] text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUpVariants}
            >
              You've reached the end. Thanks for watching!
            </motion.p>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                ...fadeInUpVariants,
                visible: {
                  ...fadeInUpVariants.visible,
                  transition: {
                    ...fadeInUpVariants.visible.transition,
                    delay: 0.1,
                  },
                },
              }}
            >
              <PrimaryButton href="/work/porsche">
                Go to Next Project
              </PrimaryButton>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Disclaimer Section */}
      <section className="relative bg-[var(--color-96)] pt-[80px]">
        <div className="max-w-[960px] mx-auto px-[16px] sm:px-[40px] lg:px-[60px] 2xl:px-[100px]">
          <motion.p
            className="font-sans text-[12px] text-[var(--color-44)] font-normal leading-[18px] text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUpVariants}
          >
            The photos shown are from a project I contributed to and are presented solely for the purpose of showcasing my work. All photo rights are owned by Tenzir GmbH. The use of these visuals is strictly non-commercial and intended for illustrative purposes only within this portfolio.
          </motion.p>
        </div>
      </section>

      <div className="relative w-full" style={{ background: 'var(--color-96)' }}>
        <FooterBackground />
        <div 
          className="absolute inset-0 z-[1]"
          style={{
            background: `linear-gradient(to bottom, var(--color-96), var(--color-96-50))`,
          }}
        />
        <div className="max-w-[1920px] mx-auto relative z-[2]">
          <Footer version="Portfolio" />
        </div>
      </div>
    </>
  );
}
