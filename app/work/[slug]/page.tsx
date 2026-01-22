"use client";

import React, { use, useMemo } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useTheme } from "../../theme-provider";
import { Footer } from "../../components/Footer";
import { FooterBackground } from "../../components/FooterBackground";
import { ImageComparison } from "../../components/ImageComparison";
import { CounterAnimation } from "../../components/CounterAnimation";
import { PrimaryButton } from "../../components/PrimaryButton";
import { AnimatedHeadline } from "../../components/AnimatedHeadline";
import { useViewport } from "../../utils/useViewport";

const AnimatedScrollImage = ({ src, alt }: { src: string; alt: string }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    const element = contentRef.current;
    let startTime: number | null = null;
    let animationFrame: number;

    const scrollDownDuration = 15000; // 15 seconds (faster)
    const pauseDuration = 500; // 0.5 seconds
    const scrollUpDuration = 1000; // 1 second
    const totalDuration = scrollDownDuration + pauseDuration + scrollUpDuration;
    const maxScroll = 30; // 30%

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;

      const elapsed = (currentTime - startTime) % totalDuration;

      if (elapsed < scrollDownDuration) {
        // Scroll down: ease-in-out from 0% to -30% (less slow at start, fast in middle)
        const progress = elapsed / scrollDownDuration;
        // Ease-in-out quadratic (less aggressive than cubic)
        const easedProgress = progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;
        element.style.transform = `translateY(${-easedProgress * maxScroll}%)`;
      } else if (elapsed < scrollDownDuration + pauseDuration) {
        // Pause at -25%
        element.style.transform = `translateY(-${maxScroll}%)`;
      } else {
        // Scroll up: ease-out from -25% to 0%
        const upElapsed = elapsed - scrollDownDuration - pauseDuration;
        const upProgress = upElapsed / scrollUpDuration;
        // Ease-out cubic
        const eased = 1 - Math.pow(1 - upProgress, 3);
        element.style.transform = `translateY(${-maxScroll + (eased * maxScroll)}%)`;
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div className="animated-scroll-container">
      <div
        ref={contentRef}
        className="animated-scroll-content"
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <div style={{ flexShrink: 0 }}>
          <Image
            src={src}
            alt={alt}
            width={800}
            height={2000}
            className="w-full h-auto object-cover"
            quality={100}
            unoptimized={true}
          />
        </div>
        <div style={{ flexShrink: 0 }}>
          <Image
            src={src}
            alt={`${alt} duplicate`}
            width={800}
            height={2000}
            className="w-full h-auto object-cover"
            quality={100}
            unoptimized={true}
          />
        </div>
      </div>
    </div>
  );
};

const OutcomeImageWithOverlay = ({
  mainImageSrc,
  overlayImageSrc
}: {
  mainImageSrc: string;
  overlayImageSrc?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [overlaySize, setOverlaySize] = useState({ width: 400, height: 400 });

  useEffect(() => {
    if (!containerRef.current) return;

    const updateOverlaySize = () => {
      const container = containerRef.current;
      if (!container) return;

      const mainImage = container.querySelector('img[alt="Outcome app screen"]') as HTMLImageElement;
      if (!mainImage) return;

      // Get the actual displayed size of the main image
      const mainImageWidth = mainImage.offsetWidth;
      const scaleFactor = mainImageWidth / 800; // 800 is the original width

      // Scale overlay proportionally (original overlay is 400px)
      const newWidth = 400 * scaleFactor;
      const newHeight = 400 * scaleFactor;

      setOverlaySize({ width: newWidth, height: newHeight });
    };

    updateOverlaySize();

    const resizeObserver = new ResizeObserver(updateOverlaySize);
    const mainImage = containerRef.current.querySelector('img[alt="Outcome app screen"]');
    if (mainImage) {
      resizeObserver.observe(mainImage);
    }

    window.addEventListener('resize', updateOverlaySize);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateOverlaySize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="outcome-app-screen relative overflow-visible border-responsive w-full"
      style={{
        backgroundColor: 'transparent',
        borderColor: 'var(--color-0-80)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        boxSizing: 'border-box'
      }}
    >
      <Image
        src={mainImageSrc}
        alt="Outcome app screen"
        width={800}
        height={600}
        className="w-full h-auto object-cover"
        quality={100}
        unoptimized={true}
      />
      {overlayImageSrc && (
        <div
          className="outcome-overlay-image absolute"
          style={{
            left: '20px',
            bottom: '20px',
            width: `${overlaySize.width}px`,
            height: `${overlaySize.height}px`,
            zIndex: 10
          }}
        >
          <Image
            src={overlayImageSrc}
            alt="Outcome overlay"
            width={400}
            height={400}
            className="w-full h-full object-cover"
            quality={100}
            unoptimized={true}
          />
        </div>
      )}
    </div>
  );
};

type StackedHeroImage = {
  src: string;
  heightOffset?: number;
};

type WorkConfig = {
  title: string;
  overline: string;
  description: string;
  tags: string[];
  role: string;
  timeline: string;
  company: string;
  year: string;
  contributions: string;
  heroImage: string | StackedHeroImage[];
  heroImageDark?: string;
  noBorder?: boolean;
  summaryImage?: string;
  sections: Array<{
    type: "text" | "image" | "grid" | "text-image" | "comparison" | "results" | "insights" | "process" | "design-branding" | "outcome";
    title?: string;
    subtitle?: string;
    overline?: string;
    text?: string;
    centeredLayout?: boolean;
    reverseLayout?: boolean;
    imageFirst?: boolean;
    backgroundColor: "white" | "gray" | "light";
    image?: string;
    imageDark?: string;
    images?: Array<{ src: string; srcDark?: string; caption?: string; noBorder?: boolean; isVideo?: boolean; fallbackImage?: string }>;
    gridCols?: 2 | 3;
    beforeImage?: string;
    afterImage?: string;
    beforeLabel?: string;
    afterLabel?: string;
    fullWidthImage?: string;
    fullWidthImageDark?: string;
    fullWidthImageMaxWidth?: string;
    isFullWidthVideo?: boolean;
    fullWidthVideoFallback?: string;
    imageRows?: Array<Array<{ src: string; srcDark?: string; caption?: string; spanRows?: boolean; noBorder?: boolean; maxWidth?: string }>>;
    fullWidthImages?: Array<{ src: string; srcDark?: string; noBorder?: boolean; isVideo?: boolean; fallbackImage?: string }>;
    metrics?: Array<{ value: string; label: string; sublabel?: string }>;
    quotes?: string[];
    processImages?: Array<{ src: string; srcDark?: string }>;
    designBrandingImages?: Array<{ src: string; srcDark?: string; noBorder?: boolean; isAnimated?: boolean }>;
    designBrandingGallery?: Array<{ src: string; srcDark?: string; paired?: boolean; pairIndex?: number; single?: boolean }>;
    outcomeImage?: string;
    outcomeOverlayImage?: string;
  }>;
};

const WORKS: Record<string, WorkConfig> = {
  tenzir: {
    title: "Building an AI-powered data pipelines platform for a cyber security startup",
    overline: "Tenzir",
    description: "I joined Tenzir as Design Lead with a focus on UX, UI, and Product Design to guide the transition from an alpha-stage developer tool to a scalable enterprise SaaS product. Facing a market dominated by a massive incumbent, my role was to overhaul the entire user experience. I led the product design from the initial interface redesign to the development of a visual pipeline builder, established a comprehensive design system, and managed the brand relaunch to support the company's growth trajectory.",
    tags: ["UX/UI Design", "Product Design", "Web Design"],
    role: "Lead Designer (Freelance)",
    timeline: "2024 - today",
    company: "Tenzir",
    year: "2024 – today",
    contributions: "UX, UI, Product, Research, Prototyping",
    heroImage: "/images/tenzir/Tenzir_01.jpg",
    heroImageDark: "/images/tenzir/Tenzir_02.jpg",
    sections: [
      {
        type: "text-image",
        backgroundColor: "light",
        title: "David vs. Goliath in the \ndata observability market",
        overline: "Context & Challenge",
        text: "When I joined Tenzir, it was an early-stage challenger in a market controlled by a well-funded incumbent. The platform was a feature-limited alpha, while the main competitor, Cribl, already held significant market share with over 100x the ARR.\n\nThe core challenge was to translate Tenzir's architectural superiority into tangible user value. While the market leader offered a complex suite of fragmented tools, Tenzir provided a unified open-source solution. My objective was to design an interface that proved this unified approach was not just more powerful, but significantly easier to use.",
        images: [
          { src: "/images/tenzir/Tenzir_02.jpg", caption: "Cribl Stream (2024)" },
          { src: "/images/tenzir/Tenzir_03.jpg", caption: "Tenzir Early Access (2024)" },
        ],
      },
      {
        type: "text-image",
        backgroundColor: "light",
        title: "From technical utility to \nuser-centered design",
        overline: "Process",
        text: "When I took over as Design Lead, the platform was a robust engineering tool but raw and intimidating for non-experts. My mission was to bridge the gap to a market-ready SaaS application.\n\nTo achieve modern enterprise standards, I grounded design decisions in continuous user research with SecOps teams. We prioritized features that established a clear mental model, introducing a unified user dashboard, system diagnostics, and a modular package library. We refined the interaction layer with keyboard shortcuts and improved workspace handling, while reducing cognitive load through distinct system feedback like toasts, tooltips, and educational empty states. Combined with custom icons and responsive layout, this user-validated approach transformed the platform into a structured, intuitive workflow tool.",
        images: [],
        beforeImage: "/images/tenzir/Tenzir_04.jpg",
        afterImage: "/images/tenzir/Tenzir_05.jpg",
        beforeLabel: "Tenzir Early Access",
        afterLabel: "First Iteration",
      },
      {
        type: "text-image",
        backgroundColor: "light",
        title: "From data chaos to clarity \nwith AI and smart visualization",
        overline: "Solution",
        text: "To truly compete with the incumbent, we needed to simplify and enhance the product functionality even further. This strategic decision was directly informed by feedback from product demos for new potential clients and user feedback.\n\nThe centerpiece of this strategy was the Data Fabric, an AI-powered visual pipeline builder. We evolved the interaction model to support a hybrid workflow: a drag-and-drop interface working in sync with the code editor. A key feature was the integration of a MCP server, which drastically reduced setup time for new data sources through AI acceleration.",
        images: [],
        fullWidthImage: "/images/tenzir/Tenzir_01.jpg",
        imageRows: [
          [
            { src: "/images/tenzir/Tenzir_07.jpg", noBorder: false },
            { src: "/images/tenzir/Tenzir_06.jpg", noBorder: false },
          ],
          [
            { src: "/images/tenzir/Tenzir_09.jpg", noBorder: false },
            { src: "/images/tenzir/Tenzir_08.jpg", noBorder: false },
          ],
        ],
      },
      {
        type: "text-image",
        backgroundColor: "light",
        title: "Establishing a design system \nand a sales-driven presence",
        overline: "Growth & Scalability",
        text: "To ensure consistency throughout the app for the frontend team and for corporate communication, I built a comprehensive 30-page Design System in Figma. This unified library accelerated the development cycle and enabled faster frontend development with Claude.\n\nExtending this visual identity beyond the product, I collaborated with the founder to reimagine the company website, evolving it from a basic landing page into a multi-layered SaaS platform with a dedicated sales funnel. To empower the sales team, I also produced high-fidelity collateral, including solution briefs and investor decks.",
        images: [],
        fullWidthImages: [
          {
            src: "/images/tenzir/Tenzir_12_Light.png",
            srcDark: "/images/tenzir/Tenzir_12_Dark.png",
            noBorder: true
          },
          {
            src: "/images/tenzir/Tenzir_13.mp4",
            fallbackImage: "/images/tenzir/Tenzir_13_Fallback.jpg",
            noBorder: false,
            isVideo: true
          },
        ],
      },
      {
        type: "results",
        backgroundColor: "light",
        title: "Unlocking enterprise adoption and securing Series A",
        overline: "Results",
        text: "This strategic transformation evolved the platform from a raw utility into a strategic asset that investors and users value. These product interventions delivered immediate business impact, helping to quadruple the customer base and win major clients like Swiss Post and the German government (BSI). This validated product maturity played a decisive role in securing a $5M Series A funding.",
        metrics: [
          { value: "4x", label: "Increase in customer base" },
          { value: "3x", label: "ARR from 700k to 2M" },
          { value: "$5M", label: "Series A funding raised" },
        ],
      },
    ],
  },
  porsche: {
    title: "Transforming global learning and customer experiences with AI and UCD",
    overline: "Porsche",
    description: "I led the strategic redesign of Porsche's global learning ecosystem, consolidating ten legacy tools into a unified platform for all 34 global markets. By shifting from waterfall to user-centered design, I created a cohesive interface merging video, wiki, and course content with an integrated LLM, which now serves as a blueprint for future Porsche AI products. This overhaul resolved critical usability bottlenecks, increasing user satisfaction from under 50% to over 90% while drastically reducing maintenance overhead.",
    tags: ["UX Design", "Product Design", "UX Consulting"],
    role: "Lead UX/Product Designer",
    timeline: "2022 - 2024",
    company: "Porsche",
    year: "2022 – 2024",
    contributions: "Consulting, UX, Product, Prototyping, Research",
    heroImage: "/images/porsche/Porsche_03.jpg",
    heroImageDark: "/images/porsche/Porsche_02.jpg",
    sections: [
      {
        type: "text-image",
        backgroundColor: "light",
        title: "From fragmented tools to a \ncentralized knowledge engine",
        overline: "Context & Challenge",
        text: "PPX Campus is the single source of truth for Porsche dealership staff worldwide, yet the legacy ecosystem was fundamentally broken. It consisted of ten disconnected platforms—including separate tools for modules, wikis, videos, and communication—that were developed in silos by different agencies. Consequently, there was no consistent UI or UX across the ecosystem.\n\nMy challenge was to untangle this accumulated tech debt. The previous waterfall model had resulted in low engagement and satisfaction scores under 50%, with usage driven purely by compliance rather than curiosity. I was tasked with consolidating these fragmented tools into a singular, intuitive platform serving the entire global network of 34 markets.",
        images: [
          { src: "/images/porsche/Porsche_Before.jpg" },
          { src: "/images/porsche/Porsche_Before_02.jpg" },
        ],
      },
      {
        type: "text-image",
        backgroundColor: "light",
        title: "Bridging the gap between \nconsultancy & craft",
        overline: "My Role",
        text: "My mandate extended beyond execution because I acted as a user centricity consultant. One of the root causes of multiple problems was the exclusion of users from the development process. I developed a user centricity concept to bridge the gap between multiple stakeholders at Porsche and development, which was executed through external agencies.",
        images: [
          { src: "/images/porsche/Process-Old_Light.png", srcDark: "/images/porsche/Process-Old_Dark.png", caption: "Old Waterfall process", noBorder: true },
          { src: "/images/porsche/Process-New_Light.png", srcDark: "/images/porsche/Process-New_Dark.png", caption: "New user-centered process", noBorder: true },
        ],
      },
      {
        type: "text-image",
        backgroundColor: "light",
        title: "Establishing user-centricity \nacross 34 markets",
        overline: "Research",
        text: "The new process consisted of a multi-layered UX research strategy to validate user needs. I conducted a user survey in all 34 markets worldwide using Qualtrics, and it revealed that platform structure, not content, was the main barrier. Subsequently, I set up the user analytics tool FullStory, through which I saw in heatmaps that critical features were invisible due to poor layout.\n\nPorsche provided five user personas: The \"Porsche Pro,\" the Sales Consultant, the Service Consultant, the Service Assistant, and the Training Manager. These helped to organize qualitative user research in the form of interviews. We decided to focus on four core markets (US, China, Germany, EU ex-Germany) and, together with the PM, I interviewed users from each group.",
        images: [],
        imageRows: [
          [
            { src: "/images/porsche/Fullstory.svg", srcDark: "/images/porsche/Fullstory_Dark.svg", caption: "User analytics", noBorder: true, maxWidth: "240px" },
            { src: "/images/porsche/Interviews.png", caption: "User interviews", noBorder: true },
            { src: "/images/porsche/Survey.png", caption: "User survey", noBorder: true },
            { src: "/images/porsche/Personas.png", caption: "User personas", noBorder: true },
          ],
        ],
      },
      {
        type: "insights",
        backgroundColor: "light",
        overline: "Insights",
        title: "Users didn't need more systems. They needed one that understands them",
        quotes: [
          "There are too many sub-platforms that are not connected",
          "The IT structure is too complicated.",
          "We don't want to promote tools until they're curated and integrated.",
          "We don't know where we can find which information.",
          "Feels like a content strategy is missing.",
        ],
      },
      {
        type: "process",
        backgroundColor: "light",
        title: "Delivering value through a \nphased & iterative rollout",
        overline: "Process",
        text: "We structured the project as a phased rollout to ensure continuous user feedback throughout the entire development lifecycle. The first phase focused on deploying the Global Learning Path as our MVP, which allowed us to validate the new logic immediately with real users. Building on those insights, we moved to consolidating the global navigation and sidebars to visually unify the ten disparate tools into one framework. With the structural skeleton in place, the next phase involved a complete redesign of the core content pillars like the Academy and Wiki to match the new Porsche Design System v3.",
        processImages: [
          { src: "/images/porsche/Porsche_Iteration_01.jpg" },
          { src: "/images/porsche/Porsche_Iteration_02.jpg" },
          { src: "/images/porsche/Porsche_Iteration_03.jpg" },
        ],
      },
      {
        type: "text-image",
        backgroundColor: "light",
        title: "Creating a unified & personalized \nlearning ecosystem",
        overline: "Solution",
        text: "I consolidated the ten fragmented legacy tools into a single unified platform that centralizes the Learning Path, Academy, Wiki, Tube, and more. We shifted the architecture from platform-based silos to a category-driven model where content is organized by format rather than legacy tool names. For instance, mixed-media topics like Smart Mobility were dissolved so that all video content was bundled under Porsche Tube while text-based articles moved to the Wiki.\n\nTo improve relevance, I designed a personalized dashboard that features global progress tracking for immediate visual status updates. We also fostered organic engagement through an integrated community by surfacing active discussions directly on the main interface.",
        images: [],
        fullWidthImage: "/images/porsche/01_animation_02.mp4",
        isFullWidthVideo: true,
        fullWidthVideoFallback: "/images/porsche/Porsche_01.jpg",
        imageRows: [
          [
            { src: "/images/porsche/Porsche_08.jpg" },
            { src: "/images/porsche/Porsche_07.jpg" },
          ],
        ],
      },
      {
        type: "text-image",
        backgroundColor: "light",
        title: "Designing Porsches first LLM \nas a scalable AI blueprint",
        overline: "AI Integration",
        text: "During the process, we identified the rise of conversational AI as a potential solution to streamline learning and customer support. In a first prototype, I designed the \"Porsche Co-Driver\" as an integrated conversational UI that unifies the underlying platforms into a single access point. This solution was successfully pitched to corporate management and further developed in a second project.\n\nThe Co-Driver functions as an intelligent search engine, allowing users to query the knowledge base for instant support or educational context. This successful integration served as the blueprint for Porsche's future AI products, including after-sales customer service and direct end-customer solutions.",
        images: [],
        fullWidthImage: "/images/porsche/Porsche_05.jpg",
        imageRows: [
          [
            { src: "/images/porsche/Porsche_03.jpg" },
            { src: "/images/porsche/Porsche_02.jpg" },
          ],
          [
            { src: "/images/porsche/Porsche_06.jpg" },
            { src: "/images/porsche/Porsche_04.jpg" },
          ],
        ],
      },
      {
        type: "insights",
        backgroundColor: "light",
        overline: "Validation",
        title: "Turning assumptions \ninto evidence",
        text: "We validated our designs through rigorous testing with learners and Training Managers. Feedback was overwhelmingly positive, with users describing the new interface as fantastic and straightforward. Testing confirmed that the new global search drastically reduced time-to-content and the logic of the Global Learning Path was immediately understood. As one user noted, \"If I could give this to my nephew he'd understand it,\" confirming we achieved our goal of intuitive simplicity.",
        quotes: [
          "This is fantastic",
          "Everything I need in one place",
          "Much better than the old system",
          "It's hard to criticize",
          "I could give this to my nephew and he'd understand",
          "Much better UI",
          "It's way nicer",
          "Looks very clean",
          "Very easy to understand",
          "Much more straightforward than PALMS",
        ],
      },
      {
        type: "results",
        backgroundColor: "light",
        overline: "Results",
        text: "The redesign transformed a mandatory compliance tool into a platform users want to use. Post-launch, user satisfaction scores skyrocketed from under 50% to over 90%. Merging fragmented platforms significantly reduced technical maintenance and operational overhead. Crucially, the AI Co-Driver has measurably improved advisory speed, proving that a user-centered design approach delivers tangible global business value.",
        metrics: [
          { value: "> 90%", label: "User Satisfaction", sublabel: "Compared to <50% before" },
          { value: "100%", label: "Task Completion", sublabel: "During usability testing" },
          { value: "11", label: "Systems Unified", sublabel: "Into one global experience" },
        ],
      },
    ],
  },
  vw: {
    title: "Developing a HMI and design system for a new electric vehicle brand",
    overline: "VW Group",
    description: "I partnered with the Volkswagen Group to shape the digital identity of ID.Unyx, a new EV brand under the VW Anhui joint venture in China. During this 15-month project, working within a team of nine designers, I architected a scalable Design System that adapts German premium standards for a digital-first Chinese market. This system provided the blueprint for the entire sub-brand and is now being scaled to multiple upcoming models, which is a key step in securing Volkswagen's future in their most relevant market.",
    tags: ["UX/UI Design", "Design Systems"],
    role: "UX/UI Designer",
    timeline: "2022 - 2023",
    company: "Volkswagen",
    year: "2022 – 2023",
    contributions: "UI, UX, Prototyping",
    heroImage: "/images/vw/VW_01.png",
    heroImageDark: "/images/vw/VW_02.jpg",
    noBorder: true,
    summaryImage: "/images/vw/VW_02.jpg",
    sections: [
      {
        type: "text-image",
        backgroundColor: "light",
        title: "Realigning the VW brand for a \ndigital-first market",
        overline: "Context & Challenge",
        text: "China is by far Volkswagen's most critical market, accounting for approximately one-third of the Group's global sales. However, the brand faced stiff competition from local manufacturers offering superior software experiences. Following the ID.3 and ID.4, VW aimed to launch ID.Unyx to capture a younger, tech-savvy demographic.\n\nOur team faced a specific challenge: executing a new premium vision while meeting strict market requirements. We had to integrate a 3D AI avatar, support local apps like Karaoke, and adapt the entire interface for a new 15-inch vertical display. The goal was to move away from a utility-focused interface to a smart companion logic without losing the brand's heritage.",
        images: [],
        imageRows: [
          [
            { src: "/images/vw/VW_03.jpg", caption: "HMI of the previous VW ID.4 (2022)" },
            { src: "/images/vw/VW_04.jpg" },
          ],
        ],
      },
      {
        type: "text-image",
        backgroundColor: "light",
        title: "Translating requirements into \na validated design language",
        overline: "Process & Prototyping",
        text: "We established a premium design language defined by a dark mode strategy with signature gold accents. To add depth, we integrated modern real-time blur effects for the first time for a VW interface. The new 15-inch vertical display allowed us to rethink the sidebar navigation approach of the legacy VW UI. Third-party apps like KTV (Karaoke) were wrapped into native containers to guarantee the premium feeling throughout the entire HMI.\n\nValidation was conducted in a purpose-built auto simulator using replica hardware. This allowed us to calibrate color values directly on the vehicle display and refine touch targets in the footer bar to ensure error-free interaction at high speeds. We also stress-tested the new visual depth elements to ensure legibility and system performance under changing lighting conditions.",
        images: [],
        fullWidthImage: "/images/vw/VW_05.jpg",
      },
      {
        type: "text-image",
        backgroundColor: "light",
        title: "A comprehensive HMI ecosystem \nready for implementation",
        overline: "Solution",
        text: "We delivered a fully modular design system that served as the single source of truth and enabled local developers to build consistent edge-case screens autonomously. Beyond the architecture, I executed design for core functionalities including the map and navigation system, the top and bottom bars, system settings, and the Avatar Center.",
        images: [],
        imageRows: [
          [
            { src: "/images/vw/VW_06.jpg" },
            { src: "/images/vw/VW_07.jpg" },
          ],
        ],
      },
      {
        type: "text-image",
        backgroundColor: "light",
        centeredLayout: true,
        title: "A scalable foundation for Volkswagen's future in China",
        overline: "Result",
        text: "The ID.Unyx 01 launched in July 2024, utilizing our HMI architecture as its digital backbone. This system is now being scaled to four upcoming models by 2026: ID.ERA, ID. AURA, and ID. EVO. The project successfully repositioned VW Anhui and delivered a user experience that blends German engineering heritage with the digital sophistication expected by Chinese consumers.",
        images: [],
        fullWidthImage: "/images/vw/VW_08.jpg",
      },
    ],
  },
  vario: {
    title: "Simplifying investing in stocks and crypto through gamification and AI",
    overline: "Vario",
    description: "I co-founded Vario to address the massive influx of inexperienced retail investors entering the market during the 2020 volatility. As the Product Lead, I guided the project from initial concept to beta release. My role encompassed the entire product lifecycle including defining the market positioning, designing the brand identity, architecting the information architecture, and executing the UX/UI design. Additionally, I developed the underlying financial algorithm that powered our proprietary scoring system, bridging the gap between complex financial data and an accessible user experience.",
    tags: ["Product Concept"],
    role: "Founding Designer",
    timeline: "2021 - 2022",
    company: "Vario",
    year: "2021 – 2022",
    contributions: "Product, Strategy, UX, UI, Branding",
    heroImage: [
      { src: "/images/vario/Vario_04.png", heightOffset: 84.4 }, // links
      { src: "/images/vario/Vario_02.png", heightOffset: 42.2 }, // mitte links
      { src: "/images/vario/Vario_01.png", heightOffset: 0 },     // mitte
      { src: "/images/vario/Vario_03.png", heightOffset: 42.2 }, // mitte rechts
      { src: "/images/vario/Vario_05.png", heightOffset: 84.4 }, // rechts
    ],
    noBorder: true,
    sections: [
      {
        type: "text-image",
        backgroundColor: "light",
        title: "Simplifying financial complexity for first-time investors",
        overline: "Context & Challenge",
        text: "While accessing the stock market has never been easier, understanding it remains a challenge for beginners. The sheer volume of data, technical jargon, and investment options creates a high barrier to entry which often leads to paralysis or reckless decision-making.\n\nMy idea was to build a tool that could guide these novices through the noise. I wanted to create a platform that moved beyond simple trading to offer genuine guidance. The goal was to help users identify stocks that matched their personal interests, their \"Circle of Competence\" as Warren Buffett calls it, while teaching the importance of diversification and risk management in a playful and non-intimidating way.",
        images: [
          { src: "/images/vario/Vario_07.mp4", fallbackImage: "/images/vario/Vario_07_fallback.jpg", noBorder: false, isVideo: true },
          { src: "/images/vario/Vario_08.mp4", fallbackImage: "/images/vario/Vario_08_fallback.jpg", noBorder: false, isVideo: true },
        ],
      },
      {
        type: "text-image",
        backgroundColor: "light",
        reverseLayout: true,
        title: "From information overload to guided simplicity",
        overline: "Product Strategy",
        text: "We initially conceptualized Vario as an AI-driven ecosystem featuring five distinct personas where advanced and beginner users would have their own specific companions. However, early user testing revealed that this approach added cognitive load and friction, especially since the financial data was already overwhelming.\n\nBased on this feedback, we reduced the complexity to a single, consistent companion and simplified asset classes to focus strictly on stocks, Bitcoin, and one global diversified ETF. We also shifted from a manual portfolio builder to an automated recommendation feature to ensure that users build a mathematically sound, diversified portfolio rather than just picking stocks they like.",
        images: [],
        imageRows: [
          [
            { src: "/images/vario/Vario_09.png", noBorder: false },
            { src: "/images/vario/Vario_10.png", noBorder: false },
          ],
        ],
      },
      {
        type: "text-image",
        backgroundColor: "light",
        centeredLayout: true,
        imageFirst: true,
        title: "Translating complex KPIs into simplified user scores",
        overline: "The Algorithm",
        text: "The core value proposition of Vario was the Vario-Score, a proprietary matching algorithm I helped structure. We needed to condense complex financial metrics into a simple and swipeable decision-making tool.\n\nWe built a database of 450 stocks and tagged them across 34 accessible themes like E-Mobility or Gaming rather than using financial terminology like \"cyclical consumer discretionary\". The algorithm evaluated assets based on growth, profitability, and stability to incorporate 15 relevant financial metrics combined with a unique user profile. This ensured that the gamified interface was backed by serious financial analysis.",
        images: [],
        fullWidthImage: "/images/vario/Vario_11.svg",
        fullWidthImageMaxWidth: "480px",
        imageRows: [
          [
            { src: "/images/vario/Vario_12.png", noBorder: false },
            { src: "/images/vario/Vario_13.png", noBorder: false },
            { src: "/images/vario/Vario_14.png", noBorder: false },
            { src: "/images/vario/Vario_15.png", noBorder: false },
          ],
        ],
      },
      {
        type: "text-image",
        backgroundColor: "light",
        title: "Refining the user experience \nthrough continuous UX testing",
        overline: "Process",
        text: "Regular user feedback and usability testing sessions established the foundation for our design decisions. Among various observations, we noticed that users misinterpreted fractional match scores like 9/10 as a countdown for remaining swipes, prompting us to switch to a percentage system for immediate clarity.\n\nWe further enhanced the architecture by introducing a personal dashboard, optimizing the chart UX, and adding algorithm customization and investment analyses through external APIs. We also implemented guiding feedback messages to clarify the user flow and integrated a broker overview to ensure the experience remained transparent and trustworthy.",
        images: [],
        imageRows: [
          [
            { src: "/images/vario/Vario_04.png", noBorder: false },
            { src: "/images/vario/Vario_16.png", noBorder: false },
            { src: "/images/vario/Vario_17.png", noBorder: false },
            { src: "/images/vario/Vario_18.png", noBorder: false },
          ],
          [
            { src: "/images/vario/Vario_19.png", noBorder: false },
            { src: "/images/vario/Vario_20.png", noBorder: false },
            { src: "/images/vario/Vario_21.png", noBorder: false },
            { src: "/images/vario/Vario_22.png", noBorder: false },
          ],
        ],
      },
      {
        type: "design-branding",
        backgroundColor: "light",
        title: "Visualizing trust \nin a complex market",
        overline: "Design & Branding",
        text: "I developed the brand identity to reflect the app's function as a moral and financial compass. The logo combines a stylized \"V\" and \"A\" into a compass needle, subtly forming a heart shape to represent the matching mechanic.\n\nFor the UI, I moved away from the dark and data-heavy interfaces of traditional brokerage apps. I utilized a clean, white-space-dominant aesthetic that allows the stock charts and color-coded category tags to breathe. The primary color palette relied on a distinct green to convey confidence and growth, balanced by the classic red for bearish trends, grounding the modern app in established financial visual language.",
        designBrandingImages: [
          { src: "/images/vario/Vario_23.jpg", noBorder: true },
          { src: "/images/vario/Vario_24.jpg", noBorder: false, isAnimated: true },
        ],
        designBrandingGallery: [
          { src: "/images/vario/Vario_25.jpg", paired: true, pairIndex: 0 },
          { src: "/images/vario/Vario_26.jpg", paired: true, pairIndex: 0 },
          { src: "/images/vario/Vario_27.jpg", single: true },
          { src: "/images/vario/Vario_28.jpg", single: true },
          { src: "/images/vario/Vario_29.jpg", single: true },
          { src: "/images/vario/Vario_30.jpg", paired: true, pairIndex: 1 },
          { src: "/images/vario/Vario_31.jpg", paired: true, pairIndex: 1 },
        ],
      },
      {
        type: "outcome",
        backgroundColor: "light",
        title: "Reprioritization after successful launch",
        overline: "Outcome",
        text: "We successfully launched the  app supported by a dedicated website and a cohesive social media campaign. The reception was positive with users specifically highlighting the intuitive UX and the innovative product concept.\n\nHowever, at the end of 2022 the venture reached a critical juncture following the departure of my co-founder. Faced with the resource demands of scaling a fintech product alone and simultaneous high-level opportunities with Porsche, Volkswagen, and Sony Music, I made the strategic decision to discontinue operations. This move allowed me to fully dedicate my focus on my design business as a freelancer.",
        outcomeImage: "/images/vario/Vario_32.png",
        outcomeOverlayImage: "/images/vario/Vario_33.png",
      },
    ],
  },
};

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: [0.22, 0.61, 0.36, 1],
    },
  },
};

