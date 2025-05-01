"use client";

import { useState } from "react";
import { ScrollAnimation } from "@/components/ScrollAnimation";
import { motion } from "framer-motion";

interface FeaturesCardProps {
  title: string;
  description: string;
  imageUrl: string;
  direction: "left" | "right";
  delay: number;
  width?: string;
  isAnimated?: boolean;
}

export const FeaturesCard = ({
  title,
  description,
  imageUrl,
  direction,
  delay,
  width = "w-full",
  isAnimated = false,
}: FeaturesCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <ScrollAnimation
      type={direction === "left" ? "slide" : "slide"}
      direction={direction}
      duration={0.7}
      delay={delay}
      className={`flex flex-col justify-end items-end ${width} h-full rounded-xl transition-all duration-500 border-2 border-[#606060]/50 hover:border-[#606060]`}
      style={
        !isAnimated
          ? {
              backgroundImage: `url(${imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : { position: "relative", overflow: "hidden" }
      }
      onMouseEnter={isAnimated ? () => setIsHovered(true) : undefined}
      onMouseLeave={isAnimated ? () => setIsHovered(false) : undefined}
    >
      {isAnimated && (
        <>
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
        </>
      )}

      <div
        className={`p-4 rounded-lg w-full ${isAnimated ? "z-10 relative" : ""}`}
      >
        <h1 className="text-[#EEE] text-[24px] xl:text-[28px] w-full leading-[61.6px]">
          {title}
        </h1>
        <p className="text-lg xl:leading-[130%] text-[#B4B4B4]">
          {description}
        </p>
      </div>
    </ScrollAnimation>
  );
};
