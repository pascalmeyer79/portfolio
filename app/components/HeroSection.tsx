"use client";

import { motion } from "framer-motion";
import { PrimaryButton } from "./PrimaryButton";
import { AnimatedHeadline } from "./AnimatedHeadline";
import { useState, useEffect } from "react";

const headline = "AI-native product & UX\u00A0designer";

// Greeting based on country
const getGreeting = (countryCode: string): string => {
  switch (countryCode) {
    // Switzerland
    case 'CH':
      return 'Grüezi';
    
    // France, Monaco, parts of Belgium
    case 'FR':
    case 'MC':
      return 'Bonjour';
    
    // Spain, parts of Belgium
    case 'ES':
      return 'Hola';
    
    // Italy, San Marino, Vatican
    case 'IT':
    case 'SM':
    case 'VA':
      return 'Ciao';
    
    // Portugal
    case 'PT':
      return 'Olá';
    
    // Netherlands, Belgium (Flemish)
    case 'NL':
    case 'BE':
      return 'Hoi';
    
    // Poland
    case 'PL':
      return 'Cześć';
    
    // Czech Republic
    case 'CZ':
      return 'Ahoj';
    
    // Slovakia
    case 'SK':
      return 'Ahoj';
    
    // Hungary
    case 'HU':
      return 'Szia';
    
    // Romania
    case 'RO':
      return 'Salut';
    
    // Bulgaria
    case 'BG':
      return 'Zdravei';
    
    // Greece, Cyprus
    case 'GR':
    case 'CY':
      return 'Yassou';
    
    // Sweden
    case 'SE':
      return 'Hej';
    
    // Norway
    case 'NO':
      return 'Hei';
    
    // Denmark
    case 'DK':
      return 'Hej';
    
    // Finland
    case 'FI':
      return 'Hei';
    
    // Iceland
    case 'IS':
      return 'Hæ';
    
    // Russia
    case 'RU':
      return 'Privet';
    
    // Turkey
    case 'TR':
      return 'Merhaba';
    
    // Croatia
    case 'HR':
      return 'Bok';
    
    // Serbia
    case 'RS':
      return 'Zdravo';
    
    // Slovenia
    case 'SI':
      return 'Živjo';
    
    // Lithuania
    case 'LT':
      return 'Labas';
    
    // Latvia
    case 'LV':
      return 'Sveiki';
    
    // Estonia
    case 'EE':
      return 'Tere';
    
    // Ukraine
    case 'UA':
      return 'Pryvit';
    
    // Albania
    case 'AL':
      return 'Tungjatjeta';
    
    // East Asia
    case 'JP':
      return 'Konnichiwa';
    case 'CN':
      return 'Nǐ hǎo';
    case 'KR':
      return 'Annyeong';
    case 'TW':
      return 'Nǐ hǎo';
    case 'HK':
      return 'Nei hou';
    
    // South Asia
    case 'IN':
      return 'Namaste';
    case 'PK':
      return 'Adaab';
    case 'BD':
      return 'Nomoshkar';
    case 'NP':
      return 'Namaste';
    case 'LK':
      return 'Ayubowan';
    
    // Southeast Asia
    case 'TH':
      return 'Sawasdee';
    case 'VN':
      return 'Xin chào';
    case 'ID':
      return 'Halo';
    case 'MY':
      return 'Helo';
    case 'SG':
      return 'Hello';
    case 'PH':
      return 'Kumusta';
    case 'MM':
      return 'Mingalarbar';
    case 'KH':
      return "Sua s'dei";
    case 'LA':
      return 'Sabaidee';
    
    // Middle East
    case 'SA': // Saudi Arabia
    case 'AE': // UAE
    case 'KW': // Kuwait
    case 'QA': // Qatar
    case 'BH': // Bahrain
    case 'OM': // Oman
    case 'JO': // Jordan
    case 'LB': // Lebanon
    case 'SY': // Syria
    case 'IQ': // Iraq
    case 'YE': // Yemen
      return 'Marhaba';
    case 'IL':
      return 'Shalom';
    case 'IR':
      return 'Salam';
    
    // Latin America (Spanish-speaking)
    case 'MX': // Mexico
    case 'AR': // Argentina
    case 'CO': // Colombia
    case 'CL': // Chile
    case 'PE': // Peru
    case 'VE': // Venezuela
    case 'EC': // Ecuador
    case 'GT': // Guatemala
    case 'CU': // Cuba
    case 'BO': // Bolivia
    case 'DO': // Dominican Republic
    case 'HN': // Honduras
    case 'PY': // Paraguay
    case 'SV': // El Salvador
    case 'NI': // Nicaragua
    case 'CR': // Costa Rica
    case 'PA': // Panama
    case 'UY': // Uruguay
      return 'Hola';
    
    // Brazil
    case 'BR':
      return 'Olá';
    
    // Africa
    case 'ZA': // South Africa
      return 'Howzit';
    case 'NG': // Nigeria
      return 'Hello';
    case 'KE': // Kenya
    case 'TZ': // Tanzania
      return 'Jambo';
    case 'EG': // Egypt
    case 'MA': // Morocco
    case 'DZ': // Algeria
    case 'TN': // Tunisia
    case 'LY': // Libya
      return 'Marhaba';
    case 'ET': // Ethiopia
      return 'Selam';
    case 'GH': // Ghana
      return 'Akwaaba';
    
    // Germany, Austria, Liechtenstein
    case 'DE':
    case 'AT':
    case 'LI':
      return 'Hi';
    
    // English-speaking countries
    case 'US':
    case 'GB':
    case 'CA':
    case 'AU':
    case 'NZ':
    case 'IE':
    case 'ZW': // Zimbabwe
    case 'BW': // Botswana
    case 'NA': // Namibia
      return 'Hi';
    
    default:
      return 'Hi'; // Default for all other countries
  }
};

