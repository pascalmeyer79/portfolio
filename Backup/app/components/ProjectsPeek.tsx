"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { PasswordModal } from "./PasswordModal";
import { ProjectImage } from "./ProjectImage";

type StackedImage = {
  src: string;
  heightOffset?: number;
};

type Project = {
  id: string;
  title: string;
  description: string;
  image: string | StackedImage[];
  tags: string[];
  protected?: boolean;
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.3 + 0.1 * index,
      duration: 0.4,
      ease: [0.22, 0.61, 0.36, 1],
    },
  }),
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const PROJECTS: Project[] = [
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

export const ProjectsPeek: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [targetSlug, setTargetSlug] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const [isDragging, setIsDragging] = useState(false);
  const isMouseDown = useRef(false);
  const dragStartX = useRef(0);
  const scrollStartX = useRef(0);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const scrollWidth = container.scrollWidth;
      const clientWidth = container.clientWidth;
      const maxScroll = scrollWidth - clientWidth;
      
      if (maxScroll <= 0) {
        setActiveIndex(0);
        return;
      }
      
      const scrollProgress = scrollLeft / maxScroll;
      
      // Determine active index based on scroll progress
      // 0-25%: index 0, 25-50%: index 1, 50-75%: index 2, 75-100%: index 3
      let newIndex = 0;
      if (scrollProgress >= 0.75) {
        newIndex = 3;
      } else if (scrollProgress >= 0.5) {
        newIndex = 2;
      } else if (scrollProgress >= 0.25) {
        newIndex = 1;
      } else {
        newIndex = 0;
      }
      
      setActiveIndex(newIndex);
    };

    container.addEventListener('scroll', handleScroll);
    // Initial calculation
    handleScroll();

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleCardClick = (project: Project) => {
    // Verhindere Navigation wenn gerade gedraggt wird
    if (isDragging) {
      return;
    }
    
    if (project.protected) {
      setTargetSlug(project.id);
      setModalOpen(true);
    } else {
      router.push(`/work/${project.id}`);
    }
  };

  const handleIndicatorClick = (index: number) => {
    const container = scrollRef.current;
    const card = cardRefs.current[index];
    if (container && card) {
      const containerRect = container.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      const scrollLeft = card.offsetLeft - container.offsetLeft - (containerRect.width / 2) + (cardRect.width / 2);
      
      // Smooth scroll nur für Indicator Clicks
      const originalBehavior = container.style.scrollBehavior;
      container.style.scrollBehavior = 'smooth';
      
      container.scrollTo({
        left: scrollLeft,
        behavior: 'smooth',
      });
      
      // Zurücksetzen nach Animation
      setTimeout(() => {
        container.style.scrollBehavior = originalBehavior;
      }, 500);
    }
  };

  // Drag-Handler
  const handleDragStart = (e: MouseEvent | TouchEvent | PointerEvent) => {
    const container = scrollRef.current;
    if (!container) return;

    isMouseDown.current = true;
    setIsDragging(false);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    dragStartX.current = clientX;
    scrollStartX.current = container.scrollLeft;
  };

  const handleDragMove = (e: MouseEvent | TouchEvent | PointerEvent) => {
    // Nur bewegen wenn Maus/Touch gedrückt ist
    if (!isMouseDown.current) return;
    
    const container = scrollRef.current;
    if (!container) return;

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const deltaX = dragStartX.current - clientX;
    
    // Markiere als dragging wenn mehr als 5px bewegt wurde
    if (Math.abs(deltaX) > 5) {
      setIsDragging(true);
    }

    container.scrollLeft = scrollStartX.current + deltaX;
  };

  const handleDragEnd = () => {
    isMouseDown.current = false;
    // Warte kurz bevor isDragging zurückgesetzt wird, damit Click nicht ausgelöst wird
    setTimeout(() => {
      setIsDragging(false);
    }, 100);
  };

  return (
    <>
      <section className="relative z-[5] w-full">
        <div className="max-w-[1920px] mx-auto overflow-visible">
        <div className="flex flex-col gap-[32px] md:gap-[40px] items-start pr-0 pt-0 pb-[20px] md:pb-[40px] lg:pb-[60px] w-full">
        <motion.div
          ref={scrollRef}
          className="flex gap-[16px] md:gap-[24px] items-start relative w-full overflow-x-auto cursor-grab active:cursor-grabbing"
          style={{ 
            scrollbarWidth: "none", 
            msOverflowStyle: "none", 
            userSelect: "none",
            scrollBehavior: "auto"
          }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
        >
          {/* Spacer left */}
          <div className="shrink-0 w-0 md:w-[16px] lg:w-[36px]" />
          {PROJECTS.map((project, index) => {
            const imageWidthClass =
              project.id === "tenzir" || project.id === "vw"
                ? "w-[852px]"
                : project.id === "porsche"
                ? "w-[778px]"
                : "w-[600px]";

            const cardId = `project-card-${project.id}`;
            
            return (
              <React.Fragment key={project.id}>
                <style dangerouslySetInnerHTML={{
                  __html: `
                    .${cardId} {
                      border-radius: 6px;
                      width: 320px;
                    }
                    @media (min-width: 768px) {
                      .${cardId} {
                        border-radius: 8px;
                        width: 420px;
                      }
                    }
                    @media (min-width: 1024px) {
                      .${cardId} {
                        border-radius: 10px;
                        width: 490px;
                      }
                    }
                    @media (min-width: 1280px) {
                      .${cardId} {
                        width: 560px;
                      }
                    }
                  `
                }} />
                <motion.button
                  ref={(el) => { cardRefs.current[index] = el; }}
                  type="button"
                  onClick={() => handleCardClick(project)}
                  className={`${cardId} bg-[var(--color-100)] flex flex-col gap-[40px] md:gap-[48px] items-start overflow-hidden px-[24px] md:px-[40px] py-[32px] md:py-[48px] relative shrink-0 text-left`}
                  style={{
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    userSelect: 'none',
                    WebkitUserDrag: 'none',
                  }}
                  variants={cardVariants}
                  custom={index}
                >
              {/* Project Info */}
              <div className="flex flex-col gap-[8px] items-start relative w-full">
                <div className="flex gap-[4px] md:gap-[8px] items-start relative w-full">
                  {project.protected && (
                    <div className="flex items-center px-0 py-[2px] md:py-[2px] relative shrink-0">
                      <div className="relative shrink-0 w-[24px] h-[24px] md:w-[28px] md:h-[28px] flex items-center justify-center">
                        <svg width="24" height="24" className="md:w-[28px] md:h-[28px]" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M21.0811 11V17.0859C21.0811 17.3338 21.0613 17.5817 21.0205 17.8262L20.2002 22.7471C20.0795 23.47 19.4537 23.9999 18.7207 24H9.62696C8.89398 23.9999 8.26817 23.47 8.14746 22.7471L7.32715 17.8262C7.28634 17.5815 7.26563 17.334 7.26562 17.0859V11H21.0811Z" stroke="var(--color-44)"/>
                          <path d="M18.1969 10.4996V8.59961C18.1969 6.94276 16.8537 5.59961 15.1969 5.59961H12.7969C11.14 5.59961 9.79688 6.94276 9.79688 8.59961V10.4996" stroke="var(--color-44)"/>
                          <path d="M14.0016 18.8996C14.7748 18.8996 15.4016 18.2728 15.4016 17.4996C15.4016 16.7264 14.7748 16.0996 14.0016 16.0996C13.2284 16.0996 12.6016 16.7264 12.6016 17.4996C12.6016 18.2728 13.2284 18.8996 14.0016 18.8996Z" fill="var(--color-44)"/>
                        </svg>
                      </div>
                    </div>
                  )}
                  <p className="font-sans text-[18px] md:text-[22px] text-[var(--color-8)] font-semibold tracking-[-0.27px] md:tracking-[-0.44px] leading-[30px] md:leading-[36px] whitespace-pre">
                    {project.title}
                  </p>
                </div>
                <p className="font-sans text-[16px] md:text-[18px] text-[var(--color-8)] font-medium tracking-[-0.24px] md:tracking-[-0.27px] leading-[26px] md:leading-[30px] w-full h-[78px] md:h-[90px]">
                  {(() => {
                    const words = project.description.split(" ");
                    
                    if (project.id === "tenzir") {
                      // "for a leading cyber security startup" soll in color-56 sein
                      const forIndex = words.findIndex(w => w.toLowerCase() === "for");
                      return words.map((word, index) => {
                        const isHighlighted = index >= forIndex;
                        return (
                          <span
                            key={index}
                            className={isHighlighted ? "text-[var(--color-56)] dark:text-[var(--color-44)]" : ""}
                          >
                            {index > 0 ? " " : ""}
                            {word}
                          </span>
                        );
                      });
                    } else if (project.id === "porsche") {
                      // "with AI and user centered design" soll in color-56 sein
                      const withIndex = words.findIndex(w => w.toLowerCase() === "with");
                      return words.map((word, index) => {
                        const isHighlighted = index >= withIndex;
                        return (
                          <span
                            key={index}
                            className={isHighlighted ? "text-[var(--color-56)] dark:text-[var(--color-44)]" : ""}
                          >
                            {index > 0 ? " " : ""}
                            {word}
                          </span>
                        );
                      });
                    } else if (project.id === "vw") {
                      // "for a new electric vehicle brand" soll in color-56 sein
                      const forIndex = words.findIndex(w => w.toLowerCase() === "for");
                      return words.map((word, index) => {
                        const isHighlighted = index >= forIndex;
                        return (
                          <span
                            key={index}
                            className={isHighlighted ? "text-[var(--color-56)] dark:text-[var(--color-44)]" : ""}
                          >
                            {index > 0 ? " " : ""}
                            {word}
                          </span>
                        );
                      });
                    } else if (project.id === "vario") {
                      // "crypto" soll NICHT in color-56 sein (bleibt normal)
                      // Die letzten 5 Wörter sollen in color-56 sein
                      const last5Words = words.slice(-5);
                      const firstWords = words.slice(0, -5);
                      
                      return (
                        <>
                          <span>{firstWords.join(" ")}</span>
                          {last5Words.map((word, index) => {
                            const isCrypto = word.toLowerCase() === "crypto";
                            return (
                              <span
                                key={index}
                                className={!isCrypto ? "text-[var(--color-56)] dark:text-[var(--color-44)]" : ""}
                              >
                                {" "}
                                {word}
                              </span>
                            );
                          })}
                        </>
                      );
                    }
                    
                    // Fallback: normale Darstellung
                    return <span>{words.join(" ")}</span>;
                  })()}
                </p>
              </div>

              {/* Project Image */}
              <div className="relative w-full">
                <ProjectImage
                  src={project.image}
                  alt={project.title}
                  aspectRatio="852/480"
                  imageClassName="object-left"
                  allowOverflow={project.id === "vario"}
                  containerBorderRadius={
                    project.id === "vario" ? "20px" : "12px"
                  }
                  containerWidth={project.id === "vario" ? undefined : undefined}
                />
              </div>

              {/* Tags */}
              <div className="flex gap-[6px] items-center relative">
                {project.tags.map((tag) => {
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
              </div>
              </motion.button>
              </React.Fragment>
            );
          })}
          {/* Spacer right */}
          <div className="shrink-0 w-0 md:w-[16px] lg:w-[36px]" />
        </motion.div>

        {/* Indicator */}
        <div className="flex flex-row items-center justify-center pl-0 py-0 relative w-full">
          {PROJECTS.map((_, index) => {
            const isActive = index === activeIndex;
            const isHovered = hoveredIndex === index;
            return (
              <button
                key={index}
                type="button"
                onClick={() => handleIndicatorClick(index)}
                onMouseEnter={() => !isActive && setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="cursor-pointer focus:outline-none relative flex items-center justify-center flex-shrink-0"
                style={{
                  width: '16px',
                  height: '48px',
                }}
              >
                <motion.div
                  className="w-[2px] rounded-full"
                  style={{
                    transformOrigin: 'center center',
                  }}
                  initial={{ scaleY: 0, opacity: 0, rotate: 18 }}
                  whileInView={{ scaleY: 1, opacity: 1, rotate: 18 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{
                    scaleY: { duration: 0.4, ease: [0.22, 0.61, 0.36, 1], delay: index * 0.05 },
                    opacity: { duration: 0.3, ease: [0.22, 0.61, 0.36, 1], delay: index * 0.05 },
                    rotate: { duration: 0 },
                  }}
                  animate={{
                    height: isActive 
                      ? (isMobile ? 24 : 32)
                      : 16,
                    backgroundColor: (isHovered && !isActive)
                      ? "var(--color-64)"
                      : isActive
                      ? "var(--color-32)"
                      : "var(--color-80)",
                    rotate: 18,
                  }}
                  />
              </button>
            );
          })}
        </div>
        </div>
        </div>
      </section>

      <PasswordModal
        open={modalOpen}
        slug={targetSlug}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
};

