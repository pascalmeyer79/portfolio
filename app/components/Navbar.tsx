"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "../theme-provider";
import { useEffect, useRef, useState } from "react";

const NAV_ITEMS = [
  { href: "/", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

type NavbarProps = {
  selection?: "Work" | "About" | "Contact";
};

export const Navbar = ({ selection }: NavbarProps = {}) => {
  const pathname = usePathname() || "/";
  const { theme, setTheme } = useTheme();
  const navRef = useRef<HTMLElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const prevActiveHrefRef = useRef<string | null>(null);
  const isMountedRef = useRef(false);

  const getActiveItem = () => {
    if (selection) {
      return NAV_ITEMS.find((item) => item.label === selection) ?? NAV_ITEMS[0];
    }
    return (
      NAV_ITEMS.find((item) =>
        item.href === "/"
          ? pathname === "/"
          : pathname.startsWith(item.href)
      ) ?? NAV_ITEMS[0]
    );
  };

  const activeItem = getActiveItem();

  useEffect(() => {
    const updateIndicator = () => {
      if (!navRef.current) return;

      const activeIndex = NAV_ITEMS.findIndex((item) => item.href === activeItem.href);
      const navItems = navRef.current.querySelectorAll("li");
      
      if (navItems[activeIndex]) {
        const activeElement = navItems[activeIndex].querySelector("a") as HTMLElement;
        if (activeElement) {
          const navRect = navRef.current.getBoundingClientRect();
          const activeRect = activeElement.getBoundingClientRect();
          
          const newStyle = {
            left: Math.round(activeRect.left - navRect.left - 2),
            width: Math.round(activeRect.width),
            opacity: 1,
          };
          
          // If this is not the first render and href has changed, enable animation
          const hrefChanged = isMountedRef.current && prevActiveHrefRef.current !== activeItem.href;
          
          if (hrefChanged) {
            setShouldAnimate(true);
          } else if (!isMountedRef.current) {
            setShouldAnimate(false);
          }
          
          setIndicatorStyle(newStyle);
          
          prevActiveHrefRef.current = activeItem.href;
          isMountedRef.current = true;
        }
      }
    };

    // Try to update immediately first
    updateIndicator();
    
    // Then use RAF as fallback to ensure DOM is fully rendered
    const rafId = requestAnimationFrame(() => {
      updateIndicator();
    });
    
    const handleResize = () => {
      setShouldAnimate(false);
      updateIndicator();
    };
    
    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
    };
  }, [activeItem.href]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark", { manual: true });
  };

  return (
    <header className="sticky top-0 z-[10] flex items-center justify-between pl-[16px] md:pl-[32px] pr-[20px] md:pr-[40px] py-[24px] md:py-[24px] bg-transparent h-[82px]">
      {/* Left: Logo */}
      <Link href="/" className="h-[28px] w-[48px] md:h-[34px] md:w-[58px] relative shrink-0">
        <Image
          src="/images/logo_pascalmeyer.svg"
          alt="Pascal Meyer"
          fill
          className="object-contain"
          style={{
            filter: theme === "dark" ? "brightness(0) invert(1)" : "none",
          }}
          priority
        />
      </Link>

      {/* Center: Toggle Navigation */}
      <nav
        ref={navRef}
        className="backdrop-blur-xl bg-[var(--color-96-50)] border-2 border-[var(--color-56-04)] flex items-center justify-end rounded-[50px] shrink-0 relative"
        style={{ padding: '2px' }}
      >
        <div
          className={`absolute rounded-[45px] bg-[var(--color-100)] ${shouldAnimate ? 'transition-all duration-300 ease-out' : ''}`}
          style={{
            left: `${indicatorStyle.left}px`,
            width: `${indicatorStyle.width}px`,
            opacity: indicatorStyle.opacity,
            height: "calc(100% - 4px)",
            top: "2px",
          }}
        />
        <ul className="flex items-center gap-0 relative z-10 m-0">
          {NAV_ITEMS.map((item) => {
            const isActive = item.href === activeItem.href;
            return (
              <li key={item.href} className="relative m-0">
                <Link
                  href={item.href}
                  className={`relative block rounded-[45px] px-[16px] md:px-[24px] py-[6px] text-center font-sans transition-colors duration-150 ${
                    isActive
                      ? "text-[var(--color-8)] font-sans text-[14px] sm:text-[15px] md:text-[16px] leading-[22px] sm:leading-[24px] md:leading-[28px] font-semibold tracking-[-0.21px] sm:tracking-[-0.225px] md:tracking-[-0.24px]"
                      : "text-[var(--color-8-64)] font-sans text-[14px] sm:text-[15px] md:text-[16px] leading-[22px] sm:leading-[24px] md:leading-[26px] font-medium tracking-[-0.21px] sm:tracking-[-0.225px] md:tracking-[-0.24px]"
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Right: Dark mode toggle */}
      <button
        type="button"
        onClick={toggleTheme}
        aria-label="Toggle Dark Mode"
        className="flex items-center pl-[18px] pr-0 py-0 relative shrink-0"
      >
        <div className="backdrop-blur-md bg-[var(--color-94-50)] border-2 border-[var(--color-94-50)] flex items-center p-[8px] rounded-[43px] shrink-0">
          <Image
            src={
              theme === "dark"
                ? "/images/icons/icon_dark-mode.svg"
                : "/images/icons/icon_light-mode.svg"
            }
            alt={theme === "dark" ? "Dark mode aktiv" : "Light mode aktiv"}
            width={24}
            height={24}
            className="size-[24px]"
          />
        </div>
      </button>
    </header>
  );
};
