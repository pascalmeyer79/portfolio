"use client";

import React from "react";

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

export const ReferencesSection: React.FC = () => {
  const renderLogoRow = (logos: Logo[], paddingLeft: string, paddingRight: string) => {
    return (
      <div className={`flex items-center ${paddingLeft} ${paddingRight} py-0 relative w-full h-[120px] md:h-[160px]`}>
        {logos.map((logo, index) => {
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
            <div 
              key={logo.id} 
              className={`flex flex-1 flex-col h-full items-center justify-center relative ${visibilityClass}`}
            >
              <div
                className="h-[40px] w-[100px] md:h-[64px] md:w-[160px] relative shrink-0"
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
            </div>
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
    <section className="bg-gradient-to-b from-[var(--color-96)] to-[var(--color-100)] flex flex-col gap-[40px] md:gap-[80px] items-start px-0 md:px-[40px] py-[80px] md:py-[120px] relative w-full">
      <div className="max-w-[1920px] mx-auto w-full flex flex-col gap-[80px]">
      {/* Text */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between px-[16px] md:px-[60px] py-0 relative w-full gap-[80px]">
        <div className="flex items-center justify-center w-full md:w-auto pl-0 py-0 relative shrink-0">
          <h2 className="font-serif text-[32px] md:text-[48px] text-[var(--color-8)] tracking-[-0.16px] md:tracking-[-0.24px] leading-[40px] md:leading-[60px] whitespace-nowrap md:whitespace-normal text-center md:text-left">
            Trusted by<span className="hidden md:inline"><br /></span> industry leaders
          </h2>
        </div>
        <p className="flex-1 font-sans text-[16px] md:text-[18px] max-w-[480px] text-[var(--color-8)] font-normal tracking-[-0.24px] md:tracking-[-0.27px] leading-[26px] md:leading-[30px] text-center md:text-left w-full">
          Versatility is at my core. Over the last decade, I have helped 40+
          companies across 20+ industries launch successful digital products.
          From startups to global corporations.
        </p>
      </div>

      {/* Logos Grid */}
      <div className="flex flex-col items-start relative w-full h-[273px] md:h-[353px]">
        {/* Upper Row */}
        {renderLogoRow(LOGOS.slice(0, 5), "pl-[16px] md:pl-[20px]", "pr-0")}

        {/* Horizontal Divider */}
        <div
          className="relative w-full"
          style={{
            height: "1px",
            background: "linear-gradient(to right, var(--color-100) 0%, var(--color-92) 50%, var(--color-100) 100%)",
          }}
        />

        {/* Lower Row */}
        {renderLogoRow(LOGOS.slice(5, 10), "pl-0", "pr-[16px] md:pr-[20px]")}

        {/* Durchgängige vertikale Divider - absolut positioniert im übergeordneten Container */}
        {/* 3 Logos pro Reihe für kleinere Breakpoints (bis 1023px) */}
        {Array.from({ length: 2 }).map((_, dividerIndex) => {
          const leftPosition = `${((dividerIndex + 1) * 100) / 3}%`;
          return (
            <div
              key={`divider-mobile-${dividerIndex}`}
              className="absolute top-0 lg:hidden"
                style={{
                  left: leftPosition,
                  width: "1px",
                  height: "100%",
                  background: "linear-gradient(to bottom, var(--color-100) 0%, var(--color-92) 50%, var(--color-100) 100%)",
                  transform: "rotate(18deg)",
                  transformOrigin: "center",
                }}
            />
          );
        })}
        {/* 4 Logos pro Reihe für mittlere Breakpoints (1024px - 1279px, unter 1280px) */}
        {Array.from({ length: 3 }).map((_, dividerIndex) => {
          const leftPosition = `${((dividerIndex + 1) * 100) / 4}%`;
          return (
            <div
              key={`divider-lg-${dividerIndex}`}
              className="absolute top-0 hidden lg:block xl:hidden"
                style={{
                  left: leftPosition,
                  width: "1px",
                  height: "100%",
                  background: "linear-gradient(to bottom, var(--color-100) 0%, var(--color-92) 50%, var(--color-100) 100%)",
                  transform: "rotate(18deg)",
                  transformOrigin: "center",
                }}
            />
          );
        })}
        {/* 5 Logos pro Reihe für größere Breakpoints (ab 1280px) */}
        {Array.from({ length: numDividers }).map((_, dividerIndex) => {
          const leftPosition = `${((dividerIndex + 1) * 100) / numLogosPerRow}%`;
          return (
            <div
              key={`divider-xl-${dividerIndex}`}
              className="absolute top-0 hidden xl:block"
                style={{
                  left: leftPosition,
                  width: "1px",
                  height: "100%",
                  background: "linear-gradient(to bottom, var(--color-100) 0%, var(--color-92) 50%, var(--color-100) 100%)",
                  transform: "rotate(18deg)",
                  transformOrigin: "center",
                }}
            />
          );
        })}
      </div>
      </div>
    </section>
  );
};
