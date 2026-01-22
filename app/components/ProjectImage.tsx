import React from "react";
import Image from "next/image";
import { getBorderRadius, shouldExcludeFromBorderRadius } from "../utils/borderRadius";

type StackedImage = {
  src: string;
  heightOffset?: number; // in px, subtracted from base height
};

type ProjectImageProps = {
  src: string | StackedImage[];
  alt: string;
  aspectRatio?: string;
  className?: string;
  imageClassName?: string;
  allowOverflow?: boolean;
  imageBorderRadius?: string;
  containerBorderRadius?: string;
  containerWidth?: string;
  projectSlug?: string;
  gridCols?: number;
  isAppScreen?: boolean;
};

export const ProjectImage: React.FC<ProjectImageProps> = ({
  src,
  alt,
  aspectRatio = "852/480",
  className = "",
  imageClassName = "",
  allowOverflow = false,
  imageBorderRadius,
  containerBorderRadius,
  containerWidth,
  projectSlug = 'tenzir',
  gridCols = 1,
  isAppScreen = false,
}) => {
  // Check if image should be excluded (portraits, logos)
  const imageSrc = Array.isArray(src) ? src[0]?.src || '' : src;
  const shouldExclude = shouldExcludeFromBorderRadius(imageSrc);
  
  // Calculate border radius if not provided
  const calculatedBorderRadius = shouldExclude 
    ? (containerBorderRadius || "0px")
    : `${getBorderRadius(projectSlug, gridCols, isAppScreen)}px`;
  
  const finalContainerBorderRadius = containerBorderRadius || calculatedBorderRadius;
  const finalImageBorderRadius = imageBorderRadius || calculatedBorderRadius;
  const isStacked = Array.isArray(src);
  
  // Calculate responsive border radius based on desktop value
  const getResponsiveBorderRadius = (desktopValue: string) => {
    // Extract numeric value (e.g., "12px" -> 12)
    const numericValue = parseFloat(desktopValue);
    if (isNaN(numericValue)) return { mobile: desktopValue, tablet: desktopValue, desktop: desktopValue };
    
    // Mobile: 60% of desktop, Tablet: 80% of desktop, Desktop: 100%
    const mobileValue = Math.max(6, Math.round(numericValue * 0.6));
    const tabletValue = Math.max(6, Math.round(numericValue * 0.8));
    
    return {
      mobile: `${mobileValue}px`,
      tablet: `${tabletValue}px`,
      desktop: desktopValue,
    };
  };
  
  const borderRadiusValues = getResponsiveBorderRadius(finalContainerBorderRadius);
  
  return (
    <div className={`relative w-full p-[2px] ${className}`} style={{ userSelect: 'none', WebkitUserDrag: 'none' } as React.CSSProperties}>
      {isStacked ? (
        // Stacked images layout - each image has its own border
        <div className={`relative w-full ${allowOverflow ? 'overflow-visible' : 'overflow-hidden'} h-[248px] md:h-[328px] lg:h-[408px] xl:h-[488px]`}>
          <div className="relative flex flex-row items-end h-full">
            {src.map((image, index) => {
              const offset = image.heightOffset || 0;
              const baseHeight = 480;
              const baseWidth = 222;
              const offsetRatio = offset / baseHeight;
              const widthRatio = baseWidth / baseHeight;
              // Use deterministic ID based on index and src to avoid hydration mismatch
              const srcHash = typeof image.src === 'string' ? image.src.split('/').pop()?.replace(/[^a-zA-Z0-9]/g, '') || index : index;
              const uniqueId = `project-image-${index}-${srcHash}`;
              
              return (
                <React.Fragment key={index}>
                  <style dangerouslySetInnerHTML={{
                    __html: `
                      .${uniqueId} {
                        border-radius: ${projectSlug === 'vario' ? 'clamp(22px, 4vw, 48px)' : (isAppScreen ? 'clamp(12px, 1.5vw, 32px)' : 'clamp(6px, 0.75vw, 16px)')};
                        height: calc((240px - ${offset * (240 / baseHeight)}px));
                        width: calc((240px - ${offset * (240 / baseHeight)}px) * ${widthRatio});
                      }
                      ${projectSlug === 'vw' && !isAppScreen ? `
                      @media (max-width: 767px) {
                        .${uniqueId} {
                          border-radius: 3px;
                        }
                      }
                      ` : ''}
                      @media (min-width: 768px) {
                        .${uniqueId} {
                          height: calc((320px - ${offset * (320 / baseHeight)}px));
                          width: calc((320px - ${offset * (320 / baseHeight)}px) * ${widthRatio});
                        }
                      }
                      @media (min-width: 1024px) {
                        .${uniqueId} {
                          height: calc((400px - ${offset * (400 / baseHeight)}px));
                          width: calc((400px - ${offset * (400 / baseHeight)}px) * ${widthRatio});
                        }
                      }
                      @media (min-width: 1280px) {
                        .${uniqueId} {
                          height: calc((480px - ${offset}px));
                          width: calc((480px - ${offset}px) * ${widthRatio});
                        }
                      }
                    `
                  }} />
                  <div
                    className={`relative overflow-hidden shrink-0 border-4 ${uniqueId}`}
                    style={{
                      backdropFilter: "blur(10px)",
                      WebkitBackdropFilter: "blur(10px)",
                      boxSizing: "content-box",
                      borderColor: "var(--color-0-80)",
                      marginLeft: index === 0 ? '0' : '-20px',
                      zIndex: src.length - index,
                    }}
                  >
                    <Image
                      src={image.src}
                      alt={`${alt} ${index + 1}`}
                      fill
                      className={`object-cover ${imageClassName}`}
                      draggable={false}
                      quality={100}
                      unoptimized={true}
                    />
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      ) : (
        // Single image layout
        <>
          <style dangerouslySetInnerHTML={{
            __html: `
              .project-image-container {
                border-radius: ${projectSlug === 'vario' ? 'clamp(22px, 4vw, 48px)' : (isAppScreen ? 'clamp(12px, 1.5vw, 32px)' : 'clamp(6px, 0.75vw, 16px)')};
              }
              ${projectSlug === 'vw' && !isAppScreen ? `
              @media (max-width: 767px) {
                .project-image-container {
                  border-radius: 3px;
                }
              }
              ` : ''}
            `
          }} />
          <div
            className={`project-image-container relative border-4 h-[240px] md:h-[320px] lg:h-[400px] xl:h-[480px] ${
              allowOverflow ? "overflow-visible" : "overflow-hidden"
            }`}
            style={{
              aspectRatio,
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              boxSizing: "content-box",
              borderColor: "var(--color-0-80)",
              ...(containerWidth && { width: containerWidth }),
            }}
          >
            <Image
              src={src}
              alt={alt}
              fill
              className={`object-contain ${imageClassName}`}
              draggable={false}
              quality={100}
              unoptimized={true}
            />
          </div>
        </>
      )}
    </div>
  );
};
