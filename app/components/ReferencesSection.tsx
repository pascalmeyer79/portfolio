"use client";

import React from "react";
import { motion } from "framer-motion";

type Logo = {
  id: string;
  label: string;
  path: string;
};

const LOGOS: Logo[] = [
  {
    id: "sony",
    label: "Sony Music",
    path: "/images/home/references/Logo_Sony-Music_Black.svg",
  },
  {
    id: "logitech",
    label: "Logitech",
    path: "/images/home/references/Logo_Logitech_Black.svg",
  },
  {
    id: "porsche",
    label: "Porsche",
    path: "/images/home/references/Logo_Porsche_Black.svg",
  },
  {
    id: "loys",
    label: "Loys",
    path: "/images/home/references/Logo_Loys_Black.svg",
  },
  {
    id: "brp",
    label: "BRP",
    path: "/images/home/references/Logo_BRP_Black.svg",
  },
  {
    id: "vw",
    label: "VW",
    path: "/images/home/references/Logo_VW_White.svg",
  },
  {
    id: "bleeding",
    label: "Bleeding Fingers",
    path: "/images/home/references/Logo_BleedingFingers_Black.png",
  },
  {
    id: "avid",
    label: "AVID",
    path: "/images/home/references/Logo_AVID_Black.svg",
  },
  {
    id: "rhodes",
    label: "Rhodes",
    path: "/images/home/references/Logo_Rhodes_Black.svg",
  },
  {
    id: "metro",
    label: "Metro",
    path: "/images/home/references/Logo_METRO_Black.svg",
  },
];

// Animation variants
const headlineWordVariants = {
  hidden: { y: 20, opacity: 0, filter: "blur(10px)" },
  visible: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 0.61, 0.36, 1] },
  },
};

const paragraphVariants = {
  hidden: { y: 20, opacity: 0, filter: "blur(10px)" },
  visible: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 0.61, 0.36, 1], delay: 0.1 },
  },
};

const logoVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: (delay: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.22, 0.61, 0.36, 1], delay },
  }),
};

const verticalDividerVariants = {
  hidden: { scaleY: 0, opacity: 0 },
  visible: (delay: number) => ({
    scaleY: 1,
    opacity: 1,
    transition: { duration: 0.4, ease: [0.22, 0.61, 0.36, 1], delay },
  }),
};

const horizontalDividerVariants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.22, 0.61, 0.36, 1], delay: 0.4 },
  },
};

