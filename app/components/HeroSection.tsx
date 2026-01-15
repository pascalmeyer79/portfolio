"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const headline = "AI-native product & UX designer";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

const wordVariants = {
  hidden: {
    y: -10,
    opacity: 0,
    filter: "blur(10px)",
  },
  visible: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: [0.22, 0.61, 0.36, 1],
    },
  },
};

export const HeroSection = () => {
  const words = headline.split(" ");
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="relative z-[5] flex flex-col items-center justify-center px-[20px] md:px-[40px] pt-0" style={{ height: 'calc(100vh - 82px - 256px)', minHeight: 'calc(100vh - 82px - 256px)' }}>
      <div className="max-w-[1920px] mx-auto w-full">
      <div className="mx-auto flex max-w-[880px] flex-col items-center gap-[32px] md:gap-[40px] text-center">
        <motion.div
          className="flex flex-col gap-[8px] items-center text-[var(--color-8)]"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="font-serif text-[40px] md:text-[72px] leading-[50px] md:leading-[88px] tracking-[-0.2px] md:tracking-[-0.72px]"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {words.map((word, index) => (
              <motion.span
                key={index}
                variants={wordVariants}
                className="inline-block"
              >
                {word}
                {index < words.length - 1 && "\u00A0"}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            className="font-sans text-[16px] md:text-[22px] tracking-[-0.24px] md:tracking-[-0.44px] leading-[26px] md:leading-[36px] max-w-[880px] font-normal"
            variants={wordVariants}
          >
            Grüezi, I&apos;m Pascal. Currently designing AI data software for
            Tenzir and digital experiences for Sony Music. Based in Zurich,
            available for global collaborations.
          </motion.p>
        </motion.div>

        <motion.button
          type="button"
          className="relative inline-flex items-center justify-center rounded-[40px] bg-transparent px-[40px] py-[8px] font-sans text-[14px] md:text-[16px] leading-[22px] md:leading-[26px] font-medium text-[var(--color-100)] shadow-sm overflow-hidden"
          variants={wordVariants}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <span className="relative z-10">Schedule a Meeting</span>
          <span 
            className="absolute inset-0"
            style={{
              background: `linear-gradient(108deg, var(--color-satoshi) 0%, var(--color-satoshi) 50%, var(--color-8) 50%, var(--color-8) 100%)`,
              backgroundSize: '250% 200%',
              backgroundPosition: isHovered ? 'left center' : 'right center',
              transition: 'background-position 0.5s cubic-bezier(0.22, 0.61, 0.36, 1)',
            }}
          />
        </motion.button>
      </div>
      </div>
    </section>
  );
};

