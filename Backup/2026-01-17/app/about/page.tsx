"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Footer } from "../components/Footer";
import { FooterBackground } from "../components/FooterBackground";
import { useTheme } from "../theme-provider";
import { AnimatedHeadline } from "../components/AnimatedHeadline";

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
    role: "UX and Product Designer (Freelance)",
    period: "2024 - today",
    image: "/images/tenzir/Tenzir_02.jpg",
  },
  {
    id: "sony",
    company: "Sony Music",
    role: "UX and UI Designer (Freelance)",
    period: "2020 - today",
    image: "/images/porsche/Process-New.png",
  },
  {
    id: "porsche",
    company: "Porsche",
    role: "UX and Product Designer, UX Consultant (Freelance)",
    period: "2022 - 2024",
    image: "/images/porsche/Porsche_02.jpg",
  },
  {
    id: "vw",
    company: "Volkswagen",
    role: "UI Designer (Freelance)",
    period: "2022 - 2023",
  },
  {
    id: "metro",
    company: "Metro",
    role: "UX and Product Designer (Freelance)",
    period: "2022",
  },
  {
    id: "logitech",
    company: "Logitech",
    role: "UX Designer (Freelance)",
    period: "2022",
  },
  {
    id: "nution",
    company: "Nution",
    role: "Founder",
    period: "2017 - 2023",
  },
  {
    id: "ujam",
    company: "UJAM",
    role: "Designer, Product Owner",
    period: "2016 - 2020",
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
      <div className="max-w-[1920px] mx-auto">

      {/* Hero Section */}
      <section className="relative z-[5] flex flex-col md:flex-row items-center justify-center gap-[40px] md:gap-[80px] px-[20px] md:px-[100px] pb-[40px] md:pb-[90px] pt-[40px] md:pt-[70px]" style={{ height: 'calc(100vh - 82px)' }}>
        <div className="flex flex-1 flex-col items-center justify-start" style={{ height: '506px' }}>
          <AnimatedHeadline
            className="font-serif text-[40px] md:text-[56px] lg:text-[72px] text-[var(--color-8)] tracking-[-0.2px] md:tracking-[-0.56px] lg:tracking-[-0.72px] leading-[50px] md:leading-[70px] lg:leading-[88px] text-left"
            style={{ height: '506px' }}
          >
            In pursuit of <span className="font-serif italic">excellence</span>
          </AnimatedHeadline>
        </div>

        <motion.div
          className="group relative shrink-0 aspect-[3/4] w-auto rounded-[10px] overflow-hidden"
          style={{ 
            height: 'min(calc(100vh - 82px - 80px - 90px), 960px)',
            maxHeight: '960px',
            backgroundColor: theme === 'dark' ? '#FCFFFE' : '#000000'
          }}
          variants={imageVariants}
          initial="hidden"
          animate="visible"
        >
          <Image
            src={portraitSideImage}
            alt="Portrait Pascal Meyer"
            fill
            className="object-cover transition-opacity duration-500 ease-out group-hover:opacity-0"
            priority
            quality={100}
            unoptimized={true}
          />
          <Image
            src={portraitFrontImage}
            alt="Portrait Pascal Meyer"
            fill
            className="object-cover opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
            priority
            quality={100}
            unoptimized={true}
          />
        </motion.div>

        <div className="flex flex-1 flex-col items-start justify-end" style={{ 
          height: 'min(calc(100vh - 82px - 80px - 90px), 960px)',
          maxHeight: '960px'
        }}>
          <motion.p
            className="font-sans text-[16px] md:text-[18px] lg:text-[22px] text-[var(--color-8)] font-medium tracking-[-0.24px] md:tracking-[-0.27px] lg:tracking-[-0.44px] leading-[26px] md:leading-[30px] lg:leading-[36px]"
            variants={textVariants}
            initial="hidden"
            animate="visible"
          >
            True excellence is the synthesis of diverse disciplines. My 16-year
            journey covers product ownership, frontend, consulting, marketing,
            mentoring, and entrepreneurship. This foundation allows me to bridge
            strategy, design, and execution for complex, end-to-end products.
          </motion.p>
        </div>
      </section>

      {/* Journey Section */}
      <section className="relative z-[4] px-[16px] sm:px-[40px] lg:px-[60px] py-[80px] md:py-[160px]" style={{ background: 'linear-gradient(to bottom, var(--color-96) 0%, var(--color-98) 100%)' }}>
        <div className="flex flex-col md:flex-row gap-[40px] md:gap-[120px] px-[24px] md:px-[40px] py-0 rounded-[10px]">
          <div className="flex flex-1 items-center" style={{ verticalAlign: 'top' }}>
            <h2 className="font-serif text-[32px] md:text-[40px] lg:text-[48px] text-[var(--color-8)] tracking-[-0.16px] md:tracking-[-0.20px] lg:tracking-[-0.24px] max-w-[560px] leading-[40px] md:leading-[50px] lg:leading-[60px]" style={{ verticalAlign: 'middle' }}>
              A designer, who is obsessed with the digital world since day one
            </h2>
          </div>
          <div className="flex flex-1 flex-col gap-[24px] font-sans text-[16px] md:text-[18px] lg:text-[22px] text-[var(--color-8)] font-normal tracking-[-0.24px] md:tracking-[-0.27px] lg:tracking-[-0.44px] leading-[26px] md:leading-[30px] lg:leading-[36px]">
            <p>
              At the age of 13, I started learning Photoshop and landed my first
              freelance gigs shortly after. I studied communication design before
              joining a music software startup co-founded by Hans Zimmer and
              Pharrell Williams, where I evolved from designer to product owner,
              learning Agile methodologies and software development fundamentals.
              Shortly after, I completed my Master of Design in London in Service
              Design and founded an e-commerce startup.
            </p>
            <p>
              In 2020, I took the step into full self employment and began
              working with world class brands as a freelance designer, teaching web
              design as a freelance lecturer at a design college, and running my e
              commerce business. Due to the surge in demand for digital products
              during the pandemic and the rise of GenAI in late 2022, I shifted
              my focus and committed fully to digital product design to take part
              in what is likely the most exciting technological revolution of our
              time.
            </p>
          </div>
        </div>
      </section>

      {/* CV Section */}
      <section className="relative z-[3] inline-grid w-full">
        <div className="px-[16px] sm:px-[40px] lg:px-[60px] py-0" style={{ background: 'linear-gradient(to bottom, var(--color-98) 0%, var(--color-98) 90%, var(--color-96) 100%)' }}>
          <div className="bg-[var(--color-100)] rounded-[10px] flex flex-col gap-[32px] md:gap-[40px] px-0 py-[32px] md:py-[40px]">
            {/* Work Experience */}
            <div className="px-[24px] md:px-[40px] py-0">
              <div className="border-b border-[var(--color-92)] flex items-center justify-center px-0 py-[24px]">
                <h3 className="flex-1 font-sans text-[16px] md:text-[18px] lg:text-[22px] text-[var(--color-8)] font-semibold tracking-[-0.24px] md:tracking-[-0.27px] lg:tracking-[-0.44px] leading-[26px] md:leading-[30px] lg:leading-[36px]">
                  Work experience
                </h3>
              </div>

              {WORK_EXPERIENCE.map((exp, idx) => (
                <div
                  key={exp.id}
                  className={`border-b ${
                    idx === WORK_EXPERIENCE.length - 1
                      ? "border-0"
                      : "border-[var(--color-96)]"
                  } flex flex-col items-start px-0 py-[24px]`}
                  onMouseEnter={handleRowEnter(exp)}
                  onMouseMove={handleRowMove(exp)}
                  onMouseLeave={handleRowLeave}
                >
                  <p className="font-sans text-[16px] md:text-[18px] lg:text-[22px] text-[var(--color-8)] font-medium tracking-[-0.24px] md:tracking-[-0.27px] lg:tracking-[-0.44px] leading-[26px] md:leading-[30px] lg:leading-[36px] mb-0">
                    {exp.company}
                  </p>
                  <div className="flex items-start justify-between w-full font-sans text-[14px] md:text-[16px] leading-[22px] md:leading-[26px] font-normal tracking-[-0.21px] md:tracking-[-0.24px]">
                    <p className="text-[var(--color-8)]">{exp.role}</p>
                    <p className="text-[var(--color-64)]">{exp.period}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Education */}
            <div className="px-[24px] md:px-[40px] py-0">
              <div className="border-b border-[var(--color-92)] flex items-center justify-center px-0 py-[24px]">
                <h3 className="flex-1 font-sans text-[16px] md:text-[18px] lg:text-[22px] text-[var(--color-8)] font-semibold tracking-[-0.24px] md:tracking-[-0.27px] lg:tracking-[-0.44px] leading-[26px] md:leading-[30px] lg:leading-[36px]">
                  Education
                </h3>
              </div>

              {EDUCATION.map((edu, idx) => (
                <div
                  key={edu.id}
                  className={`border-b ${
                    idx === EDUCATION.length - 1
                      ? "border-0"
                      : "border-[var(--color-96)]"
                  } flex flex-col items-start px-0 py-[24px]`}
                >
                  <p className="font-sans text-[16px] md:text-[18px] lg:text-[22px] text-[var(--color-8)] font-medium tracking-[-0.24px] md:tracking-[-0.27px] lg:tracking-[-0.44px] leading-[26px] md:leading-[30px] lg:leading-[36px] mb-0">
                    {edu.title}
                  </p>
                  <div className="flex items-start justify-between w-full font-sans text-[14px] md:text-[16px] leading-[22px] md:leading-[26px] font-normal tracking-[-0.21px] md:tracking-[-0.24px]">
                    <p className="text-[var(--color-8)]">{edu.description}</p>
                    <p className="text-[var(--color-64)]">{edu.period}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Personal Section */}
      <section className="relative z-[2] pb-[80px] md:pb-[120px] pt-[80px] md:pt-[160px] px-[16px] sm:px-[40px] lg:px-[60px]" style={{ background: 'linear-gradient(to bottom, var(--color-98) 0%, var(--color-100) 50%, var(--color-96) 100%)' }}>
        <div className="flex flex-col md:flex-row gap-[40px] md:gap-[120px] px-[24px] md:px-[40px] py-0 rounded-[10px]">
          <div className="flex flex-1 items-center">
            <h2 className="flex-1 font-serif text-[32px] md:text-[40px] lg:text-[48px] text-[var(--color-8)] tracking-[-0.16px] md:tracking-[-0.20px] lg:tracking-[-0.24px] max-w-[560px] leading-[40px] md:leading-[50px] lg:leading-[60px]">
              Bridging emotion & logic of digital products
            </h2>
          </div>
          <div className="flex flex-1 flex-col gap-[24px] items-start justify-center font-sans text-[16px] md:text-[18px] lg:text-[22px] text-[var(--color-8)] font-normal tracking-[-0.24px] md:tracking-[-0.27px] lg:tracking-[-0.44px] leading-[26px] md:leading-[30px] lg:leading-[36px]">
            <p>
              My strength lies in bridging disciplines. I speak the language of
              developers, understand business strategy, prototype rapidly, and
              always keep the user at the absolute center. I thrive in complexity.
              Give me ambiguous problems, cross functional stakeholders, and tight
              deadlines, and I will consistently create clarity, alignment, and
              measurable outcomes.
            </p>
            <p>
              When I'm not at work, you'll probably find me researching
              innovation, the financial markets, crypto, or biohacking. I am
              pretty much 24/7 listening to something to feed my curiosity. About
              the world. About the markets. About us. This commitment to continuous
              learning keeps my product thinking sharp for the future.
            </p>
          </div>
        </div>
      </section>
      </div>

      <div className="relative w-full bg-[var(--color-100)]">
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
            className="pointer-events-none fixed z-50 hidden h-[400px] w-[400px] overflow-hidden rounded-[32px] bg-[var(--color-0)] shadow-2xl md:block"
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
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
