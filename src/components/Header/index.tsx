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
import dynamic from "next/dynamic";
import "@solana/wallet-adapter-react-ui/styles.css";
import { usePurchase } from "@/hooks/usePurchase";
import { BoxIcon } from "../Icons/BoxIcon";
import { HistoricIcon } from "../Icons/HistoricIcon";
import { BurnTicker } from "../BurnTicker";
import { StakingIcon } from "../Icons/StakingIcon";
import { LanguageToggle } from "../LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";
const WalletMultiButton = dynamic(
  () =>
    import("@solana/wallet-adapter-react-ui").then(
      (mod) => mod.WalletMultiButton
    ),
  { ssr: false }
);

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 50], [0.8, 1]);
  const { balance, isLoading, connected } = usePurchase();
  const { t } = useLanguage();

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
  const menuItemVariants = {
    closed: { opacity: 0, y: -10, x: 20 },
    open: { opacity: 1, y: 0, x: 0, transition: { duration: 0.4 } },
  };

  const BalanceDisplay = () => {
    if (!connected) return null;

    return (
      <div className="flex items-center gap-2 text-sm mr-2">
        {isLoading ? (
          <span className="w-8 h-4 bg-gray-600 animate-pulse rounded-sm"></span>
        ) : (
          <div className="flex items-center text-white">
            <LogoIcon className="w-4 h-4 mr-2" />
            <span>
              {balance.toLocaleString("en-US", {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
              })}
            </span>
          </div>
        )}
      </div>
    );
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
          <div className="flex items-center gap-4">
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

            <div className="hidden lg:flex items-center gap-4 ml-10">
              <motion.nav
                className="flex items-center gap-2"
                initial="hidden"
                animate="visible"
                variants={buttonVariants}
              >
                <Link
                  href="/boxes"
                  className="text-white hover:text-[#28D939] transition-colors flex items-center gap-2"
                >
                  <BoxIcon /> {t("header.boxes")}
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
                  className="text-white hover:text-[#28D939] transition-colors flex items-center gap-2"
                >
                  <HistoricIcon /> {t("header.historic")}
                </Link>
              </motion.nav>

              <motion.nav
                className="flex items-center gap-6"
                initial="hidden"
                animate="visible"
                variants={buttonVariants}
              >
                <Link
                  href="/staking"
                  className="text-white hover:text-[#28D939] transition-colors flex items-center gap-2"
                >
                  <StakingIcon /> {t("header.staking")}
                </Link>
              </motion.nav>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={buttonVariants}
            >
              <LanguageToggle />
            </motion.div>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={buttonVariants}
              className="flex items-center gap-2"
            >
              {connected && <BalanceDisplay />}
              <div className="wallet-adapter-dropdown">
                <WalletMultiButton className=" !bg-gradient-to-r !from-[#28D939] !to-[#12A91E] !text-black font-medium text-sm sm:text-base py-2 px-3 sm:px-4 md:py-2 md:px-6 rounded-lg border-none" />
              </div>
            </motion.div>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={buttonVariants}
            >
              <Button className="text-sm sm:text-base py-2 px-3 sm:px-4 md:py-2 md:px-6">
                {t("header.buyToken")}
              </Button>
            </motion.div>
          </div>
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
      <BurnTicker />

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
                      <BoxIcon /> {t("header.boxes")}
                    </Link>
                  </motion.div>

                  <motion.div variants={menuItemVariants}>
                    <Link
                      href="/transactions"
                      className="text-white hover:text-[#28D939] transition-colors text-xl py-3 border-b border-[#222222] flex items-center gap-4"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <HistoricIcon /> {t("header.historic")}
                    </Link>
                  </motion.div>

                  <motion.div variants={menuItemVariants}>
                    <Link
                      href="/staking"
                      className="text-white hover:text-[#28D939] transition-colors text-xl py-3 border-b border-[#222222] flex items-center gap-4"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <StakingIcon /> {t("header.staking")}
                    </Link>
                  </motion.div>
                </motion.div>

                <motion.div className="flex flex-col gap-4 mt-4">
                  <motion.div variants={menuItemVariants}>
                    <div className="flex items-center justify-between border-b border-[#222222] pb-3 mb-3">
                      <span className="text-white text-sm">
                        {t("common.language")}
                      </span>
                      <LanguageToggle />
                    </div>
                    {connected && <BalanceDisplay />}
                    <WalletMultiButton
                      style={{ width: "100%" }}
                      className="mt-4 wallet-adapter-button-trigger !bg-gradient-to-r !from-[#28D939] !to-[#12A91E] !text-black font-medium w-full py-3 rounded-lg border-none hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                    />
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
                      {t("header.buyToken")}
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
