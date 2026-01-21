import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./theme-provider";
import { Navbar } from "./components/Navbar";
import { HeroBackground } from "./components/HeroBackground";
import { instrumentSans, instrumentSerif } from "./fonts";
import { PreventImageActions } from "./components/PreventImageActions";

export const metadata: Metadata = {
  title: {
    template: "%s | Pascal Meyer",
    default: "Pascal Meyer | Product & UX Designer",
  },
  description: "Freelance Product, UX & UI Designer in Switzerland and Germany. Helping companies launch successful digital products with high-end design and strategy.",
  keywords: ["Product Design", "UX Design", "UI Design", "Freelance Designer", "Switzerland", "Germany", "Product Designer Portfolio"],
  metadataBase: new URL("https://www.pascalmey.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Pascal Meyer | Product & UX Designer",
    description: "Freelance Product, UX & UI Designer in Switzerland and Germany. Expert in Product Design, UX Design, and UI Design.",
    url: "https://www.pascalmey.com",
    siteName: "Pascal Meyer",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pascal Meyer | Product & UX Designer",
    description: "Freelance Product, UX & UI Designer in Switzerland and Germany.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="de"
      className={`${instrumentSans.variable} ${instrumentSerif.variable}`}
      suppressHydrationWarning
    >
      <body className="text-[var(--color-8)] font-sans antialiased min-h-screen relative">
        <ThemeProvider>
          <HeroBackground />
          <Navbar />
          <PreventImageActions>
            {children}
          </PreventImageActions>
        </ThemeProvider>
      </body>
    </html>
  );
}
