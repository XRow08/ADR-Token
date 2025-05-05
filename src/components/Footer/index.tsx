"use client";
import { motion } from "framer-motion";
import { ScrollAnimation } from "../ScrollAnimation";
import { LogoIcon } from "../Icons/LogoIcon";
import { Button } from "../Button";
import Link from "next/link";

export function Footer() {
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

  return (
    <footer className="w-full flex flex-col items-center justify-start py-12 sm:py-16 md:py-24 px-6 md:px-0 overflow-hidden bg-[#0F0F0F]">
      <ScrollAnimation
        type="slide"
        direction="up"
        duration={0.7}
        delay={0.1}
        className="flex flex-col items-center justify-between max-w-[1280px] w-full p-6 sm:p-8 bg-[#191919] rounded-xl"
      >
        <div className="flex w-full items-center justify-between mb-6 sm:mb-8">
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

          <div className="flex items-center space-x-4 sm:space-x-6">
            <Link href="/boxes" className="text-[#EEEEEE] text-xs sm:text-sm lg:text-base font-semibold">
              Boxes
            </Link>
            <Link href="/transactions" className="text-[#EEEEEE] text-xs sm:text-sm lg:text-base font-semibold hidden md:block">
              Transactions
            </Link>
          </div>
        </div>

        <div className="flex w-full items-center justify-between bg-[#3A3A3A] h-[1px] mb-6 sm:mb-8" />

        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-[#BDBDBD] text-xs sm:text-sm text-center sm:text-left">
            © 2025 ADR Token. All rights reserved.
          </div>

          <Button className="w-full sm:w-auto py-3 px-4 sm:px-6 text-sm sm:text-base">
            Buy token $ADR
          </Button>
        </div>
      </ScrollAnimation>
    </footer>
  );
}
