"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { getBorderRadius } from "../utils/borderRadius";

interface ImageComparisonProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  projectSlug?: string;
}

export function ImageComparison({
  beforeImage,
  afterImage,
  beforeLabel,
  afterLabel,
  projectSlug = 'tenzir', // Default to tenzir for desktop screens
}: ImageComparisonProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  const handleMouseDown = () => setIsDragging(true);

  useEffect(() => {
    const handleMouseMoveWrapper = (e: MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    };

    const handleTouchMoveWrapper = (e: TouchEvent) => {
      if (!isDragging) return;
      handleMove(e.touches[0].clientX);
    };

    const handleMouseUpWrapper = () => setIsDragging(false);

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMoveWrapper);
      document.addEventListener("mouseup", handleMouseUpWrapper);
      document.addEventListener("touchmove", handleTouchMoveWrapper);
      document.addEventListener("touchend", handleMouseUpWrapper);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMoveWrapper);
      document.removeEventListener("mouseup", handleMouseUpWrapper);
      document.removeEventListener("touchmove", handleTouchMoveWrapper);
      document.removeEventListener("touchend", handleMouseUpWrapper);
    };
  }, [isDragging]);

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          .comparison-container {
            border-radius: ${projectSlug === 'vario' ? 'clamp(22px, 4vw, 48px)' : 'clamp(6px, 0.75vw, 16px)'};
          }
        `
      }} />
      <div
        ref={containerRef}
        className="comparison-container relative w-full overflow-hidden border-responsive select-none cursor-ew-resize"
        style={{ 
          backgroundColor: 'transparent',
          borderColor: 'var(--color-0-80)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          boxSizing: 'border-box'
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
      {/* After Image (Background) */}
      <div className="relative w-full">
        <Image
          src={afterImage}
          alt={afterLabel || "After"}
          width={1920}
          height={1080}
          className="w-full h-auto object-cover"
          quality={100}
          unoptimized={true}
        />
      </div>

      {/* Before Image (Clipped overlay) */}
      <div
        className="absolute top-0 left-0 w-full h-full overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <Image
          src={beforeImage}
          alt={beforeLabel || "Before"}
          width={1920}
          height={1080}
          className="w-full h-auto object-cover"
          quality={100}
          unoptimized={true}
        />
      </div>

      {/* Slider Line */}
      <div
        className="absolute top-0 bottom-0 w-[4px] pointer-events-none"
        style={{ 
          left: `${sliderPosition}%`, 
          transform: 'translateX(-50%)',
          backgroundColor: 'var(--color-0-80)',
          backdropFilter: 'blur(40px)',
          WebkitBackdropFilter: 'blur(40px)',
          zIndex: 10
        }}
      >
        {/* Slider Handle */}
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[40px] h-[40px] rounded-full flex items-center justify-center shadow-lg pointer-events-auto cursor-ew-resize"
          style={{
            zIndex: 20
          }}
        >
          {/* Opaque background circle to hide the line */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              backgroundColor: 'var(--color-98)',
              zIndex: -1
            }}
          />
          {/* Glassmorphic overlay */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              backgroundColor: 'var(--color-0-80)',
              backdropFilter: 'blur(40px)',
              WebkitBackdropFilter: 'blur(40px)'
            }}
          />
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ zIndex: 1, position: 'relative' }}>
            <path d="M16.712 16.3085L15.985 15.6195L19.079 12.5195H13V11.5005H19.079L16.004 8.42047L16.711 7.73047L21 12.0205L16.712 16.3085ZM7.308 16.3085L3 12.0195L7.289 7.73147L7.996 8.41947L4.921 11.5005H11V12.5205H4.902L7.996 15.6205L7.308 16.3085Z" fill="var(--color-100)"/>
          </svg>
        </div>
      </div>
      </div>
    </>
  );
}