const textVariants = {
  hidden: {
    y: 20,
    opacity: 0,
    filter: "blur(10px)",
  },
  visible: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      delay: 0.1,
      duration: 0.6,
      ease: [0.22, 0.61, 0.36, 1],
    },
  },
};

const buttonVariants = {
  hidden: {
    y: 20,
    opacity: 0,
    filter: "blur(10px)",
  },
  visible: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      delay: 0.2,
      duration: 0.6,
      ease: [0.22, 0.61, 0.36, 1],
    },
  },
};

export const HeroSection = () => {
  const [greeting, setGreeting] = useState('Grüezi'); // Default greeting

  useEffect(() => {
    // Fetch user's country from IP geolocation
    fetch('https://ip-api.com/json/')
      .then(response => response.json())
      .then(data => {
        console.log('Geolocation data:', data);
        console.log('Country code:', data.countryCode);
        if (data.countryCode) {
          const newGreeting = getGreeting(data.countryCode);
          console.log('Setting greeting to:', newGreeting);
          setGreeting(newGreeting);
        }
      })
      .catch((error) => {
        console.error('Geolocation failed:', error);
        // If geolocation fails, keep default "Grüezi"
        setGreeting('Grüezi');
      });
  }, []);

  return (
    <section className="relative z-[5] flex flex-col items-center justify-center px-0 2xl:px-[60px]" style={{ minHeight: 'calc(100vh - 338px)' }}>
      <div className="max-w-[1920px] mx-auto w-full">
      <div className="mx-auto flex max-w-[880px] flex-col items-center gap-[32px] md:gap-[40px] text-center h-fit py-[120px] px-[16px] md:px-[40px]">
        <div className="flex flex-col gap-[12px] items-center text-[var(--color-8)]">
          <AnimatedHeadline
            className="font-serif text-[40px] sm:text-[48px] md:text-[56px] lg:text-[64px] xl:text-[72px] leading-[50px] sm:leading-[60px] md:leading-[70px] lg:leading-[80px] xl:leading-[88px] tracking-[-0.2px] sm:tracking-[-0.48px] md:tracking-[-0.56px] lg:tracking-[-0.64px] xl:tracking-[-0.72px]"
          >
            {headline}
          </AnimatedHeadline>

          <motion.p
            className="font-sans text-[18px] md:text-[20px] lg:text-[22px] tracking-[-0.27px] md:tracking-[-0.35px] lg:tracking-[-0.44px] leading-[30px] md:leading-[33px] lg:leading-[36px] max-w-[880px] font-normal"
            variants={textVariants}
            initial="hidden"
            animate="visible"
          >
            {greeting}, I&apos;m Pascal. Currently designing AI data software for
            Tenzir and digital experiences for Sony Music. Based in Zurich,
            available for global collaborations.
          </motion.p>
        </div>

        <motion.div 
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
        >
          <PrimaryButton href="https://calendly.com/hi-pascalmey/30min" external>Schedule a Meeting</PrimaryButton>
        </motion.div>
      </div>
      </div>
    </section>
  );
};

