"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import {
  AnimatedHeadlineFadeInBottom,
  AnimatedParagraphFadeInBottom,
} from "@/app/components/AnimatedText";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import { useTheme } from "../../theme-provider";
import { Footer } from "../../components/Footer";
import { FooterBackground } from "../../components/FooterBackground";

type WorkConfig = {
  title: string;
  overline: string;
  tags: string[];
  heroImage: string;
  heroImageAlt: string;
};

const WORKS: Record<string, WorkConfig> = {
  tenzir: {
    title: "Building an AI-powered data pipelines platform",
    overline: "Tenzir — Cyber security",
    tags: ["Product Design", "UX/UI Design", "AI"],
    heroImage: "/images/tenzir/Tenzir_01.jpg",
    heroImageAlt: "/images/tenzir/Tenzir_02.jpg",
  },
  porsche: {
    title: "Transforming global learning and customer experience",
    overline: "Porsche — Automotive",
    tags: ["Product Design", "UX Strategy", "Research"],
    heroImage: "/images/porsche/Porsche_01.jpg",
    heroImageAlt: "/images/porsche/Porsche_02.jpg",
  },
  vario: {
    title: "Simplifying investing in stocks and crypto",
    overline: "Vario — Fintech",
    tags: ["Product Design", "UX/UI", "Brand"],
    heroImage: "/images/vario/Vario_01.png",
    heroImageAlt: "/images/vario/Vario_02.png",
  },
  vw: {
    title: "Designing digital experiences for global audiences",
    overline: "Volkswagen — Automotive",
    tags: ["UX/UI Design", "Product Design"],
    heroImage: "/images/vw/VW_01.png",
    heroImageAlt: "/images/vw/VW_02.jpg",
  },
};

const contentVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 0.61, 0.36, 1],
    },
  },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.15,
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
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isPrimaryScaled, setIsPrimaryScaled] = useState(false);
  const [isSecondaryHovered, setIsSecondaryHovered] = useState(false);

  if (!config) {
    notFound();
  }

  const heroRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const padding = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const radius = useTransform(scrollYProgress, [0, 1], [32, 0]);

  // Determine which image to use based on theme
  const currentHeroImage = theme === "dark" && config.heroImageAlt
    ? config.heroImageAlt // Use light variant in dark mode
    : config.heroImage; // Use dark variant in light mode or if no alt

  return (
    <>
      <div className="min-h-screen bg-[var(--color-96)] pb-24">
        <div className="max-w-[1920px] mx-auto">
        <div className="mx-auto max-w-6xl px-[16px] sm:px-[40px] lg:px-[60px] pt-28">
          <motion.div
            ref={heroRef}
            style={{
              paddingTop: padding,
              paddingBottom: padding,
            }}
            className="transition-colors"
          >
            <motion.div
              style={{ borderRadius: radius }}
              className="group relative overflow-hidden bg-[var(--color-100)] shadow-[0_24px_60px_rgba(0,0,0,0.18)] max-w-[480px] mx-auto"
            >
              <Image
                src={currentHeroImage}
                alt={config.title}
                width={1600}
                height={900}
                className="h-auto w-full object-cover transition-opacity duration-500 ease-out group-hover:opacity-0"
                priority
                quality={100}
                unoptimized={true}
              />
              <Image
                src={theme === "dark" ? config.heroImage : config.heroImageAlt}
                alt={config.title}
                width={1600}
                height={900}
                className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
                priority
                quality={100}
                unoptimized={true}
              />
            </motion.div>
          </motion.div>

          <AnimatePresence>
            <motion.section
              className="mt-12 max-w-4xl"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.p
                variants={contentVariants}
                className="font-sans text-[12px] md:text-[14px] uppercase tracking-[0.18em] text-[var(--color-56)]"
              >
                {config.overline}
              </motion.p>
              <motion.h1
                variants={contentVariants}
                className="mt-4 font-serif text-[32px] md:text-[40px] lg:text-[48px] text-[var(--color-8)] tracking-[-0.16px] md:tracking-[-0.20px] lg:tracking-[-0.24px] leading-[40px] md:leading-[50px] lg:leading-[60px]"
              >
                {config.title}
              </motion.h1>

              <motion.div
                variants={contentVariants}
                className="mt-5 flex flex-wrap gap-2"
              >
                {config.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[var(--color-98)] px-3 py-1 font-sans text-[12px] md:text-[14px] font-medium text-[var(--color-44)] leading-[20px] tracking-[-0.12px] md:tracking-[-0.14px]"
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>

              <motion.div
                variants={contentVariants}
                className="mt-10 grid gap-6 md:grid-cols-[minmax(0,_3fr)_minmax(0,_2fr)]"
              >
                <p className="font-sans text-[14px] md:text-[16px] font-normal text-[var(--color-44)] tracking-[-0.21px] md:tracking-[-0.24px] leading-[22px] md:leading-[26px]">
                  This is a placeholder case study layout. The final content will
                  cover the problem space, design process, and outcomes in depth,
                  including research insights, key decisions, and measurable
                  impact.
                </p>
                <p className="font-sans text-[12px] md:text-[14px] text-[var(--color-56)] tracking-[-0.12px] md:tracking-[-0.14px] leading-[20px] md:leading-[22px]">
                  For the protected projects, details are intentionally kept
                  high-level. If you&apos;d like to learn more, I&apos;m happy to
                  walk you through the full story in a live session.
                </p>
              </motion.div>
            </motion.section>
          </AnimatePresence>
        </div>
        </div>
      </div>

      {/* About / Contact Section */}
      <section className="bg-[var(--color-100)] flex flex-col items-center justify-center px-0 py-[80px] md:py-[120px] relative w-full z-[2]">
        <div className="max-w-[1920px] mx-auto w-full">
        <div className="flex flex-col gap-[40px] items-center max-w-[880px] px-[16px] sm:px-[40px] lg:px-[60px] py-0 relative w-full">
          <AnimatedHeadlineFadeInBottom className="font-serif text-[40px] md:text-[56px] lg:text-[72px] text-[var(--color-8)] text-center tracking-[-0.2px] md:tracking-[-0.56px] lg:tracking-[-0.72px] leading-[50px] md:leading-[70px] lg:leading-[88px]">
            Pioneering the uncharted
          </AnimatedHeadlineFadeInBottom>
          <div 
            className="group h-[360px] md:h-[666px] max-h-[360px] md:max-h-[666px] max-w-[260px] md:max-w-[480px] relative rounded-[1000px] shrink-0 w-[260px] md:w-[480px] overflow-hidden"
            style={{ 
              backgroundColor: theme === "dark" ? "var(--color-100)" : "var(--color-8)" 
            }}
          >
            <Image
              src={theme === "dark" ? "/images/home/pascalmeyer_day_side.jpg" : "/images/home/pascalmeyer_night_side.jpg"}
              alt="Pascal Meyer"
              fill
              className="object-cover transition-opacity duration-500 ease-out group-hover:opacity-0"
              quality={100}
              unoptimized={true}
              style={{
                imageRendering: '-webkit-optimize-contrast',
              }}
            />
            <Image
              src={theme === "dark" ? "/images/home/pascalmeyer_day_front.jpg" : "/images/home/pascalmeyer_night_front.jpg"}
              alt="Pascal Meyer"
              fill
              className="absolute inset-0 object-cover opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
              quality={100}
              unoptimized={true}
              style={{
                imageRendering: '-webkit-optimize-contrast',
              }}
            />
          </div>
          <div className="flex flex-col gap-[20px] items-start text-[var(--color-8)] text-center w-full">
            <AnimatedParagraphFadeInBottom 
              as="p"
              className="font-sans text-[16px] md:text-[18px] lg:text-[22px] text-[var(--color-8)] font-normal tracking-[-0.24px] md:tracking-[-0.27px] lg:tracking-[-0.44px] leading-[26px] md:leading-[30px] lg:leading-[36px] w-full"
            >
              My passion lies in turning complexity into simplicity. With a background in design, code, business, and strategy, I help teams build products that define their category. For the past 3 years, I have dedicated my time, energy, and research to AI.
            </AnimatedParagraphFadeInBottom>
            <p className="font-sans text-[16px] md:text-[18px] lg:text-[22px] text-[var(--color-8)] font-medium tracking-[-0.24px] md:tracking-[-0.27px] lg:tracking-[-0.44px] leading-[26px] md:leading-[30px] lg:leading-[36px] w-full">
              Let&apos;s build what&apos;s next.
            </p>
          </div>
          <div className="flex gap-[12px] items-start justify-center relative w-full">
            <Link
              href="/contact"
              className="relative inline-flex items-center justify-center rounded-[40px] bg-transparent px-[40px] py-[8px] font-sans text-[14px] md:text-[16px] font-medium text-[var(--color-100)] shadow-sm overflow-hidden tracking-[-0.21px] md:tracking-[-0.24px] leading-[22px] md:leading-[26px]"
              onMouseEnter={() => {
                setIsButtonHovered(true);
                setIsPrimaryScaled(true);
              }}
              onMouseLeave={() => {
                setIsButtonHovered(false);
                setIsPrimaryScaled(false);
              }}
            >
              <span className="relative z-10">Get in Touch</span>
              <span 
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(108deg, var(--color-satoshi) 0%, var(--color-satoshi) 50%, var(--color-8) 50%, var(--color-8) 100%)`,
                  backgroundSize: '250% 200%',
                  backgroundPosition: isButtonHovered ? 'left center' : 'right center',
                  transition: 'background-position 0.5s cubic-bezier(0.22, 0.61, 0.36, 1)',
                }}
              />
            </Link>
            <Link
              href="/about"
              className="relative backdrop-blur-sm backdrop-filter border border-[var(--color-92)] border-solid flex items-center justify-center px-[40px] py-[8px] rounded-[40px] shrink-0"
              style={{
                borderColor: isSecondaryHovered ? 'var(--color-satoshi)' : 'var(--color-92)',
                transition: 'border-color 0.3s cubic-bezier(0.22, 0.61, 0.36, 1)',
              }}
              onMouseEnter={() => setIsSecondaryHovered(true)}
              onMouseLeave={() => setIsSecondaryHovered(false)}
            >
              <p className="font-sans text-[14px] md:text-[16px] font-medium text-[var(--color-16)] text-center tracking-[-0.21px] md:tracking-[-0.24px] leading-[22px] md:leading-[26px] relative z-10">
                <span className="md:hidden">About Me</span>
                <span className="hidden md:inline">More About Me</span>
              </p>
            </Link>
          </div>
        </div>
        </div>
      </section>

      <div className="relative w-full bg-[var(--color-96)]">
        <FooterBackground />
        {/* Gradient overlay: color-96 (top) to color-96@50% (bottom) */}
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

