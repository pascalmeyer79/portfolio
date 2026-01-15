"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTheme } from "../theme-provider";

type FooterProps = {
  version?: "Default" | "Contact" | "Portfolio" | "PortfolioContact";
};

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

export const Footer: React.FC<FooterProps> = ({ version = "Default" }) => {
  const { theme } = useTheme();
  const [isEmailHovered, setIsEmailHovered] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [linkAnimationState, setLinkAnimationState] = useState<Record<string, 'idle' | 'going-out' | 'coming-in'>>({});
  const textColor = "var(--color-8)";
  const linkGradient = "linear-gradient(to top right, var(--color-44), var(--color-64))";
  const firstRow = (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-[32px] md:gap-[40px] items-start relative shrink-0 w-full">
      <motion.div 
        className="md:col-span-2 flex flex-col gap-[8px] items-start py-0 relative shrink-0 whitespace-pre" 
        style={{ color: textColor }}
        variants={columnVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        custom={0}
      >
        <p className="font-sans text-[14px] md:text-[16px] leading-[22px] md:leading-[26px] relative shrink-0 tracking-[-0.21px] md:tracking-[-0.24px] font-semibold">
          Say hi!
        </p>
        <Link
          href="mailto:hi@pascalmey.com"
          className="font-serif text-[40px] md:text-[40px] leading-[50px] not-italic relative shrink-0 tracking-[-0.2px] inline-block"
          style={{ color: textColor }}
          onMouseEnter={() => setIsEmailHovered(true)}
          onMouseLeave={() => setIsEmailHovered(false)}
        >
          hi@pascalmey.com
          <span
            className={`absolute h-[1px] transition-all duration-[300ms] ease-out ${isEmailHovered ? 'left-0' : 'right-0'}`}
            style={{
              bottom: '-3px',
              width: isEmailHovered ? '100%' : '0%',
              background: isEmailHovered ? 'var(--color-56)' : 'linear-gradient(to right, var(--color-56), var(--color-64))',
              transformOrigin: isEmailHovered ? 'left' : 'right',
            }}
          />
        </Link>
      </motion.div>
      <motion.div 
        className="md:col-span-1 flex flex-col items-start relative text-[14px] md:text-[16px] gap-[2px]"
        variants={columnVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        custom={1}
      >
            <p className="font-sans text-[14px] md:text-[16px] leading-[26px] font-semibold tracking-[-0.21px] md:tracking-[-0.24px] relative shrink-0 mb-[4px]" style={{ color: textColor }}>
              Links
            </p>
            <Link
              href="/"
              className="font-sans text-[14px] md:text-[16px] leading-[26px] font-medium tracking-[-0.21px] md:tracking-[-0.24px] relative shrink-0 inline-block transition-colors duration-200 ease-in-out"
              style={{
                background: linkGradient,
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                color: 'transparent',
              }}
              onMouseEnter={(e) => {
                setHoveredLink('work');
                setLinkAnimationState(prev => ({ ...prev, work: 'going-out' }));
                    setTimeout(() => {
                      setLinkAnimationState(prev => ({ ...prev, work: 'coming-in' }));
                    }, 300);
                (e.currentTarget.style as any).WebkitTextFillColor = 'var(--color-44)';
                e.currentTarget.style.color = 'var(--color-44)';
                e.currentTarget.style.background = 'none';
                (e.currentTarget.style as any).WebkitBackgroundClip = '';
                e.currentTarget.style.backgroundClip = '';
              }}
              onMouseLeave={(e) => {
                setHoveredLink(null);
                setLinkAnimationState(prev => ({ ...prev, work: 'idle' }));
                e.currentTarget.style.background = linkGradient;
                (e.currentTarget.style as any).WebkitBackgroundClip = 'text';
                e.currentTarget.style.backgroundClip = 'text';
                (e.currentTarget.style as any).WebkitTextFillColor = 'transparent';
                e.currentTarget.style.color = 'transparent';
              }}
            >
              Work
              <span
                className={`absolute h-[1px] transition-all duration-[300ms] ease-out ${linkAnimationState.work === 'coming-in' ? 'left-0' : (hoveredLink === 'work' || linkAnimationState.work === 'going-out') ? 'right-0' : 'left-0'}`}
                style={{
                  bottom: '2px',
                  width: hoveredLink === 'work' 
                    ? (linkAnimationState.work === 'going-out' ? '0%' : '100%')
                    : linkAnimationState.work === 'going-out' ? '0%' : '100%',
                  background: linkAnimationState.work === 'coming-in' ? 'var(--color-56)' : 'linear-gradient(to right, var(--color-64), var(--color-80))',
                  transformOrigin: linkAnimationState.work === 'coming-in' ? 'left' : 'right',
                }}
              />
            </Link>
            <Link
              href="/about"
              className="font-sans text-[14px] md:text-[16px] leading-[26px] font-medium tracking-[-0.21px] md:tracking-[-0.24px] relative shrink-0 inline-block transition-colors duration-200 ease-in-out"
              style={{
                background: linkGradient,
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                color: 'transparent',
              }}
              onMouseEnter={(e) => {
                setHoveredLink('about');
                setLinkAnimationState(prev => ({ ...prev, about: 'going-out' }));
                setTimeout(() => {
                  setLinkAnimationState(prev => ({ ...prev, about: 'coming-in' }));
                }, 300);
                (e.currentTarget.style as any).WebkitTextFillColor = 'var(--color-44)';
                e.currentTarget.style.color = 'var(--color-44)';
                e.currentTarget.style.background = 'none';
                (e.currentTarget.style as any).WebkitBackgroundClip = '';
                e.currentTarget.style.backgroundClip = '';
              }}
              onMouseLeave={(e) => {
                setHoveredLink(null);
                setLinkAnimationState(prev => ({ ...prev, about: 'going-out' }));
                e.currentTarget.style.background = linkGradient;
                (e.currentTarget.style as any).WebkitBackgroundClip = 'text';
                e.currentTarget.style.backgroundClip = 'text';
                (e.currentTarget.style as any).WebkitTextFillColor = 'transparent';
                e.currentTarget.style.color = 'transparent';
              }}
            >
              About
              <span
                className={`absolute h-[1px] transition-all duration-[300ms] ease-out ${linkAnimationState.about === 'coming-in' ? 'left-0' : (hoveredLink === 'about' || linkAnimationState.about === 'going-out') ? 'right-0' : 'left-0'}`}
                style={{
                  bottom: '2px',
                  width: hoveredLink === 'about' 
                    ? (linkAnimationState.about === 'going-out' ? '0%' : '100%')
                    : linkAnimationState.about === 'going-out' ? '0%' : '100%',
                  background: linkAnimationState.about === 'coming-in' ? 'var(--color-56)' : 'linear-gradient(to right, var(--color-64), var(--color-80))',
                  transformOrigin: linkAnimationState.about === 'coming-in' ? 'left' : 'right',
                }}
              />
            </Link>
            <Link
              href="/contact"
              className="font-sans text-[14px] md:text-[16px] leading-[26px] font-medium tracking-[-0.21px] md:tracking-[-0.24px] relative shrink-0 inline-block transition-colors duration-200 ease-in-out"
              style={{
                background: linkGradient,
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                color: 'transparent',
              }}
              onMouseEnter={(e) => {
                setHoveredLink('contact');
                setLinkAnimationState(prev => ({ ...prev, contact: 'going-out' }));
                setTimeout(() => {
                  setLinkAnimationState(prev => ({ ...prev, contact: 'coming-in' }));
                }, 300);
                (e.currentTarget.style as any).WebkitTextFillColor = 'var(--color-44)';
                e.currentTarget.style.color = 'var(--color-44)';
                e.currentTarget.style.background = 'none';
                (e.currentTarget.style as any).WebkitBackgroundClip = '';
                e.currentTarget.style.backgroundClip = '';
              }}
              onMouseLeave={(e) => {
                setHoveredLink(null);
                setLinkAnimationState(prev => ({ ...prev, contact: 'going-out' }));
                e.currentTarget.style.background = linkGradient;
                (e.currentTarget.style as any).WebkitBackgroundClip = 'text';
                e.currentTarget.style.backgroundClip = 'text';
                (e.currentTarget.style as any).WebkitTextFillColor = 'transparent';
                e.currentTarget.style.color = 'transparent';
              }}
            >
              Contact
              <span
                className={`absolute h-[1px] transition-all duration-[300ms] ease-out ${linkAnimationState.contact === 'coming-in' ? 'left-0' : (hoveredLink === 'contact' || linkAnimationState.contact === 'going-out') ? 'right-0' : 'left-0'}`}
                style={{
                  bottom: '2px',
                  width: hoveredLink === 'contact' 
                    ? (linkAnimationState.contact === 'going-out' ? '0%' : '100%')
                    : linkAnimationState.contact === 'going-out' ? '0%' : '100%',
                  background: linkAnimationState.contact === 'coming-in' ? 'var(--color-56)' : 'linear-gradient(to right, var(--color-64), var(--color-80))',
                  transformOrigin: linkAnimationState.contact === 'coming-in' ? 'left' : 'right',
                }}
              />
            </Link>
      </motion.div>
      <motion.div 
        className="md:col-span-1 flex flex-col font-sans text-[14px] md:text-[16px] leading-[26px] font-medium relative tracking-[-0.21px] md:tracking-[-0.16px] gap-[2px]" 
        style={{ color: textColor }}
        variants={columnVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        custom={2}
      >
            <p className="font-sans text-[14px] md:text-[16px] leading-[26px] font-semibold tracking-[-0.21px] md:tracking-[-0.24px] mb-[4px]">
              Pascal Meyer GmbH
            </p>
            <p className="font-sans text-[14px] md:text-[16px] leading-[26px] font-normal tracking-[-0.21px] md:tracking-[-0.24px]">
              HRB 213189
            </p>
            <p className="font-sans text-[14px] md:text-[16px] leading-[26px] font-normal tracking-[-0.21px] md:tracking-[-0.24px]">
              DE359124851
            </p>
            <p className="font-sans text-[14px] md:text-[16px] leading-[26px] font-normal tracking-[-0.21px] md:tracking-[-0.24px]">
              CHE-231.531.352
            </p>
      </motion.div>
      <motion.div 
        className="md:col-span-1 flex flex-col gap-[2px] relative text-[14px] md:text-[16px] tracking-[-0.21px] md:tracking-[-0.24px]" 
        style={{ color: textColor }}
        variants={columnVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        custom={3}
      >
            <p className="font-sans text-[14px] md:text-[16px] leading-[26px] font-semibold tracking-[-0.21px] md:tracking-[-0.24px] mb-[4px]">
              🇨🇭 Switzerland
            </p>
            <p className="font-sans text-[14px] md:text-[16px] leading-[26px] font-normal tracking-[-0.21px] md:tracking-[-0.24px]">
              Gerbestrasse 17
            </p>
            <p className="font-sans text-[14px] md:text-[16px] leading-[26px] font-normal tracking-[-0.21px] md:tracking-[-0.24px]">
              8805 Richterswil
            </p>
            <p className="font-sans text-[14px] md:text-[16px] leading-[26px] font-normal tracking-[-0.21px] md:tracking-[-0.24px]">
              +41 78 252 7919
            </p>
      </motion.div>
      <motion.div 
        className="md:col-span-1 flex flex-col gap-[2px] relative text-[14px] md:text-[16px] tracking-[-0.21px] md:tracking-[-0.24px]" 
        style={{ color: textColor }}
        variants={columnVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        custom={4}
      >
            <p className="font-sans text-[14px] md:text-[16px] leading-[26px] font-semibold tracking-[-0.21px] md:tracking-[-0.24px] mb-[4px]">
              🇩🇪 Germany
            </p>
            <p className="font-sans text-[14px] md:text-[16px] leading-[26px] font-normal tracking-[-0.21px] md:tracking-[-0.24px]">
              Mohnblumenweg 26
            </p>
            <p className="font-sans text-[14px] md:text-[16px] leading-[26px] font-normal tracking-[-0.21px] md:tracking-[-0.24px]">
              28832 Achim
            </p>
            <p className="font-sans text-[14px] md:text-[16px] leading-[26px] font-normal tracking-[-0.21px] md:tracking-[-0.24px]">
              +49 176 747 1337 8
            </p>
      </motion.div>
    </div>
  );

  const secondaryRow = (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-[8px] md:gap-0 relative shrink-0 w-full">
      <p className="font-sans text-[12px] leading-[20px] font-normal relative shrink-0 tracking-[-0.12px] whitespace-pre" style={{
        background: linkGradient,
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        color: 'transparent',
      }}>
        © Copyright {new Date().getFullYear()}. All Rights reserved.
      </p>
      <p className="font-sans text-[12px] leading-[20px] font-normal relative shrink-0 text-center tracking-[-0.12px] whitespace-pre" style={{
        color: 'var(--color-64)',
      }}>
        Handcrafted with love, Figma & Cursor
      </p>
      <div className="flex items-center justify-center pl-0 md:pl-[195px] pr-0 py-0 relative shrink-0">
        <Link
          href="#"
          className="font-sans text-[12px] leading-[20px] font-medium relative shrink-0 text-right tracking-[-0.12px] inline-block whitespace-pre transition-colors duration-200 ease-in-out"
            style={{
            background: linkGradient,
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            color: 'transparent',
          }}
          onMouseEnter={(e) => {
            setHoveredLink('imprint');
            setLinkAnimationState(prev => ({ ...prev, imprint: 'going-out' }));
            setTimeout(() => {
              setLinkAnimationState(prev => ({ ...prev, imprint: 'coming-in' }));
            }, 250);
            (e.currentTarget.style as any).WebkitTextFillColor = 'var(--color-44)';
            e.currentTarget.style.color = 'var(--color-44)';
            e.currentTarget.style.background = 'none';
            (e.currentTarget.style as any).WebkitBackgroundClip = '';
            e.currentTarget.style.backgroundClip = '';
          }}
          onMouseLeave={(e) => {
            setHoveredLink(null);
            setLinkAnimationState(prev => ({ ...prev, imprint: 'idle' }));
            e.currentTarget.style.background = linkGradient;
            (e.currentTarget.style as any).WebkitBackgroundClip = 'text';
            e.currentTarget.style.backgroundClip = 'text';
            (e.currentTarget.style as any).WebkitTextFillColor = 'transparent';
            e.currentTarget.style.color = 'transparent';
          }}
        >
          Imprint
          <span
            className={`absolute h-[1px] transition-all duration-[250ms] ease-out ${linkAnimationState.imprint === 'coming-in' ? 'left-0' : (hoveredLink === 'imprint' || linkAnimationState.imprint === 'going-out') ? 'right-0' : 'left-0'}`}
            style={{
              bottom: '0px',
              width: hoveredLink === 'imprint' 
                ? (linkAnimationState.imprint === 'going-out' ? '0%' : '100%')
                : linkAnimationState.imprint === 'going-out' ? '0%' : '100%',
              background: linkAnimationState.imprint === 'coming-in' ? 'var(--color-56)' : 'linear-gradient(to right, var(--color-56), var(--color-64))',
              transformOrigin: linkAnimationState.imprint === 'coming-in' ? 'left' : 'right',
            }}
          />
        </Link>
      </div>
    </div>
  );

  if (version === "Contact") {
    return (
      <div className="relative flex flex-col items-start justify-end w-full z-[2]">
        <div className="flex flex-col items-start pt-0 px-[16px] md:px-[60px] relative shrink-0 w-full border-t border-[var(--color-96)]">
          <div className="bg-[var(--color-100)] flex flex-col gap-[60px] md:gap-[80px] items-start pb-[24px] pt-[60px] px-[40px] relative shrink-0 w-full rounded-bl-[10px] rounded-br-[10px] mb-[60px]">
            {firstRow}
            {secondaryRow}
          </div>
        </div>
      </div>
    );
  }

  if (version === "Portfolio") {
    return (
      <div className="relative flex flex-col items-start justify-end w-full z-[2]">
        <div className="flex flex-col items-start pt-[60px] px-[16px] md:px-[60px] relative shrink-0 w-full border-t border-[var(--color-96)]">
          <div className="bg-[var(--color-100)] flex flex-col gap-[60px] md:gap-[80px] items-start pb-[24px] pt-[60px] px-[40px] relative shrink-0 w-full rounded-tl-[10px] rounded-tr-[10px] rounded-bl-[10px] rounded-br-[10px] mb-[60px]">
            {firstRow}
            {secondaryRow}
          </div>
        </div>
      </div>
    );
  }

  if (version === "PortfolioContact") {
    return (
      <div className="relative flex flex-col items-start justify-end w-full z-[2]">
        <div className="flex flex-col items-start pt-0 px-[16px] md:px-[60px] relative shrink-0 w-full border-t border-[var(--color-96)]">
          <div className="bg-[var(--color-100)] flex flex-col gap-[60px] md:gap-[80px] items-start pb-[24px] pt-[60px] px-[40px] relative shrink-0 w-full rounded-bl-[10px] rounded-br-[10px] mb-[60px]">
            {firstRow}
            {secondaryRow}
          </div>
        </div>
      </div>
    );
  }

  // Default version (Homepage)
  return (
    <div className="relative flex flex-col items-start justify-end w-full z-[2]">
      <div className="flex flex-col items-start pt-[60px] px-[16px] md:px-[60px] relative shrink-0 w-full">
        <div className="bg-[var(--color-96)] flex flex-col gap-[60px] md:gap-[80px] items-start pb-[24px] pt-[60px] px-[40px] relative shrink-0 w-full rounded-tl-[10px] rounded-tr-[10px] rounded-bl-[10px] rounded-br-[10px] mb-[60px]">
          {firstRow}
          {secondaryRow}
        </div>
      </div>
    </div>
  );
};