export const ReferencesSection: React.FC = () => {
  // Berechne Logo-Animationsreihenfolge: Sony(0), VW(5), Logitech(1), Bleeding(6), etc.
  const getLogoAnimationOrder = (logoId: string): number => {
    const order = ['sony', 'vw', 'logitech', 'bleeding', 'porsche', 'avid', 'loys', 'rhodes', 'brp', 'metro'];
    return order.indexOf(logoId);
  };

  const renderLogoRow = (logos: Logo[], paddingLeft: string, paddingRight: string, rowIndex: number) => {
    return (
      <div className={`flex items-center ${paddingLeft} ${paddingRight} py-0 relative w-full h-[120px] md:h-[160px]`}>
        {logos.map((logo, index) => {
          const animationOrder = getLogoAnimationOrder(logo.id);
          const baseDelay = 0.2; // Start delay
          const staggerDelay = 0.05; // Delay zwischen Logos
          const logoDelay = baseDelay + (animationOrder * staggerDelay);

          // Bestimme die Visibility-Klassen basierend auf dem Index
          let visibilityClass = '';
          if (index >= 3 && index < 4) {
            // Index 3 (4. Logo): sichtbar ab lg (1024px)
            visibilityClass = 'hidden lg:flex';
          } else if (index >= 4) {
            // Index 4 (5. Logo): sichtbar ab xl (1280px)
            visibilityClass = 'hidden xl:flex';
          }

          return (
            <motion.div
              key={logo.id}
              className={`flex flex-1 flex-col h-full items-center justify-center relative ${visibilityClass}`}
              variants={logoVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "0px 0px -50px 0px", amount: 0.3 }}
              custom={logoDelay}
            >
              <div
                className={`h-[40px] ${logo.id === 'bleeding' ? 'w-[90px]' : 'w-[100px]'} md:h-[56px] md:w-[140px] lg:h-[64px] lg:w-[160px] relative shrink-0`}
                style={{
                  WebkitMaskImage: `url(${logo.path})`,
                  maskImage: `url(${logo.path})`,
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                  maskPosition: "center",
                  WebkitMaskSize: "contain",
                  maskSize: "contain",
                  backgroundColor: "var(--color-8)",
                }}
              >
                <span className="sr-only">{logo.label}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    );
  };

  const numLogosPerRow = 5;
  const numDividers = numLogosPerRow - 1;
  const rowHeight = 160;
  const rowHeightMobile = 120;
  const horizontalDividerHeight = 1;
  const horizontalDividerMargin = 16; // my-4 = 16px oben und unten
  const totalHeight = rowHeight * 2 + horizontalDividerHeight + horizontalDividerMargin * 2;
  const totalHeightMobile = rowHeightMobile * 2 + horizontalDividerHeight + horizontalDividerMargin * 2;

  return (
    <section className="bg-gradient-to-b from-[var(--color-96)] to-[var(--color-100)] flex flex-col gap-[40px] md:gap-[80px] items-start px-0 py-[80px] md:py-[120px] relative w-full">
      <div className="max-w-[1920px] mx-auto w-full flex flex-col gap-[40px] md:gap-[80px] px-[16px] md:px-[40px]">
        {/* Text */}
        <div className="flex flex-col md:grid md:grid-cols-2 lg:flex lg:flex-row md:items-start md:justify-between px-0 md:px-[20px] 2xl:px-[60px] py-0 relative w-full gap-[8px] md:gap-[40px] lg:gap-[80px]">
          <div className="flex items-center justify-center md:justify-start w-full md:w-auto pl-0 py-0 relative shrink-0">
            <motion.h2
              className="font-serif text-[32px] sm:text-[36px] md:text-[40px] lg:text-[44px] xl:text-[48px] text-[var(--color-8)] tracking-[-0.16px] sm:tracking-[-0.18px] md:tracking-[-0.20px] lg:tracking-[-0.22px] xl:tracking-[-0.24px] leading-[40px] sm:leading-[45px] md:leading-[50px] lg:leading-[55px] xl:leading-[60px] whitespace-nowrap md:whitespace-normal text-center md:text-left"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "0px 0px -100px 0px", amount: 0.3 }}
              transition={{ staggerChildren: 0.06 }}
            >
              <motion.span variants={headlineWordVariants} className="inline-block">
                Trusted
              </motion.span>
              {"\u00A0"}
              <motion.span variants={headlineWordVariants} className="inline-block">
                by
              </motion.span>
              {"\u00A0"}
              <span className="hidden md:inline"><br /></span>
              <motion.span variants={headlineWordVariants} className="inline-block">
                industry
              </motion.span>
              {"\u00A0"}
              <motion.span variants={headlineWordVariants} className="inline-block">
                leaders
              </motion.span>
            </motion.h2>
          </div>
          <motion.p
            className="flex-1 font-sans text-[18px] md:text-[20px] max-w-full md:max-w-[560px] text-[var(--color-8)] font-normal tracking-[-0.27px] leading-[30px] md:leading-[32px] text-center md:text-left w-full mx-auto md:mx-0"
            variants={paragraphVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            Versatility is at my core. Over the last decade, I have helped 40+
            companies across 20+ industries launch successful digital products.
            From startups to global corporations.
          </motion.p>
        </div>

        {/* Logos Grid */}
        <div className="flex flex-col items-start relative w-full h-[273px] md:h-[353px]">
          {/* Upper Row */}
          {renderLogoRow(LOGOS.slice(0, 5), "pl-[40px] md:pl-[20px]", "pr-0", 0)}

          {/* Horizontal Divider */}
          <motion.div
            className="relative w-full"
            style={{
              height: "1px",
              background: "linear-gradient(to right, var(--color-100) 0%, var(--color-92) 50%, var(--color-100) 100%)",
              originX: 0.5,
            }}
            variants={horizontalDividerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          />

          {/* Lower Row */}
          {renderLogoRow(LOGOS.slice(5, 10), "pl-0", "pr-[40px] md:pr-[20px]", 1)}

          {/* Durchgängige vertikale Divider - absolut positioniert im übergeordneten Container */}
          {/* 3 Logos pro Reihe für kleinere Breakpoints (bis 1023px) */}
          {Array.from({ length: 2 }).map((_, dividerIndex) => {
            const leftPosition = `${((dividerIndex + 1) * 100) / 3}%`;
            // Berechne Delay: Nach dem entsprechenden Logo
            const logosBefore = (dividerIndex + 1);
            const dividerDelay = 0.2 + (logosBefore * 0.05);

            return (
              <motion.div
                key={`divider-mobile-${dividerIndex}`}
                className="absolute top-0 lg:hidden"
                style={{
                  left: leftPosition,
                  width: "1px",
                  height: "100%",
                  background: "linear-gradient(to bottom, var(--color-100) 0%, var(--color-92) 50%, var(--color-100) 100%)",
                }}
                variants={verticalDividerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "0px 0px -50px 0px", amount: 0.3 }}
                custom={dividerDelay}
                animate={{ rotate: 18 }}
              />
            );
          })}
          {/* 4 Logos pro Reihe für mittlere Breakpoints (1024px - 1279px, unter 1280px) */}
          {Array.from({ length: 3 }).map((_, dividerIndex) => {
            const leftPosition = `${((dividerIndex + 1) * 100) / 4}%`;
            const logosBefore = (dividerIndex + 1);
            const dividerDelay = 0.2 + (logosBefore * 0.05);

            return (
              <motion.div
                key={`divider-lg-${dividerIndex}`}
                className="absolute top-0 hidden lg:block xl:hidden"
                style={{
                  left: leftPosition,
                  width: "1px",
                  height: "100%",
                  background: "linear-gradient(to bottom, var(--color-100) 0%, var(--color-92) 50%, var(--color-100) 100%)",
                }}
                variants={verticalDividerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "0px 0px -50px 0px", amount: 0.3 }}
                custom={dividerDelay}
                animate={{ rotate: 18 }}
              />
            );
          })}
          {/* 5 Logos pro Reihe für größere Breakpoints (ab 1280px) */}
          {Array.from({ length: numDividers }).map((_, dividerIndex) => {
            const leftPosition = `${((dividerIndex + 1) * 100) / numLogosPerRow}%`;
            const logosBefore = (dividerIndex + 1);
            const dividerDelay = 0.2 + (logosBefore * 0.05);

            return (
              <motion.div
                key={`divider-xl-${dividerIndex}`}
                className="absolute top-0 hidden xl:block"
                style={{
                  left: leftPosition,
                  width: "1px",
                  height: "100%",
                  background: "linear-gradient(to bottom, var(--color-100) 0%, var(--color-92) 50%, var(--color-100) 100%)",
                }}
                variants={verticalDividerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "0px 0px -50px 0px", amount: 0.3 }}
                custom={dividerDelay}
                animate={{ rotate: 18 }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};
