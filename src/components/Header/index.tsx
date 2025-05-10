"use client";

import { Button } from "../Button";
import { LogoIcon } from "../Icons/LogoIcon";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useWallet } from "@solana/wallet-adapter-react";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 50], [0.8, 1]);
  const { connected, publicKey } = useWallet();
  const [balance, setBalance] = useState(0);
  console.log(publicKey?.toBase58());

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const logoVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        delay: 0.3,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const burgerVariants = {
    closed: {
      rotate: 0,
    },
    open: {
      rotate: 0,
    },
  };

  const topLineVariants = {
    closed: { rotate: 0, translateY: -8, width: 16, x: 4 },
    open: { rotate: 45, translateY: 0, width: 20, x: 0 },
  };

  const middleLineVariants = {
    closed: { opacity: 1, width: 24, x: 0 },
    open: { opacity: 0, width: 0, x: 10 },
  };

  const bottomLineVariants = {
    closed: { rotate: 0, translateY: 8, width: 20, x: 2 },
    open: { rotate: -45, translateY: 0, width: 20, x: 0 },
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      clipPath: "circle(0% at calc(100% - 28px) 28px)",
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      clipPath: "circle(150% at calc(100% - 28px) 28px)",
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const menuItemVariants = {
    closed: { opacity: 0, y: -10, x: 20 },
    open: { opacity: 1, y: 0, x: 0, transition: { duration: 0.4 } },
  };

  return (
    <>
      <motion.header
        className={`w-full fixed top-0 left-0 z-50 h-[56px] md:h-[64px] transition-all duration-300 flex items-center justify-center ${
          scrolled ? "shadow-md" : ""
        }`}
        style={{
          backgroundColor: scrolled ? "rgba(15, 15, 15, 0.7)" : "transparent",
          backdropFilter: scrolled ? "blur(8px)" : "blur(0px)",
          opacity: headerOpacity,
        }}
      >
        <div className="max-w-[1280px] w-full flex items-center justify-between px-6 md:px-0">
          <motion.div
            className="flex items-center gap-1 md:gap-2 cursor-pointer"
            initial="hidden"
            animate="visible"
            variants={logoVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/">
              <div className="flex items-center gap-1 md:gap-2">
                <motion.div
                  className="w-8 h-8 md:w-auto md:h-auto"
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <LogoIcon />
                </motion.div>
                <motion.span
                  className="text-white text-base sm:text-lg xl:text-[25px] font-medium"
                  whileHover={{
                    color: "#28D939",
                    transition: { duration: 0.2 },
                  }}
                >
                  $ADR
                </motion.span>
              </div>
            </Link>
          </motion.div>

          {/* Menu desktop */}
          <div className="hidden md:flex items-center gap-4">
            <motion.nav
              className="flex items-center gap-6"
              initial="hidden"
              animate="visible"
              variants={buttonVariants}
            >
              <Link
                href="/boxes"
                className="text-white hover:text-[#28D939] transition-colors"
              >
                Boxes
              </Link>
            </motion.nav>

            <motion.nav
              className="flex items-center gap-6"
              initial="hidden"
              animate="visible"
              variants={buttonVariants}
            >
              <Link
                href="/transactions"
                className="text-white hover:text-[#28D939] transition-colors"
              >
                Transações
              </Link>
            </motion.nav>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={buttonVariants}
            >
              <Button
                variant="secondary"
                className="text-sm sm:text-base py-2 px-3 sm:px-4 md:py-2 md:px-6"
              >
                {connected ? (
                  <div className="flex items-center gap-2">
                    <LogoIcon className="w-4 h-4" />
                    {balance?.toLocaleString("en-US", {
                      maximumFractionDigits: 2,
                      minimumFractionDigits: 2,
                    })}
                  </div>
                ) : (
                  "Connect wallet"
                )}
              </Button>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={buttonVariants}
            >
              <Button className="text-sm sm:text-base py-2 px-3 sm:px-4 md:py-2 md:px-6">
                Buy token $ADR
              </Button>
            </motion.div>
          </div>

          {/* Botão menu mobile */}
          <motion.div
            className="md:hidden flex items-center z-50"
            initial="hidden"
            animate="visible"
            variants={buttonVariants}
          >
            <motion.button
              className={`flex flex-col items-center justify-center w-10 h-10 rounded-full relative transition-colors ${
                mobileMenuOpen ? "bg-[#28D939]/20" : "hover:bg-[#222222]/50"
              }`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              animate={mobileMenuOpen ? "open" : "closed"}
              variants={burgerVariants}
              whileTap={{ scale: 0.95 }}
              aria-label="Menu"
              role="button"
            >
              <div className="w-8 h-8 flex items-center justify-center relative">
                <motion.span
                  className={`absolute h-[2px] rounded-full ${
                    mobileMenuOpen
                      ? "bg-[#28D939]"
                      : "bg-gradient-to-r from-[#FFF7A8] to-[#FFEB28]"
                  }`}
                  variants={topLineVariants}
                  transition={{ duration: 0.4, ease: [0.6, 0.05, -0.01, 0.9] }}
                  style={{ originX: 0.5 }}
                />
                <motion.span
                  className={`absolute h-[2px] rounded-full ${
                    mobileMenuOpen ? "bg-[#28D939]" : "bg-white"
                  }`}
                  variants={middleLineVariants}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
                <motion.span
                  className={`absolute h-[2px] rounded-full ${
                    mobileMenuOpen
                      ? "bg-[#28D939]"
                      : "bg-gradient-to-r from-[#FFEB28] to-[#FFF7A8]"
                  }`}
                  variants={bottomLineVariants}
                  transition={{ duration: 0.4, ease: [0.6, 0.05, -0.01, 0.9] }}
                  style={{ originX: 0.5 }}
                />
              </div>
            </motion.button>
          </motion.div>
        </div>
      </motion.header>

      {/* Menu mobile */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-[#0F0F0F]/30 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              className="fixed inset-y-0 right-0 z-40 w-[85%] max-w-[360px] bg-gradient-to-l from-[#0F0F0F] to-[#0F0F0F]/95 pt-20 px-6 backdrop-blur-md shadow-xl border-l border-[#222222]"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
            >
              <motion.div
                className="flex flex-col gap-8 py-6 h-full"
                initial="closed"
                animate="open"
                exit="closed"
                variants={{
                  open: {
                    transition: {
                      staggerChildren: 0.1,
                      delayChildren: 0.1,
                    },
                  },
                  closed: {
                    transition: {
                      staggerChildren: 0.05,
                      staggerDirection: -1,
                    },
                  },
                }}
              >
                <motion.div className="flex flex-col gap-4">
                  <motion.div variants={menuItemVariants}>
                    <Link
                      href="/boxes"
                      className="text-white hover:text-[#28D939] transition-colors text-xl py-3 border-b border-[#222222] flex items-center gap-3"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <motion.div
                        className="w-8 h-8 rounded-full bg-[#222222] flex items-center justify-center"
                        whileHover={{ scale: 1.1, backgroundColor: "#28D939" }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                          <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                          <line x1="12" y1="22.08" x2="12" y2="12"></line>
                        </svg>
                      </motion.div>
                      Boxes
                    </Link>
                  </motion.div>

                  <motion.div variants={menuItemVariants}>
                    <Link
                      href="/transactions"
                      className="text-white hover:text-[#28D939] transition-colors text-xl py-3 border-b border-[#222222] flex items-center gap-3"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <motion.div
                        className="w-8 h-8 rounded-full bg-[#222222] flex items-center justify-center"
                        whileHover={{ scale: 1.1, backgroundColor: "#28D939" }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
                          <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
                        </svg>
                      </motion.div>
                      Transações
                    </Link>
                  </motion.div>
                </motion.div>

                <motion.div className="flex flex-col gap-4 mt-4">
                  <motion.div variants={menuItemVariants}>
                    <Button
                      variant="secondary"
                      className="w-full py-3 flex items-center justify-center gap-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {connected ? (
                        <div className="flex items-center gap-2 justify-center">
                          <LogoIcon className="w-4 h-4" />
                          {balance?.toLocaleString("en-US", {
                            maximumFractionDigits: 2,
                            minimumFractionDigits: 2,
                          })}
                        </div>
                      ) : (
                        <>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <rect
                              x="2"
                              y="4"
                              width="20"
                              height="16"
                              rx="2"
                              ry="2"
                            ></rect>
                            <path d="M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"></path>
                            <path d="M17.3 12.3a6 6 0 0 0-10.6 0"></path>
                          </svg>
                          Connect wallet
                        </>
                      )}
                    </Button>
                  </motion.div>

                  <motion.div variants={menuItemVariants}>
                    <Button
                      className="w-full py-3 flex items-center justify-center gap-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <polyline points="19 12 12 19 5 12"></polyline>
                      </svg>
                      Buy token $ADR
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
