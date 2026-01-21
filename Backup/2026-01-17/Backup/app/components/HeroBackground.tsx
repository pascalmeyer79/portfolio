"use client";

import React, { useEffect, useRef, useState } from "react";

type Point = { x: number; y: number };

const LINE_GAP = 12; // px
const ROTATION_DEG = 18; // Changed from -18 to 18 for correct direction
const FLASHLIGHT_RADIUS = 240;

function degToRad(deg: number) {
  return (deg * Math.PI) / 180;
}

export const HeroBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [cursor, setCursor] = useState<Point | null>(null);
  const isDrawingRef = useRef(false);

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

  // Draw function - simplified
  const drawLines = React.useCallback(() => {
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
    // Use viewport height (100vh) only
    const viewportHeight = window.innerHeight;
    
    if (rect.width === 0) {
      isDrawingRef.current = false;
      return;
    }

    const dpi = window.devicePixelRatio || 1;
    
    // Set canvas size - only 100vh
    const width = rect.width * dpi;
    const height = viewportHeight * dpi;
    
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }

    ctx.clearRect(0, 0, width, height);

    // Get color values once
    const color94 = getComputedStyle(document.documentElement).getPropertyValue(
      "--color-94"
    );
    const color94_50 = getComputedStyle(document.documentElement).getPropertyValue(
      "--color-94-50"
    );
    const color96 = getComputedStyle(document.documentElement).getPropertyValue(
      "--color-96"
    );
    const color96_50 = getComputedStyle(document.documentElement).getPropertyValue(
      "--color-96-50"
    );
    const color100 = getComputedStyle(document.documentElement).getPropertyValue(
      "--color-100"
    );

    // Background gradient: Color 100 (top) -> Color 96 (bottom) - only 100vh
    const bgGradient = ctx.createLinearGradient(0, 0, 0, height);
    bgGradient.addColorStop(0, color100.trim() || "#ffffff");
    bgGradient.addColorStop(1, color96.trim() || "#f5f5f7");
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);

    const angle = degToRad(ROTATION_DEG);
    const sin = Math.sin(angle);
    const cos = Math.cos(angle);

    const viewportWidth = window.innerWidth;
    // Use viewport height for diagonal calculation (only 100vh)
    const diag = Math.sqrt(viewportWidth * viewportWidth + viewportHeight * viewportHeight);
    const numLines = Math.ceil(diag / LINE_GAP) + 2;

    const centerX = (rect.width / 2) * dpi;
    const centerY = (viewportHeight / 2) * dpi;

    const cursorX = cursor ? cursor.x * dpi : null;
    const cursorY = cursor ? cursor.y * dpi : null;

    // Line gradient: Color 94 @ 50% (top) -> Color 94 (middle) -> Color 94 @ 50% (bottom)
    // Create gradient in the rotated coordinate system
    
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(angle);
    
    // Create gradient after rotation, so it matches the line direction
    // Check if dark mode is active
    const isDarkMode = document.documentElement.classList.contains('dark');
    const lineGradient = ctx.createLinearGradient(0, -diag * dpi, 0, diag * dpi);
    
    if (isDarkMode) {
      // Night Mode: Color 94 -> Color 96
      lineGradient.addColorStop(0, color94.trim() || "#0e0e11");
      lineGradient.addColorStop(1, color96.trim() || "#09090b");
    } else {
      // Day Mode: Color 96 @ 50% -> Color 96
      lineGradient.addColorStop(0, color96_50.trim() || "rgba(244, 244, 246, 0.5)");
      lineGradient.addColorStop(1, color96.trim() || "#f5f5f7");
    }

    // Draw all lines
    for (let i = -numLines; i <= numLines; i++) {
      const offset = i * LINE_GAP * dpi;
      const x = offset;
      const y1 = -diag * dpi;
      const y2 = diag * dpi;

      // Base line with gradient - use full opacity for visibility
      ctx.strokeStyle = lineGradient;
      ctx.globalAlpha = 1.0;
      ctx.lineWidth = 1.5 * dpi;
      ctx.beginPath();
      ctx.moveTo(x, y1);
      ctx.lineTo(x, y2);
      ctx.stroke();

      // Highlight around cursor (flashlight effect with blur)
      if (cursorX !== null && cursorY !== null) {
        // Project line point to world coordinates
        const worldX = x * cos + centerX;
        const worldY = x * sin + centerY;

        const dx = worldX - cursorX;
        const dy = worldY - cursorY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < FLASHLIGHT_RADIUS * dpi) {
          // Calculate alpha with smooth falloff (simulating blur)
          // Use a smoother curve for the blur effect
          const t = dist / (FLASHLIGHT_RADIUS * dpi);
          // Smooth falloff: 1.0 at center, 0.7 at edge (using ease-out curve)
          const smoothT = 1 - Math.pow(1 - t, 2); // Ease-out curve for smoother blur
          const highlightAlpha = 0.7 + (1 - smoothT) * 0.3; // 70% base + up to 30% more = 100% at center

          ctx.strokeStyle = lineGradient;
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
  }, [cursor]);

  // Container height is fixed to 100vh

  // Setup canvas and draw
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Initial setup
    const setupAndDraw = () => {
      const rect = container.getBoundingClientRect();
      if (rect.width === 0) {
        requestAnimationFrame(setupAndDraw);
        return;
      }
      drawLines();
    };

    // Draw immediately
    setupAndDraw();

    // Redraw on resize
    const handleResize = () => {
      requestAnimationFrame(() => {
        drawLines();
      });
    };

    window.addEventListener("resize", handleResize);

    // Also draw on cursor change
    const interval = setInterval(() => {
      drawLines();
    }, 50);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(interval);
    };
  }, [drawLines]);

  // Redraw when cursor changes
  useEffect(() => {
    drawLines();
  }, [cursor, drawLines]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute top-0 left-0 w-full overflow-hidden"
      style={{ height: '100vh', width: '100%', zIndex: 0 }}
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
