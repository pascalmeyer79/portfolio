"use client";

import { Footer } from "../components/Footer";
import { FooterBackground } from "../components/FooterBackground";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function getLocalTime() {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Zurich',
    hour12: false,
  });
  const time = formatter.format(now);
  return `${time} (GMT+1)`;
}

const columnVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 * index,
      duration: 0.4,
      ease: [0.22, 0.61, 0.36, 1],
    },
  }),
};

const containerVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 0.61, 0.36, 1],
    },
  },
};

export default function ContactPage() {
  const [localTime, setLocalTime] = useState(getLocalTime());
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [linkAnimationState, setLinkAnimationState] = useState<Record<string, 'idle' | 'going-out' | 'coming-in'>>({});

  useEffect(() => {
    const interval = setInterval(() => {
      setLocalTime(getLocalTime());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const linkGradient = "linear-gradient(to top right, var(--color-44), var(--color-64))";

  return (
    <main className="relative min-h-screen">
      {/* Hero Background wird im Layout gerendert */}
      
      {/* Main content container with 100vh - 82px and space-between */}
      <div className="h-[calc(100vh-82px)] flex flex-col justify-between px-[60px] max-w-[1920px] mx-auto w-full">
        {/* Spacer ganz oben */}
        <div style={{ height: 0 }} />
        
        {/* Upper section with headline and quote */}
        <div className="grid grid-cols-6 gap-[40px] px-[40px] min-h-[250px]">
            {/* Headline - 3 columns with 40px padding-right */}
            <div className="col-span-3 pr-[40px]">
              <h1 className="font-serif text-serif-72 text-[var(--color-8)] tracking-[-0.72px] leading-[88px]">
                Let&apos;s bring great ideas
                <br />
                <span className="italic">into reality</span>
              </h1>
            </div>
            
            {/* Quote - 3 columns */}
            <div className="col-span-3 flex flex-col gap-[24px] max-w-[650px]">
              <p className="font-sans text-sans-22 text-[var(--color-8)] font-medium tracking-[-0.44px] leading-[36px]">
                &ldquo;Pascal has turned our vision of a clean and modern app into reality. If you are looking for high-quality design and good cooperation between designers, programmers, and customers, you have come to the right place.&rdquo;
              </p>
              <div className="flex items-center gap-[5px]">
                <p className="font-sans text-sans-16-regular text-[var(--color-56)] tracking-[-0.24px] leading-[26px]">
                  Emre Aydin and René Schröder, Founder of{" "}
                </p>
                <a
                  href="https://www.muvn.de/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-sans-16-medium tracking-[-0.24px] leading-[26px] inline-block relative transition-colors duration-200 ease-in-out"
                  style={{
                    width: 'fit-content',
                    background: linkGradient,
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    color: 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    setHoveredLink('muvn');
                    setLinkAnimationState(prev => ({ ...prev, muvn: 'going-out' }));
                    setTimeout(() => {
                      setLinkAnimationState(prev => ({ ...prev, muvn: 'coming-in' }));
                    }, 300);
                    (e.currentTarget.style as any).WebkitTextFillColor = 'var(--color-44)';
                    e.currentTarget.style.color = 'var(--color-44)';
                    e.currentTarget.style.background = 'none';
                    (e.currentTarget.style as any).WebkitBackgroundClip = '';
                    e.currentTarget.style.backgroundClip = '';
                    e.currentTarget.style.textDecorationColor = 'var(--color-44)';
                  }}
                  onMouseLeave={(e) => {
                    setHoveredLink(null);
                    setLinkAnimationState(prev => ({ ...prev, muvn: 'idle' }));
                    e.currentTarget.style.background = linkGradient;
                    (e.currentTarget.style as any).WebkitBackgroundClip = 'text';
                    e.currentTarget.style.backgroundClip = 'text';
                    (e.currentTarget.style as any).WebkitTextFillColor = 'transparent';
                    e.currentTarget.style.color = 'transparent';
                    e.currentTarget.style.textDecorationColor = 'transparent';
                  }}
                >
                  MUVN Mobility
                  <span
                    className={`absolute h-[1px] transition-all duration-[300ms] ease-out ${linkAnimationState.muvn === 'coming-in' ? 'left-0' : (hoveredLink === 'muvn' || linkAnimationState.muvn === 'going-out') ? 'right-0' : 'left-0'}`}
                    style={{
                      bottom: '2px',
                      width: hoveredLink === 'muvn' 
                        ? (linkAnimationState.muvn === 'going-out' ? '0%' : '100%')
                        : linkAnimationState.muvn === 'going-out' ? '0%' : '100%',
                      background: linkAnimationState.muvn === 'coming-in' ? 'var(--color-56)' : 'linear-gradient(to right, var(--color-64), var(--color-80))',
                      transformOrigin: linkAnimationState.muvn === 'coming-in' ? 'left' : 'right',
                    }}
                  />
                </a>
              </div>
            </div>
        </div>
        
        {/* Contact info section - white background */}
        <motion.div 
          className="bg-[var(--color-100)] rounded-tl-[10px] rounded-tr-[10px] px-[40px] pt-[48px] pb-[80px] h-[256px]"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
            <div className="grid grid-cols-6 gap-[40px]">
              {/* Status - 1 column */}
              <motion.div 
                className="flex flex-col gap-[8px]"
                variants={columnVariants}
                initial="hidden"
                animate="visible"
                custom={0}
              >
                <p className="font-sans text-sans-16-semibold text-[var(--color-8)] tracking-[-0.24px] leading-[26px]">
                  Status
                </p>
                <div className="flex items-center gap-[8px]">
                  <div className="w-[20px] h-[20px] flex items-center justify-center relative overflow-visible">
                    {/* Base circle - solid green */}
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <div className="w-[6px] h-[6px] rounded-full" style={{ backgroundColor: '#32DF4C' }} />
                    </div>
                    {/* Animated wave circle - smooth expanding effect */}
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      style={{ zIndex: 0 }}
                      animate={{
                        scale: [0.3, 1, 1],
                        opacity: [0, 0.3, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: [0.22, 1, 0.36, 1],
                        times: [0, 0.5, 1],
                      }}
                    >
                      <div 
                        className="w-[20px] h-[20px] rounded-full" 
                        style={{ 
                          backgroundColor: '#32DF4C',
                        }} 
                      />
                    </motion.div>
                  </div>
                  <p className="font-sans text-sans-16-regular text-[var(--color-8)] tracking-[-0.24px] leading-[26px]">
                    Available
                  </p>
                </div>
              </motion.div>
              
              {/* Local Time - 1 column */}
              <motion.div 
                className="flex flex-col gap-[8px]"
                variants={columnVariants}
                initial="hidden"
                animate="visible"
                custom={1}
              >
                <p className="font-sans text-sans-16-semibold text-[var(--color-8)] tracking-[-0.24px] leading-[26px]">
                  Local Time
                </p>
                <p className="font-sans text-sans-16-regular text-[var(--color-8)] tracking-[-0.24px] leading-[26px]">
                  {localTime}
                </p>
              </motion.div>
              
              {/* Empty column - 1 column */}
              <div />
              
              {/* Contact - 1 column */}
              <motion.div 
                className="flex flex-col gap-[2px]"
                variants={columnVariants}
                initial="hidden"
                animate="visible"
                custom={3}
              >
                <p className="font-sans text-sans-16-semibold text-[var(--color-8)] tracking-[-0.24px] leading-[26px] mb-[4px]">
                  Contact
                </p>
                <a
                  href="mailto:hi@pascalmey.com"
                  className="font-sans text-sans-16-medium tracking-[-0.24px] leading-[26px] inline-block relative transition-colors duration-200 ease-in-out"
                  style={{
                    width: 'fit-content',
                    background: linkGradient,
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    color: 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    setHoveredLink('email');
                    setLinkAnimationState(prev => ({ ...prev, email: 'going-out' }));
                    setTimeout(() => {
                      setLinkAnimationState(prev => ({ ...prev, email: 'coming-in' }));
                    }, 300);
                    (e.currentTarget.style as any).WebkitTextFillColor = 'var(--color-44)';
                    e.currentTarget.style.color = 'var(--color-44)';
                    e.currentTarget.style.background = 'none';
                    (e.currentTarget.style as any).WebkitBackgroundClip = '';
                    e.currentTarget.style.backgroundClip = '';
                    e.currentTarget.style.textDecorationColor = 'var(--color-44)';
                  }}
                  onMouseLeave={(e) => {
                    setHoveredLink(null);
                    setLinkAnimationState(prev => ({ ...prev, email: 'idle' }));
                    e.currentTarget.style.background = linkGradient;
                    (e.currentTarget.style as any).WebkitBackgroundClip = 'text';
                    e.currentTarget.style.backgroundClip = 'text';
                    (e.currentTarget.style as any).WebkitTextFillColor = 'transparent';
                    e.currentTarget.style.color = 'transparent';
                    e.currentTarget.style.textDecorationColor = 'transparent';
                  }}
                >
                  hi@pascalmey.com
                  <span
                    className={`absolute h-[1px] transition-all duration-[300ms] ease-out ${linkAnimationState.email === 'coming-in' ? 'left-0' : (hoveredLink === 'email' || linkAnimationState.email === 'going-out') ? 'right-0' : 'left-0'}`}
                    style={{
                      bottom: '2px',
                      width: hoveredLink === 'email' 
                        ? (linkAnimationState.email === 'going-out' ? '0%' : '100%')
                        : linkAnimationState.email === 'going-out' ? '0%' : '100%',
                      background: linkAnimationState.email === 'coming-in' ? 'var(--color-56)' : 'linear-gradient(to right, var(--color-64), var(--color-80))',
                      transformOrigin: linkAnimationState.email === 'coming-in' ? 'left' : 'right',
                    }}
                  />
                </a>
                <a
                  href="tel:+41782527919"
                  className="font-sans text-sans-16-medium tracking-[-0.24px] leading-[26px] inline-block relative transition-colors duration-200 ease-in-out"
                  style={{
                    width: 'fit-content',
                    background: linkGradient,
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    color: 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    setHoveredLink('phone1');
                    setLinkAnimationState(prev => ({ ...prev, phone1: 'going-out' }));
                    setTimeout(() => {
                      setLinkAnimationState(prev => ({ ...prev, phone1: 'coming-in' }));
                    }, 300);
                    (e.currentTarget.style as any).WebkitTextFillColor = 'var(--color-44)';
                    e.currentTarget.style.color = 'var(--color-44)';
                    e.currentTarget.style.background = 'none';
                    (e.currentTarget.style as any).WebkitBackgroundClip = '';
                    e.currentTarget.style.backgroundClip = '';
                    e.currentTarget.style.textDecorationColor = 'var(--color-44)';
                  }}
                  onMouseLeave={(e) => {
                    setHoveredLink(null);
                    setLinkAnimationState(prev => ({ ...prev, phone1: 'idle' }));
                    e.currentTarget.style.background = linkGradient;
                    (e.currentTarget.style as any).WebkitBackgroundClip = 'text';
                    e.currentTarget.style.backgroundClip = 'text';
                    (e.currentTarget.style as any).WebkitTextFillColor = 'transparent';
                    e.currentTarget.style.color = 'transparent';
                    e.currentTarget.style.textDecorationColor = 'transparent';
                  }}
                >
                  +41 78 252 7919
                  <span
                    className={`absolute h-[1px] transition-all duration-[300ms] ease-out ${linkAnimationState.phone1 === 'coming-in' ? 'left-0' : (hoveredLink === 'phone1' || linkAnimationState.phone1 === 'going-out') ? 'right-0' : 'left-0'}`}
                    style={{
                      bottom: '2px',
                      width: hoveredLink === 'phone1' 
                        ? (linkAnimationState.phone1 === 'going-out' ? '0%' : '100%')
                        : linkAnimationState.phone1 === 'going-out' ? '0%' : '100%',
                      background: linkAnimationState.phone1 === 'coming-in' ? 'var(--color-56)' : 'linear-gradient(to right, var(--color-64), var(--color-80))',
                      transformOrigin: linkAnimationState.phone1 === 'coming-in' ? 'left' : 'right',
                    }}
                  />
                </a>
                <a
                  href="tel:+4917674713378"
                  className="font-sans text-sans-16-medium tracking-[-0.24px] leading-[26px] inline-block relative transition-colors duration-200 ease-in-out"
                  style={{
                    width: 'fit-content',
                    background: linkGradient,
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    color: 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    setHoveredLink('phone2');
                    setLinkAnimationState(prev => ({ ...prev, phone2: 'going-out' }));
                    setTimeout(() => {
                      setLinkAnimationState(prev => ({ ...prev, phone2: 'coming-in' }));
                    }, 300);
                    (e.currentTarget.style as any).WebkitTextFillColor = 'var(--color-44)';
                    e.currentTarget.style.color = 'var(--color-44)';
                    e.currentTarget.style.background = 'none';
                    (e.currentTarget.style as any).WebkitBackgroundClip = '';
                    e.currentTarget.style.backgroundClip = '';
                    e.currentTarget.style.textDecorationColor = 'var(--color-44)';
                  }}
                  onMouseLeave={(e) => {
                    setHoveredLink(null);
                    setLinkAnimationState(prev => ({ ...prev, phone2: 'idle' }));
                    e.currentTarget.style.background = linkGradient;
                    (e.currentTarget.style as any).WebkitBackgroundClip = 'text';
                    e.currentTarget.style.backgroundClip = 'text';
                    (e.currentTarget.style as any).WebkitTextFillColor = 'transparent';
                    e.currentTarget.style.color = 'transparent';
                    e.currentTarget.style.textDecorationColor = 'transparent';
                  }}
                >
                  +49 176 747 1337 8
                  <span
                    className={`absolute h-[1px] transition-all duration-[300ms] ease-out ${linkAnimationState.phone2 === 'coming-in' ? 'left-0' : (hoveredLink === 'phone2' || linkAnimationState.phone2 === 'going-out') ? 'right-0' : 'left-0'}`}
                    style={{
                      bottom: '2px',
                      width: hoveredLink === 'phone2' 
                        ? (linkAnimationState.phone2 === 'going-out' ? '0%' : '100%')
                        : linkAnimationState.phone2 === 'going-out' ? '0%' : '100%',
                      background: linkAnimationState.phone2 === 'coming-in' ? 'var(--color-56)' : 'linear-gradient(to right, var(--color-64), var(--color-80))',
                      transformOrigin: linkAnimationState.phone2 === 'coming-in' ? 'left' : 'right',
                    }}
                  />
                </a>
              </motion.div>
              
              {/* Calendar - 1 column */}
              <motion.div 
                className="flex flex-col gap-[8px]"
                variants={columnVariants}
                initial="hidden"
                animate="visible"
                custom={4}
              >
                <p className="font-sans text-sans-16-semibold text-[var(--color-8)] tracking-[-0.24px] leading-[26px]">
                  Calendar
                </p>
                <a
                  href="#"
                  className="font-sans text-sans-16-medium tracking-[-0.24px] leading-[26px] inline-block relative transition-colors duration-200 ease-in-out"
                  style={{
                    width: 'fit-content',
                    background: linkGradient,
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    color: 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    setHoveredLink('calendar');
                    setLinkAnimationState(prev => ({ ...prev, calendar: 'going-out' }));
                    setTimeout(() => {
                      setLinkAnimationState(prev => ({ ...prev, calendar: 'coming-in' }));
                    }, 300);
                    (e.currentTarget.style as any).WebkitTextFillColor = 'var(--color-44)';
                    e.currentTarget.style.color = 'var(--color-44)';
                    e.currentTarget.style.background = 'none';
                    (e.currentTarget.style as any).WebkitBackgroundClip = '';
                    e.currentTarget.style.backgroundClip = '';
                    e.currentTarget.style.textDecorationColor = 'var(--color-44)';
                  }}
                  onMouseLeave={(e) => {
                    setHoveredLink(null);
                    setLinkAnimationState(prev => ({ ...prev, calendar: 'idle' }));
                    e.currentTarget.style.background = linkGradient;
                    (e.currentTarget.style as any).WebkitBackgroundClip = 'text';
                    e.currentTarget.style.backgroundClip = 'text';
                    (e.currentTarget.style as any).WebkitTextFillColor = 'transparent';
                    e.currentTarget.style.color = 'transparent';
                    e.currentTarget.style.textDecorationColor = 'transparent';
                  }}
                >
                  Schedule a Meeting
                  <span
                    className={`absolute h-[1px] transition-all duration-[300ms] ease-out ${linkAnimationState.calendar === 'coming-in' ? 'left-0' : (hoveredLink === 'calendar' || linkAnimationState.calendar === 'going-out') ? 'right-0' : 'left-0'}`}
                    style={{
                      bottom: '2px',
                      width: hoveredLink === 'calendar' 
                        ? (linkAnimationState.calendar === 'going-out' ? '0%' : '100%')
                        : linkAnimationState.calendar === 'going-out' ? '0%' : '100%',
                      background: linkAnimationState.calendar === 'coming-in' ? 'var(--color-56)' : 'linear-gradient(to right, var(--color-64), var(--color-80))',
                      transformOrigin: linkAnimationState.calendar === 'coming-in' ? 'left' : 'right',
                    }}
                  />
                </a>
              </motion.div>
              
              {/* Social - 1 column */}
              <motion.div 
                className="flex flex-col gap-[8px]"
                variants={columnVariants}
                initial="hidden"
                animate="visible"
                custom={5}
              >
                <p className="font-sans text-sans-16-semibold text-[var(--color-8)] tracking-[-0.24px] leading-[26px]">
                  Social
                </p>
                <a
                  href="https://www.linkedin.com/in/pascalmeyer79/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-sans-16-medium tracking-[-0.24px] leading-[26px] inline-block relative transition-colors duration-200 ease-in-out"
                  style={{
                    width: 'fit-content',
                    background: linkGradient,
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    color: 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    setHoveredLink('linkedin');
                    setLinkAnimationState(prev => ({ ...prev, linkedin: 'going-out' }));
                    setTimeout(() => {
                      setLinkAnimationState(prev => ({ ...prev, linkedin: 'coming-in' }));
                    }, 300);
                    (e.currentTarget.style as any).WebkitTextFillColor = 'var(--color-44)';
                    e.currentTarget.style.color = 'var(--color-44)';
                    e.currentTarget.style.background = 'none';
                    (e.currentTarget.style as any).WebkitBackgroundClip = '';
                    e.currentTarget.style.backgroundClip = '';
                    e.currentTarget.style.textDecorationColor = 'var(--color-44)';
                  }}
                  onMouseLeave={(e) => {
                    setHoveredLink(null);
                    setLinkAnimationState(prev => ({ ...prev, linkedin: 'idle' }));
                    e.currentTarget.style.background = linkGradient;
                    (e.currentTarget.style as any).WebkitBackgroundClip = 'text';
                    e.currentTarget.style.backgroundClip = 'text';
                    (e.currentTarget.style as any).WebkitTextFillColor = 'transparent';
                    e.currentTarget.style.color = 'transparent';
                    e.currentTarget.style.textDecorationColor = 'transparent';
                  }}
                >
                  Linked In
                  <span
                    className={`absolute h-[1px] transition-all duration-[300ms] ease-out ${linkAnimationState.linkedin === 'coming-in' ? 'left-0' : (hoveredLink === 'linkedin' || linkAnimationState.linkedin === 'going-out') ? 'right-0' : 'left-0'}`}
                    style={{
                      bottom: '2px',
                      width: hoveredLink === 'linkedin' 
                        ? (linkAnimationState.linkedin === 'going-out' ? '0%' : '100%')
                        : linkAnimationState.linkedin === 'going-out' ? '0%' : '100%',
                      background: linkAnimationState.linkedin === 'coming-in' ? 'var(--color-56)' : 'linear-gradient(to right, var(--color-64), var(--color-80))',
                      transformOrigin: linkAnimationState.linkedin === 'coming-in' ? 'left' : 'right',
                    }}
                  />
                </a>
              </motion.div>
            </div>
          </motion.div>
      </div>
      
      {/* Footer */}
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
          <Footer version="PortfolioContact" />
        </div>
      </div>
    </main>
  );
}
