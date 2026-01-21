"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTheme } from "../theme-provider";
import { FOOTER_LINKS, COMPANY_DETAILS, ADDRESSES } from "../data";

type FooterProps = {
  version?: "Default" | "Contact" | "Portfolio" | "PortfolioContact";
};

const columnVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 + 0.1 * index,
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

  // Responsive border radius styles - 12px for all
  const footerBorderRadiusStyle = `
    .footer-container {
      border-radius: 12px;
    }
  `;

  // Border radius for Contact versions (only bottom rounded) - 12px for all
  const footerBorderRadiusBottomOnlyStyle = `
    .footer-container-bottom-only {
      border-bottom-left-radius: 12px;
      border-bottom-right-radius: 12px;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }
  `;

  const firstRow = (
    <div className="grid grid-cols-2 xl:grid-cols-6 gap-x-[40px] gap-y-[40px] md:gap-y-[40px] items-start relative shrink-0 w-full">
      {/* Email Column */}
      <motion.div
        className="col-span-2 xl:col-span-2 flex flex-col gap-[8px] items-start py-0 relative shrink-0 whitespace-pre"
        style={{ color: textColor }}
        variants={columnVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "0px 0px -100px 0px", amount: 0.3 }}
        custom={0}
      >
        <p className="font-sans text-[14px] sm:text-[15px] md:text-[16px] leading-[22px] sm:leading-[24px] md:leading-[26px] relative shrink-0 tracking-[-0.21px] sm:tracking-[-0.225px] md:tracking-[-0.24px] font-semibold">
          Say hi!
        </p>
        <Link
          href={`mailto:${FOOTER_LINKS.email}`}
          className="font-serif text-[40px] md:text-[40px] leading-[50px] not-italic relative shrink-0 tracking-[-0.2px] inline-block"
          style={{ color: textColor }}
          onMouseEnter={() => setIsEmailHovered(true)}
          onMouseLeave={() => setIsEmailHovered(false)}
        >
          {FOOTER_LINKS.email}
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

      {/* Links Column */}
      <motion.div
        className="col-span-1 xl:col-span-1 flex flex-col items-start relative text-[14px] sm:text-[15px] md:text-[16px] gap-[2px]"
        variants={columnVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "0px 0px -100px 0px", amount: 0.3 }}
        custom={1}
      >
        <p className="font-sans text-[14px] sm:text-[15px] md:text-[16px] leading-[26px] font-semibold tracking-[-0.21px] sm:tracking-[-0.225px] md:tracking-[-0.24px] relative shrink-0 mb-[4px]" style={{ color: textColor }}>
          Links
        </p>
        {FOOTER_LINKS.links.map((link) => (
          <Link
            key={link.id}
            href={link.href}
            className="font-sans text-[14px] sm:text-[15px] md:text-[16px] leading-[26px] font-medium tracking-[-0.21px] sm:tracking-[-0.225px] md:tracking-[-0.24px] relative shrink-0 inline-block transition-colors duration-200 ease-in-out"
            style={{
              background: linkGradient,
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              color: 'transparent',
            }}
            onMouseEnter={(e) => {
              setHoveredLink(link.id);
              setLinkAnimationState(prev => ({ ...prev, [link.id]: 'going-out' }));
              setTimeout(() => {
                setLinkAnimationState(prev => ({ ...prev, [link.id]: 'coming-in' }));
              }, 300);
              (e.currentTarget.style as any).WebkitTextFillColor = 'var(--color-44)';
              e.currentTarget.style.color = 'var(--color-44)';
              e.currentTarget.style.background = 'none';
              (e.currentTarget.style as any).WebkitBackgroundClip = '';
              e.currentTarget.style.backgroundClip = '';
            }}
            onMouseLeave={(e) => {
              setHoveredLink(null);
              setLinkAnimationState(prev => ({ ...prev, [link.id]: 'idle' }));
              e.currentTarget.style.background = linkGradient;
              (e.currentTarget.style as any).WebkitBackgroundClip = 'text';
              e.currentTarget.style.backgroundClip = 'text';
              (e.currentTarget.style as any).WebkitTextFillColor = 'transparent';
              e.currentTarget.style.color = 'transparent';
            }}
          >
            {link.label}
            <span
              className={`absolute h-[1px] transition-all duration-[300ms] ease-out ${linkAnimationState[link.id] === 'coming-in' ? 'left-0' : (hoveredLink === link.id || linkAnimationState[link.id] === 'going-out') ? 'right-0' : 'left-0'}`}
              style={{
                bottom: '2px',
                width: hoveredLink === link.id
                  ? (linkAnimationState[link.id] === 'going-out' ? '0%' : '100%')
                  : linkAnimationState[link.id] === 'going-out' ? '0%' : '100%',
                background: linkAnimationState[link.id] === 'coming-in' ? 'var(--color-56)' : 'linear-gradient(to right, var(--color-64), var(--color-80))',
                transformOrigin: linkAnimationState[link.id] === 'coming-in' ? 'left' : 'right',
              }}
            />
          </Link>
        ))}
      </motion.div>

      {/* Company Details Column */}
      <motion.div
        className="col-span-1 xl:col-span-1 flex flex-col font-sans text-[14px] sm:text-[15px] md:text-[16px] leading-[26px] font-medium relative tracking-[-0.21px] sm:tracking-[-0.225px] md:tracking-[-0.16px] gap-[2px]"
        style={{ color: textColor }}
        variants={columnVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "0px 0px -100px 0px", amount: 0.3 }}
        custom={2}
      >
        <p className="font-sans text-[14px] sm:text-[15px] md:text-[16px] leading-[26px] font-semibold tracking-[-0.21px] sm:tracking-[-0.225px] md:tracking-[-0.24px] mb-[4px]">
          {COMPANY_DETAILS[0]}
        </p>
        {COMPANY_DETAILS.slice(1).map((detail, idx) => (
          <p key={idx} className="font-sans text-[14px] sm:text-[15px] md:text-[16px] leading-[26px] font-normal tracking-[-0.21px] sm:tracking-[-0.225px] md:tracking-[-0.24px]">
            {detail}
          </p>
        ))}
      </motion.div>

      {/* Address Columns */}
      {ADDRESSES.map((address, index) => (
        <motion.div
          key={address.country}
          className="col-span-1 xl:col-span-1 flex flex-col gap-0 md:gap-[2px] relative text-[14px] sm:text-[15px] md:text-[16px] tracking-[-0.21px] sm:tracking-[-0.225px] md:tracking-[-0.24px]"
          style={{ color: textColor }}
          variants={columnVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -100px 0px", amount: 0.3 }}
          custom={3 + index}
        >
          <p className="font-sans text-[14px] sm:text-[15px] md:text-[16px] leading-[26px] font-semibold tracking-[-0.21px] sm:tracking-[-0.225px] md:tracking-[-0.24px] mb-[4px]">
            {address.country}
          </p>
          {address.lines.map((line, idx) => (
            <p key={idx} className="font-sans text-[14px] sm:text-[15px] md:text-[16px] leading-[26px] font-normal tracking-[-0.21px] sm:tracking-[-0.225px] md:tracking-[-0.24px]">
              {line}
            </p>
          ))}
        </motion.div>
      ))}
    </div>
  );

  const secondaryRow = (
    <>
      {/* Mobile/Tablet Layout (unter lg) */}
      <div className="flex flex-col lg:hidden items-start justify-between gap-[16px] relative shrink-0 w-full h-fit">
        <div className="flex items-center justify-between gap-0 w-full">
          <p className="font-sans text-[12px] leading-[20px] font-normal relative shrink-0 tracking-[-0.12px] whitespace-pre" style={{
            background: linkGradient,
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            color: 'transparent',
          }}>
            © Copyright {new Date().getFullYear()}. All Rights reserved.
          </p>
          <Link
            href="/imprint"
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

      {/* Desktop Layout (ab lg) */}
      <div className="hidden lg:grid grid-cols-3 items-center gap-0 relative shrink-0 w-full h-fit">
        <p className="font-sans text-[12px] leading-[20px] font-normal relative shrink-0 tracking-[-0.12px] whitespace-pre text-left" style={{
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
        <div className="flex justify-end">
          <Link
            href="/imprint"
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
    </>
  );

  if (version === "Contact" || version === "PortfolioContact") {
    return (
      <div className="relative flex flex-col items-start justify-end w-full z-[2]">
        <div className="flex flex-col items-start pt-0 px-[16px] sm:px-[40px] lg:px-[60px] relative shrink-0 w-full border-t border-[var(--color-96)]">
          <div className="bg-[var(--color-100)] flex flex-col gap-[40px] md:gap-[40px] lg:gap-[80px] items-start pb-[16px] md:pb-[24px] pt-[40px] md:pt-[60px] px-[20px] md:px-[32px] lg:px-[40px] relative shrink-0 w-full mb-[16px] md:mb-[40px] lg:mb-[60px] rounded-b-[12px] rounded-t-none">
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
        <div className="flex flex-col items-start pt-[60px] px-[16px] sm:px-[40px] lg:px-[60px] relative shrink-0 w-full border-t border-[var(--color-96)]">
          <div className="bg-[var(--color-100)] flex flex-col gap-[40px] md:gap-[40px] lg:gap-[80px] items-start pb-[16px] md:pb-[24px] pt-[40px] md:pt-[60px] px-[20px] md:px-[32px] lg:px-[40px] relative shrink-0 w-full mb-[16px] md:mb-[40px] lg:mb-[60px] rounded-[12px]">
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
      <div className="flex flex-col items-start pt-[60px] px-[16px] sm:px-[40px] lg:px-[60px] relative shrink-0 w-full">
        {/* Note: default version had bg-[var(--color-98)] in original code */}
        <div className="bg-[var(--color-98)] flex flex-col gap-[40px] md:gap-[40px] lg:gap-[80px] items-start pb-[16px] md:pb-[24px] pt-[40px] md:pt-[60px] px-[20px] md:px-[32px] lg:px-[40px] relative shrink-0 w-full mb-[16px] md:mb-[40px] lg:mb-[60px] rounded-[12px]">
          {firstRow}
          {secondaryRow}
        </div>
      </div>
    </div>
  );
};
