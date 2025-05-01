"use client";

import { useState } from "react";
import { ScrollAnimation } from "@/components/ScrollAnimation";
import { motion } from "framer-motion";

interface Card1Props {
  title: string;
  description: string;
  width?: string;
  delay?: number;
}

export const Card1 = ({
  title,
  description,
  width = "lg:min-w-[733px] w-[733px]",
  delay = 0.1,
}: Card1Props) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <ScrollAnimation
      type="fade"
      direction="up"
      duration={0.7}
      delay={delay}
      className={`flex flex-col justify-end items-end ${width} h-full rounded-xl transition-all duration-500 border-2 border-[#606060]/50 hover:border-[#606060]`}
      style={{ position: "relative", overflow: "hidden" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="absolute inset-0 w-full h-full z-0 transition-opacity duration-300"
        style={{
          backgroundImage: "url('/animation/card1/bg-default.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: isHovered ? 0 : 1,
        }}
      />

      <div
        className="absolute inset-0 w-full h-full z-0 transition-opacity duration-300"
        style={{
          backgroundImage: "url('/animation/card1/bg-hover.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Versão desktop das moedas (igual ao design original) */}
      <div className="hidden md:block">
        <motion.div
          className="absolute"
          style={{
            top: "0%",
            left: "10%",
            transform: "translate(-50%, -50%)",
            zIndex: 1,
          }}
          animate={{
            y: isHovered ? -5 : 0,
            x: isHovered ? 20 : 0,
            rotate: isHovered ? -10 : 0,
            scale: isHovered ? 1.3 : 1,
            transition: { duration: 0.5, ease: "easeInOut" },
          }}
        >
          <img
            src="/animation/card1/coin1.png"
            alt="Token coin"
            className="w-[240px] h-[253px] object-contain"
          />
        </motion.div>

        <motion.div
          className="absolute"
          style={{
            top: "0%",
            right: "10%",
            transform: "translate(-50%, -50%)",
            zIndex: 1,
          }}
          animate={{
            y: isHovered ? -5 : 0,
            x: isHovered ? -20 : 0,
            rotate: isHovered ? 10 : 0,
            scale: isHovered ? 1.3 : 1,
            transition: { duration: 0.5, ease: "easeInOut" },
          }}
        >
          <img
            src="/animation/card1/coin2.png"
            alt="Token coin"
            className="w-[220px] h-[233px] object-contain"
          />
        </motion.div>
      </div>

      {/* Versão mobile das moedas */}
      <div className="md:hidden absolute top-0 w-full flex justify-between px-4">
        <motion.div
          style={{
            zIndex: 1,
          }}
          animate={{
            y: isHovered ? 10 : 0,
            rotate: isHovered ? -5 : 0,
            scale: isHovered ? 1.1 : 1,
            transition: { duration: 0.5, ease: "easeInOut" },
          }}
        >
          <img
            src="/animation/card1/coin1.png"
            alt="Token coin"
            className="w-[120px] object-contain"
          />
        </motion.div>

        <motion.div
          style={{
            zIndex: 1,
          }}
          animate={{
            y: isHovered ? 10 : 0,
            rotate: isHovered ? 5 : 0,
            scale: isHovered ? 1.1 : 1,
            transition: { duration: 0.5, ease: "easeInOut" },
          }}
        >
          <img
            src="/animation/card1/coin2.png"
            alt="Token coin"
            className="w-[100px] object-contain"
          />
        </motion.div>
      </div>

      <div className="p-6 rounded-lg w-full z-10 relative">
        <h1 className="text-[#EEE] text-[16px] md:text-[24px] xl:text-[28px] font-bold w-full leading-tight md:leading-[61.6px]">
          {title}
        </h1>
        <p className="text-sm md:text-lg xl:leading-[130%] text-[#B4B4B4]">
          {description}
        </p>
      </div>
    </ScrollAnimation>
  );
};
