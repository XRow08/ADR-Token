"use client";

import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "framer-motion";

interface ScrollAnimationProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right";
  type?: "fade" | "slide" | "scale" | "rotate";
  once?: boolean;
}

export const ScrollAnimation = ({
  children,
  className = "",
  delay = 0,
  duration = 0.5,
  direction = "up",
  type = "fade",
  once = true,
}: ScrollAnimationProps) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once, margin: "-50px 0px" });
  
  // Calculate initial and animate states based on type and direction
  const getInitialState = () => {
    switch (type) {
      case "fade":
        return { opacity: 0, y: direction === "up" ? 30 : direction === "down" ? -30 : 0, x: direction === "left" ? 30 : direction === "right" ? -30 : 0 };
      case "slide":
        return { 
          x: direction === "left" ? 50 : direction === "right" ? -50 : 0,
          y: direction === "up" ? 50 : direction === "down" ? -50 : 0,
          opacity: 0
        };
      case "scale":
        return { scale: 0.8, opacity: 0 };
      case "rotate":
        return { rotate: direction === "left" ? -10 : 10, opacity: 0 };
      default:
        return { opacity: 0 };
    }
  };

  const variants = {
    hidden: getInitialState(),
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      rotate: 0,
      transition: {
        duration: duration,
        delay: delay,
        ease: [0.25, 0.1, 0.25, 1], // Custom easing function for smooth feel
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}; 