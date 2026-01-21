"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Footer } from "../components/Footer";
import { FooterBackground } from "../components/FooterBackground";
import { useTheme } from "../theme-provider";
import { AnimatedHeadline } from "../components/AnimatedHeadline";
import {
  AnimatedHeadlineFadeInBottom,
  AnimatedParagraphFadeInBottom,
} from "../components/AnimatedText";

type Experience = {
  id: string;
  company: string;
  role: string;
  period: string;
  image?: string;
};

const WORK_EXPERIENCE: Experience[] = [
  {
    id: "tenzir",
    company: "Tenzir",
    role: "Lead Designer (Freelance)",
    period: "2024 - today",
    image: "/images/about/tenzir.jpg",
  },
  {
    id: "sony",
    company: "Sony Music (Extreme Music)",
    role: "UX/UI Designer (Freelance)",
    period: "2017 - today",
    image: "/images/about/sony-music.jpg",
  },
  {
    id: "porsche",
    company: "Porsche",
    role: "UX Consultant and Lead UX/Product Designer (Freelance)",
    period: "2022 - 2024",
    image: "/images/about/porsche.jpg",
  },
  {
    id: "vw",
    company: "Volkswagen",
    role: "UX/UI Designer (Freelance)",
    period: "2022 - 2023",
    image: "/images/about/vw.jpg",
  },
  {
    id: "metro",
    company: "Metro",
    role: "Lead UX/Product Designer (Freelance)",
    period: "2022",
    image: "/images/about/metro.jpg",
  },
  {
    id: "logitech",
    company: "Logitech",
    role: "UX/UI Designer (Freelance)",
    period: "2022",
    image: "/images/about/logitech.jpg",
  },
  {
    id: "nution",
    company: "Nution",
    role: "Founder",
    period: "2017 - 2023",
    image: "/images/about/nution.jpg",
  },
  {
    id: "ujam",
    company: "UJAM Music Technology",
    role: "Designer, Frontend Developer, and Product Owner",
    period: "2016 - 2020",
    image: "/images/about/ujam.jpg",
  },
];

const EDUCATION = [
  {
    id: "ibm",
    title: "IBM AI Product Manager",
    description: "Certificate",
    period: "2025",
  },
  {
    id: "ravensbourne",
    title: "Ravensbourne University London",
    description: "Master of Design (MDes) in Service Design and Innovation",
    period: "2017 - 2018",
  },
  {
    id: "kw",
    title: "KW Design Akademie Bremen",
    description: "Communication Design (Best of Year)",
    period: "2013 - 2017",
  },
];

type CursorPreview = {
  x: number;
  y: number;
  experience: Experience;
};

