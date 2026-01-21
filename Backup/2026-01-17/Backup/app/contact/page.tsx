"use client";

import { Footer } from "../components/Footer";
import { FooterBackground } from "../components/FooterBackground";

export default function ContactPage() {
  return (
    <main className="relative min-h-screen">
      <div className="h-screen flex flex-col justify-center px-[60px]">
        {/* Spacer with 0 height */}
        <div style={{ height: 0 }} />
        
        {/* Main content centered */}
        <div className="flex-1 flex flex-col justify-center">
          {/* Main headline */}
          <h1 className="font-serif text-serif-72 text-[var(--color-8)] mb-[40px] mr-[40px]">
            Let&apos;s bring great ideas into reality
          </h1>
          
          {/* Testimonial */}
          <p className="font-sans text-sans-22 text-[var(--color-8)] max-w-[880px] mb-[80px]">
            Versatility is at my core. Over the last decade, I have helped teams build products that define their category.
          </p>
        </div>
        
        {/* Contact section at bottom */}
        <div className="border-b border-[var(--color-92)] pb-[40px]">
          <div className="grid grid-cols-6 gap-[40px]">
            {/* Status */}
            <div className="flex flex-col gap-[2px]">
              <h2 className="font-sans text-sans-16-semibold text-[var(--color-8)] mb-[8px]">Status</h2>
              <div className="flex items-center gap-[8px]">
                <div className="w-[8px] h-[8px] rounded-full bg-[var(--color-satoshi)]" />
                <span className="font-sans text-sans-16-medium text-[var(--color-8)]">Available</span>
              </div>
            </div>
            
            {/* Local Time */}
            <div className="flex flex-col gap-[2px]">
              <h2 className="font-sans text-sans-16-semibold text-[var(--color-8)] mb-[8px]">Local Time</h2>
              <span className="font-sans text-sans-16-medium text-[var(--color-8)]">14:23</span>
            </div>
            
            {/* Empty column */}
            <div />
            
            {/* Contact */}
            <div className="flex flex-col gap-[2px]">
              <h2 className="font-sans text-sans-16-semibold text-[var(--color-8)] mb-[8px]">Contact</h2>
              <a href="mailto:hi@pascalmey.com" className="font-sans text-sans-16-medium text-[var(--color-8)] hover:text-[var(--color-56)] transition-colors">
                hi@pascalmey.com
              </a>
            </div>
            
            {/* Calendar */}
            <div className="flex flex-col gap-[2px]">
              <h2 className="font-sans text-sans-16-semibold text-[var(--color-8)] mb-[8px]">Calendar</h2>
              <a href="#" className="font-sans text-sans-16-medium text-[var(--color-8)] hover:text-[var(--color-56)] transition-colors">
                Schedule a Meeting
              </a>
            </div>
            
            {/* Social */}
            <div className="flex flex-col gap-[2px]">
              <h2 className="font-sans text-sans-16-semibold text-[var(--color-8)] mb-[8px]">Social</h2>
              <a href="#" className="font-sans text-sans-16-medium text-[var(--color-8)] hover:text-[var(--color-56)] transition-colors">
                Linked In
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="relative w-full bg-[var(--color-100)]">
        <FooterBackground />
        <div 
          className="absolute inset-0 z-[1]"
          style={{
            background: `linear-gradient(to bottom, var(--color-100), var(--color-100-80))`,
          }}
        />
        <div className="max-w-[1920px] mx-auto relative z-[2]">
          <Footer />
        </div>
      </div>
    </main>
  );
}
