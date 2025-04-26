"use client";

import React from "react";
import { motion, useInView } from "framer-motion";

interface StaggeredContainerProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  direction?: "up" | "down" | "left" | "right";
  type?: "fade" | "slide" | "scale";
  once?: boolean;
}

export const StaggeredContainer = ({
  children,
  className = "",
  delay = 0,
  staggerDelay = 0.1,
  direction = "up",
  type = "fade",
  once = true,
}: StaggeredContainerProps) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once, margin: "-50px 0px" });
  
  const calculateOffset = () => {
    switch (direction) {
      case "up":
        return { y: 30 };
      case "down":
        return { y: -30 };
      case "left":
        return { x: 30 };
      case "right":
        return { x: -30 };
      default:
        return { y: 30 };
    }
  };
  
  const getAnimationProps = () => {
    const offset = calculateOffset();
    
    switch (type) {
      case "fade":
        return { opacity: 0, ...offset };
      case "slide":
        return { 
          opacity: 0, 
          x: direction === "left" ? 50 : direction === "right" ? -50 : 0,
          y: direction === "up" ? 50 : direction === "down" ? -50 : 0,
        };
      case "scale":
        return { opacity: 0, scale: 0.8, ...offset };
      default:
        return { opacity: 0 };
    }
  };

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: staggerDelay,
      },
    },
  };

  const itemVariants = {
    hidden: getAnimationProps(),
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  // Clone children and wrap them in motion.div
  const wrappedChildren = React.Children.map(children, (child) => {
    return (
      <motion.div variants={itemVariants}>
        {child}
      </motion.div>
    );
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {wrappedChildren}
    </motion.div>
  );
}; 