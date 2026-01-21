"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

type PasswordModalProps = {
  open: boolean;
  slug: string | null;
  onClose: () => void;
  onSuccess?: () => void;
};

const CORRECT_PASSWORD = "portfolio_2026";
const AUTH_STORAGE_KEY = "portfolio_auth";
const AUTH_DURATION = 7 * 24 * 60 * 60 * 1000; // 1 Woche in Millisekunden

// Hilfsfunktion zum Speichern der Authentifizierung
const saveAuth = () => {
  const authData = {
    authenticated: true,
    timestamp: Date.now(),
  };
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData));
};

// Hilfsfunktion zum Prüfen der Authentifizierung
export const checkAuth = (): boolean => {
  if (typeof window === "undefined") return false;
  
  const authDataString = localStorage.getItem(AUTH_STORAGE_KEY);
  if (!authDataString) return false;
  
  try {
    const authData = JSON.parse(authDataString);
    const timePassed = Date.now() - authData.timestamp;
    
    // Wenn mehr als eine Woche vergangen ist, entferne die Authentifizierung
    if (timePassed > AUTH_DURATION) {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      return false;
    }
    
    return authData.authenticated === true;
  } catch (e) {
    return false;
  }
};

export const PasswordModal: React.FC<PasswordModalProps> = ({
  open,
  slug,
  onClose,
  onSuccess,
}) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [errorCount, setErrorCount] = useState(0);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [linkAnimationState, setLinkAnimationState] = useState<'idle' | 'going-out' | 'coming-in'>('idle');
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    setPassword("");
    setError(false);
    setErrorCount(0);
    onClose();
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        handleClose();
      }
    };

    if (open) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [open, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!slug) return;

    if (password === CORRECT_PASSWORD) {
      setError(false);
      setErrorCount(0);
      setPassword("");
      saveAuth(); // Speichere die Authentifizierung für eine Woche
      if (onSuccess) {
        onSuccess(); // Rufe den Erfolgs-Callback auf
      }
      onClose();
      router.push(`/work/${slug}`);
    } else {
      setError(true);
      setErrorCount((prev) => prev + 1);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      handleClose();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Dim overlay */}
          <motion.div
            className="fixed inset-0 z-50 bg-[var(--color-0-80)] backdrop-blur-[25px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleOverlayClick}
          />

          {/* Close Button - positioned at dark mode toggle location */}
          <motion.button
            type="button"
            onClick={handleClose}
            className="fixed z-[51] top-[25px] right-[44px] flex items-center justify-center pointer-events-auto"
            aria-label="Close modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Image
              src="/images/icons/icon_close.svg"
              alt="Close"
              width={32}
              height={32}
              className="size-[32px]"
            />
          </motion.button>

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
            <motion.div
              ref={modalRef}
              className="w-[520px] px-[16px] py-0 pointer-events-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
            >
              <div className="bg-[var(--color-100)] rounded-[10px] shadow-[0px_8px_32px_-16px_var(--color-0-80)] flex flex-col gap-[32px] items-center overflow-clip p-[40px]">
                {/* Header */}
                <div className="flex flex-col gap-[8px] items-start w-full">
                  <div className="flex gap-[8px] items-center justify-center w-full">
                    <div className="relative shrink-0 size-[28px] flex items-center justify-center">
                      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21.0811 11V17.0859C21.0811 17.3338 21.0613 17.5817 21.0205 17.8262L20.2002 22.7471C20.0795 23.47 19.4537 23.9999 18.7207 24H9.62696C8.89398 23.9999 8.26817 23.47 8.14746 22.7471L7.32715 17.8262C7.28634 17.5815 7.26563 17.334 7.26562 17.0859V11H21.0811Z" stroke="var(--color-44)"/>
                        <path d="M18.1969 10.4996V8.59961C18.1969 6.94276 16.8537 5.59961 15.1969 5.59961H12.7969C11.14 5.59961 9.79688 6.94276 9.79688 8.59961V10.4996" stroke="var(--color-44)"/>
                        <path d="M14.0016 18.8996C14.7748 18.8996 15.4016 18.2728 15.4016 17.4996C15.4016 16.7264 14.7748 16.0996 14.0016 16.0996C13.2284 16.0996 12.6016 16.7264 12.6016 17.4996C12.6016 18.2728 13.2284 18.8996 14.0016 18.8996Z" fill="var(--color-44)"/>
                      </svg>
                    </div>
                  <p className="font-sans text-sans-22 text-[var(--color-8)] font-semibold text-center tracking-[-0.44px] leading-[36px]">
                      Password required
                    </p>
                  </div>
                  <p className="font-sans text-sans-18 text-[var(--color-8)] font-normal text-center tracking-[-0.27px] leading-[30px] w-full">
                    This work is under NDA. Please enter the password from my CV
                    to continue.{" "}
                  </p>
                </div>

                {/* Password Input */}
                <motion.form
                  onSubmit={handleSubmit}
                  className="w-full"
                  animate={error ? { x: [-6, 6, -4, 4, 0] } : { x: 0 }}
                  transition={{ duration: 0.28 }}
                >
                  <div className="bg-[var(--color-98)] border-2 border-[var(--color-96)] focus-within:border-[var(--color-92)] flex h-[48px] items-center justify-between pl-[16px] pr-[8px] py-0 rounded-[5px] transition-all box-border">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (error) setError(false);
                      }}
                      className="flex-1 bg-transparent font-sans text-[var(--color-8)] outline-none placeholder:text-[var(--color-56)]"
                      style={{
                        fontSize: showPassword || password.length === 0 ? "18px" : "22px",
                        letterSpacing: password.length > 0 && !showPassword ? "0.5px" : "normal",
                        lineHeight: "1",
                      }}
                      placeholder="Enter password"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="flex flex-col items-start overflow-clip p-[8px] shrink-0"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      <div className="relative shrink-0 size-[24px]">
                        <Image
                          src={
                            showPassword
                              ? "/images/icons/icon_hide-password.svg"
                              : "/images/icons/icon_show-password.svg"
                          }
                          alt=""
                          width={24}
                          height={24}
                        />
                      </div>
                    </button>
                  </div>

                  {/* Error Message */}
                  <div className="mt-[8px] min-h-[22px] w-full">
                    {error && (
                      <p className="font-sans text-sans-14 text-[#f71a1a] tracking-[-0.12px] w-full font-normal">
                        {errorCount >= 7 ? (
                          <>
                            You've entered the incorrect password too often.{" "}
                            <a 
                              href="mailto:hi@pascalmey.com" 
                              className="inline-block relative font-medium transition-colors duration-200 ease-in-out"
                              style={{
                                color: '#f71a1a',
                              }}
                              onMouseEnter={(e) => {
                                setHoveredLink('error-link');
                                setLinkAnimationState('going-out');
                                setTimeout(() => {
                                  setLinkAnimationState('coming-in');
                                }, 300);
                              }}
                              onMouseLeave={(e) => {
                                setHoveredLink(null);
                                setLinkAnimationState('idle');
                              }}
                            >
                              Send me a mail
                              <span
                                className={`absolute h-[1px] transition-all duration-[300ms] ease-out ${linkAnimationState === 'coming-in' ? 'left-0' : (hoveredLink === 'error-link' || linkAnimationState === 'going-out') ? 'right-0' : 'left-0'}`}
                                style={{
                                  bottom: '2px',
                                  height: '1px',
                                  width: hoveredLink === 'error-link'
                                    ? (linkAnimationState === 'going-out' ? '0%' : '100%')
                                    : linkAnimationState === 'going-out' ? '0%' : '100%',
                                  background: '#f71a1a',
                                  transformOrigin: linkAnimationState === 'coming-in' ? 'left' : 'right',
                                }}
                              />
                            </a>
                          </>
                        ) : (
                          <>
                            The password you've entered is not correct.{" "}
                            <a 
                              href="mailto:hi@pascalmey.com" 
                              className="inline-block relative font-medium transition-colors duration-200 ease-in-out"
                              style={{
                                color: '#f71a1a',
                              }}
                              onMouseEnter={(e) => {
                                setHoveredLink('error-link');
                                setLinkAnimationState('going-out');
                                setTimeout(() => {
                                  setLinkAnimationState('coming-in');
                                }, 300);
                              }}
                              onMouseLeave={(e) => {
                                setHoveredLink(null);
                                setLinkAnimationState('idle');
                              }}
                            >
                              Send me a mail
                              <span
                                className={`absolute h-[1px] transition-all duration-[300ms] ease-out ${linkAnimationState === 'coming-in' ? 'left-0' : (hoveredLink === 'error-link' || linkAnimationState === 'going-out') ? 'right-0' : 'left-0'}`}
                                style={{
                                  bottom: '2px',
                                  height: '1px',
                                  width: hoveredLink === 'error-link'
                                    ? (linkAnimationState === 'going-out' ? '0%' : '100%')
                                    : linkAnimationState === 'going-out' ? '0%' : '100%',
                                  background: '#f71a1a',
                                  transformOrigin: linkAnimationState === 'coming-in' ? 'left' : 'right',
                                }}
                              />
                            </a>
                          </>
                        )}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="mt-[20px] w-full">
                    <button
                      type="submit"
                      className="relative inline-flex items-center justify-center rounded-[40px] bg-transparent px-[40px] py-[8px] font-sans text-sans-16-medium text-[var(--color-100)] shadow-sm overflow-visible w-full"
                      onMouseEnter={() => setIsButtonHovered(true)}
                      onMouseLeave={() => setIsButtonHovered(false)}
                    >
                      <span className="relative z-10">Continue</span>
                      <span 
                        className="absolute inset-0 rounded-[40px]"
                        style={{
                          background: `linear-gradient(108deg, var(--color-satoshi) 0%, var(--color-satoshi) 50%, var(--color-8) 50%, var(--color-8) 100%)`,
                          backgroundSize: '250% 200%',
                          backgroundPosition: isButtonHovered ? 'left center' : 'right center',
                          transition: 'background-position 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                        }}
                      />
                    </button>
                  </div>
                </motion.form>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
