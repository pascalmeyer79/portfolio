import React from "react";
import Image from "next/image";

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
};

export const ProjectImage: React.FC<ProjectImageProps> = ({
  src,
  alt,
  aspectRatio = "852/480",
  className = "",
  imageClassName = "",
  allowOverflow = false,
  imageBorderRadius = "16px",
  containerBorderRadius = "20px",
  containerWidth,
}) => {
  const isStacked = Array.isArray(src);
  
  // Calculate responsive border radius based on desktop value
  const getResponsiveBorderRadius = (desktopValue: string) => {
    // Extract numeric value (e.g., "12px" -> 12)
    const numericValue = parseFloat(desktopValue);
    if (isNaN(numericValue)) return { mobile: desktopValue, tablet: desktopValue, desktop: desktopValue };
    
    // Mobile: 60% of desktop, Tablet: 80% of desktop, Desktop: 100%
    const mobileValue = Math.round(numericValue * 0.6);
    const tabletValue = Math.round(numericValue * 0.8);
    
    return {
      mobile: `${mobileValue}px`,
      tablet: `${tabletValue}px`,
      desktop: desktopValue,
    };
  };
  
  const borderRadiusValues = getResponsiveBorderRadius(containerBorderRadius);
  
  return (
    <div className={`relative w-full p-[2px] ${className}`} style={{ userSelect: 'none', WebkitUserDrag: 'none' }}>
      {isStacked ? (
        // Stacked images layout - each image has its own border
        <div className={`relative w-full ${allowOverflow ? 'overflow-visible' : 'overflow-hidden'} h-[240px] md:h-[320px] lg:h-[400px] xl:h-[480px]`}>
          <div className="relative flex flex-row items-end h-full">
            {src.map((image, index) => {
              const offset = image.heightOffset || 0;
              const baseHeight = 480;
              const baseWidth = 222;
              const offsetRatio = offset / baseHeight;
              const widthRatio = baseWidth / baseHeight;
              const uniqueId = `project-image-${index}-${Date.now()}`;
              
              return (
                <React.Fragment key={index}>
                  <style dangerouslySetInnerHTML={{
                    __html: `
                      .${uniqueId} {
                        border-radius: ${borderRadiusValues.mobile};
                        height: calc((240px - ${offset * (240 / baseHeight)}px));
                        width: calc((240px - ${offset * (240 / baseHeight)}px) * ${widthRatio});
                      }
                      @media (min-width: 768px) {
                        .${uniqueId} {
                          border-radius: ${borderRadiusValues.tablet};
                          height: calc((320px - ${offset * (320 / baseHeight)}px));
                          width: calc((320px - ${offset * (320 / baseHeight)}px) * ${widthRatio});
                        }
                      }
                      @media (min-width: 1024px) {
                        .${uniqueId} {
                          border-radius: ${borderRadiusValues.desktop};
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
                    className={`relative border-4 border-[var(--color-0-80)] overflow-hidden shrink-0 ${uniqueId}`}
                    style={{
                      backdropFilter: "blur(10px)",
                      WebkitBackdropFilter: "blur(10px)",
                      boxSizing: "content-box",
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
                border-radius: ${borderRadiusValues.mobile};
              }
              @media (min-width: 768px) {
                .project-image-container {
                  border-radius: ${borderRadiusValues.tablet};
                }
              }
              @media (min-width: 1024px) {
                .project-image-container {
                  border-radius: ${borderRadiusValues.desktop};
                }
              }
            `
          }} />
          <div
            className={`project-image-container relative border-4 border-[var(--color-0-80)] h-[240px] md:h-[320px] lg:h-[400px] xl:h-[480px] ${
              allowOverflow ? "overflow-visible" : "overflow-hidden"
            }`}
            style={{
              aspectRatio,
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              boxSizing: "content-box",
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
