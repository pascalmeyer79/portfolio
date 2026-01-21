"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTheme } from "../theme-provider";
import { PrimaryButton } from "./PrimaryButton";
import { AnimatedHeadlineFadeInBottom, AnimatedParagraphFadeInBottom } from "./AnimatedText";

export const AboutTeaser: React.FC = () => {
  const { theme } = useTheme();
  const [isSecondaryHovered, setIsSecondaryHovered] = useState(false);

  // Calculate years since 2022
  const startYear = 2022;
  const currentYear = new Date().getFullYear();
  const yearsSince2022 = currentYear - startYear;

  const sideSrc = theme === "dark"
    ? "/images/home/pascalmeyer_day_side.jpg"
    : "/images/home/pascalmeyer_night_side.jpg";

  const frontSrc = theme === "dark"
    ? "/images/home/pascalmeyer_day_front.jpg"
    : "/images/home/pascalmeyer_night_front.jpg";

  return (
    <section className="bg-[var(--color-100)] flex flex-col items-center justify-center px-0 py-[80px] md:py-[120px] relative w-full z-[2]">
      <div className="max-w-[1920px] mx-auto w-full flex justify-center">
      <div className="flex flex-col gap-[40px] items-center max-w-[880px] px-[16px] sm:px-[40px] lg:px-[60px] py-0 relative w-full">
        <AnimatedHeadlineFadeInBottom 
          as="h2"
          className="font-serif text-[40px] md:text-[72px] text-[var(--color-8)] text-center tracking-[-0.2px] md:tracking-[-0.72px] leading-[50px] md:leading-[88px]"
        >
          Pioneering the uncharted
        </AnimatedHeadlineFadeInBottom>
        <Link href="/about" className="block">
          <motion.div 
            className="group h-[360px] md:h-[666px] max-h-[360px] md:max-h-[666px] max-w-[260px] md:max-w-[480px] relative rounded-[1000px] shrink-0 w-[260px] md:w-[480px] overflow-hidden cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1], delay: 0.2 }}
          >
            <Image
              src={sideSrc}
              alt="Pascal Meyer"
              fill
              sizes="(max-width: 768px) 260px, 480px"
              className="object-cover group-hover:opacity-0"
              quality={100}
              unoptimized={true}
              priority
            />
            <Image
              src={frontSrc}
              alt="Pascal Meyer"
              fill
              sizes="(max-width: 768px) 260px, 480px"
              className="absolute inset-0 object-cover opacity-0 group-hover:opacity-100"
              quality={100}
              unoptimized={true}
              priority
            />
          </motion.div>
        </Link>
        <div className="flex flex-col gap-[20px] items-start text-[18px] md:text-[20px] lg:text-[22px] text-[var(--color-8)] text-center tracking-[-0.27px] md:tracking-[-0.35px] lg:tracking-[-0.44px] leading-[30px] md:leading-[33px] lg:leading-[36px] w-full">
          <motion.p 
            className="font-sans text-[18px] md:text-[20px] lg:text-[22px] text-[var(--color-8)] font-normal w-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1], delay: 0.3 }}
          >
            My passion lies in turning complexity into simplicity. With a background in design, code, business, and strategy, I help teams build products that define their category. For the past {yearsSince2022} years, I have dedicated my time, energy, and research to AI.
          </motion.p>
          <motion.p 
            className="font-sans text-[18px] md:text-[20px] lg:text-[22px] text-[var(--color-8)] font-medium w-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1], delay: 0.4 }}
          >
            Let&apos;s build what&apos;s next.
          </motion.p>
        </div>
        <div className="flex gap-[12px] items-start justify-center relative w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1], delay: 0.4 }}
            className="flex-1 md:flex-none"
          >
            <PrimaryButton href="/contact" className="w-full md:w-auto">Get in Touch</PrimaryButton>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1], delay: 0.5 }}
            className="flex-1 md:flex-none"
          >
            <Link
              href="/about"
              className="relative inline-flex items-center justify-center rounded-[40px] p-[1px] w-full md:w-auto"
              onMouseEnter={() => setIsSecondaryHovered(true)}
              onMouseLeave={() => setIsSecondaryHovered(false)}
              style={{
                background: `linear-gradient(to right, var(--color-satoshi) 0%, var(--color-satoshi) 50%, var(--color-92) 50%, var(--color-92) 100%)`,
                backgroundSize: '250% 100%',
                backgroundPosition: isSecondaryHovered ? 'left center' : 'right center',
                transition: 'background-position 0.5s cubic-bezier(0.22, 0.61, 0.36, 1)',
              }}
            >
              <span className="flex items-center justify-center px-[40px] py-[8px] rounded-[40px] bg-[var(--color-100)] backdrop-blur-sm backdrop-filter font-sans text-[16px] leading-[26px] font-medium text-[var(--color-16)] w-full md:w-auto">
                <span className="md:hidden">About Me</span>
                <span className="hidden md:inline">More About Me</span>
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
      </div>
    </section>
  );
};

