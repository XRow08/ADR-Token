"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "disabled"> {
  className?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  disabled?: boolean;
}

export const Button = ({
  className = "",
  children,
  variant = "primary",
  disabled = false,
  ...props
}: ButtonProps) => {
  const baseStyles =
    "px-6 py-2 rounded-md font-bold transition-all duration-300 ease-in-out flex justify-center items-center gap-2";
  const variantStyles = {
    primary:
      "bg-gradient-to-br hover:from-[#24682B] hover:to-[#0B3B10] from-[#0B3B10] to-[#24682B] text-[#ADF0B4] border-[1.5px] border-[#28D939] hover:scale-[1.02]",
    secondary:
      "bg-transparent hover:bg-[#222] active:bg-[#313131] text-[#B4B4B4] border-[1.5px] border-[#484848] hover:scale-[1.02]",
    disabled: "cursor-not-allowed bg-[#2A2A2A] text-[#7B7B7B]",
  };

  return (
    <motion.button
      className={`${baseStyles} ${
        variantStyles[disabled ? "disabled" : variant]
      } ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  );
};
