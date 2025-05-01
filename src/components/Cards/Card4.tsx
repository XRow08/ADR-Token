"use client";

import { useState } from "react";
import { ScrollAnimation } from "@/components/ScrollAnimation";
import { Button } from "@/components/Button";
import { motion } from "framer-motion";

interface Card4Props {
  buttonText: string;
  buttonWidth?: string;
  buttonHeight?: string;
  delay?: number;
  width?: string;
}

export const Card4 = ({
  buttonText,
  buttonWidth = "w-[288px]",
  buttonHeight = "h-[56px]",
  delay = 0.35,
  width = "w-full",
}: Card4Props) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <ScrollAnimation
      type="fade"
      direction="up"
      duration={0.7}
      delay={delay}
      className={`flex flex-col justify-center items-center ${width} h-full rounded-xl transition-all duration-500 border-2 border-[#606060]/50 hover:border-[#606060]`}
      style={{ position: "relative", overflow: "hidden" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="absolute inset-0 w-full h-full z-0 transition-opacity duration-300"
        style={{
          backgroundImage: "url('/animation/card4/bg-card.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: isHovered ? 0 : 1,
        }}
      />

      <div
        className="absolute inset-0 w-full h-full z-0 transition-opacity duration-300"
        style={{
          backgroundImage: "url('/animation/card4/bg-card-hover.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Versão desktop do botão */}
      <div className="hidden md:block z-10">
        <motion.div
          animate={{
            scale: isHovered ? 1.05 : 1,
            y: isHovered ? -5 : 0,
            transition: { duration: 0.4, ease: "easeInOut" },
          }}
        >
          <Button
            className={`${buttonWidth} ${buttonHeight} rounded-lg text-lg font-medium`}
            variant="primary"
          >
            {buttonText}
          </Button>
        </motion.div>
      </div>

      {/* Versão mobile do botão */}
      <div className="md:hidden z-10">
        <motion.div
          animate={{
            scale: isHovered ? 1.05 : 1,
            y: isHovered ? -5 : 0,
            transition: { duration: 0.4, ease: "easeInOut" },
          }}
        >
          <Button
            className="w-[220px] h-[48px] rounded-lg text-base font-medium"
            variant="primary"
          >
            {buttonText}
          </Button>
        </motion.div>
      </div>
    </ScrollAnimation>
  );
};