export default function AboutPage() {
  const [preview, setPreview] = useState<CursorPreview | null>(null);
  const { theme } = useTheme();
  
  // Calculate years of experience dynamically (started in 2009)
  const yearsOfExperience = new Date().getFullYear() - 2009;

  const handleRowEnter = (exp: Experience) => (e: React.MouseEvent) => {
    if (!exp.image) return;
    setPreview({
      x: e.clientX,
      y: e.clientY,
      experience: exp,
    });
  };

  const handleRowMove = (exp: Experience) => (e: React.MouseEvent) => {
    if (!exp.image) return;
    setPreview({
      x: e.clientX,
      y: e.clientY,
      experience: exp,
    });
  };

  const handleRowLeave = () => setPreview(null);

  // Day Mode (Lightmode): night_side (Standard), night_front (Hover)
  // Night Mode (Darkmode): day_side (Standard), day_front (Hover)
  const portraitSideImage = theme === "dark"
    ? "/images/home/pascalmeyer_day_side.jpg"
    : "/images/home/pascalmeyer_night_side.jpg";
  
  const portraitFrontImage = theme === "dark"
    ? "/images/home/pascalmeyer_day_front.jpg"
    : "/images/home/pascalmeyer_night_front.jpg";

  const imageVariants = {
    hidden: {
      y: 20,
      opacity: 0,
      filter: "grayscale(100%)",
    },
    visible: {
      y: 0,
      opacity: 1,
      filter: "grayscale(0%)",
      transition: {
        delay: 0.2,
        duration: 0.8,
        ease: [0.22, 0.61, 0.36, 1],
      },
    },
  };

  const headlineVariants = {
    hidden: {
      y: 20,
      opacity: 0,
      filter: "blur(10px)",
    },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: 0.1,
        duration: 0.6,
        ease: [0.22, 0.61, 0.36, 1],
      },
    },
  };

  const textVariants = {
    hidden: {
      y: 20,
      opacity: 0,
      filter: "blur(10px)",
    },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: 0.4,
        duration: 0.6,
        ease: [0.22, 0.61, 0.36, 1],
      },
    },
  };

  return (
    <main className="relative min-h-screen">
      {/* Hero Section */}
      <section className="relative z-[5] pb-[40px] xl:pb-[90px] pt-[120px] xl:pt-[70px] xl:min-h-[calc(100vh-82px)]">
        <div className="max-w-[1920px] mx-auto flex flex-col xl:flex-row items-center justify-center gap-[12px] xl:gap-[80px] 2xl:gap-[120px] px-[16px] sm:px-[40px] xl:px-[60px] 2xl:px-[100px] w-full">
          {/* Left Column - Headline (under xl: centered and single line) */}
          <div 
            className="flex flex-col items-center xl:items-start justify-center w-full xl:w-auto xl:max-w-[360px] xl:min-w-[300px] mb-0 xl:mb-0"
            style={{ 
              maxWidth: '800px',
              height: 'auto'
            }}
          >
            <AnimatedHeadline
              className="font-serif text-[40px] sm:text-[48px] md:text-[56px] lg:text-[64px] xl:text-[72px] text-[var(--color-8)] tracking-[-0.2px] sm:tracking-[-0.48px] md:tracking-[-0.56px] lg:tracking-[-0.64px] xl:tracking-[-0.72px] leading-[50px] sm:leading-[60px] md:leading-[70px] lg:leading-[80px] xl:leading-[88px] text-center xl:text-left xl:h-[506px] w-full"
            >
              <span className="xl:hidden inline">In pursuit of <span className="font-serif italic">excellence</span></span>
              <span className="hidden xl:block">In pursuit of<br /><span className="font-serif italic">excellence</span></span>
            </AnimatedHeadline>
          </div>

          {/* Description - under xl: below headline, centered */}
          <motion.p
            className="xl:hidden font-sans text-[18px] md:text-[20px] lg:text-[22px] text-[var(--color-8)] font-medium tracking-[-0.27px] md:tracking-[-0.35px] lg:tracking-[-0.44px] leading-[30px] md:leading-[33px] lg:leading-[36px] text-center w-full mb-[60px] md:mb-[80px]"
            style={{ maxWidth: '800px' }}
            variants={textVariants}
            initial="hidden"
            animate="visible"
          >
            True excellence is the synthesis of diverse disciplines. My {yearsOfExperience}-year
            journey covers product ownership, frontend, consulting, marketing,
            mentoring, and entrepreneurship. This foundation allows me to bridge
            strategy, design, and execution for complex, end-to-end products.
          </motion.p>

          {/* Center - Image */}
          {/* Under xl: Natural aspect ratio */}
          <motion.div
            className="group xl:hidden relative w-full rounded-[10px] overflow-hidden"
            style={{ 
              maxWidth: '640px',
              backgroundColor: theme === 'dark' ? '#FCFFFE' : '#000000'
            }}
            variants={imageVariants}
            initial="hidden"
            animate="visible"
          >
            <Image
              src={portraitSideImage}
              alt="Portrait Pascal Meyer"
              width={720}
              height={960}
              className="w-full h-auto group-hover:opacity-0"
              priority
              quality={100}
              unoptimized={true}
            />
            <Image
              src={portraitFrontImage}
              alt="Portrait Pascal Meyer"
              width={720}
              height={960}
              className="absolute top-0 left-0 w-full h-full object-cover opacity-0 group-hover:opacity-100"
              priority
              quality={100}
              unoptimized={true}
            />
          </motion.div>

          {/* Over xl: Original fixed height layout */}
          <motion.div
            className="hidden xl:flex group relative flex-1 rounded-[10px] overflow-hidden items-center justify-center"
            style={{ 
              height: 'min(calc(100vh - 82px - 80px - 90px), 960px)',
              maxHeight: '960px',
              minHeight: '560px',
              minWidth: '440px',
              backgroundColor: theme === 'dark' ? '#FCFFFE' : '#000000'
            }}
            variants={imageVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="relative w-full h-full" style={{ maxWidth: '720px' }}>
              <Image
                src={portraitSideImage}
                alt="Portrait Pascal Meyer"
                fill
                className="object-cover object-center group-hover:opacity-0"
                priority
                quality={100}
                unoptimized={true}
              />
              <Image
                src={portraitFrontImage}
                alt="Portrait Pascal Meyer"
                fill
                className="object-cover object-center opacity-0 group-hover:opacity-100"
                priority
                quality={100}
                unoptimized={true}
              />
            </div>
          </motion.div>

          {/* Right - Text (only visible on xl and up) */}
          <div className="hidden xl:flex flex-col items-start justify-end max-w-[360px]" style={{ 
            height: 'min(calc(100vh - 82px - 80px - 90px), 960px)',
            maxHeight: '960px'
          }}>
            <motion.p
              className="font-sans text-[18px] md:text-[20px] lg:text-[22px] text-[var(--color-8)] font-medium tracking-[-0.27px] md:tracking-[-0.35px] lg:tracking-[-0.44px] leading-[30px] md:leading-[33px] lg:leading-[36px]"
              variants={textVariants}
              initial="hidden"
              animate="visible"
            >
              True excellence is the synthesis of diverse disciplines. My {yearsOfExperience}-year
              journey covers product ownership, frontend, consulting, marketing,
              mentoring, and entrepreneurship. This foundation allows me to bridge
              strategy, design, and execution for complex, end-to-end products.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section className="relative z-[4] pt-[40px] pb-[80px] md:py-[120px] xl:py-[160px]" style={{ background: 'linear-gradient(to bottom, var(--color-96) 0%, var(--color-98) 100%)' }}>
        <div className="max-w-[880px] xl:max-w-[1920px] mx-auto flex flex-col xl:flex-row gap-[12px] xl:gap-[120px] px-[16px] sm:px-[40px] xl:px-[60px] 2xl:px-[100px] py-0 rounded-[10px]">
          <div className="flex flex-1 items-start">
            <AnimatedHeadlineFadeInBottom
              as="h2"
              className="font-serif text-[32px] sm:text-[36px] md:text-[40px] lg:text-[44px] xl:text-[48px] text-[var(--color-8)] tracking-[-0.16px] sm:tracking-[-0.18px] md:tracking-[-0.20px] lg:tracking-[-0.22px] xl:tracking-[-0.24px] w-full xl:max-w-[560px] leading-[40px] sm:leading-[45px] md:leading-[50px] lg:leading-[55px] xl:leading-[60px]"
            >
              A designer, who is obsessed with the digital world since day one
            </AnimatedHeadlineFadeInBottom>
          </div>
          <div className="flex flex-1 flex-col gap-[24px] font-sans text-[16px] sm:text-[17px] md:text-[18px] lg:text-[20px] xl:text-[22px] text-[var(--color-8)] font-normal tracking-[-0.24px] sm:tracking-[-0.255px] md:tracking-[-0.27px] lg:tracking-[-0.35px] xl:tracking-[-0.44px] leading-[26px] sm:leading-[28px] md:leading-[30px] lg:leading-[33px] xl:leading-[36px]">
            <AnimatedParagraphFadeInBottom delay={0.2}>
              At the age of 13, I started learning Photoshop and landed my first
              freelance gigs shortly after. I studied communication design before
              joining a music software startup co-founded by Hans Zimmer and
              Pharrell Williams, where I evolved from designer to product owner,
              learning Agile methodologies and software development fundamentals.
              Shortly after, I completed my Master of Design in London in Service
              Design and founded an e-commerce startup.
            </AnimatedParagraphFadeInBottom>
            <AnimatedParagraphFadeInBottom delay={0.3}>
              In 2020, I took the step into full self employment and began
              working with world class brands as a freelance designer, teaching web
              design as a freelance lecturer at a design college, and running my e
              commerce business. Due to the surge in demand for digital products
              during the pandemic and the rise of GenAI in late 2022, I shifted
              my focus and committed fully to digital product design to take part
              in what is likely the most exciting technological revolution of our
              time.
            </AnimatedParagraphFadeInBottom>
          </div>
        </div>
      </section>

      {/* CV Section */}
      <section className="relative z-[3] w-full py-0" style={{ background: 'var(--color-98)' }}>
        <div className="max-w-[1920px] mx-auto px-[16px] sm:px-[40px] xl:px-[60px] py-0">
          <motion.div 
            className="bg-[var(--color-100)] rounded-[10px] flex flex-col gap-[32px] md:gap-[40px] px-[16px] md:px-0 py-[16px] md:py-[40px]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
          >
            {/* Work Experience */}
            <div className="px-0 md:px-[40px] py-0">
              <motion.div 
                className="border-b flex items-center justify-center px-0 py-[24px]"
                style={{ borderBottomColor: theme === 'dark' ? 'var(--color-98)' : 'var(--color-92)' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 0.61, 0.36, 1] }}
              >
                <h3 className="flex-1 font-sans text-[16px] sm:text-[17px] md:text-[18px] lg:text-[20px] xl:text-[22px] text-[var(--color-8)] font-semibold tracking-[-0.24px] sm:tracking-[-0.255px] md:tracking-[-0.27px] lg:tracking-[-0.35px] xl:tracking-[-0.44px] leading-[26px] sm:leading-[28px] md:leading-[30px] lg:leading-[33px] xl:leading-[36px]">
                  Work experience
                </h3>
              </motion.div>

              {WORK_EXPERIENCE.map((exp, idx) => (
                <motion.div
                  key={exp.id}
                  className={`${
                    idx === WORK_EXPERIENCE.length - 1
                      ? ""
                      : "border-b"
                  } flex flex-col items-start px-0 py-[24px]`}
                  style={idx === WORK_EXPERIENCE.length - 1 ? {} : { borderBottomColor: theme === 'dark' ? 'var(--color-94-50)' : 'var(--color-96)' }}
                  onMouseEnter={handleRowEnter(exp)}
                  onMouseMove={handleRowMove(exp)}
                  onMouseLeave={handleRowLeave}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.2 + (idx * 0.1), ease: [0.22, 0.61, 0.36, 1] }}
                >
                  <p className="font-sans text-[16px] sm:text-[17px] md:text-[18px] lg:text-[20px] xl:text-[22px] text-[var(--color-8)] font-medium tracking-[-0.24px] sm:tracking-[-0.255px] md:tracking-[-0.27px] lg:tracking-[-0.35px] xl:tracking-[-0.44px] leading-[26px] sm:leading-[28px] md:leading-[30px] lg:leading-[33px] xl:leading-[36px] mb-0">
                    {exp.company}
                  </p>
                  <div className="flex items-start justify-between gap-[16px] w-full font-sans text-[14px] sm:text-[15px] md:text-[16px] leading-[22px] sm:leading-[24px] md:leading-[26px] font-normal tracking-[-0.21px] sm:tracking-[-0.225px] md:tracking-[-0.24px]">
                    <p className="text-[var(--color-8)]">{exp.role}</p>
                    <p className="text-[var(--color-64)] whitespace-nowrap">{exp.period}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Education */}
            <div className="px-0 md:px-[40px] py-0">
              <motion.div 
                className="border-b flex items-center justify-center px-0 py-[24px]"
                style={{ borderBottomColor: theme === 'dark' ? 'var(--color-98)' : 'var(--color-92)' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 1.0, ease: [0.22, 0.61, 0.36, 1] }}
              >
                <h3 className="flex-1 font-sans text-[16px] sm:text-[17px] md:text-[18px] lg:text-[20px] xl:text-[22px] text-[var(--color-8)] font-semibold tracking-[-0.24px] sm:tracking-[-0.255px] md:tracking-[-0.27px] lg:tracking-[-0.35px] xl:tracking-[-0.44px] leading-[26px] sm:leading-[28px] md:leading-[30px] lg:leading-[33px] xl:leading-[36px]">
                  Education
                </h3>
              </motion.div>

              {EDUCATION.map((edu, idx) => (
                <motion.div
                  key={edu.id}
                  className={`${
                    idx === EDUCATION.length - 1
                      ? "border-0"
                      : "border-b"
                  } flex flex-col items-start px-0 py-[24px]`}
                  style={idx === EDUCATION.length - 1 ? {} : { borderBottomColor: theme === 'dark' ? 'var(--color-94-50)' : 'var(--color-96)' }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 1.1 + (idx * 0.1), ease: [0.22, 0.61, 0.36, 1] }}
                >
                  <p className="font-sans text-[16px] sm:text-[17px] md:text-[18px] lg:text-[20px] xl:text-[22px] text-[var(--color-8)] font-medium tracking-[-0.24px] sm:tracking-[-0.255px] md:tracking-[-0.27px] lg:tracking-[-0.35px] xl:tracking-[-0.44px] leading-[26px] sm:leading-[28px] md:leading-[30px] lg:leading-[33px] xl:leading-[36px] mb-0">
                    {edu.title}
                  </p>
                  <div className="flex items-start justify-between gap-[16px] w-full font-sans text-[14px] sm:text-[15px] md:text-[16px] leading-[22px] sm:leading-[24px] md:leading-[26px] font-normal tracking-[-0.21px] sm:tracking-[-0.225px] md:tracking-[-0.24px]">
                    <p className="text-[var(--color-8)]">{edu.description}</p>
                    <p className="text-[var(--color-64)] whitespace-nowrap">{edu.period}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Personal Section */}
      <section className="relative z-[2] pt-[60px] md:pt-[120px] xl:pt-[160px] pb-[60px] md:pb-[80px] xl:pb-[120px]" style={{ background: 'linear-gradient(to bottom, var(--color-98) 0%, var(--color-100) 100%)' }}>
        <div className="max-w-[880px] xl:max-w-[1920px] mx-auto flex flex-col xl:flex-row gap-[12px] xl:gap-[120px] px-[16px] sm:px-[40px] xl:px-[60px] 2xl:px-[100px] py-0 rounded-[10px]">
          <div className="flex flex-1 items-start">
            <AnimatedHeadlineFadeInBottom
              as="h2"
              className="flex-1 font-serif text-[32px] sm:text-[36px] md:text-[40px] lg:text-[44px] xl:text-[48px] text-[var(--color-8)] tracking-[-0.16px] sm:tracking-[-0.18px] md:tracking-[-0.20px] lg:tracking-[-0.22px] xl:tracking-[-0.24px] w-full xl:max-w-[560px] leading-[40px] sm:leading-[45px] md:leading-[50px] lg:leading-[55px] xl:leading-[60px]"
            >
              Bridging emotion & logic of digital products
            </AnimatedHeadlineFadeInBottom>
          </div>
          <div className="flex flex-1 flex-col gap-[24px] items-start justify-center font-sans text-[16px] sm:text-[17px] md:text-[18px] lg:text-[20px] xl:text-[22px] text-[var(--color-8)] font-normal tracking-[-0.24px] sm:tracking-[-0.255px] md:tracking-[-0.27px] lg:tracking-[-0.35px] xl:tracking-[-0.44px] leading-[26px] sm:leading-[28px] md:leading-[30px] lg:leading-[33px] xl:leading-[36px]">
            <AnimatedParagraphFadeInBottom delay={0.2}>
              My strength lies in bridging disciplines. I speak the language of
              developers, understand business strategy, prototype rapidly, and
              always keep the user at the absolute center. I thrive in complexity.
              Give me ambiguous problems, cross functional stakeholders, and tight
              deadlines, and I will consistently create clarity, alignment, and
              measurable outcomes.
            </AnimatedParagraphFadeInBottom>
            <AnimatedParagraphFadeInBottom delay={0.3}>
              When I'm not at work, you'll probably find me researching
              innovation, the financial markets, crypto, or biohacking. I am
              pretty much 24/7 listening to something to feed my curiosity. About
              the world. About the markets. About us. This commitment to continuous
              learning keeps my product thinking sharp for the future.
            </AnimatedParagraphFadeInBottom>
          </div>
        </div>
      </section>

      <div className="relative w-full" style={{ background: 'var(--color-96)' }}>
        <FooterBackground />
        {/* Gradient overlay: color-100 (top) to color-100@80% (bottom) */}
        <div 
          className="absolute inset-0 z-[1]"
          style={{
            background: `linear-gradient(to bottom, var(--color-100), var(--color-100-80))`,
          }}
        />
        <div className="max-w-[1920px] mx-auto relative z-[2]">
          <Footer />
        </div>
      </div>

      {/* Floating preview image next to cursor */}
      <AnimatePresence>
        {preview && preview.experience.image && (
          <motion.div
            className="pointer-events-none fixed z-50 hidden h-[400px] w-[400px] overflow-hidden rounded-[10px] bg-[var(--color-100)] shadow-2xl md:block"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 10 }}
            style={{
              top: preview.y - 200,
              left: preview.x + 24,
            }}
            transition={{ duration: 0.25, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <Image
              src={preview.experience.image}
              alt={preview.experience.company}
              fill
              className="h-full w-full object-cover"
              quality={100}
              unoptimized={true}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
