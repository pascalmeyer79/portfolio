"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface CounterAnimationProps {
  value: string;
  className?: string;
}

export function CounterAnimation({ value, className }: CounterAnimationProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    if (!isInView) return;

    // Extract number from string
    const match = value.match(/(\$?)(\d+\.?\d*)([xXmMkK]?)/);
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const [, prefix, numberStr, suffix] = match;
    const targetNumber = parseFloat(numberStr);
    const duration = 3500; // 3.5 seconds
    const startTime = Date.now();

    const easeOutCubic = (t: number): number => {
      return 1 - Math.pow(1 - t, 3);
    };

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);
      const currentNumber = targetNumber * easedProgress;

      // Format the number
      let formattedNumber = currentNumber.toFixed(
        numberStr.includes('.') ? numberStr.split('.')[1].length : 0
      );

      // Remove trailing zeros after decimal
      if (formattedNumber.includes('.')) {
        formattedNumber = formattedNumber.replace(/\.?0+$/, '');
      }

      setDisplayValue(`${prefix}${formattedNumber}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(value); // Set final exact value
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value]);

  return (
    <p ref={ref} className={className}>
      {displayValue}
    </p>
  );
}
