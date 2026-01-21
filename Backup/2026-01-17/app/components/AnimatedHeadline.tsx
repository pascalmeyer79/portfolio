"use client";

import { motion } from "framer-motion";
import { ReactNode, Children, isValidElement, cloneElement } from "react";

type AnimatedHeadlineProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  style?: React.CSSProperties;
};

const containerVariants = (staggerDelay: number, delayChildren: number) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: delayChildren,
    },
  },
});

const wordVariants = {
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
      duration: 0.6,
      ease: [0.22, 0.61, 0.36, 1],
    },
  },
};

export const AnimatedHeadline = ({
  children,
  className = "",
  delay = 0.1,
  staggerDelay = 0.06,
  style,
}: AnimatedHeadlineProps) => {
  const processTextNode = (text: string, keyPrefix: string = "") => {
    const words = text.split(" ");
    return words.map((word, index) => (
      <motion.span
        key={`${keyPrefix}-${index}`}
        variants={wordVariants}
        className="inline-block"
      >
        {word}
        {index < words.length - 1 && "\u00A0"}
      </motion.span>
    ));
  };

  const processNode = (node: ReactNode, keyPrefix: string = ""): ReactNode => {
    if (typeof node === "string") {
      return processTextNode(node, keyPrefix);
    }

    if (isValidElement(node)) {
      const element = node as React.ReactElement;
      const elementChildren = element.props.children;

      // If the element has string children, process the text
      if (typeof elementChildren === "string") {
        const words = elementChildren.split(" ");
        return words.map((word, index) => (
          <motion.span
            key={`${keyPrefix}-elem-${index}`}
            variants={wordVariants}
            className="inline-block"
          >
            {cloneElement(element, { ...element.props, children: word })}
            {index < words.length - 1 && "\u00A0"}
          </motion.span>
        ));
      }

      // If the element has nested children, process them recursively
      if (elementChildren) {
        const processedChildren = Children.map(elementChildren, (child, idx) =>
          processNode(child, `${keyPrefix}-${idx}`)
        );
        return cloneElement(element, { ...element.props, children: processedChildren });
      }

      return element;
    }

    return node;
  };

  const renderChildren = () => {
    if (Array.isArray(children)) {
      return Children.map(children, (child, idx) => processNode(child, `child-${idx}`));
    }
    return processNode(children, "root");
  };

  return (
    <motion.h1
      className={className}
      style={style}
      variants={containerVariants(staggerDelay, delay)}
      initial="hidden"
      animate="visible"
    >
      {renderChildren()}
    </motion.h1>
  );
};
