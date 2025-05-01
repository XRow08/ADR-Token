"use client";

import { Button } from "../Button";
import { LogoIcon } from "../Icons/LogoIcon";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 50], [0.8, 1]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  return (
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
    </motion.header>
  );
}
