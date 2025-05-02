"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ScrollAnimation } from "@/components/ScrollAnimation";

// Images for the carousels - replace with your actual image paths
const topCarouselImages = [
  "/images/carousel1/img-galeria01.png",
  "/images/carousel1/img-galeria02.png",
  "/images/carousel1/img-galeria03.png",
  "/images/carousel1/img-galeria04.png",
  "/images/carousel1/img-galeria05.png",
  "/images/carousel1/img-galeria06.png",
  "/images/carousel1/img-galeria07.png",
  "/images/carousel1/img-galeria08.png",
  "/images/carousel1/img-galeria09.png",
];

const bottomCarouselImages = [
  "/images/carousel2/img-galeria10.png",
  "/images/carousel2/img-galeria11.png",
  "/images/carousel2/img-galeria12.png",
  "/images/carousel2/img-galeria14.png",
  "/images/carousel2/img-galeria15.png",
  "/images/carousel2/img-galeria16.png",
  "/images/carousel2/img-galeria17.png",
  "/images/carousel2/img-galeria18.png",
];

export const CarouselSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Transform scroll progress to carousel movement
  const topCarouselX = useTransform(scrollYProgress, [0, 1], ["50%", "-100%"]);
  const bottomCarouselX = useTransform(
    scrollYProgress,
    [0, 1],
    ["-100%", "100%"]
  );

  return (
    <div
      ref={sectionRef}
      className="w-full min-h-screen flex flex-col items-center justify-start pt-20 pb-10 md:pb-0 overflow-hidden"
    >
      {/* Top carousel - moves left */}
      <div className="w-full mt-0 overflow-hidden -rotate-[4deg] relative">
        {/* Left fade */}
        <div className="absolute top-0 left-0 w-[200px] h-full z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to right, #0F0F0F 0%, rgba(15, 15, 15, 0) 100%)"
          }}
        />
        
        <motion.div className="flex gap-4 py-4" style={{ x: topCarouselX }}>
          {/* Duplicate images for infinite scroll effect */}
          {topCarouselImages.map((src, index) => (
            <div
              key={`top-${index}`}
              className="relative min-w-[300px] h-[200px] rounded-lg overflow-hidden flex-shrink-0"
            >
              <Image
                src={src}
                alt={`Impact image ${index}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </motion.div>
        
        {/* Right fade */}
        <div className="absolute top-0 right-0 w-[200px] h-full z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to left, #0F0F0F 0%, rgba(15, 15, 15, 0) 100%)"
          }}
        />
      </div>

      {/* Bottom carousel - moves right */}
      <div className="w-full mt-6 overflow-hidden -rotate-[4deg] relative">
        {/* Left fade */}
        <div className="absolute top-0 left-0 w-[200px] h-full z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to right, #0F0F0F 0%, rgba(15, 15, 15, 0) 100%)"
          }}
        />
        
        <motion.div className="flex gap-4 py-4" style={{ x: bottomCarouselX }}>
          {/* Duplicate images for infinite scroll effect */}
          {bottomCarouselImages.map((src, index) => (
            <div
              key={`bottom-${index}`}
              className="relative min-w-[300px] h-[200px] rounded-lg overflow-hidden flex-shrink-0"
            >
              <Image
                src={src}
                alt={`Impact image ${index}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </motion.div>
        
        {/* Right fade */}
        <div className="absolute top-0 right-0 w-[200px] h-full z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to left, #0F0F0F 0%, rgba(15, 15, 15, 0) 100%)"
          }}
        />
      </div>
    </div>
  );
};
