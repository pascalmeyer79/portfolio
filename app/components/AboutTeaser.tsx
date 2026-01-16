"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "../theme-provider";

export const AboutTeaser: React.FC = () => {
  const { theme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [isPrimaryHovered, setIsPrimaryHovered] = useState(false);
  const [isSecondaryHovered, setIsSecondaryHovered] = useState(false);

  const sideSrc = theme === "dark"
    ? "/images/home/pascalmeyer_day_side.jpg"
    : "/images/home/pascalmeyer_night_side.jpg";

  const frontSrc = theme === "dark"
    ? "/images/home/pascalmeyer_day_front.jpg"
    : "/images/home/pascalmeyer_night_front.jpg";

  return (
    <section className="bg-[var(--color-100)] flex flex-col items-center justify-center px-0 py-[80px] md:py-[120px] relative w-full z-[2]">
      <div className="max-w-[1920px] mx-auto w-full flex justify-center">
      <div className="flex flex-col gap-[40px] items-center max-w-[880px] px-[20px] md:px-[40px] py-0 relative w-full">
        <h2 className="font-serif text-[40px] md:text-[72px] text-[var(--color-8)] text-center tracking-[-0.2px] md:tracking-[-0.72px] leading-[50px] md:leading-[88px]">
          Pioneering the uncharted
        </h2>
        <div 
          className="group h-[360px] md:h-[666px] max-h-[360px] md:max-h-[666px] max-w-[260px] md:max-w-[480px] relative rounded-[1000px] shrink-0 w-[260px] md:w-[480px] overflow-hidden"
          style={{ 
            backgroundColor: theme === "dark" ? "var(--color-100)" : "var(--color-8)" 
          }}
        >
          <Image
            src={sideSrc}
            alt="Pascal Meyer"
            fill
            className="object-cover group-hover:opacity-0"
          />
          <Image
            src={frontSrc}
            alt="Pascal Meyer"
            fill
            className="absolute inset-0 object-cover opacity-0 group-hover:opacity-100"
          />
        </div>
        <div className="flex flex-col gap-[20px] items-start text-[16px] md:text-[22px] text-[var(--color-8)] text-center tracking-[-0.24px] md:tracking-[-0.44px] leading-[26px] md:leading-[36px] w-full">
          <p className="font-sans text-[16px] md:text-[22px] text-[var(--color-8)] font-normal w-full">
            My passion lies in turning complexity into simplicity. With a background in design, code, business, and strategy, I help teams build products that define their category. For the past 3 years, I have dedicated my time, energy, and research to AI.
          </p>
          <p className="font-sans text-[16px] md:text-[22px] text-[var(--color-8)] font-medium w-full">
            Let&apos;s build what&apos;s next.
          </p>
        </div>
        <div className="flex gap-[12px] items-start justify-center relative w-full">
          <Link
            href="/contact"
            className="relative inline-flex items-center justify-center rounded-[40px] bg-transparent px-[40px] py-[8px] font-sans text-[14px] md:text-[16px] leading-[22px] md:leading-[26px] font-medium text-[var(--color-100)] shadow-sm overflow-hidden"
            onMouseEnter={() => {
              setIsHovered(true);
              setIsPrimaryHovered(true);
            }}
            onMouseLeave={() => {
              setIsHovered(false);
              setIsPrimaryHovered(false);
            }}
          >
            <span className="relative z-10">Get in Touch</span>
            <span 
              className="absolute inset-0"
              style={{
                background: `linear-gradient(108deg, var(--color-satoshi) 0%, var(--color-satoshi) 50%, var(--color-8) 50%, var(--color-8) 100%)`,
                backgroundSize: '250% 200%',
                backgroundPosition: isHovered ? 'left center' : 'right center',
                transition: 'background-position 0.5s cubic-bezier(0.22, 0.61, 0.36, 1)',
              }}
            />
          </Link>
          <Link
            href="/about"
            className="relative flex items-center justify-center rounded-[40px] shrink-0 overflow-hidden p-[1px]"
            onMouseEnter={() => setIsSecondaryHovered(true)}
            onMouseLeave={() => setIsSecondaryHovered(false)}
            style={{
              background: `linear-gradient(to right, var(--color-satoshi) 0%, var(--color-satoshi) 50%, var(--color-92) 50%, var(--color-92) 100%)`,
              backgroundSize: '250% 100%',
              backgroundPosition: isSecondaryHovered ? 'left center' : 'right center',
              transition: 'background-position 0.5s cubic-bezier(0.22, 0.61, 0.36, 1)',
            }}
          >
            <span className="flex items-center justify-center px-[40px] py-[8px] rounded-[40px] bg-[var(--color-100)] backdrop-blur-sm backdrop-filter">
              <p className="font-sans text-[14px] md:text-[16px] leading-[22px] md:leading-[26px] font-medium text-[var(--color-16)] text-center tracking-[-0.24px]">
                More About Me
              </p>
            </span>
          </Link>
        </div>
      </div>
      </div>
    </section>
  );
};