type WorkPageProps = {
  slug: string;
};

function WorkPageClient({ slug }: WorkPageProps) {
  const slugString: string = slug;
  const config = WORKS[slugString];
  const { theme } = useTheme();
  const { getViewport } = useViewport();
  const heroContainerRef = useRef<HTMLDivElement>(null);

  // Helper function to get border radius (avoids TypeScript type narrowing issues)
  const getBorderRadius = (projectSlug: string): string => {
    if (projectSlug === 'vario') return 'clamp(22px, 4vw, 48px)';
    if (projectSlug === 'vw') return 'clamp(8px, 2vw + 2px, 12px)'; // Mobile: 8px, Tablet: ~10px, Desktop: 12px
    return 'clamp(8px, 1.5vw, 16px)'; // Tenzir and Porsche: Mobile: 8px, Desktop: 16px
  };

  // Helper function to get VW-specific responsive border-radius CSS with media queries
  const getVWBorderRadiusCSS = (className: string): string => {
    if (slugString !== 'vw') return '';
    return `
      @media (max-width: 639px) {
        .${className} {
          border-radius: 8px;
        }
      }
      @media (min-width: 640px) and (max-width: 1023px) {
        .${className} {
          border-radius: 10px;
        }
      }
      @media (min-width: 1024px) {
        .${className} {
          border-radius: 12px;
        }
      }
    `;
  };

  // Base border radius for Vario: 32px
  const baseBorderRadius = slugString === 'vario' ? 32 : 16;

  // Bei Screens über 1920px soll der border-radius bei 20px bleiben
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [is2XL, setIs2XL] = useState(true);
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop' | '2xl'>('2xl');

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth > 1920);
      setIs2XL(window.innerWidth >= 1536);

      if (window.innerWidth < 640) {
        setScreenSize('mobile');
      } else if (window.innerWidth < 1024) {
        setScreenSize('tablet');
      } else if (window.innerWidth < 1536) {
        setScreenSize('desktop');
      } else {
        setScreenSize('2xl');
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Scroll animation for hero container
  const { scrollYProgress } = useScroll({
    target: heroContainerRef,
    offset: ["start end", "start start"]
  });

  // For VW: animate bottom border-radius from 12px to 0 on scroll
  // Initial values set via CSS (8px mobile, 10px tablet, 12px desktop)
  // Animation will override CSS values when scrolling
  const heroBorderRadiusBottom = slugString === 'vw' 
    ? useTransform(scrollYProgress, [0, 1], [12, 0])
    : undefined;

  // Get initial border radius based on screen size
  const getInitialBorderRadius = () => {
    return 20; // all screen sizes
  };

  // Get initial padding values based on screen size
  const getInitialMarginX = () => {
    if (screenSize === 'mobile') return 16;
    if (screenSize === 'tablet') return 40;
    return 60; // desktop and 2xl
  };

  const getInitialPaddingX = () => {
    if (screenSize === 'mobile') return 16;
    if (screenSize === 'tablet') return 24;
    // For stacked hero (Vario), always start with 40px
    if (config && Array.isArray(config.heroImage)) return 40;
    return 40; // desktop and 2xl
  };

  const getInitialPaddingY = () => {
    if (screenSize === 'mobile') {
      // Use 32px on mobile for all projects
      return 32;
    }
    if (screenSize === 'tablet') return 24;
    // For stacked hero (Vario), always use 120px
    if (config && Array.isArray(config.heroImage)) return 120;
    return 40; // desktop and 2xl
  };

  // Get final padding based on screen size
  const getFinalPaddingX = () => {
    if (screenSize === 'mobile') return 16;
    if (screenSize === 'tablet') return 40;
    if (screenSize === 'desktop') return 60;
    return 100; // 2xl
  };

  const getFinalPaddingY = () => {
    if (screenSize === 'mobile') {
      // Use 32px on mobile for all projects
      return 32;
    }
    if (screenSize === 'tablet') return 40;
    if (screenSize === 'desktop') return 60;
    // For stacked hero (Vario), always use 120px
    if (config && Array.isArray(config.heroImage)) return 120;
    return 120; // 2xl
  };

  // Transform values for the outer container margin
  // Animates from responsive values to 0 (full width)
  const containerMarginX = useTransform(
    scrollYProgress,
    [0, 0.3, 1],
    [getInitialMarginX(), getInitialMarginX(), 0]
  );

  // Transform values for the inner padding
  // Responsive start and final values
  const containerPaddingX = useTransform(
    scrollYProgress,
    [0, 0.3, 1],
    [getInitialPaddingX(), getInitialPaddingX(), getFinalPaddingX()]
  );
  const containerPaddingY = useTransform(
    scrollYProgress,
    [0, 0.3, 1],
    [
      getInitialPaddingY(),
      getInitialPaddingY(),
      getFinalPaddingY()
    ]
  );


  const containerBorderRadius = useTransform(
    scrollYProgress,
    [0, 0.3, 1],
    [getInitialBorderRadius(), getInitialBorderRadius(), 0]
  );

  // Fixed overlap margin - always 20px overlap
  const imageOverlap = -20;

  if (!config) {
    notFound();
  }

  const isStackedHero = Array.isArray(config.heroImage);
  const currentHeroImage = isStackedHero ? '' : (config.heroImage as string);

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-transparent pt-[40px] pb-0 md:pt-[80px] md:pb-[80px] lg:pt-[160px] lg:pb-0">
        <div className="max-w-[1920px] mx-auto px-0">
          <div className="w-full px-[16px] sm:px-[40px] lg:px-[60px] 2xl:px-[100px] mb-[60px] md:mb-[80px] lg:mb-[100px] grid grid-cols-1 lg:grid-cols-3 gap-[20px] md:gap-[40px] lg:gap-[40px] 2xl:gap-[80px] items-end">
            {/* Left side: Tenzir + Headline - 2 columns */}
            <div className="lg:col-span-2 flex flex-col">
              <motion.p
                className="font-sans text-[18px] md:text-[20px] lg:text-[22px] font-semibold text-[var(--color-8)] mb-[12px] md:mb-[16px]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
              >
                {config.overline}
              </motion.p>

              <AnimatedHeadline
                className="font-serif text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] xl:text-[64px] 2xl:text-[72px] text-[var(--color-8)] tracking-[-0.16px] sm:tracking-[-0.2px] md:tracking-[-0.48px] lg:tracking-[-0.56px] xl:tracking-[-0.64px] 2xl:tracking-[-0.72px] leading-[40px] sm:leading-[50px] md:leading-[60px] lg:leading-[70px] xl:leading-[80px] 2xl:leading-[88px]"
                delay={0.1}
              >
                {config.title}
              </AnimatedHeadline>
            </div>

            {/* Right side: Tags - 1 column */}
            <div className="flex flex-wrap gap-[6px] lg:justify-end lg:content-start">
              {config.tags.map((tag, index) => {
                // Remove " Design" from tags on mobile
                const mobileTag = tag.replace(/ Design$/, '');

                return (
                  <motion.div
                    key={tag}
                    className="border border-[var(--color-94)] dark:border-[var(--color-92)] flex h-[28px] items-center px-[12px] py-[6px] rounded-[40px] shrink-0"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1, ease: [0.22, 0.61, 0.36, 1] }}
                  >
                    {/* Mobile version - without "Design" */}
                    <p className="block md:hidden font-sans text-sans-12-medium text-[var(--color-8)] text-center tracking-[-0.12px] leading-[20px] whitespace-pre">
                      {mobileTag}
                    </p>
                    {/* Desktop version - full tag */}
                    <p className="hidden md:block font-sans text-sans-12-medium text-[var(--color-8)] text-center tracking-[-0.12px] leading-[20px] whitespace-pre">
                      {tag}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Hero Image Container with Scroll Animation */}
          <motion.div
            ref={heroContainerRef}
            className={`px-[16px] sm:px-[40px] md:px-[60px] ${isStackedHero ? 'overflow-visible' : ''}`}
            style={{
              paddingLeft: containerMarginX,
              paddingRight: containerMarginX,
            }}
          >
            <motion.div
              className={`relative w-full bg-[var(--color-94)] dark:bg-[var(--color-96)] hero-container ${isStackedHero ? 'overflow-visible' : 'overflow-hidden'}`}
              style={{
                paddingLeft: isStackedHero ? containerPaddingX : (config.noBorder ? 0 : containerPaddingX),
                paddingRight: isStackedHero ? containerPaddingX : (config.noBorder ? 0 : containerPaddingX),
                paddingTop: isStackedHero ? containerPaddingY : (config.noBorder ? 0 : containerPaddingY),
                paddingBottom: isStackedHero ? containerPaddingY : (config.noBorder ? 0 : containerPaddingY),
                borderRadius: 'clamp(12px, 0.8vw, 24px)',
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={getViewport()}
              transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1], delay: 0.2 }}
            >
              <style dangerouslySetInnerHTML={{
                __html: `
                .hero-container {
                  border-radius: clamp(12px, 0.8vw, 24px);
                }
                @media (min-width: 1920px) {
                  .hero-container {
                    border-bottom-left-radius: ${slugString === 'vario' ? 'clamp(22px, 4vw, 48px)' : slugString === 'vw' ? '8px' : 'clamp(8px, 1.5vw, 16px)'};
                    border-bottom-right-radius: ${slugString === 'vario' ? 'clamp(22px, 4vw, 48px)' : slugString === 'vw' ? '8px' : 'clamp(8px, 1.5vw, 16px)'};
                    ${slugString === 'vw' ? `
                    @media (max-width: 639px) {
                      .hero-container {
                        border-bottom-left-radius: 8px;
                        border-bottom-right-radius: 8px;
                      }
                    }
                    @media (min-width: 640px) and (max-width: 1023px) {
                      .hero-container {
                        border-bottom-left-radius: 10px;
                        border-bottom-right-radius: 10px;
                      }
                    }
                    @media (min-width: 1024px) {
                      .hero-container {
                        border-bottom-left-radius: 12px;
                        border-bottom-right-radius: 12px;
                      }
                    }
                    ` : ''}
                  }
                }
                .hero-image {
                        border-radius: ${slugString === 'vario' ? 'clamp(22px, 4vw, 48px)' : slugString === 'vw' ? '8px' : 'clamp(8px, 1.5vw, 16px)'};
                }
                ${slugString === 'vw' ? `
                @media (max-width: 639px) {
                  .hero-image {
                    border-radius: 8px;
                  }
                }
                @media (min-width: 640px) and (max-width: 1023px) {
                  .hero-image {
                    border-radius: 10px;
                  }
                }
                @media (min-width: 1024px) {
                  .hero-image {
                    border-radius: 12px;
                  }
                }
                ` : ''}
              `
              }} />
              {isStackedHero ? (
                // Stacked images layout for Vario
                <motion.div
                  className="hero-image relative w-full flex items-center justify-center"
                  style={{
                    height: "auto",
                    minHeight: "0",
                    maxHeight: "896px",
                    overflow: "visible"
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
                >
                  <div
                    className="relative flex flex-row items-end justify-center w-full"
                    style={{
                      width: '100%',
                      height: 'auto',
                      maxHeight: '896px'
                    }}
                  >
                    {(() => {
                      const totalImages = (config.heroImage as StackedHeroImage[]).length;
                      const middleIndex = Math.floor(totalImages / 2);

                      // Calculate size scale based on position
                      // Index 0,4 (first, last): 90%, Index 1,3 (second, fourth): 95%, Index 2 (middle): 100%
                      const getSizeScale = (idx: number) => {
                        if (idx === 0 || idx === totalImages - 1) return 0.90; // First and last: 90%
                        if (idx === 1 || idx === totalImages - 2) return 0.95; // Second and fourth: 95%
                        return 1.0; // Middle: 100%
                      };

                      // Calculate total scale sum for proportional distribution
                      const totalScaleSum = (config.heroImage as StackedHeroImage[]).reduce((sum, _, idx) => {
                        return sum + getSizeScale(idx);
                      }, 0);

                      // Calculate overlap compensation: we have (totalImages - 1) overlaps of 20px each
                      const totalOverlap = (totalImages - 1) * 20;

                      // Calculate z-index: middle image has highest, decreasing outwards
                      const getZIndex = (idx: number) => {
                        const distanceFromMiddle = Math.abs(idx - middleIndex);
                        return totalImages - distanceFromMiddle;
                      };

                      return (config.heroImage as StackedHeroImage[]).map((image, index) => {
                        const offset = image.heightOffset || 0;
                        const baseHeight = 896;
                        const baseWidth = 414;
                        const widthRatio = baseWidth / baseHeight;
                        const uniqueId = `hero-stacked-${index}`;
                        const sizeScale = getSizeScale(index);

                        return (
                          <React.Fragment key={index}>
                            <style dangerouslySetInnerHTML={{
                              __html: `
                            .${uniqueId} {
                              border-radius: ${slugString === 'vario' ? 'clamp(22px, 4vw, 48px)' : slugString === 'vw' ? '8px' : 'clamp(8px, 1.5vw, 16px)'};
                              ${getVWBorderRadiusCSS(uniqueId)}
                              aspect-ratio: ${widthRatio};
                              height: auto;
                              width: calc(((100% + ${totalOverlap}px) / ${totalScaleSum}) * ${sizeScale});
                              max-height: calc((896px - ${offset * (896 / baseHeight)}px) * ${sizeScale});
                              flex: 0 0 auto;
                              min-width: 0;
                            }
                          `
                            }} />
                            <motion.div
                              className={`relative overflow-hidden border-responsive ${uniqueId}`}
                              style={{
                                backdropFilter: "blur(10px)",
                                WebkitBackdropFilter: "blur(10px)",
                                boxSizing: "border-box",
                                borderColor: "var(--color-0-80)",
                                zIndex: getZIndex(index),
                                marginLeft: index === 0 ? 0 : imageOverlap,
                              } as React.CSSProperties}
                            >
                              <Image
                                src={image.src}
                                alt={`${config.title} ${index + 1}`}
                                fill
                                className="object-cover"
                                draggable={false}
                                priority={index === middleIndex}
                                quality={100}
                                unoptimized={true}
                              />
                            </motion.div>
                          </React.Fragment>
                        );
                      });
                    })()}
                  </div>
                </motion.div>
              ) : (
                // Single image layout
                <motion.div
                  className={`hero-image relative w-full overflow-hidden ${config.noBorder ? '' : 'border-responsive'}`}
                  style={{
                    backgroundColor: 'transparent',
                    borderColor: 'var(--color-0-80)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    boxSizing: 'border-box',
                    ...(slugString === 'vw' && heroBorderRadiusBottom ? {
                      // Top radius set via CSS media queries, bottom radius animated
                      borderBottomLeftRadius: heroBorderRadiusBottom,
                      borderBottomRightRadius: heroBorderRadiusBottom,
                    } : {})
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
                >
                  <Image
                    src={currentHeroImage}
                    alt={config.title}
                    width={1920}
                    height={1080}
                    className="w-full h-auto object-cover"
                    priority
                    quality={100}
                    unoptimized={true}
                  />
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Overview Section */}
      <section className={`relative bg-[var(--color-96)] ${config.noBorder ? 'pt-[60px] md:pt-[80px] lg:pt-[140px] xl:pt-[160px] 2xl:pt-[200px] pb-[60px] md:pb-[80px] lg:pb-[100px] xl:pb-[120px] 2xl:pb-[160px]' : 'pt-[60px] md:pt-[80px] lg:pt-[140px] xl:pt-[160px] 2xl:pt-[200px] pb-[60px] md:pb-[80px] lg:pb-[100px] xl:pb-[120px] 2xl:pb-[160px]'}`}>
        <div className="max-w-[1920px] mx-auto px-[16px] sm:px-[40px] lg:px-[60px] 2xl:px-[100px]">
          <div className={`grid grid-cols-1 lg:grid-cols-3 gap-[40px] md:gap-[60px] lg:gap-[40px] 2xl:gap-[80px] ${config.noBorder ? 'mb-0' : (slugString === 'tenzir' || slugString === 'porsche' || slugString === 'vario') ? 'mb-0 lg:mb-[120px]' : 'mb-[120px]'}`}>
            {/* Column 1-2: Summary (spans 2 columns) */}
            <motion.div
              className="flex flex-col gap-[12px] lg:col-span-2 lg:pr-[80px]"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "0px 0px -50px 0px", amount: 0.3 }}
              variants={fadeInUpVariants}
            >
              <h2 className="font-sans text-[16px] sm:text-[17px] md:text-[18px] lg:text-[20px] font-semibold text-[var(--color-8)] tracking-[-0.24px] sm:tracking-[-0.255px] md:tracking-[-0.27px] lg:tracking-[-0.30px] leading-[26px] sm:leading-[28px] md:leading-[30px] lg:leading-[32px]">
                Summary
              </h2>
              <p className="font-sans text-[18px] md:text-[20px] lg:text-[22px] text-[var(--color-8)] font-normal tracking-[-0.3px] leading-[28px] md:leading-[32px] lg:leading-[36px] max-w-[960px]">
                {config.description}
              </p>
            </motion.div>

            {/* Column 3: Year, Roles and Contributions */}
            <motion.div
              className="flex flex-col md:grid md:grid-cols-3 lg:flex lg:flex-col gap-[24px]"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "0px 0px -50px 0px", amount: 0.3 }}
              variants={{
                ...fadeInUpVariants,
                visible: {
                  ...fadeInUpVariants.visible,
                  transition: {
                    ...fadeInUpVariants.visible.transition,
                    delay: 0.1,
                  },
                },
              }}
            >
              <div className="flex flex-col gap-[12px]">
                <p className="font-sans text-[16px] sm:text-[17px] md:text-[18px] lg:text-[20px] font-semibold text-[var(--color-8)] tracking-[-0.24px] sm:tracking-[-0.255px] md:tracking-[-0.27px] lg:tracking-[-0.30px] leading-[26px] sm:leading-[28px] md:leading-[30px] lg:leading-[32px]">
                  Year
                </p>
                <p className="font-sans text-[16px] sm:text-[17px] md:text-[18px] font-normal text-[var(--color-8)] tracking-[-0.24px] sm:tracking-[-0.255px] md:tracking-[-0.27px] leading-[26px] sm:leading-[28px] md:leading-[30px]">
                  {config.year}
                </p>
              </div>

              <div className="flex flex-col gap-[12px]">
                <p className="font-sans text-[16px] sm:text-[17px] md:text-[18px] lg:text-[20px] font-semibold text-[var(--color-8)] tracking-[-0.24px] sm:tracking-[-0.255px] md:tracking-[-0.27px] lg:tracking-[-0.30px] leading-[26px] sm:leading-[28px] md:leading-[30px] lg:leading-[32px]">
                  Roles
                </p>
                <p className="font-sans text-[16px] sm:text-[17px] md:text-[18px] font-normal text-[var(--color-8)] tracking-[-0.24px] sm:tracking-[-0.255px] md:tracking-[-0.27px] leading-[26px] sm:leading-[28px] md:leading-[30px]">
                  {config.role}
                </p>
              </div>

              <div className="flex flex-col gap-[12px]">
                <p className="font-sans text-[16px] sm:text-[17px] md:text-[18px] lg:text-[20px] font-semibold text-[var(--color-8)] tracking-[-0.24px] sm:tracking-[-0.255px] md:tracking-[-0.27px] lg:tracking-[-0.30px] leading-[26px] sm:leading-[28px] md:leading-[30px] lg:leading-[32px]">
                  Contributions
                </p>
                <p className="font-sans text-[16px] sm:text-[17px] md:text-[18px] font-normal text-[var(--color-8)] tracking-[-0.24px] sm:tracking-[-0.255px] md:tracking-[-0.27px] leading-[26px] sm:leading-[28px] md:leading-[30px]">
                  {config.contributions}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Summary Images Row (for Tenzir) */}
          {slugString === 'tenzir' && (() => {
            const summaryImages = [
              { src: "/images/tenzir/Tenzir_07.jpg" },
              { src: "/images/tenzir/Tenzir_06.jpg" },
              { src: "/images/tenzir/Tenzir_09.jpg" },
              { src: "/images/tenzir/Tenzir_10.jpg" },
              { src: "/images/tenzir/Tenzir_08.jpg" },
              { src: "/images/tenzir/Tenzir_11.jpg" },
            ];

            return (
              <div className="hidden lg:block lg:mt-[100px]">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-[40px]" style={{ containerType: 'inline-size' }}>
                  <style dangerouslySetInnerHTML={{
                    __html: `
                      .summary-image {
                        border-radius: ${slugString === 'vario' ? 'clamp(22px, 4vw, 48px)' : slugString === 'vw' ? '8px' : 'clamp(8px, 1.5vw, 16px)'};
                      }
                      ${slugString === 'vw' ? `
                      @media (max-width: 639px) {
                        .summary-image {
                          border-radius: 8px;
                        }
                      }
                      @media (min-width: 640px) and (max-width: 1023px) {
                        .summary-image {
                          border-radius: 10px;
                        }
                      }
                      @media (min-width: 1024px) {
                        .summary-image {
                          border-radius: 12px;
                        }
                      }
                      ` : ''}
                    `
                  }} />
                  {summaryImages.map((img, imgIndex) => (
                    <motion.div
                      key={imgIndex}
                      className="summary-image relative overflow-hidden border-responsive"
                      style={{
                        backgroundColor: 'transparent',
                        borderColor: 'var(--color-0-80)',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                        boxSizing: 'border-box'
                      }}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "0px 0px -50px 0px", amount: 0.3 }}
                      variants={{
                        ...fadeInUpVariants,
                        visible: {
                          ...fadeInUpVariants.visible,
                          transition: {
                            ...fadeInUpVariants.visible.transition,
                            delay: 0.2 + imgIndex * 0.1,
                          },
                        },
                      }}
                    >
                      <Image
                        src={img.src}
                        alt={`Summary image ${imgIndex + 1}`}
                        width={800}
                        height={600}
                        className="w-full h-auto object-cover"
                        quality={100}
                        unoptimized={true}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })()}

          {/* Summary Images Row (for Porsche) */}
          {slugString === 'porsche' && (() => {
            const summaryImages = [
              { src: "/images/porsche/Porsche_02.jpg", colIdx: 0, rowIdx: 0 },
              { src: "/images/porsche/Porsche_01_Overview.jpg", spanRows: true, colIdx: 1, rowIdx: 0 },
              { src: "/images/porsche/Porsche_05.jpg", colIdx: 2, rowIdx: 0 },
              { src: "/images/porsche/Porsche_08.jpg", colIdx: 0, rowIdx: 1 },
              { src: "/images/porsche/Porsche_04.jpg", colIdx: 2, rowIdx: 1 },
            ];

            return (
              <div className="hidden lg:block lg:mt-[100px]">
                <div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[40px]"
                  style={{
                    gridTemplateRows: 'repeat(2, 1fr)',
                    gridAutoFlow: 'row',
                    containerType: 'inline-size'
                  }}
                >
                  <style dangerouslySetInnerHTML={{
                    __html: `
                      .summary-image {
                        border-radius: ${slugString === 'vario' ? 'clamp(22px, 4vw, 48px)' : slugString === 'vw' ? '8px' : 'clamp(8px, 1.5vw, 16px)'};
                      }
                      ${slugString === 'vw' ? `
                      @media (max-width: 639px) {
                        .summary-image {
                          border-radius: 8px;
                        }
                      }
                      @media (min-width: 640px) and (max-width: 1023px) {
                        .summary-image {
                          border-radius: 10px;
                        }
                      }
                      @media (min-width: 1024px) {
                        .summary-image {
                          border-radius: 12px;
                        }
                      }
                      ` : ''}
                    `
                  }} />
                  {summaryImages.map((img, imgIndex) => {
                    const isSpanning = img.spanRows;
                    
                    return (
                      <motion.div
                        key={imgIndex}
                        className="summary-image relative overflow-hidden border-responsive"
                        style={{
                          backgroundColor: 'transparent',
                          borderColor: 'var(--color-0-80)',
                          backdropFilter: 'blur(10px)',
                          WebkitBackdropFilter: 'blur(10px)',
                          boxSizing: 'border-box',
                          gridColumn: `${img.colIdx + 1}`,
                          gridRow: isSpanning ? '1 / 3' : `${img.rowIdx + 1}`,
                          display: 'flex',
                          alignItems: isSpanning ? 'flex-end' : 'stretch',
                          containerType: 'inline-size'
                        }}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "0px 0px -50px 0px", amount: 0.3 }}
                        variants={{
                          ...fadeInUpVariants,
                          visible: {
                            ...fadeInUpVariants.visible,
                            transition: {
                              ...fadeInUpVariants.visible.transition,
                              delay: 0.2 + imgIndex * 0.1,
                            },
                          },
                        }}
                      >
                        <Image
                          src={img.src}
                          alt={`Summary image ${imgIndex + 1}`}
                          width={800}
                          height={600}
                          className="w-full object-cover"
                          style={{
                            height: '100%',
                            objectPosition: isSpanning ? 'center bottom' : 'center'
                          }}
                          quality={100}
                          unoptimized={true}
                        />
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            );
          })()}

          {/* Summary Images Row (for Vario) */}
          {slugString === 'vario' && (() => {
            const summaryImages = [
              { src: "/images/vario/Vario_01.png", noBorder: false },
              { src: "/images/vario/Vario_06.png", noBorder: false },
              { src: "/images/vario/Vario_02.png", noBorder: false },
              { src: "/images/vario/Vario_05.png", noBorder: false },
            ];

            return (
              <div className="flex flex-col gap-[80px] md:gap-[100px] lg:gap-[120px] hidden lg:block lg:mt-[100px]">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 2xl:grid-cols-4 gap-x-[16px] md:gap-x-[40px] lg:gap-x-[40px] 2xl:gap-x-[80px] gap-y-[16px] md:gap-y-[40px] lg:gap-y-[40px] 2xl:gap-y-[80px] pt-[20px]">
                  <style dangerouslySetInnerHTML={{
                    __html: `
                      .summary-row-image {
                        border-radius: ${slugString === 'vario' ? 'clamp(22px, 4vw, 48px)' : slugString === 'vw' ? '8px' : 'clamp(8px, 1.5vw, 16px)'};
                        ${getVWBorderRadiusCSS('summary-row-image')}
                      }
                    `
                  }} />
                  {summaryImages.map((img, idx) => (
                    <motion.div
                      key={idx}
                      className={`summary-row-image relative overflow-hidden border-responsive`}
                      style={{
                        backgroundColor: 'transparent',
                        borderColor: 'var(--color-0-80)',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                        boxSizing: 'border-box'
                      }}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "0px 0px -50px 0px", amount: 0.3 }}
                      variants={{
                        ...fadeInUpVariants,
                        visible: {
                          ...fadeInUpVariants.visible,
                          transition: {
                            ...fadeInUpVariants.visible.transition,
                            delay: idx * 0.1,
                          },
                        },
                      }}
                    >
                      <Image
                        src={img.src}
                        alt={`Summary ${idx + 1}`}
                        width={800}
                        height={600}
                        className="w-full h-auto object-cover"
                        quality={100}
                        unoptimized={true}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })()}


          {/* Summary Image (for VW) */}
          {config.summaryImage && (
            <motion.div
              className={`relative w-full overflow-hidden ${config.noBorder ? '' : 'border-responsive'} mt-[60px] md:mt-[80px] lg:mt-[100px]`}
              style={{
                backgroundColor: 'transparent',
                borderColor: 'var(--color-0-80)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                boxSizing: 'border-box'
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "0px 0px -50px 0px", amount: 0.3 }}
              variants={fadeInUpVariants}
            >
              <style dangerouslySetInnerHTML={{
                __html: `
                  .summary-image {
                    border-radius: ${slugString === 'vario' ? 'clamp(22px, 4vw, 48px)' : slugString === 'vw' ? '8px' : 'clamp(8px, 1.5vw, 16px)'};
                    ${getVWBorderRadiusCSS('summary-image')}
                  }
                `
              }} />
              <Image
                src={config.summaryImage}
                alt="Summary"
                width={1920}
                height={1080}
                className="summary-image w-full h-auto object-cover"
                quality={100}
                unoptimized={true}
              />
            </motion.div>
          )}

          {/* First Section inside Overview (for VW) */}
          {config.sections && config.sections.length > 0 && config.sections[0] && slugString === 'vw' && (() => {
            const section = config.sections[0];
            return (
              <div className="mt-[60px] md:mt-[80px] lg:mt-[100px]">
                <div className="flex flex-col gap-[60px] lg:gap-[120px]">
                  {section.type === "text-image" && !section.centeredLayout && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-[24px] md:gap-[60px] lg:gap-[40px] 2xl:gap-[80px] items-start">
                      {/* Left: Overline + Title */}
                      <motion.div
                        className="flex flex-col gap-[12px] md:gap-[16px]"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "0px 0px -50px 0px", amount: 0.3 }}
                        variants={fadeInUpVariants}
                      >
                        {section.overline && (
                          <p className="font-sans text-[16px] sm:text-[17px] md:text-[18px] lg:text-[20px] font-semibold text-[var(--color-8)] tracking-[-0.24px] sm:tracking-[-0.255px] md:tracking-[-0.27px] lg:tracking-[-0.30px] leading-[26px] sm:leading-[28px] md:leading-[30px] lg:leading-[32px]">
                            {section.overline}
                          </p>
                        )}
                        {section.title && (
                          <h2 className="font-serif text-[32px] md:text-[36px] lg:text-[40px] xl:text-[44px] 2xl:text-[48px] text-[var(--color-8)] tracking-[-0.14px] sm:tracking-[-0.16px] md:tracking-[-0.18px] lg:tracking-[-0.20px] xl:tracking-[-0.22px] 2xl:tracking-[-0.24px] leading-[35px] sm:leading-[40px] md:leading-[45px] lg:leading-[50px] xl:leading-[55px] 2xl:leading-[60px]">
                            {slugString === 'vw' ? (
                              // For VW: on mobile, ignore \n and let text wrap naturally; on xl+, respect \n
                              <>
                                <span className="xl:hidden">{section.title.replace(/\n/g, ' ')}</span>
                                <span className="hidden xl:block">
                                  {section.title.split('\n').map((line, idx, arr) => (
                                    <span key={idx} className="w-full block">
                                      {line}
                                      {idx < arr.length - 1 && <br />}
                                    </span>
                                  ))}
                                </span>
                              </>
                            ) : (
                              // For other projects: on mobile, ignore \n and let text wrap naturally; on xl+, respect \n
                              <>
                                <span className="xl:hidden">{section.title.replace(/\n/g, ' ')}</span>
                                <span className="hidden xl:block">
                                  {section.title.split('\n').map((line, idx, arr) => (
                                    <span key={idx} className="w-full block">
                                      {line}
                                      {idx < arr.length - 1 && <br />}
                                    </span>
                                  ))}
                                </span>
                              </>
                            )}
                          </h2>
                        )}
                      </motion.div>

                      {/* Right: Text */}
                      <div className="flex flex-col gap-[20px] md:gap-[24px] lg:pt-[48px] max-w-[720px]">
                        {section.text && section.text.split('\n\n').map((paragraph, idx) => (
                          <motion.p
                            key={idx}
                            className="font-sans text-[16px] md:text-[18px] lg:text-[20px] text-[var(--color-8)] font-normal tracking-[-0.24px] md:tracking-[-0.27px] lg:tracking-[-0.3px] leading-[26px] md:leading-[30px] lg:leading-[32px]"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "0px 0px -50px 0px", amount: 0.3 }}
                            variants={{
                              ...fadeInUpVariants,
                              visible: {
                                ...fadeInUpVariants.visible,
                                transition: {
                                  ...fadeInUpVariants.visible.transition,
                                  delay: 0.2 + idx * 0.1,
                                },
                              },
                            }}
                          >
                            {paragraph}
                          </motion.p>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Image Rows */}
                  {section.imageRows && section.imageRows.length > 0 && (() => {
                    const allImages = section.imageRows.flatMap((row, rowIdx) =>
                      row.map((img, imgIdx) => ({ ...img, originalRowIdx: rowIdx, originalImgIdx: imgIdx }))
                    );

                    return (
                      <>
                        <style dangerouslySetInnerHTML={{
                          __html: `
                            .row-image {
                              border-radius: ${slugString === 'vario' ? 'clamp(22px, 4vw, 48px)' : slugString === 'vw' ? '8px' : 'clamp(8px, 1.5vw, 16px)'};
                            }
                            ${getVWBorderRadiusCSS('row-image')}
                          `
                        }} />
                        <div className={`grid ${slugString === 'vw' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-2'} lg:grid-cols-2 gap-[24px] md:gap-[40px] lg:gap-[40px] xl:gap-[40px]`}>
                          {allImages.map((img, globalIdx) => {
                          const shouldHaveBorder = img.noBorder === false || (!config.noBorder && img.noBorder !== true);
                          return (
                            <motion.div
                              key={globalIdx}
                              className="flex flex-col gap-[12px] md:gap-[16px]"
                              initial="hidden"
                              whileInView="visible"
                              viewport={{ once: true, margin: "0px 0px -50px 0px", amount: 0.3 }}
                              variants={{
                                ...fadeInUpVariants,
                                visible: {
                                  ...fadeInUpVariants.visible,
                                  transition: {
                                    ...fadeInUpVariants.visible.transition,
                                    delay: 0.4 + globalIdx * 0.15,
                                  },
                                },
                              }}
                            >
                              <motion.div
                                className={`row-image relative overflow-hidden ${shouldHaveBorder ? 'border-responsive' : ''}`}
                                style={{
                                  ...(shouldHaveBorder ? {
                                    backgroundColor: 'transparent',
                                    borderColor: 'var(--color-0-80)',
                                    backdropFilter: 'blur(10px)',
                                    WebkitBackdropFilter: 'blur(10px)',
                                    boxSizing: (slugString as string) === 'vario' ? 'border-box' : 'content-box'
                                  } : {})
                                }}
                              >
                                <Image
                                  src={theme === "dark" && img.srcDark ? img.srcDark : img.src}
                                  alt={img.caption || `Image ${globalIdx + 1}`}
                                  width={800}
                                  height={600}
                                  className="w-full h-auto object-cover"
                                  quality={100}
                                  unoptimized={true}
                                />
                              </motion.div>
                              {img.caption && (
                                <p className="font-sans text-[14px] md:text-[15px] lg:text-[16px] text-[var(--color-8)] font-medium tracking-[-0.21px] md:tracking-[-0.225px] lg:tracking-[-0.24px] leading-[23px] md:leading-[25px] lg:leading-[26px] text-left">
                                  {img.caption}
                                </p>
                              )}
                            </motion.div>
                          );
                        })}
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* Content Sections */}
      {config.sections.map((section, index) => {
        // Skip first section for VW (already rendered in Overview Section)
        if (slugString === 'vw' && index === 0) {
          return null;
        }

        // Skip grid sections that have neither images nor imageRows
        if (section.type === "grid" && !section.images && !section.imageRows) {
          return null;
        }

        const bgColor = section.backgroundColor === "white"
          ? "var(--color-100)"
          : section.backgroundColor === "light"
            ? "var(--color-96)"
            : "var(--color-98)";

        return (
          <section
            key={index}
            className="relative py-[60px] md:py-[80px] lg:py-[100px] xl:py-[120px] overflow-x-hidden"
            style={{ backgroundColor: bgColor }}
          >
            <div className="max-w-[1920px] mx-auto px-[16px] sm:px-[40px] lg:px-[60px] 2xl:px-[100px]">
              {section.type === "text" && (
                <motion.div
                  className="max-w-[800px] mx-auto text-center"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "0px 0px -50px 0px", amount: 0.3 }}
                  variants={fadeInUpVariants}
                >
                  {section.title && (
                    <h2 className="font-serif text-[32px] sm:text-[36px] md:text-[40px] lg:text-[44px] xl:text-[48px] text-[var(--color-8)] tracking-[-0.16px] sm:tracking-[-0.18px] md:tracking-[-0.20px] lg:tracking-[-0.22px] xl:tracking-[-0.24px] leading-[40px] sm:leading-[45px] md:leading-[50px] lg:leading-[55px] xl:leading-[60px] mb-[16px]">
                      {section.title}
                    </h2>
                  )}
                  {section.subtitle && (
                    <p className="font-sans text-[16px] sm:text-[17px] md:text-[18px] lg:text-[20px] xl:text-[22px] text-[var(--color-8)] font-medium tracking-[-0.24px] sm:tracking-[-0.255px] md:tracking-[-0.27px] lg:tracking-[-0.30px] xl:tracking-[-0.44px] leading-[26px] sm:leading-[28px] md:leading-[30px] lg:leading-[32px] xl:leading-[36px] mb-[24px]">
                      {section.subtitle}
                    </p>
                  )}
                  {section.text && (
                    <p className="font-sans text-[20px] text-[var(--color-8)] font-normal tracking-[-0.3px] leading-[32px]">
                      {section.text}
                    </p>
                  )}
                </motion.div>
              )}

              {section.type === "image" && section.image && (
                <>
                  <style dangerouslySetInnerHTML={{
                    __html: `
                      .content-image {
                        border-radius: ${slugString === 'vario' ? 'clamp(22px, 4vw, 48px)' : slugString === 'vw' ? '8px' : 'clamp(8px, 1.5vw, 16px)'};
                        ${getVWBorderRadiusCSS('content-image')}
                      }
                      ${getVWBorderRadiusCSS('content-image')}
                    `
                  }} />
                  <motion.div
                    className={`content-image relative w-full overflow-hidden ${config.noBorder ? '' : 'border-responsive'}`}
                    style={{
                      backgroundColor: 'transparent',
                      borderColor: 'var(--color-0-80)',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      boxSizing: slugString === 'vario' ? 'border-box' : 'content-box'
                    }}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "0px 0px -50px 0px", amount: 0.3 }}
                    variants={fadeInUpVariants}
                  >
                    <Image
                      src={section.image}
                      alt={section.title || "Content image"}
                      width={1920}
                      height={1080}
                      className="w-full h-auto object-cover"
                      quality={100}
                      unoptimized={true}
                    />
                  </motion.div>
                </>
              )}

              {section.type === "grid" && section.images && (
                <div
                  className={`grid gap-[20px] ${section.gridCols === 2
                    ? "grid-cols-1 md:grid-cols-2"
                    : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                    }`}
                >
                  <style dangerouslySetInnerHTML={{
                    __html: `
                      .grid-image {
                        border-radius: ${slugString === 'vario' ? 'clamp(22px, 4vw, 48px)' : slugString === 'vw' ? '8px' : 'clamp(8px, 1.5vw, 16px)'};
                        ${getVWBorderRadiusCSS('grid-image')}
                      }
                      ${getVWBorderRadiusCSS('grid-image')}
                    `
                  }} />
                  {section.images.map((img, imgIndex) => (
                    <motion.div
                      key={imgIndex}
                      className={`grid-image relative overflow-hidden ${config.noBorder || img.noBorder ? '' : 'border-responsive'}`}
                      style={{
                        backgroundColor: 'transparent',
                        borderColor: 'var(--color-0-80)',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                        boxSizing: slugString === 'vario' ? 'border-box' : 'content-box'
                      }}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "0px 0px -50px 0px", amount: 0.3 }}
                      variants={{
                        ...fadeInUpVariants,
                        visible: {
                          ...fadeInUpVariants.visible,
                          transition: {
                            ...fadeInUpVariants.visible.transition,
                            delay: imgIndex * 0.1,
                          },
                        },
                      }}
                    >
                      <Image
                        src={img.src}
                        alt={`Screen ${imgIndex + 1}`}
                        width={800}
                        height={600}
                        className="w-full h-auto object-cover"
                        quality={100}
                        unoptimized={true}
                      />
                    </motion.div>
                  ))}
                </div>
              )}

              {section.type === "grid" && section.imageRows && (() => {
                const hasSpanningImage = section.imageRows.some(row => row.some(img => img.spanRows));
                const hasNoBorderCards = section.imageRows.every(row => row.every(img => img.noBorder));
                const firstRowCount = section.imageRows[0]?.length || 0;
                let gridClass = "grid grid-cols-1 lg:grid-cols-2 gap-[40px] lg:gap-[40px] xl:gap-[40px]";

                if (hasSpanningImage) {
                  gridClass = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[40px]";
                } else if (firstRowCount === 4) {
                  const mobileGap = slugString === 'vario' ? '16px' : '40px';
                  gridClass = hasNoBorderCards
                    ? `grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-4 gap-x-[${mobileGap}] md:gap-x-[40px] gap-y-[${mobileGap}] md:gap-y-[40px] lg:gap-x-[40px] lg:gap-y-[40px] 2xl:gap-x-[80px] 2xl:gap-y-[80px]`
                    : `grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-4 gap-x-[${mobileGap}] md:gap-x-[40px] gap-y-[${mobileGap}] md:gap-y-[40px] lg:gap-x-[40px] lg:gap-y-[40px] 2xl:gap-x-[80px] 2xl:gap-y-[80px]`;
                } else if (slugString === 'tenzir' && section.title && section.title.includes("From data chaos")) {
                  // Force 2 columns for Tenzir 'From data chaos to clarity' section images on all screens
                  gridClass = "grid grid-cols-2 lg:grid-cols-2 gap-[16px] md:gap-[60px] lg:gap-[40px] xl:gap-[40px]";
                }

                // For Porsche layout: maintain row order and calculate actual column positions
                const orderedImages: Array<{ img: typeof section.imageRows[0][0], rowIdx: number, colIdx: number, actualColIdx: number }> = [];
                let spanningColIdx = -1;

                // First pass: find spanning image column in first row
                section.imageRows[0]?.forEach((img, colIdx) => {
                  if (img.spanRows) {
                    spanningColIdx = colIdx;
                  }
                });

                // Second pass: calculate actual column positions
                section.imageRows.forEach((row, rowIdx) => {
                  row.forEach((img, colIdx) => {
                    let actualColIdx = colIdx;
                    // If there's a spanning image and we're in a later row
                    if (spanningColIdx >= 0 && rowIdx > 0) {
                      // Images at or after the spanning column position should shift right by 1
                      if (colIdx >= spanningColIdx) {
                        actualColIdx = colIdx + 1;
                      }
                    }
                    orderedImages.push({ img, rowIdx, colIdx, actualColIdx });
                  });
                });

                return (
                  <div
                    className={gridClass}
                    style={hasSpanningImage ? {
                      gridTemplateRows: 'repeat(2, 1fr)',
                      gridAutoFlow: 'row'
                    } : {}}
                  >
                    <style dangerouslySetInnerHTML={{
                      __html: `
                        .row-image {
                          border-radius: ${slugString === 'vario' ? 'clamp(22px, 4vw, 48px)' : slugString === 'vw' ? '8px' : 'clamp(8px, 1.5vw, 16px)'};
                        ${getVWBorderRadiusCSS('row-image')}
                        }
                        ${slugString === 'vw' ? `
                        @media (max-width: 639px) {
                          .row-image {
                            border-radius: 8px;
                          }
                        }
                        @media (min-width: 640px) and (max-width: 1023px) {
                          .row-image {
                            border-radius: 10px;
                          }
                        }
                        @media (min-width: 1024px) {
                          .row-image {
                            border-radius: 12px;
                          }
                        }
                        ` : ''}
                      `
                    }} />
                    {orderedImages.map(({ img, rowIdx, colIdx, actualColIdx }, globalIdx) => {
                      const shouldHaveBorder = img.noBorder === false || (!config.noBorder && img.noBorder !== true);
                      return (
                        <motion.div
                          key={globalIdx}
                          className={`${img.noBorder ? 'flex flex-col gap-[32px] md:gap-[100px] p-[16px] md:p-[20px] bg-[var(--color-100)]' : 'flex flex-col gap-[12px] md:gap-[16px]'}`}
                          style={{
                            ...(img.noBorder ? { borderRadius: 'clamp(12px, 0.8vw, 24px)' } : {}),
                            ...(hasSpanningImage ? {
                              gridColumn: `${actualColIdx + 1}`,
                              gridRow: img.spanRows ? '1 / 3' : `${rowIdx + 1}`
                            } : {})
                          }}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true, margin: "0px 0px -50px 0px", amount: 0.3 }}
                          variants={{
                            ...fadeInUpVariants,
                            visible: {
                              ...fadeInUpVariants.visible,
                              transition: {
                                ...fadeInUpVariants.visible.transition,
                                delay: 0.4 + globalIdx * 0.15,
                              },
                            },
                          }}
                        >
                          <motion.div
                            className={`row-image relative overflow-hidden ${shouldHaveBorder ? 'border-responsive' : ''} ${img.spanRows ? 'lg:row-span-2' : ''}`}
                            style={shouldHaveBorder ? {
                              backgroundColor: 'transparent',
                              borderColor: 'var(--color-0-80)',
                              backdropFilter: 'blur(10px)',
                              WebkitBackdropFilter: 'blur(10px)',
                              boxSizing: slugString === 'vario' ? 'border-box' : 'content-box'
                            } : {}}
                          >
                            <div
                              className={img.noBorder ? 'bg-[var(--color-96)] p-[16px] md:p-[20px] flex items-center justify-center w-full h-[140px] md:h-[180px]' : 'w-full h-full'}
                              style={img.noBorder ? { borderRadius: 'clamp(12px, 0.8vw, 24px)' } : {}}
                            >
                              <div
                                className={`flex items-center justify-center ${img.maxWidth ? 'max-w-[200px] md:max-w-[240px]' : ''}`}
                                style={{ width: '100%', height: '100%' }}
                              >
                                <Image
                                  src={theme === "dark" && img.srcDark ? img.srcDark : img.src}
                                  alt={img.caption || `Image ${globalIdx + 1}`}
                                  width={800}
                                  height={600}
                                  className={img.noBorder ? 'max-w-full max-h-full w-auto h-auto object-contain' : `w-full object-cover ${img.spanRows ? 'h-full' : 'h-auto'}`}
                                  quality={100}
                                  unoptimized={true}
                                />
                              </div>
                            </div>
                          </motion.div>
                          {img.caption && !img.noBorder && (
                            <p className="font-sans text-[14px] md:text-[15px] lg:text-[16px] text-[var(--color-8)] font-medium tracking-[-0.21px] md:tracking-[-0.225px] lg:tracking-[-0.24px] leading-[23px] md:leading-[25px] lg:leading-[26px] text-left">
                              {img.caption}
                            </p>
                          )}
                          {img.caption && img.noBorder && (
                            <h3 className="font-sans text-[16px] md:text-[18px] text-[var(--color-8)] font-semibold tracking-[-0.24px] md:tracking-[-0.27px] leading-[26px] md:leading-[30px]">
                              {img.caption}
                            </h3>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                );
              })()}

              {section.type === "text-image" && (
                <div className="flex flex-col gap-[60px] md:gap-[60px] lg:gap-[40px] xl:gap-[80px]">
                  {section.centeredLayout ? (
                    /* Centered Layout: Overline + Title centered, Text in 2 columns */
                    <div className="flex flex-col gap-[60px] md:gap-[60px] lg:gap-[40px] xl:gap-[80px]">
                      {/* Full Width Image First (if imageFirst is true) */}
                      {section.imageFirst && section.fullWidthImage && (
                        <div
                          className="flex flex-col"
                          style={section.fullWidthImageMaxWidth ? {
                            maxWidth: section.fullWidthImageMaxWidth,
                            margin: '0 auto'
                          } : {}}
                        >
                          <style dangerouslySetInnerHTML={{
                            __html: `
                              .full-width-image {
                                border-radius: ${slugString === 'vario' ? 'clamp(22px, 4vw, 48px)' : slugString === 'vw' ? '8px' : 'clamp(8px, 1.5vw, 16px)'};
                              }
                              ${getVWBorderRadiusCSS('full-width-image')}
                            `
                          }} />
                          <motion.div
                            className={`full-width-image relative w-full overflow-hidden ${config.noBorder ? '' : 'border-responsive'}`}
                            style={{
                              backgroundColor: 'transparent',
                              borderColor: 'var(--color-0-80)',
                              backdropFilter: 'blur(10px)',
                              WebkitBackdropFilter: 'blur(10px)',
                              boxSizing: 'border-box',
                              lineHeight: 0
                            }}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "0px 0px -50px 0px", amount: 0.3 }}
                            variants={{
                              ...fadeInUpVariants,
                              visible: {
                                ...fadeInUpVariants.visible,
                                transition: {
                                  ...fadeInUpVariants.visible.transition,
                                  delay: 0.2,
                                },
                              },
                            }}
                          >
                            <Image
                              src={section.fullWidthImage}
                              alt={section.title || "Full width image"}
                              width={1920}
                              height={1080}
                              className="w-full h-auto object-cover"
                              quality={100}
                              unoptimized={true}
                            />
                          </motion.div>
                        </div>
                      )}

                      <div className="flex flex-col gap-[24px] w-full">
                        {/* Centered: Overline + Title */}
                        <motion.div
                          className="flex flex-col gap-[12px] md:gap-[16px] text-left md:text-center mx-auto w-full max-w-[960px]"
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true, margin: "0px 0px -50px 0px", amount: 0.3 }}
                          variants={fadeInUpVariants}
                        >
                          {section.overline && (
                            <p className="font-sans text-[16px] sm:text-[17px] md:text-[18px] lg:text-[20px] font-semibold text-[var(--color-8)] tracking-[-0.24px] sm:tracking-[-0.255px] md:tracking-[-0.27px] lg:tracking-[-0.30px] leading-[26px] sm:leading-[28px] md:leading-[30px] lg:leading-[32px]">
                              {section.overline}
                            </p>
                          )}
                          {section.title && (
                            <h2 className="font-serif text-[32px] md:text-[36px] lg:text-[40px] xl:text-[44px] 2xl:text-[48px] text-[var(--color-8)] tracking-[-0.14px] sm:tracking-[-0.16px] md:tracking-[-0.18px] lg:tracking-[-0.20px] xl:tracking-[-0.22px] 2xl:tracking-[-0.24px] leading-[35px] sm:leading-[40px] md:leading-[45px] lg:leading-[50px] xl:leading-[55px] 2xl:leading-[60px]">
                              {slugString === 'vw' ? (
                                // For VW: on mobile, ignore \n and let text wrap naturally; on xl+, respect \n
                                <>
                                  <span className="xl:hidden">{section.title.replace(/\n/g, ' ')}</span>
                                  <span className="hidden xl:block">
                                    {section.title.split('\n').map((line, idx, arr) => (
                                      <span key={idx} className="xl:w-full xl:block">
                                        {line}
                                        {idx < arr.length - 1 && <br />}
                                      </span>
                                    ))}
                                  </span>
                                </>
                              ) : (
                                // For other projects: on mobile, ignore \n and let text wrap naturally; on xl+, respect \n
                                <>
                                  <span className="xl:hidden">{section.title.replace(/\n/g, ' ')}</span>
                                  <span className="hidden xl:block">
                                    {section.title.split('\n').map((line, idx, arr) => (
                                      <span key={idx} className="xl:w-full xl:block">
                                        {line}
                                        {idx < arr.length - 1 && <br />}
                                      </span>
                                    ))}
                                  </span>
                                </>
                              )}
                            </h2>
                          )}
                        </motion.div>

                        {/* Text in 2 columns or centered */}
                        {section.text && (() => {
                          const paragraphs = section.text.split('\n\n');
                          const isSingleParagraph = paragraphs.length === 1;

                          return (
                            <div className={isSingleParagraph ? "w-full max-w-[960px] mx-auto text-left md:text-center" : section.imageFirst ? "flex flex-col gap-[16px] w-full max-w-[960px] mx-auto" : "grid grid-cols-1 lg:grid-cols-2 gap-[16px] md:gap-[40px] lg:gap-[40px] 2xl:gap-[80px]"}>
                              {paragraphs.map((paragraph, idx) => (
                                <motion.p
                                  key={idx}
                                  className={`font-sans text-[16px] md:text-[18px] lg:text-[20px] text-[var(--color-8)] font-normal tracking-[-0.24px] md:tracking-[-0.27px] lg:tracking-[-0.3px] leading-[26px] md:leading-[30px] lg:leading-[32px] ${section.imageFirst ? 'w-full text-left md:text-center' : paragraph.includes('The core value proposition of Vario was the Vario-Score') || paragraph.includes('We built a database of 450 stocks') ? 'text-left md:text-center' : ''}`}
                                  initial="hidden"
                                  whileInView="visible"
                                  viewport={{ once: true, margin: "0px 0px -50px 0px", amount: 0.3 }}
                                  variants={{
                                    ...fadeInUpVariants,
                                    visible: {
                                      ...fadeInUpVariants.visible,
                                      transition: {
                                        ...fadeInUpVariants.visible.transition,
                                        delay: 0.2 + idx * 0.1,
                                      },
                                    },
                                  }}
                                >
                                  {paragraph}
                                </motion.p>
                              ))}
                            </div>
                          );
                        })()}
                      </div>

                      {/* Image Rows after text (if imageFirst is true) */}
                      {section.imageFirst && section.imageRows && (() => {
                        const allImages = section.imageRows.flatMap((row, rowIdx) =>
                          row.map((img, imgIdx) => ({ ...img, originalRowIdx: rowIdx, originalImgIdx: imgIdx }))
                        );
                        const hasSpanningImage = allImages.some(img => img.spanRows);
                        const hasNoBorderCards = allImages.every(img => img.noBorder);
                        const firstRowCount = section.imageRows[0]?.length || 0;
                        let gridClass = "grid grid-cols-1 lg:grid-cols-2 gap-[16px] md:gap-[40px] lg:gap-[40px] 2xl:gap-[80px]";

                        if (hasSpanningImage) {
                          gridClass = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[40px]";
                        } else if (firstRowCount === 4) {
                          gridClass = hasNoBorderCards
                            ? `grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-x-[16px] md:gap-x-[40px] gap-y-[16px] md:gap-y-[40px] xl:gap-x-[80px] xl:gap-y-[80px]`
                            : `grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-x-[16px] md:gap-x-[40px] gap-y-[16px] md:gap-y-[40px] xl:gap-x-[80px] xl:gap-y-[80px]`;
                        }

                        return (
                          <div
                            className={gridClass}
                            style={hasSpanningImage ? {
                              gridTemplateRows: 'repeat(2, 1fr)',
                              gridAutoFlow: 'dense'
                            } : {}}
                          >
                            <style dangerouslySetInnerHTML={{
                              __html: `
                                .row-image {
                                  border-radius: ${slugString === 'vario' ? 'clamp(22px, 4vw, 48px)' : slugString === 'vw' ? '8px' : 'clamp(8px, 1.5vw, 16px)'};
                                }
                                ${getVWBorderRadiusCSS('row-image')}
                              `
                            }} />
                            {allImages.map((img, globalIdx) => {
                              const shouldHaveBorder = img.noBorder === false || (!config.noBorder && img.noBorder !== true);
                              return (
                                <motion.div
                                  key={globalIdx}
                                  className={`${img.noBorder ? 'flex flex-col gap-[32px] md:gap-[100px] p-[16px] md:p-[20px] bg-[var(--color-100)]' : 'flex flex-col gap-[12px] md:gap-[16px]'}`}
                                  style={img.noBorder ? { borderRadius: 'clamp(12px, 0.8vw, 24px)' } : {}}
                                  initial="hidden"
                                  whileInView="visible"
                                  viewport={{ once: true, margin: "0px 0px -50px 0px", amount: 0.3 }}
                                  variants={{
                                    ...fadeInUpVariants,
                                    visible: {
                                      ...fadeInUpVariants.visible,
                                      transition: {
                                        ...fadeInUpVariants.visible.transition,
                                        delay: 0.4 + globalIdx * 0.15,
                                      },
                                    },
                                  }}
                                >
                                  <motion.div
                                    className={`row-image relative overflow-hidden ${shouldHaveBorder ? 'border-responsive' : ''} ${img.spanRows ? 'lg:row-span-2' : ''}`}
                                    style={shouldHaveBorder ? {
                                      backgroundColor: 'transparent',
                                      borderColor: 'var(--color-0-80)',
                                      backdropFilter: 'blur(10px)',
                                      WebkitBackdropFilter: 'blur(10px)',
                                      boxSizing: slugString === 'vario' ? 'border-box' : 'content-box'
                                    } : {}}
                                  >
                                    <div
                                      className={img.noBorder ? 'bg-[var(--color-96)] p-[16px] md:p-[20px] flex items-center justify-center w-full h-[140px] md:h-[180px]' : 'w-full h-full'}
                                      style={img.noBorder ? { borderRadius: 'clamp(12px, 0.8vw, 24px)' } : {}}
                                    >
                                      <div
                                        className={`flex items-center justify-center ${img.maxWidth ? 'max-w-[200px] md:max-w-[240px]' : ''}`}
                                        style={{ width: '100%', height: '100%' }}
                                      >
                                        <Image
                                          src={theme === "dark" && img.srcDark ? img.srcDark : img.src}
                                          alt={img.caption || `Image ${globalIdx + 1}`}
                                          width={800}
                                          height={600}
                                          className={img.noBorder ? 'max-w-full max-h-full w-auto h-auto object-contain' : `w-full object-cover ${img.spanRows ? 'h-full' : 'h-auto'}`}
                                          quality={100}
                                          unoptimized={true}
                                        />
                                      </div>
                                    </div>
                                  </motion.div>
                                  {img.caption && !img.noBorder && (
                                    <p className="font-sans text-[14px] md:text-[15px] lg:text-[16px] text-[var(--color-8)] font-medium tracking-[-0.21px] md:tracking-[-0.225px] lg:tracking-[-0.24px] leading-[23px] md:leading-[25px] lg:leading-[26px] text-left">
                                      {img.caption}
                                    </p>
                                  )}
                                  {img.caption && img.noBorder && (
                                    <h3 className="font-sans text-[16px] md:text-[18px] text-[var(--color-8)] font-semibold tracking-[-0.24px] md:tracking-[-0.27px] leading-[26px] md:leading-[30px]">
                                      {img.caption}
                                    </h3>
                                  )}
                                </motion.div>
                              );
                            })}
                          </div>
                        );
                      })()}
                    </div>
                  ) : (
                    /* Standard Layout: Headlines (left) + Text (right) - OR Text (left) + Images (right) for Vario */
                    (() => {
                      const isVarioWithImages = slugString === 'vario' && section.images && section.images.length > 0;

                      if (isVarioWithImages) {
                        /* Vario Layout: Text (left) + Videos (right) */
                        return (
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[60px] md:gap-[60px] lg:gap-[40px] 2xl:gap-[80px] items-center">
                            {/* Left: Overline + Title + Text */}
                            <motion.div
                              className={`flex flex-col ${section.title ? 'gap-[24px] md:gap-[24px] lg:gap-[40px]' : 'gap-[16px]'} max-w-[720px]`}
                              initial="hidden"
                              whileInView="visible"
                              viewport={{ once: true, margin: "0px 0px -50px 0px", amount: 0.3 }}
                              variants={fadeInUpVariants}
                            >
                              {/* Overline + Title Container */}
                              <div className="flex flex-col gap-[16px]">
                                {section.overline && (
                                  <p className="font-sans text-[16px] sm:text-[17px] md:text-[18px] lg:text-[20px] font-semibold text-[var(--color-8)] tracking-[-0.24px] sm:tracking-[-0.255px] md:tracking-[-0.27px] lg:tracking-[-0.30px] leading-[26px] sm:leading-[28px] md:leading-[30px] lg:leading-[32px]">
                                    {section.overline}
                                  </p>
                                )}
                                {section.title && (
                                  <h2 className="font-serif text-[32px] md:text-[36px] lg:text-[40px] xl:text-[44px] 2xl:text-[48px] text-[var(--color-8)] tracking-[-0.14px] sm:tracking-[-0.16px] md:tracking-[-0.18px] lg:tracking-[-0.20px] xl:tracking-[-0.22px] 2xl:tracking-[-0.24px] leading-[35px] sm:leading-[40px] md:leading-[45px] lg:leading-[50px] xl:leading-[55px] 2xl:leading-[60px]">
                                    {slugString === 'vw' ? (
                                      // For VW: on mobile, ignore \n and let text wrap naturally; on xl+, respect \n
                                      <>
                                        <span className="xl:hidden">{section.title.replace(/\n/g, ' ')}</span>
                                        <span className="hidden xl:block">
                                          {section.title.split('\n').map((line, idx, arr) => (
                                            <span key={idx} className="xl:w-full xl:block">
                                              {line}
                                              {idx < arr.length - 1 && <br />}
                                            </span>
                                          ))}
                                        </span>
                                      </>
                                    ) : (
                                      // For other projects: on mobile, ignore \n and let text wrap naturally; on xl+, respect \n
                                      <>
                                        <span className="xl:hidden">{section.title.replace(/\n/g, ' ')}</span>
                                        <span className="hidden xl:block">
                                          {section.title.split('\n').map((line, idx, arr) => (
                                            <span key={idx} className="xl:w-full xl:block">
                                              {line}
                                              {idx < arr.length - 1 && <br />}
                                            </span>
                                          ))}
                                        </span>
                                      </>
                                    )}
                                  </h2>
                                )}
                              </div>
                              {/* Text Container */}
                              {section.text && (
                                <div className="flex flex-col gap-[20px] md:gap-[24px] max-w-[720px]">
                                  {section.text.split('\n\n').map((paragraph, idx) => (
                                    <motion.p
                                      key={idx}
                                      className="font-sans text-[16px] md:text-[18px] lg:text-[20px] text-[var(--color-8)] font-normal tracking-[-0.24px] md:tracking-[-0.27px] lg:tracking-[-0.3px] leading-[26px] md:leading-[30px] lg:leading-[32px] text-left"
                                      initial="hidden"
                                      whileInView="visible"
                                      viewport={{ once: true, margin: "0px 0px -50px 0px", amount: 0.3 }}
                                      variants={{
                                        ...fadeInUpVariants,
                                        visible: {
                                          ...fadeInUpVariants.visible,
                                          transition: {
                                            ...fadeInUpVariants.visible.transition,
                                            delay: 0.2 + idx * 0.1,
                                          },
                                        },
                                      }}
                                    >
                                      {paragraph}
                                    </motion.p>
                                  ))}
                                </div>
                              )}
                            </motion.div>

                            {/* Right: Videos (Vario only) */}
                            <>
                              <style dangerouslySetInnerHTML={{
                                __html: `
                                  .text-image-app-screen {
                                    border-radius: ${slugString === 'vario' ? 'clamp(22px, 4vw, 48px)' : slugString === 'vw' ? '8px' : 'clamp(8px, 1.5vw, 16px)'};
                                  }
                                  ${getVWBorderRadiusCSS('text-image-app-screen')}
                                `
                              }} />
                              <div className="grid grid-cols-2 md:grid-cols-2 gap-[16px] md:gap-[40px] lg:gap-[40px] 2xl:gap-[80px]">
                                {section.images?.map((img, imgIndex) => (
                                  <motion.div
                                    key={imgIndex}
                                    className={`text-image-app-screen relative overflow-hidden border-responsive`}
                                    style={{
                                      backgroundColor: 'transparent',
                                      borderColor: 'var(--color-0-80)',
                                      backdropFilter: 'blur(10px)',
                                      WebkitBackdropFilter: 'blur(10px)',
                                      boxSizing: 'border-box'
                                    }}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, margin: "0px 0px -50px 0px", amount: 0.3 }}
                                    variants={{
                                      ...fadeInUpVariants,
                                      visible: {
                                        ...fadeInUpVariants.visible,
                                        transition: {
                                          ...fadeInUpVariants.visible.transition,
                                          delay: 0.2 + imgIndex * 0.1,
                                        },
                                      },
                                    }}
                                  >
                                    {img.isVideo ? (
                                      <video
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        poster={img.fallbackImage}
                                        className="w-full h-auto object-cover"
                                        onLoadedMetadata={(e) => {
                                          const video = e.currentTarget;
                                          const observer = new IntersectionObserver(
                                            (entries) => {
                                              entries.forEach((entry) => {
                                                if (entry.isIntersecting) {
                                                  video.play();
                                                } else {
                                                  video.pause();
                                                }
                                              });
                                            },
                                            { threshold: 0.5 }
                                          );
                                          observer.observe(video);
                                        }}
                                      >
                                        <source src={img.src} type="video/mp4" />
                                        {img.fallbackImage && (
                                          <Image
                                            src={img.fallbackImage}
                                            alt={img.caption || `Fallback image ${imgIndex + 1}`}
                                            width={800}
                                            height={600}
                                            className="w-full h-auto object-cover"
                                            quality={100}
                                            unoptimized={true}
                                          />
                                        )}
                                      </video>
                                    ) : (
                                      <Image
                                        src={theme === "dark" && img.srcDark ? img.srcDark : img.src}
                                        alt={img.caption || `Image ${imgIndex + 1}`}
                                        width={800}
                                        height={600}
                                        className="w-full h-auto object-cover"
                                        quality={100}
                                        unoptimized={true}
                                      />
                                    )}
                                  </motion.div>
                                ))}
                              </div>
                            </>
                          </div>
                        );
                      } else if (section.reverseLayout && section.imageRows) {
                        /* Reverse Layout: Images (left) + Text (right) */
                        const allImages = section.imageRows.flatMap((row, rowIdx) =>
                          row.map((img, imgIdx) => ({ ...img, originalRowIdx: rowIdx, originalImgIdx: imgIdx }))
                        );
                        const hasSpanningImage = allImages.some(img => img.spanRows);
                        const hasNoBorderCards = allImages.every(img => img.noBorder);
                        const firstRowCount = section.imageRows[0]?.length || 0;
                        // For VW: 1 column on mobile, 2 columns on md+
                        let gridClass = slugString === 'vw'
                          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-[24px] md:gap-[40px] lg:gap-[40px] 2xl:gap-[80px]"
                          : "grid grid-cols-2 lg:grid-cols-2 gap-[16px] md:gap-[40px] lg:gap-[40px] 2xl:gap-[80px]";

                        if (hasSpanningImage) {
                          gridClass = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[40px]";
                        } else if (firstRowCount === 4) {
                          gridClass = hasNoBorderCards
                            ? `grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-x-[16px] md:gap-x-[40px] gap-y-[16px] md:gap-y-[40px] xl:gap-x-[80px] xl:gap-y-[80px]`
                            : `grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-x-[16px] md:gap-x-[40px] gap-y-[16px] md:gap-y-[40px] xl:gap-x-[80px] xl:gap-y-[80px]`;
                        }

                        return (
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[60px] md:gap-[60px] lg:gap-[40px] 2xl:gap-[80px] items-center">
                            {/* Left: Images */}
                            <div className={`${gridClass} order-2 lg:order-1`} style={hasSpanningImage ? {
                              gridTemplateRows: 'repeat(2, 1fr)',
                              gridAutoFlow: 'dense'
                            } : {}}>
                              <style dangerouslySetInnerHTML={{
                                __html: `
                                  .row-image {
                                    border-radius: ${slugString === 'vario' ? 'clamp(22px, 4vw, 48px)' : slugString === 'vw' ? '8px' : 'clamp(8px, 1.5vw, 16px)'};
                                  }
                                  ${slugString === 'vw' ? `
                                  @media (max-width: 639px) {
                                    .row-image {
                                      border-radius: 8px;
                                    }
                                  }
                                  @media (min-width: 640px) and (max-width: 1023px) {
                                    .row-image {
                                      border-radius: 10px;
                                    }
                                  }
                                  @media (min-width: 1024px) {
                                    .row-image {
                                      border-radius: 12px;
                                    }
                                  }
                                  ` : ''}
                                `
                              }} />
                              {allImages.map((img, globalIdx) => {
                                const shouldHaveBorder = img.noBorder === false || (!config.noBorder && img.noBorder !== true);
                                return (
                                  <motion.div
                                    key={globalIdx}
                                    className={`${img.noBorder ? 'flex flex-col gap-[32px] md:gap-[100px] p-[16px] md:p-[20px] bg-[var(--color-100)]' : 'flex flex-col gap-[12px] md:gap-[16px]'}`}
                                    style={img.noBorder ? { borderRadius: 'clamp(12px, 0.8vw, 24px)' } : {}}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, margin: "0px 0px -50px 0px", amount: 0.3 }}
                                    variants={{
                                      ...fadeInUpVariants,
                                      visible: {
                                        ...fadeInUpVariants.visible,
                                        transition: {
                                          ...fadeInUpVariants.visible.transition,
                                          delay: globalIdx * 0.15,
                                        },
                                      },
                                    }}
                                  >
                                    <motion.div
                                      className={`row-image relative overflow-hidden ${shouldHaveBorder ? 'border-responsive' : ''} ${img.spanRows ? 'lg:row-span-2' : ''}`}
                                      style={shouldHaveBorder ? {
                                        backgroundColor: 'transparent',
                                        borderColor: 'var(--color-0-80)',
                                        backdropFilter: 'blur(10px)',
                                        WebkitBackdropFilter: 'blur(10px)',
                                        boxSizing: slugString === 'vario' ? 'border-box' : 'content-box'
                                      } : {}}
                                    >
                                      <div
                                        className={img.noBorder ? 'bg-[var(--color-96)] p-[16px] md:p-[20px] flex items-center justify-center w-full h-[140px] md:h-[180px]' : 'w-full h-full'}
                                        style={img.noBorder ? { borderRadius: 'clamp(12px, 0.8vw, 24px)' } : {}}
                                      >
                                        <div
                                          className={`flex items-center justify-center ${img.maxWidth ? 'max-w-[200px] md:max-w-[240px]' : ''}`}
                                          style={{ width: '100%', height: '100%' }}
                                        >
                                          <Image
                                            src={theme === "dark" && img.srcDark ? img.srcDark : img.src}
                                            alt={img.caption || `Image ${globalIdx + 1}`}
                                            width={800}
                                            height={600}
                                            className={img.noBorder ? 'max-w-full max-h-full w-auto h-auto object-contain' : `w-full object-cover ${img.spanRows ? 'h-full' : 'h-auto'}`}
                                            quality={100}
                                            unoptimized={true}
                                          />
                                        </div>
                                      </div>
                                    </motion.div>
                                    {img.caption && !img.noBorder && (
                                      <p className="font-sans text-[14px] md:text-[15px] lg:text-[16px] text-[var(--color-8)] font-medium tracking-[-0.21px] md:tracking-[-0.225px] lg:tracking-[-0.24px] leading-[23px] md:leading-[25px] lg:leading-[26px] text-left">
                                        {img.caption}
                                      </p>
                                    )}
                                    {img.caption && img.noBorder && (
                                      <h3 className="font-sans text-[16px] md:text-[18px] text-[var(--color-8)] font-semibold tracking-[-0.24px] md:tracking-[-0.27px] leading-[26px] md:leading-[30px]">
                                        {img.caption}
                                      </h3>
                                    )}
                                  </motion.div>
                                );
                              })}
                            </div>

                            {/* Right: Overline + Title + Text */}
                            <motion.div
                              className="flex flex-col gap-[24px] lg:ml-auto lg:text-left max-w-[720px] order-1 lg:order-2"
                              initial="hidden"
                              whileInView="visible"
                              viewport={{ once: true, margin: "0px 0px -50px 0px", amount: 0.3 }}
                              variants={fadeInUpVariants}
                            >
                              <div className="flex flex-col gap-[16px]">
                                {section.overline && (
                                  <p className="font-sans text-[16px] sm:text-[17px] md:text-[18px] lg:text-[20px] font-semibold text-[var(--color-8)] tracking-[-0.24px] sm:tracking-[-0.255px] md:tracking-[-0.27px] lg:tracking-[-0.30px] leading-[26px] sm:leading-[28px] md:leading-[30px] lg:leading-[32px]">
                                    {section.overline}
                                  </p>
                                )}
                                {section.title && (
                                  <h2 className="font-serif text-[32px] md:text-[36px] lg:text-[40px] xl:text-[44px] 2xl:text-[48px] text-[var(--color-8)] tracking-[-0.14px] sm:tracking-[-0.16px] md:tracking-[-0.18px] lg:tracking-[-0.20px] xl:tracking-[-0.22px] 2xl:tracking-[-0.24px] leading-[35px] sm:leading-[40px] md:leading-[45px] lg:leading-[50px] xl:leading-[55px] 2xl:leading-[60px]">
                                    {slugString === 'vw' ? (
                                      // For VW: on mobile, ignore \n and let text wrap naturally; on xl+, respect \n
                                      <>
                                        <span className="xl:hidden">{section.title.replace(/\n/g, ' ')}</span>
                                        <span className="hidden xl:block">
                                          {section.title.split('\n').map((line, idx, arr) => (
                                            <span key={idx} className="xl:w-full xl:block">
                                              {line}
                                              {idx < arr.length - 1 && <br />}
                                            </span>
                                          ))}
                                        </span>
                                      </>
                                    ) : (
                                      // For other projects: on mobile, ignore \n and let text wrap naturally; on xl+, respect \n
                                      <>
                                        <span className="xl:hidden">{section.title.replace(/\n/g, ' ')}</span>
                                        <span className="hidden xl:block">
                                          {section.title.split('\n').map((line, idx, arr) => (
                                            <span key={idx} className="xl:w-full xl:block">
                                              {line}
                                              {idx < arr.length - 1 && <br />}
                                            </span>
                                          ))}
                                        </span>
                                      </>
                                    )}
                                  </h2>
                                )}
                              </div>
                              <div className="flex flex-col gap-[20px] md:gap-[24px]">
                                {section.text && section.text.split('\n\n').map((paragraph, idx) => (
                                  <motion.p
                                    key={idx}
                                    className="font-sans text-[16px] md:text-[18px] lg:text-[20px] text-[var(--color-8)] font-normal tracking-[-0.24px] md:tracking-[-0.27px] lg:tracking-[-0.3px] leading-[26px] md:leading-[30px] lg:leading-[32px] lg:text-left"
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, margin: "0px 0px -50px 0px", amount: 0.3 }}
                                    variants={{
                                      ...fadeInUpVariants,
                                      visible: {
                                        ...fadeInUpVariants.visible,
                                        transition: {
                                          ...fadeInUpVariants.visible.transition,
                                          delay: 0.2 + idx * 0.1,
                                        },
                                      },
                                    }}
                                  >
                                    {paragraph}
                                  </motion.p>
                                ))}
                              </div>
                            </motion.div>
                          </div>
                        );
                      } else {
                        /* Standard Layout for all other projects: Headlines (left) + Text (right) */
                        return (
                          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-[24px] md:gap-[24px] lg:gap-[40px] 2xl:gap-[80px]`}>
                            {/* Left: Overline + Title */}
                            <motion.div
                              className="flex flex-col gap-[12px] md:gap-[16px]"
                              initial="hidden"
                              whileInView="visible"
                              viewport={{ once: true, margin: "0px 0px -50px 0px", amount: 0.3 }}
                              variants={fadeInUpVariants}
                            >
                              {section.overline && (
                                <p className="font-sans text-[16px] sm:text-[17px] md:text-[18px] lg:text-[20px] font-semibold text-[var(--color-8)] tracking-[-0.24px] sm:tracking-[-0.255px] md:tracking-[-0.27px] lg:tracking-[-0.30px] leading-[26px] sm:leading-[28px] md:leading-[30px] lg:leading-[32px]">
                                  {section.overline}
                                </p>
                              )}
                              {section.title && (
                                <h2 className="font-serif text-[32px] md:text-[36px] lg:text-[40px] xl:text-[44px] 2xl:text-[48px] text-[var(--color-8)] tracking-[-0.14px] sm:tracking-[-0.16px] md:tracking-[-0.18px] lg:tracking-[-0.20px] xl:tracking-[-0.22px] 2xl:tracking-[-0.24px] leading-[35px] sm:leading-[40px] md:leading-[45px] lg:leading-[50px] xl:leading-[55px] 2xl:leading-[60px]">
                                  {/* On mobile, ignore \n and let text wrap naturally; on xl+, respect \n */}
                                  <span className="xl:hidden">{section.title.replace(/\n/g, ' ')}</span>
                                  <span className="hidden xl:block">
                                    {section.title.split('\n').map((line, idx, arr) => (
                                      <span key={idx} className="xl:w-full xl:block">
                                        {line}
                                        {idx < arr.length - 1 && <br />}
                                      </span>
                                    ))}
                                  </span>
                                </h2>
                              )}
                            </motion.div>

                            {/* Right: Text */}
                            <div className="flex flex-col gap-[20px] md:gap-[24px] lg:pt-[48px] max-w-[720px]">
                              {section.text && section.text.split('\n\n').map((paragraph, idx) => (
                                <motion.p
                                  key={idx}
                                  className="font-sans text-[16px] md:text-[18px] lg:text-[20px] text-[var(--color-8)] font-normal tracking-[-0.24px] md:tracking-[-0.27px] lg:tracking-[-0.3px] leading-[26px] md:leading-[30px] lg:leading-[32px]"
                                  initial="hidden"
                                  whileInView="visible"
                                  viewport={{ once: true, margin: "0px 0px -50px 0px", amount: 0.3 }}
                                  variants={{
                                    ...fadeInUpVariants,
                                    visible: {
                                      ...fadeInUpVariants.visible,
                                      transition: {
                                        ...fadeInUpVariants.visible.transition,
                                        delay: 0.2 + idx * 0.1,
                                      },
                                    },
                                  }}
                                >
                                  {paragraph}
                                </motion.p>
                              ))}
                            </div>
                          </div>
                        );
                      }
                    })()
                  )}

                  {/* Second Row: Comparison slider or regular images */}
                  {section.beforeImage && section.afterImage ? (
                    <motion.div
                      className="flex flex-col gap-[16px] md:gap-[20px] lg:gap-[24px]"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "0px 0px -50px 0px", amount: 0.3 }}
                      variants={{
                        ...fadeInUpVariants,
                        visible: {
                          ...fadeInUpVariants.visible,
                          transition: {
                            ...fadeInUpVariants.visible.transition,
                            delay: 0.4,
                          },
                        },
                      }}
                    >
                      <ImageComparison
                        beforeImage={section.beforeImage}
                        afterImage={section.afterImage}
                        beforeLabel={section.beforeLabel}
                        afterLabel={section.afterLabel}
                      />
                      {(section.beforeLabel || section.afterLabel) && (
                        <p className="font-sans text-[14px] md:text-[15px] lg:text-[16px] text-[var(--color-8)] font-medium tracking-[-0.21px] md:tracking-[-0.225px] lg:tracking-[-0.24px] leading-[23px] md:leading-[25px] lg:leading-[26px] text-left">
                          {section.beforeLabel} vs. {section.afterLabel}
                        </p>
                      )}
                    </motion.div>
                  ) : section.images && section.images.length > 0 && !section.centeredLayout && !(slugString === 'vario') && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-[24px] md:gap-[40px] lg:gap-[40px] 2xl:gap-[80px]">
                      <style dangerouslySetInnerHTML={{
                        __html: `
                        .text-image-container {
                          border-radius: ${slugString === 'vario' ? 'clamp(22px, 4vw, 48px)' : slugString === 'vw' ? '8px' : 'clamp(8px, 1.5vw, 16px)'};
                        ${getVWBorderRadiusCSS('text-image-container')}
                        }
                        ${getVWBorderRadiusCSS('text-image-container')}
                      `
                      }} />
                      {section.images?.map((img, imgIndex) => (
                        <motion.div
                          key={imgIndex}
                          className="flex flex-col gap-[16px] md:gap-[20px] lg:gap-[24px]"
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true, margin: "0px 0px -50px 0px", amount: 0.3 }}
                          variants={{
                            ...fadeInUpVariants,
                            visible: {
                              ...fadeInUpVariants.visible,
                              transition: {
                                ...fadeInUpVariants.visible.transition,
                                delay: 0.2 + imgIndex * 0.1,
                              },
                            },
                          }}
                        >
                          <div className={`text-image-container relative overflow-hidden ${!img.noBorder && !config.noBorder ? 'border-responsive' : ''}`} style={!img.noBorder && !config.noBorder ? {
                            backgroundColor: 'transparent',
                            borderColor: 'var(--color-0-80)',
                            backdropFilter: 'blur(10px)',
                            WebkitBackdropFilter: 'blur(10px)',
                            boxSizing: slugString === 'vario' ? 'border-box' : 'content-box'
                          } : {}}>
                            <Image
                              src={theme === "dark" && img.srcDark ? img.srcDark : img.src}
                              alt={img.caption || `Image ${imgIndex + 1}`}
                              width={800}
                              height={600}
                              className="w-full h-auto object-cover"
                              quality={100}
                              unoptimized={true}
                            />
                          </div>
                          {img.caption && (
                            <p className="font-sans text-[14px] md:text-[15px] lg:text-[16px] text-[var(--color-8)] font-medium tracking-[-0.21px] md:tracking-[-0.225px] lg:tracking-[-0.24px] leading-[23px] md:leading-[25px] lg:leading-[26px] text-left md:text-center">
                              {img.caption}
                            </p>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/* Image Rows (Masonry Layout) */}
                  {section.imageRows && !section.fullWidthImage && !section.reverseLayout && !section.imageFirst && (() => {
                    // Flatten all images from all rows
                    const allImages = section.imageRows.flatMap((row, rowIdx) =>
                      row.map((img, imgIdx) => ({ ...img, originalRowIdx: rowIdx, originalImgIdx: imgIdx }))
                    );

                    // Check if any image spans rows (for masonry layout)
                    const hasSpanningImage = allImages.some(img => img.spanRows);
                    const hasNoBorderCards = allImages.every(img => img.noBorder);

                    // Determine grid layout based on number of images in first row
                    const firstRowCount = section.imageRows[0]?.length || 0;
                    // For VW: 1 column on mobile, 2 columns on md+
                    let gridClass = slugString === 'vw' 
                      ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-[16px] lg:gap-[40px] xl:gap-[40px]"
                      : "grid grid-cols-2 lg:grid-cols-2 gap-[16px] lg:gap-[40px] xl:gap-[40px]";

                    if (hasSpanningImage) {
                      gridClass = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[40px]";
                    } else if (firstRowCount === 4) {
                      gridClass = hasNoBorderCards
                        ? "grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-x-[16px] md:gap-x-[40px] gap-y-[16px] md:gap-y-[40px] xl:gap-x-[80px] xl:gap-y-[80px]"
                        : "grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-x-[16px] md:gap-x-[40px] gap-y-[16px] md:gap-y-[40px] xl:gap-x-[80px] xl:gap-y-[80px]";
                    }

                    return (
                      <div
                        className={gridClass}
                        style={hasSpanningImage ? {
                          gridTemplateRows: 'repeat(2, 1fr)',
                          gridAutoFlow: 'dense'
                        } : {}}
                      >
                        <style dangerouslySetInnerHTML={{
                          __html: `
                            .row-image {
                              border-radius: ${slugString === 'vario' ? 'clamp(22px, 4vw, 48px)' : slugString === 'vw' ? '8px' : 'clamp(8px, 1.5vw, 16px)'};
                            }
                            ${getVWBorderRadiusCSS('row-image')}
                          `
                        }} />
                        {allImages.map((img, globalIdx) => {
                          // Determine if border should be applied
                          const shouldHaveBorder = img.noBorder === false || (!config.noBorder && img.noBorder !== true);

                          return (
                            <motion.div
                              key={globalIdx}
                              className={`${img.noBorder ? 'flex flex-col gap-[32px] md:gap-[100px] p-[16px] md:p-[20px] bg-[var(--color-100)]' : 'flex flex-col gap-[12px] md:gap-[16px]'}`}
                              style={img.noBorder ? { borderRadius: 'clamp(12px, 0.8vw, 24px)' } : {}}
                            >
                              <motion.div
                                className={`row-image relative overflow-hidden ${shouldHaveBorder ? 'border-responsive' : ''} ${img.spanRows ? 'lg:row-span-2' : ''}`}
                                style={shouldHaveBorder ? {
                                  backgroundColor: 'transparent',
                                  borderColor: 'var(--color-0-80)',
                                  backdropFilter: 'blur(10px)',
                                  WebkitBackdropFilter: 'blur(10px)',
                                  boxSizing: slugString === 'vario' ? 'border-box' : 'content-box'
                                } : {}}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "0px 0px -50px 0px", amount: 0.3 }}
                                variants={{
                                  ...fadeInUpVariants,
                                  visible: {
                                    ...fadeInUpVariants.visible,
                                    transition: {
                                      ...fadeInUpVariants.visible.transition,
                                      delay: globalIdx * 0.15,
                                    },
                                  },
                                }}
                              >
                                <div
                                  className={img.noBorder ? 'bg-[var(--color-96)] p-[16px] md:p-[20px] flex items-center justify-center w-full h-[140px] md:h-[180px]' : 'w-full h-full'}
                                  style={img.noBorder ? { borderRadius: 'clamp(12px, 0.8vw, 24px)' } : {}}
                                >
                                  <div
                                    className={`flex items-center justify-center ${img.maxWidth ? 'max-w-[200px] md:max-w-[240px]' : ''}`}
                                    style={{ width: '100%', height: '100%' }}
                                  >
                                    <Image
                                      src={theme === "dark" && img.srcDark ? img.srcDark : img.src}
                                      alt={img.caption || `Image ${globalIdx + 1}`}
                                      width={800}
                                      height={600}
                                      className={img.noBorder ? 'max-w-full max-h-full w-auto h-auto object-contain' : `w-full object-cover ${img.spanRows ? 'h-full' : 'h-auto'}`}
                                      quality={100}
                                      unoptimized={true}
                                    />
                                  </div>
                                </div>
                              </motion.div>
                              {img.caption && !img.noBorder && (
                                <p className="font-sans text-[14px] md:text-[15px] lg:text-[16px] text-[var(--color-8)] font-medium tracking-[-0.21px] md:tracking-[-0.225px] lg:tracking-[-0.24px] leading-[23px] md:leading-[25px] lg:leading-[26px] text-left">
                                  {img.caption}
                                </p>
                              )}
                              {img.caption && img.noBorder && (
                                <h3 className="font-sans text-[16px] md:text-[18px] text-[var(--color-8)] font-semibold tracking-[-0.24px] md:tracking-[-0.27px] leading-[26px] md:leading-[30px]">
                                  {img.caption}
                                </h3>
                              )}
                            </motion.div>
                          );
                        })}
                      </div>
                    );
                  })()}

                  {/* Multiple Full Width Images */}
                  {section.fullWidthImages && section.fullWidthImages.length > 0 && (
                    <div className="flex flex-col gap-[16px] lg:gap-[80px]">
                      <style dangerouslySetInnerHTML={{
                        __html: `
                          .full-width-image-multi {
                            border-radius: ${slugString === 'vario' ? 'clamp(22px, 4vw, 48px)' : slugString === 'vw' ? '8px' : 'clamp(8px, 1.5vw, 16px)'};
                        ${getVWBorderRadiusCSS('full-width-image-multi')}
                          }
                          ${getVWBorderRadiusCSS('full-width-image-multi')}
                        `
                      }} />
                      {section.fullWidthImages.map((img, imgIndex) => (
                        <motion.div
                          key={imgIndex}
                          className={`full-width-image-multi relative w-full overflow-hidden ${!img.noBorder && !config.noBorder ? 'border-responsive' : ''}`}
                          style={!img.noBorder && !config.noBorder ? {
                            backgroundColor: 'transparent',
                            borderColor: 'var(--color-0-80)',
                            backdropFilter: 'blur(10px)',
                            WebkitBackdropFilter: 'blur(10px)',
                            boxSizing: 'border-box'
                          } : {}}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true, margin: "0px 0px -50px 0px", amount: 0.3 }}
                          variants={{
                            ...fadeInUpVariants,
                            visible: {
                              ...fadeInUpVariants.visible,
                              transition: {
                                ...fadeInUpVariants.visible.transition,
                                delay: 0.4 + imgIndex * 0.1,
                              },
                            },
                          }}
                        >
                          {img.isVideo ? (
                            <video
                              autoPlay
                              loop
                              muted
                              playsInline
                              poster={img.fallbackImage}
                              className="w-full h-auto object-cover"
                              onLoadedMetadata={(e) => {
                                const video = e.currentTarget;
                                const observer = new IntersectionObserver(
                                  (entries) => {
                                    entries.forEach((entry) => {
                                      if (entry.isIntersecting) {
                                        video.play();
                                      } else {
                                        video.pause();
                                      }
                                    });
                                  },
                                  { threshold: 0.5 }
                                );
                                observer.observe(video);
                              }}
                            >
                              <source src={img.src} type="video/mp4" />
                              {img.fallbackImage && (
                                <Image
                                  src={img.fallbackImage}
                                  alt={`Fallback image ${imgIndex + 1}`}
                                  width={1920}
                                  height={1080}
                                  className="w-full h-auto object-cover"
                                  quality={100}
                                  unoptimized={true}
                                />
                              )}
                            </video>
                          ) : (
                            <Image
                              src={img.src}
                              alt={`Full width image ${imgIndex + 1}`}
                              width={1920}
                              height={1080}
                              className="w-full h-auto object-cover"
                              quality={100}
                              unoptimized={true}
                            />
                          )}
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/* Full Width Image and Image Rows */}
                  {section.fullWidthImage && !section.imageFirst && (
                    <div
                      className="flex flex-col gap-[16px] lg:gap-[80px]"
                      style={section.fullWidthImageMaxWidth ? {
                        maxWidth: section.fullWidthImageMaxWidth,
                        margin: '0 auto'
                      } : {}}
                    >
                      <style dangerouslySetInnerHTML={{
                        __html: `
                          .full-width-image {
                            border-radius: ${slugString === 'vario' ? 'clamp(22px, 4vw, 48px)' : slugString === 'vw' ? '8px' : 'clamp(8px, 1.5vw, 16px)'};
                        ${getVWBorderRadiusCSS('full-width-image')}
                          }
                        `
                      }} />
                      {/* Full Width Image */}
                      <motion.div
                        className={`full-width-image relative w-full overflow-hidden ${config.noBorder ? '' : 'border-responsive'}`}
                        style={{
                          backgroundColor: 'transparent',
                          borderColor: 'var(--color-0-80)',
                          backdropFilter: 'blur(10px)',
                          WebkitBackdropFilter: 'blur(10px)',
                          boxSizing: 'border-box',
                          lineHeight: 0
                        }}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "0px 0px -50px 0px", amount: 0.3 }}
                        variants={{
                          ...fadeInUpVariants,
                          visible: {
                            ...fadeInUpVariants.visible,
                            transition: {
                              ...fadeInUpVariants.visible.transition,
                              delay: 0.4,
                            },
                          },
                        }}
                      >
                        {section.isFullWidthVideo ? (
                          <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            poster={section.fullWidthVideoFallback}
                            className="w-full h-auto object-cover block"
                            onLoadedMetadata={(e) => {
                              const video = e.currentTarget;
                              const observer = new IntersectionObserver(
                                (entries) => {
                                  entries.forEach((entry) => {
                                    if (entry.isIntersecting) {
                                      video.play();
                                    } else {
                                      video.pause();
                                    }
                                  });
                                },
                                { threshold: 0.5 }
                              );
                              observer.observe(video);
                            }}
                          >
                            <source src={section.fullWidthImage} type="video/mp4" />
                            {section.fullWidthVideoFallback && (
                              <Image
                                src={section.fullWidthVideoFallback}
                                alt={section.title || "Full width image"}
                                width={1920}
                                height={1080}
                                className="w-full h-auto object-cover"
                                quality={100}
                                unoptimized={true}
                              />
                            )}
                          </video>
                        ) : (
                          <Image
                            src={section.fullWidthImage}
                            alt={section.title || "Full width image"}
                            width={1920}
                            height={1080}
                            className="w-full h-auto object-cover"
                            quality={100}
                            unoptimized={true}
                          />
                        )}
                      </motion.div>

                      {/* Image Rows */}
                      {section.imageRows && !section.imageFirst && (() => {
                        // Flatten all images from all rows
                        const allImages = section.imageRows.flatMap((row, rowIdx) =>
                          row.map((img, imgIdx) => ({ ...img, originalRowIdx: rowIdx, originalImgIdx: imgIdx }))
                        );

                        // Check if any image spans rows (for masonry layout)
                        const hasSpanningImage = allImages.some(img => img.spanRows);

                        // Determine grid layout
                        const gridClass = hasSpanningImage
                          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[16px] lg:gap-[40px] 2xl:gap-[80px]"
                          : "grid grid-cols-1 lg:grid-cols-2 gap-[16px] lg:gap-[40px] 2xl:gap-[80px]";

                        return (
                          <div
                            className={gridClass}
                            style={hasSpanningImage ? {
                              gridTemplateRows: 'repeat(2, 1fr)',
                              gridAutoFlow: 'dense'
                            } : {}}
                          >
                            <style dangerouslySetInnerHTML={{
                              __html: `
                                .row-image {
                                  border-radius: ${slugString === 'vario' ? 'clamp(22px, 4vw, 48px)' : slugString === 'vw' ? '8px' : 'clamp(8px, 1.5vw, 16px)'};
                                }
                                ${getVWBorderRadiusCSS('row-image')}
                              `
                            }} />
                            {allImages.map((img, globalIdx) => {
                              // Determine if border should be applied
                              const shouldHaveBorder = img.noBorder === false || (!config.noBorder && img.noBorder !== true);

                              return (
                                <motion.div
                                  key={globalIdx}
                                  className={`row-image relative overflow-hidden ${shouldHaveBorder ? 'border-responsive' : ''} ${img.spanRows ? 'lg:row-span-2' : ''}`}
                                  style={shouldHaveBorder ? {
                                    backgroundColor: 'transparent',
                                    borderColor: 'var(--color-0-80)',
                                    backdropFilter: 'blur(10px)',
                                    WebkitBackdropFilter: 'blur(10px)',
                                    boxSizing: slugString === 'vario' ? 'border-box' : 'content-box'
                                  } : {}}
                                  initial="hidden"
                                  whileInView="visible"
                                  viewport={{ once: true, margin: "0px 0px -50px 0px", amount: 0.3 }}
                                  variants={{
                                    ...fadeInUpVariants,
                                    visible: {
                                      ...fadeInUpVariants.visible,
                                      transition: {
                                        ...fadeInUpVariants.visible.transition,
                                        delay: 0.5 + globalIdx * 0.1,
                                      },
                                    },
                                  }}
                                >
                                  <Image
                                    src={theme === "dark" && img.srcDark ? img.srcDark : img.src}
                                    alt={img.caption || `Image ${globalIdx + 1}`}
                                    width={800}
                                    height={600}
                                    className="w-full h-auto object-cover"
                                    quality={100}
                                    unoptimized={true}
                                  />
                                  {img.caption && (
                                    <p className="font-sans text-[14px] md:text-[16px] text-[var(--color-44)] font-normal tracking-[-0.21px] md:tracking-[-0.24px] leading-[22px] md:leading-[26px] mt-[12px] md:mt-[16px]">
                                      {img.caption}
                                    </p>
                                  )}
                                </motion.div>
                              );
                            })}
                          </div>
                        );
                      })()}
                    </div>
                  )}
                </div>
              )}

              {section.type === "results" && (
                <div className="flex flex-col items-start md:items-center">
                  {/* Overline and Title Group */}
                  <div className="flex flex-col gap-[12px] md:gap-[16px] items-start md:items-center mb-[20px] md:mb-[24px]">
                    {/* Overline */}
                    {section.overline && (
                      <motion.p
                        className="font-sans text-[16px] sm:text-[17px] md:text-[18px] lg:text-[20px] font-semibold text-[var(--color-8)] tracking-[-0.24px] sm:tracking-[-0.255px] md:tracking-[-0.27px] lg:tracking-[-0.30px] leading-[26px] sm:leading-[28px] md:leading-[30px] lg:leading-[32px] text-left md:text-center"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "0px 0px -50px 0px", amount: 0.3 }}
                        variants={{
                          ...fadeInUpVariants,
                          visible: {
                            ...fadeInUpVariants.visible,
                            transition: {
                              ...fadeInUpVariants.visible.transition,
                              delay: 0,
                            },
                          },
                        }}
                      >
                        {section.overline}
                      </motion.p>
                    )}

                    {/* Title */}
                    {section.title && (
                      <motion.h2
                        className="font-serif text-[32px] md:text-[36px] lg:text-[40px] xl:text-[44px] 2xl:text-[48px] text-[var(--color-8)] tracking-[-0.14px] sm:tracking-[-0.16px] md:tracking-[-0.18px] lg:tracking-[-0.20px] xl:tracking-[-0.22px] 2xl:tracking-[-0.24px] leading-[35px] sm:leading-[40px] md:leading-[45px] lg:leading-[50px] xl:leading-[55px] 2xl:leading-[60px] text-left md:text-center"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "0px 0px -50px 0px", amount: 0.3 }}
                        variants={{
                          ...fadeInUpVariants,
                          visible: {
                            ...fadeInUpVariants.visible,
                            transition: {
                              ...fadeInUpVariants.visible.transition,
                              delay: 0.1,
                            },
                          },
                        }}
                      >
                        {section.title}
                      </motion.h2>
                    )}
                  </div>

                  {/* Text with max-width */}
                  {section.text && (
                    <motion.p
                      className="font-sans text-[16px] md:text-[18px] lg:text-[20px] text-[var(--color-8)] font-normal tracking-[-0.24px] md:tracking-[-0.27px] lg:tracking-[-0.3px] leading-[26px] md:leading-[30px] lg:leading-[32px] text-left md:text-center max-w-[960px] mb-[80px] md:mb-[100px] lg:mb-[120px]"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "0px 0px -50px 0px", amount: 0.3 }}
                      variants={{
                        ...fadeInUpVariants,
                        visible: {
                          ...fadeInUpVariants.visible,
                          transition: {
                            ...fadeInUpVariants.visible.transition,
                            delay: 0.2,
                          },
                        },
                      }}
                    >
                      {section.text}
                    </motion.p>
                  )}

                  {/* Metrics Grid */}
                  {section.metrics && (
                    <div className="w-full">
                      {/* First two metrics in 2-column grid on mobile */}
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-[40px] md:gap-[50px] lg:gap-[60px] w-full mb-[40px] md:mb-0">
                        {section.metrics.slice(0, 2).map((metric, idx) => (
                          <motion.div
                            key={idx}
                            className="flex flex-col items-center gap-[12px] md:gap-[14px] lg:gap-[16px]"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "0px 0px -50px 0px", amount: 0.3 }}
                            variants={{
                              ...fadeInUpVariants,
                              visible: {
                                ...fadeInUpVariants.visible,
                                transition: {
                                  ...fadeInUpVariants.visible.transition,
                                  delay: 0.3 + idx * 0.1,
                                },
                              },
                            }}
                          >
                            <CounterAnimation
                              value={metric.value}
                              className="font-serif text-[48px] sm:text-[56px] md:text-[64px] lg:text-[72px] xl:text-[80px] text-[var(--color-8)] tracking-[-0.48px] sm:tracking-[-0.56px] md:tracking-[-0.64px] lg:tracking-[-0.72px] xl:tracking-[-0.8px] leading-[1]"
                            />
                            <div className="flex flex-col items-center gap-0">
                              <p className="font-sans text-[18px] md:text-[20px] text-[var(--color-8)] font-medium tracking-[-0.3px] leading-[32px] text-center">
                                {metric.label}
                              </p>
                              {metric.sublabel && (
                                <p className="font-sans text-[16px] text-[var(--color-44)] font-medium tracking-[-0.24px] leading-[26px] text-center">
                                  {metric.sublabel}
                                </p>
                              )}
                            </div>
                          </motion.div>
                        ))}
                        {/* Third metric - hidden on mobile, shown in grid on desktop */}
                        {section.metrics[2] && (
                          <motion.div
                            className="hidden md:flex flex-col items-center gap-[12px] md:gap-[14px] lg:gap-[16px]"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "0px 0px -50px 0px", amount: 0.3 }}
                            variants={{
                              ...fadeInUpVariants,
                              visible: {
                                ...fadeInUpVariants.visible,
                                transition: {
                                  ...fadeInUpVariants.visible.transition,
                                  delay: 0.5,
                                },
                              },
                            }}
                          >
                            <CounterAnimation
                              value={section.metrics[2].value}
                              className="font-serif text-[48px] sm:text-[56px] md:text-[64px] lg:text-[72px] xl:text-[80px] text-[var(--color-8)] tracking-[-0.48px] sm:tracking-[-0.56px] md:tracking-[-0.64px] lg:tracking-[-0.72px] xl:tracking-[-0.8px] leading-[1]"
                            />
                            <div className="flex flex-col items-center gap-0">
                              <p className="font-sans text-[18px] md:text-[20px] text-[var(--color-8)] font-medium tracking-[-0.3px] leading-[32px] text-center">
                                {section.metrics[2].label}
                              </p>
                              {section.metrics[2].sublabel && (
                                <p className="font-sans text-[16px] text-[var(--color-44)] font-medium tracking-[-0.24px] leading-[26px] text-center">
                                  {section.metrics[2].sublabel}
                                </p>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </div>
                      {/* Third metric - full width on mobile only */}
                      {section.metrics[2] && (
                        <motion.div
                          className="flex md:hidden flex-col items-center gap-[12px] md:gap-[14px] lg:gap-[16px]"
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true, margin: "0px 0px -50px 0px", amount: 0.3 }}
                          variants={{
                            ...fadeInUpVariants,
                            visible: {
                              ...fadeInUpVariants.visible,
                              transition: {
                                ...fadeInUpVariants.visible.transition,
                                delay: 0.5,
                              },
                            },
                          }}
                        >
                          <CounterAnimation
                            value={section.metrics[2].value}
                            className="font-serif text-[48px] sm:text-[56px] md:text-[64px] lg:text-[72px] xl:text-[80px] text-[var(--color-8)] tracking-[-0.48px] sm:tracking-[-0.56px] md:tracking-[-0.64px] lg:tracking-[-0.72px] xl:tracking-[-0.8px] leading-[1]"
                          />
                          <div className="flex flex-col items-center gap-[4px]">
                            <p className="font-sans text-[18px] md:text-[20px] text-[var(--color-8)] font-medium tracking-[-0.3px] leading-[32px] text-center">
                              {section.metrics[2].label}
                            </p>
                            {section.metrics[2].sublabel && (
                              <p className="font-sans text-[16px] text-[var(--color-44)] font-medium tracking-[-0.24px] leading-[26px] text-center">
                                {section.metrics[2].sublabel}
                              </p>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {section.type === "insights" && (
                <div className="flex flex-col">
                  {section.text ? (
                    // Two-column layout with text
                    <div className="flex flex-col gap-[60px] md:gap-[60px] lg:gap-[40px] xl:gap-[80px]">
                      {/* First Row: Headlines (left) + Text (right) */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[24px] lg:gap-[40px] 2xl:gap-[80px] items-start">
                        {/* Left: Overline + Title */}
                        <motion.div
                          className="flex flex-col gap-[12px] md:gap-[16px]"
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true, margin: "0px 0px -50px 0px", amount: 0.3 }}
                          variants={fadeInUpVariants}
                        >
                          {section.overline && (
                            <p className="font-sans text-[16px] sm:text-[17px] md:text-[18px] lg:text-[20px] font-semibold text-[var(--color-8)] tracking-[-0.24px] sm:tracking-[-0.255px] md:tracking-[-0.27px] lg:tracking-[-0.30px] leading-[26px] sm:leading-[28px] md:leading-[30px] lg:leading-[32px]">
                              {section.overline}
                            </p>
                          )}
                          {section.title && (
                            <h2 className="font-serif text-[32px] md:text-[36px] lg:text-[40px] xl:text-[44px] 2xl:text-[48px] text-[var(--color-8)] tracking-[-0.14px] sm:tracking-[-0.16px] md:tracking-[-0.18px] lg:tracking-[-0.20px] xl:tracking-[-0.22px] 2xl:tracking-[-0.24px] leading-[35px] sm:leading-[40px] md:leading-[45px] lg:leading-[50px] xl:leading-[55px] 2xl:leading-[60px]">
                              {/* On mobile, ignore \n and let text wrap naturally; on xl+, respect \n */}
                              <span className="xl:hidden">{section.title.replace(/\n/g, ' ')}</span>
                              <span className="hidden xl:block">
                                {section.title.split('\n').map((line, idx, arr) => (
                                  <span key={idx}>
                                    {line}
                                    {idx < arr.length - 1 && <br />}
                                  </span>
                                ))}
                              </span>
                            </h2>
                          )}
                        </motion.div>

                        {/* Right: Text */}
                        <div className="flex flex-col gap-[20px] md:gap-[24px] lg:pt-[48px] max-w-[720px]">
                          {section.text.split('\n\n').map((paragraph, idx) => (
                            <motion.p
                              key={idx}
                              className="font-sans text-[16px] md:text-[18px] lg:text-[20px] text-[var(--color-8)] font-normal tracking-[-0.24px] md:tracking-[-0.27px] lg:tracking-[-0.3px] leading-[26px] md:leading-[30px] lg:leading-[32px]"
                              initial="hidden"
                              whileInView="visible"
                              viewport={{ once: true, margin: "0px 0px -50px 0px", amount: 0.3 }}
                              variants={{
                                ...fadeInUpVariants,
                                visible: {
                                  ...fadeInUpVariants.visible,
                                  transition: {
                                    ...fadeInUpVariants.visible.transition,
                                    delay: 0.2 + idx * 0.1,
                                  },
                                },
                              }}
                            >
                              {paragraph}
                            </motion.p>
                          ))}
                        </div>
                      </div>

                      {/* Quotes Grid */}
                      {section.quotes && (
                        <div className="flex flex-wrap justify-start gap-[16px] md:gap-[20px] w-full">
                          {section.quotes.map((quote, index) => (
                            <motion.div
                              key={index}
                              className="px-[16px] md:px-[32px] py-[12px] md:py-[20px] border border-[var(--color-92)] rounded-[60px]"
                              initial="hidden"
                              whileInView="visible"
                              viewport={{ once: true, margin: "0px 0px -50px 0px", amount: 0.3 }}
                              variants={{
                                ...fadeInUpVariants,
                                visible: {
                                  ...fadeInUpVariants.visible,
                                  transition: {
                                    ...fadeInUpVariants.visible.transition,
                                    delay: 0.2 + index * 0.1,
                                  },
                                },
                              }}
                            >
                              <p className="font-sans text-[14px] md:text-[18px] text-[var(--color-8)] font-normal tracking-[-0.21px] md:tracking-[-0.27px] leading-[22px] md:leading-[30px] text-center">
                                "{quote}"
                              </p>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    // Centered layout without text (original)
                    <div className="flex flex-col items-center">
                      {/* Overline */}
                      {section.overline && (
                        <motion.p
                          className="font-sans text-[16px] md:text-[18px] lg:text-[20px] font-semibold text-[var(--color-8)] tracking-[-0.24px] md:tracking-[-0.27px] lg:tracking-[-0.30px] leading-[26px] md:leading-[30px] lg:leading-[32px] text-center mb-[20px] md:mb-[24px]"
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true, margin: "0px 0px -50px 0px", amount: 0.3 }}
                          variants={fadeInUpVariants}
                        >
                          {section.overline}
                        </motion.p>
                      )}

                      {/* Title */}
                      {section.title && (
                        <motion.h2
                          className="font-serif text-[32px] md:text-[40px] lg:text-[48px] xl:text-[56px] text-[var(--color-8)] tracking-[-0.16px] md:tracking-[-0.20px] lg:tracking-[-0.24px] xl:tracking-[-0.28px] leading-[40px] md:leading-[50px] lg:leading-[60px] xl:leading-[70px] text-center mb-[60px] md:mb-[80px] lg:mb-[100px] max-w-[880px] mx-auto"
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true, margin: "0px 0px -50px 0px", amount: 0.3 }}
                          variants={{
                            ...fadeInUpVariants,
                            visible: {
                              ...fadeInUpVariants.visible,
                              transition: {
                                ...fadeInUpVariants.visible.transition,
                                delay: 0.1,
                              },
                            },
                          }}
                        >
                          {section.title.split(' understands them').map((part, index) => (
                            <span key={index}>
                              {part}
                              {index === 0 && <em className="italic"> understands them</em>}
                            </span>
                          ))}
                        </motion.h2>
                      )}

                      {/* Quotes Grid */}
                      {section.quotes && (
                        <div className="flex flex-wrap justify-center gap-[16px] md:gap-[20px] w-full">
                          {section.quotes.map((quote, index) => (
                            <motion.div
                              key={index}
                              className="px-[16px] md:px-[32px] py-[12px] md:py-[20px] border border-[var(--color-92)] rounded-[60px]"
                              initial="hidden"
                              whileInView="visible"
                              viewport={{ once: true, margin: "0px 0px -50px 0px", amount: 0.3 }}
                              variants={{
                                ...fadeInUpVariants,
                                visible: {
                                  ...fadeInUpVariants.visible,
                                  transition: {
                                    ...fadeInUpVariants.visible.transition,
                                    delay: 0.2 + index * 0.1,
                                  },
                                },
                              }}
                            >
                              <p className="font-sans text-[14px] md:text-[18px] text-[var(--color-8)] font-normal tracking-[-0.21px] md:tracking-[-0.27px] leading-[22px] md:leading-[30px] text-center">
                                "{quote}"
                              </p>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {section.type === "process" && (
                <div className="flex flex-col gap-[60px] lg:gap-[80px]">
                  {/* First Row: Headlines (left) + Text (right) */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-[24px] md:gap-[24px] lg:gap-[24px] items-start">
                    {/* Left: Overline + Title */}
                    <motion.div
                      className="flex flex-col gap-[20px] md:gap-[16px]"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "0px 0px -50px 0px", amount: 0.3 }}
                      variants={fadeInUpVariants}
                    >
                      {section.overline && (
                        <p className="font-sans text-[16px] sm:text-[17px] md:text-[18px] lg:text-[20px] font-semibold text-[var(--color-8)] tracking-[-0.24px] sm:tracking-[-0.255px] md:tracking-[-0.27px] lg:tracking-[-0.30px] leading-[26px] sm:leading-[28px] md:leading-[30px] lg:leading-[32px]">
                          {section.overline}
                        </p>
                      )}
                      {section.title && (
                        <h2 className="font-serif text-[32px] md:text-[36px] lg:text-[40px] xl:text-[44px] 2xl:text-[48px] text-[var(--color-8)] tracking-[-0.14px] sm:tracking-[-0.16px] md:tracking-[-0.18px] lg:tracking-[-0.20px] xl:tracking-[-0.22px] 2xl:tracking-[-0.24px] leading-[35px] sm:leading-[40px] md:leading-[45px] lg:leading-[50px] xl:leading-[55px] 2xl:leading-[60px]">
                          {/* On mobile, ignore \n and let text wrap naturally; on xl+, respect \n */}
                          <span className="xl:hidden">{section.title.replace(/\n/g, ' ')}</span>
                          <span className="hidden xl:block">
                            {section.title.split('\n').map((line, idx, arr) => (
                              <span key={idx} className="w-full block">
                                {line}
                                {idx < arr.length - 1 && <br />}
                              </span>
                            ))}
                          </span>
                        </h2>
                      )}
                    </motion.div>

                    {/* Right: Text */}
                    <div className="flex flex-col gap-[20px] md:gap-[24px] lg:pt-[48px] max-w-[720px]">
                      {section.text && section.text.split('\n\n').map((paragraph, idx) => (
                        <motion.p
                          key={idx}
                          className="font-sans text-[16px] md:text-[18px] lg:text-[20px] text-[var(--color-8)] font-normal tracking-[-0.24px] md:tracking-[-0.27px] lg:tracking-[-0.3px] leading-[26px] md:leading-[30px] lg:leading-[32px]"
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true, margin: "0px 0px -50px 0px", amount: 0.3 }}
                          variants={{
                            ...fadeInUpVariants,
                            visible: {
                              ...fadeInUpVariants.visible,
                              transition: {
                                ...fadeInUpVariants.visible.transition,
                                delay: 0.2 + idx * 0.1,
                              },
                            },
                          }}
                        >
                          {paragraph}
                        </motion.p>
                      ))}
                    </div>
                  </div>

                  {/* Second Row: Process Images with Arrows */}
                  {section.processImages && section.processImages.length > 0 && (
                    <div className="flex flex-col lg:flex-row items-center justify-center gap-[20px]">
                      <style dangerouslySetInnerHTML={{
                        __html: `
                          .process-image {
                            border-radius: ${slugString === 'vario' ? 'clamp(22px, 4vw, 48px)' : slugString === 'vw' ? '8px' : 'clamp(8px, 1.5vw, 16px)'};
                        ${getVWBorderRadiusCSS('summary-row-image')}
                          }
                        `
                      }} />
                      {section.processImages.map((img, imgIndex) => (
                        <div key={imgIndex} className="contents">
                          <motion.div
                            className={`process-image relative overflow-hidden ${config.noBorder ? '' : 'border-responsive'} w-full lg:flex-1`}
                            style={{
                              backgroundColor: 'transparent',
                              borderColor: 'var(--color-0-80)',
                              backdropFilter: 'blur(10px)',
                              WebkitBackdropFilter: 'blur(10px)',
                              boxSizing: 'border-box'
                            }}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "0px 0px -50px 0px", amount: 0.3 }}
                            variants={{
                              ...fadeInUpVariants,
                              visible: {
                                ...fadeInUpVariants.visible,
                                transition: {
                                  ...fadeInUpVariants.visible.transition,
                                  delay: 0.4 + imgIndex * 0.2,
                                },
                              },
                            }}
                          >
                            <Image
                              src={img.src}
                              alt={`Process step ${imgIndex + 1}`}
                              width={800}
                              height={600}
                              className="w-full h-auto object-cover"
                              quality={100}
                              unoptimized={true}
                            />
                          </motion.div>

                          {/* Arrow Icon between images (not after last image) */}
                          {imgIndex < (section.processImages?.length || 0) - 1 && (
                            <motion.div
                              className="flex-shrink-0"
                              initial="hidden"
                              whileInView="visible"
                              viewport={{ once: true, margin: "0px 0px -50px 0px", amount: 0.3 }}
                              variants={{
                                ...fadeInUpVariants,
                                visible: {
                                  ...fadeInUpVariants.visible,
                                  transition: {
                                    ...fadeInUpVariants.visible.transition,
                                    delay: 0.5 + imgIndex * 0.2,
                                  },
                                },
                              }}
                            >
                              <Image
                                src={theme === "dark" ? "/images/icons/icon_next_dark.svg" : "/images/icons/icon_next.svg"}
                                alt="Next"
                                width={40}
                                height={40}
                                className="w-[40px] h-[40px] rotate-90 lg:rotate-0"
                              />
                            </motion.div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {section.type === "design-branding" && (
                <div className="flex flex-col gap-[60px] md:gap-[60px] lg:gap-[40px] xl:gap-[80px]">
                  {/* First Row: Headlines (left) + Text (right) */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-[24px] md:gap-[24px] lg:gap-[40px] 2xl:gap-[80px] items-start">
                    {/* Left: Overline + Title */}
                    <motion.div
                      className="flex flex-col gap-[20px] md:gap-[16px]"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "0px 0px -50px 0px", amount: 0.3 }}
                      variants={fadeInUpVariants}
                    >
                      {section.overline && (
                        <p className="font-sans text-[16px] sm:text-[17px] md:text-[18px] lg:text-[20px] font-semibold text-[var(--color-8)] tracking-[-0.24px] sm:tracking-[-0.255px] md:tracking-[-0.27px] lg:tracking-[-0.30px] leading-[26px] sm:leading-[28px] md:leading-[30px] lg:leading-[32px]">
                          {section.overline}
                        </p>
                      )}
                      {section.title && (
                        <h2 className="font-serif text-[32px] md:text-[36px] lg:text-[40px] xl:text-[44px] 2xl:text-[48px] text-[var(--color-8)] tracking-[-0.14px] sm:tracking-[-0.16px] md:tracking-[-0.18px] lg:tracking-[-0.20px] xl:tracking-[-0.22px] 2xl:tracking-[-0.24px] leading-[35px] sm:leading-[40px] md:leading-[45px] lg:leading-[50px] xl:leading-[55px] 2xl:leading-[60px]">
                          {/* On mobile, ignore \n and let text wrap naturally; on xl+, respect \n */}
                          <span className="xl:hidden">{section.title.replace(/\n/g, ' ')}</span>
                          <span className="hidden xl:block">
                            {section.title.split('\n').map((line, idx, arr) => (
                              <span key={idx} className="xl:w-full xl:block">
                                {line}
                                {idx < arr.length - 1 && <br />}
                              </span>
                            ))}
                          </span>
                        </h2>
                      )}
                    </motion.div>

                    {/* Right: Text */}
                    <div className="flex flex-col gap-[20px] md:gap-[24px] lg:pt-[48px] max-w-[720px]">
                      {section.text && section.text.split('\n\n').map((paragraph, idx) => (
                        <motion.p
                          key={idx}
                          className="font-sans text-[16px] md:text-[18px] lg:text-[20px] text-[var(--color-8)] font-normal tracking-[-0.24px] md:tracking-[-0.27px] lg:tracking-[-0.3px] leading-[26px] md:leading-[30px] lg:leading-[32px]"
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true, margin: "0px 0px -50px 0px", amount: 0.3 }}
                          variants={{
                            ...fadeInUpVariants,
                            visible: {
                              ...fadeInUpVariants.visible,
                              transition: {
                                ...fadeInUpVariants.visible.transition,
                                delay: 0.2 + idx * 0.1,
                              },
                            },
                          }}
                        >
                          {paragraph}
                        </motion.p>
                      ))}
                    </div>
                  </div>

                  {/* Second Row: Two Column Images */}
                  {section.designBrandingImages && section.designBrandingImages.length === 2 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] md:gap-[40px] lg:gap-[40px] 2xl:gap-[80px]">
                      <style dangerouslySetInnerHTML={{
                        __html: `
                          .design-branding-image {
                            border-radius: 8px;
                          }
                          @media (min-width: 768px) {
                            .design-branding-image {
                              border-radius: 10px;
                            }
                          }
                          @media (min-width: 1024px) {
                            .design-branding-image {
                              border-radius: 12px;
                            }
                          }
                          .animated-scroll-container {
                            overflow: hidden;
                            position: relative;
                            width: 100%;
                            aspect-ratio: 16 / 9;
                          }
                          .animated-scroll-content {
                            display: flex;
                            flex-direction: column;
                          }
                        `
                      }} />
                      {section.designBrandingImages.map((img, imgIndex) => (
                        <motion.div
                          key={imgIndex}
                          className={`design-branding-image relative overflow-hidden ${img.noBorder ? '' : 'border-responsive'} w-full`}
                          style={{
                            backgroundColor: 'transparent',
                            borderColor: 'var(--color-0-80)',
                            backdropFilter: 'blur(10px)',
                            WebkitBackdropFilter: 'blur(10px)',
                            boxSizing: 'border-box'
                          }}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true, margin: "0px 0px -50px 0px", amount: 0.3 }}
                          variants={{
                            ...fadeInUpVariants,
                            visible: {
                              ...fadeInUpVariants.visible,
                              transition: {
                                ...fadeInUpVariants.visible.transition,
                                delay: 0.4 + imgIndex * 0.2,
                              },
                            },
                          }}
                        >
                          {img.isAnimated ? (
                            <AnimatedScrollImage
                              src={img.src}
                              alt={`Design branding image ${imgIndex + 1}`}
                            />
                          ) : (
                            <div style={{ aspectRatio: '16 / 9', width: '100%', overflow: 'hidden' }}>
                              <Image
                                src={img.src}
                                alt={`Design branding image ${imgIndex + 1}`}
                                width={800}
                                height={450}
                                className="w-full h-full object-cover"
                                quality={100}
                                unoptimized={true}
                              />
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/* Third Row: Gallery Images */}
                  {section.designBrandingGallery && section.designBrandingGallery.length > 0 && (
                    <div className="flex flex-col md:flex-row flex-nowrap gap-[40px]">
                      <style dangerouslySetInnerHTML={{
                        __html: `
                          .gallery-image {
                            border-radius: clamp(4px, 0.5vw, 8px);
                          }
                          .gallery-pair {
                            display: flex;
                            gap: 0;
                            flex: 2 1 0;
                            min-width: 0;
                          }
                          .gallery-pair .gallery-image:first-child {
                            border-radius: clamp(4px, 0.5vw, 8px) 0 0 clamp(4px, 0.5vw, 8px);
                          }
                          .gallery-pair .gallery-image:last-child {
                            border-radius: 0 clamp(4px, 0.5vw, 8px) clamp(4px, 0.5vw, 8px) 0;
                          }
                        `
                      }} />
                      {(() => {
                        const pairs: Array<Array<typeof section.designBrandingGallery[0]>> = [];
                        const singles: Array<typeof section.designBrandingGallery[0]> = [];

                        section.designBrandingGallery?.forEach((img) => {
                          if (img.paired) {
                            const pairIndex = img.pairIndex || 0;
                            if (!pairs[pairIndex]) pairs[pairIndex] = [];
                            pairs[pairIndex].push(img);
                          } else if (img.single) {
                            singles.push(img);
                          }
                        });

                        // Sort pairs by pairIndex to ensure correct order
                        const sortedPairs = pairs.sort((a, b) => {
                          const aIndex = section.designBrandingGallery?.findIndex(img => img.paired && img.pairIndex === pairs.indexOf(a)) ?? -1;
                          const bIndex = section.designBrandingGallery?.findIndex(img => img.paired && img.pairIndex === pairs.indexOf(b)) ?? -1;
                          const aPairIndex = section.designBrandingGallery?.find(img => img.paired && pairs.indexOf(a) === (img.pairIndex || 0))?.pairIndex || 0;
                          const bPairIndex = section.designBrandingGallery?.find(img => img.paired && pairs.indexOf(b) === (img.pairIndex || 0))?.pairIndex || 0;
                          return aPairIndex - bPairIndex;
                        });

                        return (
                          <>
                            {/* First pair (pairIndex 0) - left */}
                            {pairs[0] && (
                              <div key={`pair-0`} className="gallery-pair" style={{ flex: '2 1 0', minWidth: 0 }}>
                                {pairs[0].map((img, imgIdx) => (
                                  <motion.div
                                    key={imgIdx}
                                    className="gallery-image relative overflow-hidden"
                                    style={{
                                      flex: pairs[0].length === 2 ? '1 1 0' : '2 1 0',
                                      aspectRatio: '1 / 1',
                                      minWidth: 0
                                    }}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, margin: "0px 0px -50px 0px", amount: 0.3 }}
                                    variants={{
                                      ...fadeInUpVariants,
                                      visible: {
                                        ...fadeInUpVariants.visible,
                                        transition: {
                                          ...fadeInUpVariants.visible.transition,
                                          delay: 0.6 + 0 * 0.2 + imgIdx * 0.1,
                                        },
                                      },
                                    }}
                                  >
                                    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                                      <Image
                                        src={img.src}
                                        alt={`Gallery image 0-${imgIdx}`}
                                        fill
                                        className="object-cover"
                                        quality={100}
                                        unoptimized={true}
                                      />
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            )}
                            {/* Singles - middle */}
                            {singles.length > 0 && (
                              <div className="grid grid-cols-3 gap-[10px] md:contents">
                                {singles.map((img, imgIdx) => (
                                  <motion.div
                                    key={`single-${imgIdx}`}
                                    className="gallery-image relative overflow-hidden"
                                    style={{ flex: '1 1 0', aspectRatio: '1 / 1', minWidth: 0 }}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, margin: "0px 0px -50px 0px", amount: 0.3 }}
                                    variants={{
                                      ...fadeInUpVariants,
                                      visible: {
                                        ...fadeInUpVariants.visible,
                                        transition: {
                                          ...fadeInUpVariants.visible.transition,
                                          delay: 0.6 + (pairs[0] ? 0.2 : 0) + imgIdx * 0.1,
                                        },
                                      },
                                    }}
                                  >
                                    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                                      <Image
                                        src={img.src}
                                        alt={`Gallery single image ${imgIdx}`}
                                        fill
                                        className="object-cover"
                                        quality={100}
                                        unoptimized={true}
                                      />
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            )}
                            {/* Second pair (pairIndex 1) - right */}
                            {pairs[1] && (
                              <div key={`pair-1`} className="gallery-pair" style={{ flex: '2 1 0', minWidth: 0 }}>
                                {pairs[1].map((img, imgIdx) => (
                                  <motion.div
                                    key={imgIdx}
                                    className="gallery-image relative overflow-hidden"
                                    style={{
                                      flex: pairs[1].length === 2 ? '1 1 0' : '2 1 0',
                                      aspectRatio: '1 / 1',
                                      minWidth: 0
                                    }}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, margin: "0px 0px -50px 0px", amount: 0.3 }}
                                    variants={{
                                      ...fadeInUpVariants,
                                      visible: {
                                        ...fadeInUpVariants.visible,
                                        transition: {
                                          ...fadeInUpVariants.visible.transition,
                                          delay: 0.6 + (pairs[0] ? 0.2 : 0) + singles.length * 0.1 + 1 * 0.2 + imgIdx * 0.1,
                                        },
                                      },
                                    }}
                                  >
                                    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                                      <Image
                                        src={img.src}
                                        alt={`Gallery image 1-${imgIdx}`}
                                        fill
                                        className="object-cover"
                                        quality={100}
                                        unoptimized={true}
                                      />
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            )}
                          </>
                        );
                      })()}
                    </div>
                  )}
                </div>
              )}

              {section.type === "outcome" && (
                <div className="flex flex-col gap-[60px] md:gap-[60px] lg:gap-[40px] xl:gap-[80px]">
                  {/* Same structure as Context & Challenge for Vario */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-[60px] md:gap-[60px] lg:gap-[40px] xl:gap-[80px] items-center">
                    {/* Left: Overline + Title + Text */}
                    <motion.div
                      className={`flex flex-col ${section.title ? 'gap-[24px] md:gap-[24px] lg:gap-[40px]' : 'gap-[16px]'} max-w-[720px]`}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "0px 0px -50px 0px", amount: 0.3 }}
                      variants={fadeInUpVariants}
                    >
                      {/* Overline + Title Container */}
                      <div className="flex flex-col gap-[16px]">
                        {section.overline && (
                          <p className="font-sans text-[16px] sm:text-[17px] md:text-[18px] lg:text-[20px] font-semibold text-[var(--color-8)] tracking-[-0.24px] sm:tracking-[-0.255px] md:tracking-[-0.27px] lg:tracking-[-0.30px] leading-[26px] sm:leading-[28px] md:leading-[30px] lg:leading-[32px]">
                            {section.overline}
                          </p>
                        )}
                        {section.title && (
                          <h2 className="font-serif text-[32px] md:text-[36px] lg:text-[40px] xl:text-[44px] 2xl:text-[48px] text-[var(--color-8)] tracking-[-0.14px] sm:tracking-[-0.16px] md:tracking-[-0.18px] lg:tracking-[-0.20px] xl:tracking-[-0.22px] 2xl:tracking-[-0.24px] leading-[35px] sm:leading-[40px] md:leading-[45px] lg:leading-[50px] xl:leading-[55px] 2xl:leading-[60px]">
                            {/* On mobile, ignore \n and let text wrap naturally; on xl+, respect \n */}
                            <span className="xl:hidden">{section.title.replace(/\n/g, ' ')}</span>
                            <span className="hidden xl:block">
                              {section.title.split('\n').map((line, idx, arr) => (
                                <span key={idx} className="w-full block">
                                  {line}
                                  {idx < arr.length - 1 && <br />}
                                </span>
                              ))}
                            </span>
                          </h2>
                        )}
                      </div>
                      {/* Text Container */}
                      {section.text && (
                        <div className="flex flex-col gap-[20px] md:gap-[24px] max-w-[720px]">
                          {section.text.split('\n\n').map((paragraph, idx) => (
                            <motion.p
                              key={idx}
                              className="font-sans text-[16px] md:text-[18px] lg:text-[20px] text-[var(--color-8)] font-normal tracking-[-0.24px] md:tracking-[-0.27px] lg:tracking-[-0.3px] leading-[26px] md:leading-[30px] lg:leading-[32px] text-left"
                              initial="hidden"
                              whileInView="visible"
                              viewport={{ once: true, margin: "0px 0px -50px 0px", amount: 0.3 }}
                              variants={{
                                ...fadeInUpVariants,
                                visible: {
                                  ...fadeInUpVariants.visible,
                                  transition: {
                                    ...fadeInUpVariants.visible.transition,
                                    delay: 0.2 + idx * 0.1,
                                  },
                                },
                              }}
                            >
                              {paragraph}
                            </motion.p>
                          ))}
                        </div>
                      )}
                    </motion.div>

                    {/* Right: App Screen */}
                    {section.outcomeOverlayImage && (
                      <motion.div
                        className="relative"
                        style={{
                          width: 'fit-content',
                          maxWidth: 'none'
                        }}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "0px 0px -50px 0px", amount: 0.3 }}
                        variants={{
                          ...fadeInUpVariants,
                          visible: {
                            ...fadeInUpVariants.visible,
                            transition: {
                              ...fadeInUpVariants.visible.transition,
                              delay: 0.4,
                            },
                          },
                        }}
                      >
                        <Image
                          src={section.outcomeOverlayImage}
                          alt="Outcome app screen"
                          width={400}
                          height={400}
                          className="w-auto h-auto object-contain max-h-[480px] md:max-h-[783px]"
                          style={{
                            borderRadius: 0,
                            width: 'auto',
                            height: 'auto',
                            maxWidth: 'none'
                          }}
                          quality={100}
                          unoptimized={true}
                        />
                      </motion.div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </section>
        );
      })}

      {/* Project Footer Section */}
      <section className="relative bg-[var(--color-96)] py-[32px] md:py-[40px]">
        <div className="max-w-[960px] mx-auto px-[16px] sm:px-[40px] lg:px-[60px] 2xl:px-[100px]">
          <div className="flex flex-col items-center gap-[24px] md:gap-[28px] lg:gap-[32px]">
            <motion.p
              className="font-sans text-[16px] md:text-[18px] lg:text-[22px] text-[var(--color-8)] font-semibold tracking-[-0.24px] md:tracking-[-0.27px] lg:tracking-[-0.3px] leading-[26px] md:leading-[30px] lg:leading-[32px] text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "0px 0px -50px 0px", amount: 0.3 }}
              variants={fadeInUpVariants}
            >
              You've reached the end. Thanks for watching!
            </motion.p>
            {slugString !== 'vw' && (
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "0px 0px -50px 0px", amount: 0.3 }}
                variants={{
                  ...fadeInUpVariants,
                  visible: {
                    ...fadeInUpVariants.visible,
                    transition: {
                      ...fadeInUpVariants.visible.transition,
                      delay: 0.1,
                    },
                  },
                }}
              >
                <PrimaryButton
                  href="/work/vw"
                >
                  Go to Next Project
                </PrimaryButton>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      <div className="relative w-full" style={{ background: 'var(--color-96)' }}>
        <FooterBackground />
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background: `linear-gradient(to bottom, var(--color-96), var(--color-96-50))`,
          }}
        />
        <div className="max-w-[1920px] mx-auto relative z-[2]">
          <Footer version="Portfolio" />
        </div>
      </div>
    </>
  );
}

export default function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  return <WorkPageClient slug={slug} />;
}
