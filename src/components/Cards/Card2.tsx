"use client";

import { useState } from "react";
import { ScrollAnimation } from "@/components/ScrollAnimation";
import { motion } from "framer-motion";

interface Card2Props {
  title: string;
  description: string;
  width?: string;
  delay?: number;
}

export const Card2 = ({
  title,
  description,
  width = "w-full",
  delay = 0.2,
}: Card2Props) => {
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
          backgroundImage: "url('/animation/card2/bg-default.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: isHovered ? 0 : 1,
        }}
      />

      <div
        className="absolute inset-0 w-full h-full z-0 transition-opacity duration-300"
        style={{
          backgroundImage: "url('/animation/card2/bg-hover.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Imagem do Adriano versão desktop */}
      <motion.div
        className="absolute bottom-0 w-full hidden md:flex items-center justify-center"
        style={{ zIndex: 5 }}
        animate={{
          y: isHovered ? 20 : 0,
          scale: isHovered ? 1.1 : 1,
          transition: { duration: 0.5, ease: "easeInOut" },
        }}
      >
        <img
          src="/animation/card2/img-adriano1.png"
          alt="Adriano"
          className="w-[315px] h-[309px] object-cover"
        />
      </motion.div>

      {/* Retângulos versão desktop */}
      <div className="absolute top-0 left-0 w-full hidden md:flex items-start justify-between gap-8 px-[10%]">
        <motion.div
          className="w-[128px]"
          style={{ zIndex: 1, transformOrigin: "top" }}
          animate={{
            scaleY: isHovered ? 1 : 0.2,
            transition: { duration: 0.5, ease: "easeInOut" },
          }}
        >
          <img
            src="/animation/card2/retangle3.svg"
            alt="Rectangle"
            className="w-full h-full"
          />
        </motion.div>

        <motion.div
          className="w-[128px]"
          style={{
            zIndex: 1,
            transformOrigin: "top",
            top: "0px",
          }}
          animate={{
            scaleY: isHovered ? 1 : 0.37,
            transition: { duration: 0.5, ease: "easeInOut" },
          }}
        >
          <img
            src="/animation/card2/retangle2.svg"
            alt="Rectangle"
            className="w-full h-full"
          />
        </motion.div>

        <motion.div
          className="w-[128px]"
          style={{ zIndex: 1, transformOrigin: "top" }}
          animate={{
            scaleY: isHovered ? 1 : 0.2,
            transition: { duration: 0.5, ease: "easeInOut" },
          }}
        >
          <img
            src="/animation/card2/retangle1.svg"
            alt="Rectangle"
            className="w-full h-full"
          />
        </motion.div>
      </div>

      {/* Imagem do Adriano versão mobile */}
      <motion.div
        className="absolute bottom-0 w-full flex items-center justify-center md:hidden"
        style={{ zIndex: 2 }}
        animate={{
          y: isHovered ? 5 : 0,
          scale: isHovered ? 1.05 : 1,
          transition: { duration: 0.5, ease: "easeInOut" },
        }}
      >
        <img
          src="/animation/card2/img-adriano1.png"
          alt="Adriano"
          className="w-[240px] h-auto object-cover"
        />
      </motion.div>

      {/* Retângulos versão mobile */}
      <div className="absolute top-0 left-0 w-full md:hidden flex items-start justify-between px-6 py-4">
        <motion.div
          className="w-1/4"
          style={{ zIndex: 1, transformOrigin: "top" }}
          animate={{
            scaleY: isHovered ? 1 : 0.2,
            transition: { duration: 0.5, ease: "easeInOut" },
          }}
        >
          <img
            src="/animation/card2/retangle3.svg"
            alt="Rectangle"
            className="w-full h-full"
          />
        </motion.div>

        <motion.div
          className="w-1/4"
          style={{ zIndex: 1, transformOrigin: "top" }}
          animate={{
            scaleY: isHovered ? 1 : 0.37,
            transition: { duration: 0.5, ease: "easeInOut" },
          }}
        >
          <img
            src="/animation/card2/retangle2.svg"
            alt="Rectangle"
            className="w-full h-full"
          />
        </motion.div>

        <motion.div
          className="w-1/4"
          style={{ zIndex: 1, transformOrigin: "top" }}
          animate={{
            scaleY: isHovered ? 1 : 0.2,
            transition: { duration: 0.5, ease: "easeInOut" },
          }}
        >
          <img
            src="/animation/card2/retangle1.svg"
            alt="Rectangle"
            className="w-full h-full"
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
