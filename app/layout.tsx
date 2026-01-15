import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./theme-provider";
import { Navbar } from "./components/Navbar";
import { HeroBackground } from "./components/HeroBackground";
import { instrumentSans, instrumentSerif } from "./fonts";

export const metadata: Metadata = {
  title: "Pascal Meyer",
  description: "Product Design Portfolio – Pascal Meyer",
  metadataBase: new URL("https://www.pascalmey.com"),
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
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

