"use client";

import { motion } from "framer-motion";
import { PrimaryButton } from "./PrimaryButton";
import { AnimatedHeadline } from "./AnimatedHeadline";

const headline = "AI-native product & UX designer";

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
      delay: 0.1,
      duration: 0.6,
      ease: [0.22, 0.61, 0.36, 1],
    },
  },
};

const buttonVariants = {
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
      delay: 0.2,
      duration: 0.6,
      ease: [0.22, 0.61, 0.36, 1],
    },
  },
};

export const HeroSection = () => {
  return (
    <section className="relative z-[5] flex flex-col items-center justify-center px-[16px] sm:px-[40px] lg:px-[60px] pt-0" style={{ height: 'calc(100vh - 82px - 256px)', minHeight: 'calc(100vh - 82px - 256px)' }}>
      <div className="max-w-[1920px] mx-auto w-full">
      <div className="mx-auto flex max-w-[880px] flex-col items-center gap-[32px] md:gap-[40px] text-center">
        <div className="flex flex-col gap-[8px] items-center text-[var(--color-8)]">
          <AnimatedHeadline
            className="font-serif text-[40px] md:text-[72px] leading-[50px] md:leading-[88px] tracking-[-0.2px] md:tracking-[-0.72px]"
          >
            {headline}
          </AnimatedHeadline>

          <motion.p
            className="font-sans text-[16px] md:text-[22px] tracking-[-0.24px] md:tracking-[-0.44px] leading-[26px] md:leading-[36px] max-w-[880px] font-normal"
            variants={textVariants}
            initial="hidden"
            animate="visible"
          >
            Grüezi, I&apos;m Pascal. Currently designing AI data software for
            Tenzir and digital experiences for Sony Music. Based in Zurich,
            available for global collaborations.
          </motion.p>
        </div>

        <motion.div 
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
        >
          <PrimaryButton>Schedule a Meeting</PrimaryButton>
        </motion.div>
      </div>
      </div>
    </section>
  );
};

