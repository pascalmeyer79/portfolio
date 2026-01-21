"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useTheme } from "../theme-provider";

type Point = { x: number; y: number };

const LINE_GAP = 12; // px
const ROTATION_DEG = 18;
const FLASHLIGHT_RADIUS = 240;

function degToRad(deg: number) {
  return (deg * Math.PI) / 180;
}

export const FooterBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [cursor, setCursor] = useState<Point | null>(null);
  const isDrawingRef = useRef(false);
  const { theme } = useTheme();

  // Track mouse position relative to container
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      setCursor({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      });
    };

    const handleLeave = () => setCursor(null);

    container.addEventListener("mousemove", handleMove);
    container.addEventListener("mouseleave", handleLeave);

    return () => {
      container.removeEventListener("mousemove", handleMove);
      container.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  // Draw function
  const drawLines = useCallback(() => {
    if (isDrawingRef.current) return;
    isDrawingRef.current = true;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) {
      isDrawingRef.current = false;
      return;
    }

    const ctx = canvas.getContext("2d", { willReadFrequently: false });
    if (!ctx) {
      isDrawingRef.current = false;
      return;
    }

    const rect = container.getBoundingClientRect();
    const containerWidth = rect.width;
    const containerHeight = rect.height;

    if (containerWidth === 0 || containerHeight === 0) {
      isDrawingRef.current = false;
      return;
    }

    const dpi = window.devicePixelRatio || 1;

    // Set canvas size to container dimensions
    const width = containerWidth * dpi;
    const height = containerHeight * dpi;

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }

    ctx.clearRect(0, 0, width, height);

    // Background: color-96
    const color96 = getComputedStyle(document.documentElement).getPropertyValue(
      "--color-96"
    ).trim() || "#f5f5f7";
    const color92 = getComputedStyle(document.documentElement).getPropertyValue(
      "--color-92"
    ).trim() || "#e8e8ed";
    ctx.fillStyle = color96;
    ctx.fillRect(0, 0, width, height);

    const angle = degToRad(ROTATION_DEG);
    const sin = Math.sin(angle);
    const cos = Math.cos(angle);

    // Calculate diagonal to ensure full coverage - ensure lines extend well beyond container
    const viewportWidth = window.innerWidth;
    // Calculate how many lines we need to cover the entire rotated width
    // When rotated, the width becomes: containerWidth * cos + containerHeight * sin
    const rotatedWidth = Math.abs(containerWidth * cos) + Math.abs(containerHeight * sin);
    const rotatedHeight = Math.abs(containerWidth * sin) + Math.abs(containerHeight * cos);
    // Use viewport width to ensure we cover beyond container edges
    const effectiveWidth = Math.max(viewportWidth, rotatedWidth * 1.5);
    const diag = Math.sqrt(effectiveWidth * effectiveWidth + rotatedHeight * rotatedHeight);
    // Calculate number of lines needed to cover the full width (with extra margin)
    const numLines = Math.ceil((effectiveWidth / LINE_GAP) / 2) + 10;

    const centerX = (containerWidth / 2) * dpi;
    const centerY = (containerHeight / 2) * dpi;

    const cursorX = cursor ? cursor.x * dpi : null;
    const cursorY = cursor ? cursor.y * dpi : null;

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(angle);

    // Calculate the line endpoints first (extended beyond container for full coverage)
    const y1 = -diag * dpi * 1.5;
    const y2 = diag * dpi * 1.5;

    // Get color-80 for lines
    const color80 = getComputedStyle(document.documentElement).getPropertyValue(
      "--color-80"
    ).trim() || "#cccccc";

    // Draw all lines - extend beyond container edges to ensure full coverage
    for (let i = -numLines; i <= numLines; i++) {
      const offset = i * LINE_GAP * dpi;
      const x = offset;

      // Base line, always visible - use color-80
      ctx.strokeStyle = color80;
      ctx.globalAlpha = 1;
      ctx.lineWidth = 1 * dpi;
      ctx.beginPath();
      ctx.moveTo(x, y1);
      ctx.lineTo(x, y2);
      ctx.stroke();

      // Highlight around cursor (flashlight effect)
      if (cursorX !== null && cursorY !== null) {
        const worldX = x * cos + centerX;
        const worldY = x * sin + centerY;

        const dx = worldX - cursorX;
        const dy = worldY - cursorY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < FLASHLIGHT_RADIUS * dpi) {
          const t = dist / (FLASHLIGHT_RADIUS * dpi);
          // Ease-out curve for blur effect
          const easedT = 1 - Math.pow(1 - t, 2); // Quadratic ease-out
          const highlightAlpha = 0.5 + (1 - easedT) * 0.5; // 50% base + up to 50% highlight

          ctx.strokeStyle = color80;
          ctx.globalAlpha = highlightAlpha;
          ctx.lineWidth = 1.5 * dpi;
          ctx.beginPath();
          ctx.moveTo(x, y1);
          ctx.lineTo(x, y2);
          ctx.stroke();
        }
      }
    }

    ctx.restore();
    ctx.globalAlpha = 1;
    
    isDrawingRef.current = false;
  }, [cursor, theme]);

  // Setup canvas and draw
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const animate = () => {
      drawLines();
      requestAnimationFrame(animate);
    };

    // Initial draw and start animation loop
    const animationFrameId = requestAnimationFrame(animate);

    // Redraw on resize
    const handleResize = () => {
      drawLines();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [drawLines]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 overflow-hidden z-[0] min-h-full"
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ 
          imageRendering: 'crisp-edges',
          display: 'block',
          width: '100%',
          height: '100%'
        }}
      />
    </div>
  );
};
