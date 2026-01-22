"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { useViewport } from "../utils/useViewport";

// Headline word-by-word fade in from bottom
// Removed blur filter for better mobile performance
const headlineWordVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.22, 0.61, 0.36, 1] },
  },
};

// Paragraph fade in from bottom
// Removed blur filter for better mobile performance
const paragraphVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.22, 0.61, 0.36, 1] },
  },
};

type AnimatedHeadlineProps = {
  children: string | ReactNode;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
};

export const AnimatedHeadlineFadeInBottom = ({
  children,
  className = "",
  delay = 0,
  staggerDelay = 0.06,
  as = "h2",
}: AnimatedHeadlineProps) => {
  const Component = motion[as];
  const { getViewport } = useViewport();
  
  // Convert children to string if it's a string, otherwise extract text
  const text = typeof children === "string" ? children : "";
  
  if (!text) {
    return <Component className={className}>{children}</Component>;
  }
  
  // Split by spaces and preserve line breaks
  const words = text.split(" ");
  
  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={getViewport()}
      transition={{ staggerChildren: staggerDelay, delayChildren: delay }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={headlineWordVariants}
          className="inline-block"
        >
          {word}
          {index < words.length - 1 && "\u00A0"}
        </motion.span>
      ))}
    </Component>
  );
};

type AnimatedParagraphProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "p" | "div" | "span";
};

export const AnimatedParagraphFadeInBottom = ({
  children,
  className = "",
  delay = 0.1,
  as = "p",
}: AnimatedParagraphProps) => {
  const Component = motion[as];
  const { getViewport } = useViewport();
  
  return (
    <Component
      className={className}
      variants={paragraphVariants}
      initial="hidden"
      whileInView="visible"
      viewport={getViewport()}
      transition={{ delay }}
    >
      {children}
    </Component>
  );
};
