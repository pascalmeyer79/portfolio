"use client";

import { Footer } from "../components/Footer";
import { motion } from "framer-motion";

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 0.61, 0.36, 1],
    },
  },
};

export default function ImprintPage() {
  return (
    <div className="relative min-h-screen">
      <main className="relative z-[2]">
        {/* Hero Section */}
        <section className="relative bg-transparent pt-[80px] md:pt-[120px] lg:pt-[160px] pb-[60px] sm:pb-[80px]">
          <div className="max-w-[1920px] mx-auto px-0">
            <div className="w-full px-[16px] sm:px-[40px] lg:px-[60px] 2xl:px-[100px]">
              <motion.h1
                className="font-serif text-[40px] sm:text-[48px] md:text-[56px] lg:text-[64px] xl:text-[72px] text-[var(--color-8)] tracking-[-0.2px] sm:tracking-[-0.24px] md:tracking-[-0.56px] lg:tracking-[-0.64px] xl:tracking-[-0.72px] leading-[50px] sm:leading-[60px] md:leading-[70px] lg:leading-[80px] xl:leading-[88px]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
              >
                Imprint
              </motion.h1>
            </div>
          </div>
        </section>

          {/* Content Section */}
          <section className="relative pb-[60px] md:pb-[80px] lg:pb-[100px]">
            <div className="max-w-[1920px] mx-auto px-[16px] sm:px-[40px] lg:px-[60px] 2xl:px-[100px]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-[60px] md:gap-[80px] mb-[60px] md:mb-[80px]">
                {/* Germany */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeInUpVariants}
                >
                  <h2 className="font-sans text-[20px] md:text-[22px] font-semibold text-[var(--color-8)] mb-[24px] tracking-[-0.3px] md:tracking-[-0.33px] leading-[32px] md:leading-[35px]">
                    🇩🇪 Germany
                  </h2>
                  <div className="space-y-[16px]">
                    <p className="font-sans text-[16px] md:text-[18px] text-[var(--color-8)] font-normal tracking-[-0.24px] md:tracking-[-0.27px] leading-[26px] md:leading-[30px]">
                      Pascal Meyer GmbH<br />
                      Mohnblumenweg 26<br />
                      28832 Achim<br />
                      Germany
                    </p>
                    <p className="font-sans text-[16px] md:text-[18px] text-[var(--color-8)] font-normal tracking-[-0.24px] md:tracking-[-0.27px] leading-[26px] md:leading-[30px]">
                      Phone: +49 179 747 133 78<br />
                      Email: hi@pascalmey.com
                    </p>
                    <p className="font-sans text-[16px] md:text-[18px] text-[var(--color-8)] font-normal tracking-[-0.24px] md:tracking-[-0.27px] leading-[26px] md:leading-[30px]">
                      Managing Director: Pascal Meyer<br />
                      Register Court: Amtsgericht Walsrode<br />
                      Registration Number: HRB 213189<br />
                      VAT ID: DE359124851
                    </p>
                  </div>
                </motion.div>

                {/* Switzerland */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
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
                  <h2 className="font-sans text-[20px] md:text-[22px] font-semibold text-[var(--color-8)] mb-[24px] tracking-[-0.3px] md:tracking-[-0.33px] leading-[32px] md:leading-[35px]">
                    🇨🇭 Switzerland
                  </h2>
                  <div className="space-y-[16px]">
                    <p className="font-sans text-[16px] md:text-[18px] text-[var(--color-8)] font-normal tracking-[-0.24px] md:tracking-[-0.27px] leading-[26px] md:leading-[30px]">
                      Pascal Meyer GmbH<br />
                      Zweigniederlassung Richterswil<br />
                      Gerbestrasse 17<br />
                      8805 Richterswil<br />
                      Switzerland
                    </p>
                    <p className="font-sans text-[16px] md:text-[18px] text-[var(--color-8)] font-normal tracking-[-0.24px] md:tracking-[-0.27px] leading-[26px] md:leading-[30px]">
                      Phone: +41 78 252 7919<br />
                      Email: hi@pascalmey.com
                    </p>
                    <p className="font-sans text-[16px] md:text-[18px] text-[var(--color-8)] font-normal tracking-[-0.24px] md:tracking-[-0.27px] leading-[26px] md:leading-[30px]">
                      UID: CHE-231.531.352
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Disclaimer */}
              <motion.div
                className="max-w-[880px]"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
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
                <h2 className="font-sans text-[20px] md:text-[22px] font-semibold text-[var(--color-8)] mb-[24px] tracking-[-0.3px] md:tracking-[-0.33px] leading-[32px] md:leading-[35px]">
                  Disclaimer
                </h2>
                <p className="font-sans text-[16px] md:text-[18px] text-[var(--color-8)] font-normal tracking-[-0.24px] md:tracking-[-0.27px] leading-[26px] md:leading-[30px]">
                  The content of this website has been compiled with meticulous care and to the best of our knowledge. However, we cannot assume any liability for the up-to-dateness, completeness or accuracy of any of the pages.
                </p>
              </motion.div>
            </div>
          </section>
      </main>

      <Footer version="Default" />
    </div>
  );
}
