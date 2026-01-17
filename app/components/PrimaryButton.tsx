"use client";

import { useState, ReactNode } from "react";
import Link from "next/link";

type PrimaryButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
};

export const PrimaryButton = ({ 
  children, 
  href, 
  onClick, 
  type = "button",
  className = ""
}: PrimaryButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const commonProps = {
    className: `relative inline-flex items-center justify-center rounded-[40px] bg-transparent px-[40px] py-[8px] font-sans text-[14px] md:text-[16px] leading-[22px] md:leading-[26px] font-medium text-[var(--color-100)] shadow-sm overflow-visible ${className}`,
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
  };

  const gradientSpan = (
    <>
      <span className="relative z-10">{children}</span>
      <span 
        className="absolute inset-0 rounded-[40px]"
        style={{
          background: `linear-gradient(108deg, var(--color-satoshi) 0%, var(--color-satoshi) 50%, var(--color-8) 50%, var(--color-8) 100%)`,
          backgroundSize: '250% 200%',
          backgroundPosition: isHovered ? 'left center' : 'right center',
          transition: 'background-position 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />
    </>
  );

  if (href) {
    return (
      <Link {...commonProps} href={href}>
        {gradientSpan}
      </Link>
    );
  }

  return (
    <button {...commonProps} type={type} onClick={onClick}>
      {gradientSpan}
    </button>
  );
};
