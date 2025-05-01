"use client";

import { useState } from "react";
import { ScrollAnimation } from "@/components/ScrollAnimation";
import { motion } from "framer-motion";

interface Card3Props {
  title: string;
  description: string;
  width?: string;
  delay?: number;
}

export const Card3 = ({
  title,
  description,
  width = "lg:min-w-[843px] w-[843px]",
  delay = 0.25,
}: Card3Props) => {
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
          backgroundImage: "url('/animation/card3/bg-default.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: isHovered ? 0 : 1,
        }}
      />

      <div
        className="absolute inset-0 w-full h-full z-0 transition-opacity duration-300"
        style={{
          backgroundImage: "url('/animation/card3/bg-hover.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: isHovered ? 1 : 0,
        }}
      />

      <motion.div
        className="absolute inset-0 w-full h-full flex items-center justify-center"
        style={{ zIndex: 5 }}
        animate={{
          height: isHovered ? "8px" : "0px",
          transition: { duration: 0.5, ease: "easeInOut" },
          transformOrigin: "top",
        }}
      >
        <div className="w-full h-full bg-[#43FF63] absolute top-0 left-0 z-[1]" />
        <div className="w-[70%] h-full bg-[#FFEB28] rounded-bl-lg absolute top-0 right-0 z-[2]" />
        <div className="w-1/3 h-full bg-[#2E59FE] rounded-bl-lg absolute top-0 right-0 z-[3]" />
      </motion.div>

      {/* Versão desktop da imagem e moedas */}
      <div className="hidden md:block">
        <motion.div
          className="absolute bottom-0 right-0"
          style={{ zIndex: 1 }}
          animate={{
            y: isHovered ? 35 : 0,
            x: isHovered ? -30 : 0,
            scale: isHovered ? 1.2 : 1,
            transition: { duration: 0.5, ease: "easeInOut" },
          }}
        >
          <img
            src="/animation/card3/img-adriano2.png"
            alt="Adriano"
            className="h-[300px] object-contain"
          />
        </motion.div>

        <div className="absolute top-0 left-0 flex gap-6 p-5">
          <motion.div
            style={{
              zIndex: 1,
              width: "200px",
              height: "150px",
              transformOrigin: "top",
            }}
            animate={{
              scale: isHovered ? 1.3 : 1,
              rotate: isHovered ? 5 : 0,
              x: isHovered ? 10 : 0,
              y: isHovered ? -10 : 0,
              transition: { duration: 0.5, ease: "easeInOut" },
            }}
          >
            <img
              src="/animation/card3/coin3.png"
              alt="Token coin"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            style={{
              zIndex: 1,
              width: "150px",
              height: "180px",
              transformOrigin: "top",
            }}
            animate={{
              scale: isHovered ? 1.2 : 1,
              rotate: isHovered ? -5 : 0,
              x: isHovered ? -10 : 0,
              y: isHovered ? -10 : 0,
              transition: { duration: 0.5, ease: "easeInOut" },
            }}
          >
            <img
              src="/animation/card3/coin4.png"
              alt="Token coin"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>

      {/* Versão mobile da imagem e moedas */}
      <div className="md:hidden">
        <motion.div
          className="absolute bottom-0 right-0"
          style={{ zIndex: 1 }}
          animate={{
            y: isHovered ? 15 : 0,
            x: isHovered ? -10 : 0,
            scale: isHovered ? 1.1 : 1,
            transition: { duration: 0.5, ease: "easeInOut" },
          }}
        >
          <img
            src="/animation/card3/img-adriano2.png"
            alt="Adriano"
            className="h-[220px] object-contain"
          />
        </motion.div>

        <div className="absolute top-0 left-0 flex justify-between w-full px-6 py-4">
          <motion.div
            style={{
              zIndex: 1,
              width: "70px",
              transformOrigin: "top",
            }}
            animate={{
              scale: isHovered ? 1.2 : 1,
              rotate: isHovered ? 8 : 0,
              y: isHovered ? 5 : 0,
              transition: { duration: 0.5, ease: "easeInOut" },
            }}
          >
            <img
              src="/animation/card3/coin3.png"
              alt="Token coin"
              className="w-full object-cover"
            />
          </motion.div>

          <motion.div
            style={{
              zIndex: 1,
              width: "70px",
              transformOrigin: "top",
            }}
            animate={{
              scale: isHovered ? 1.1 : 1,
              rotate: isHovered ? -8 : 0,
              y: isHovered ? 5 : 0,
              transition: { duration: 0.5, ease: "easeInOut" },
            }}
          >
            <img
              src="/animation/card3/coin4.png"
              alt="Token coin"
              className="w-full object-cover"
            />
          </motion.div>
        </div>
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
