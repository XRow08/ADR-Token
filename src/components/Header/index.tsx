"use client";

import { Button } from "../Button";
import { LogoIcon } from "../Icons/LogoIcon";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

// NavLink component with animations
const NavLink = ({ text, delay = 0 }: { text: string; delay?: number }) => (
  <motion.li
    initial={{ opacity: 0, y: -10 }}
    animate={{ 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        delay: delay,
      }
    }}
    whileHover={{ y: -3, color: "#28D939" }}
    whileTap={{ y: 0 }}
    className="text-white hover:text-[#28D939] transition-colors cursor-pointer relative"
  >
    {text}
    <motion.span
      className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-[#28D939]"
      initial={{ width: 0 }}
      whileHover={{ width: "100%" }}
      transition={{ duration: 0.2 }}
    />
  </motion.li>
);

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  
  // Transform values based on scroll position
  const headerOpacity = useTransform(scrollY, [0, 50], [0.8, 1]);
  const headerBlur = useTransform(scrollY, [0, 50], [0, 8]);
  const headerBgOpacity = useTransform(scrollY, [0, 100], [0, 0.7]);
  
  // Check if page has been scrolled
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
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.5,
        delay: 0.3,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };
  
  return (
    <motion.header 
      className={`w-full fixed top-0 left-0 z-50 px-[80px] h-[64px] flex items-center justify-between transition-all duration-300 ${scrolled ? 'shadow-md' : ''}`}
      style={{
        backgroundColor: scrolled ? 'rgba(15, 15, 15, 0.7)' : 'transparent',
        backdropFilter: scrolled ? 'blur(8px)' : 'blur(0px)',
        opacity: headerOpacity
      }}
    >
      <motion.div 
        className="flex items-center gap-2 cursor-pointer"
        initial="hidden"
        animate="visible"
        variants={logoVariants}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div whileHover={{ rotate: [0, -10, 10, -10, 0] }} transition={{ duration: 0.5 }}>
          <LogoIcon />
        </motion.div>
        <motion.span 
          className="text-white text-lg xl:text-[25px] font-medium"
          whileHover={{ 
            color: "#28D939",
            transition: { duration: 0.2 } 
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
        <Button>Buy token $ADR</Button>
      </motion.div>
    </motion.header>
  );
}
