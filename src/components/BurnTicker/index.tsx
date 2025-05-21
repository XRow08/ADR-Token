"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LogoIcon } from "../Icons/LogoIcon";
import { usePathname } from "next/navigation";

type BurnTransaction = {
  id: string;
  amount: number;
  timestamp: number;
};

export function BurnTicker() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isTransactions = pathname === "/transactions";
  const isStaking = pathname === "/staking";

  if (isHome || isTransactions || isStaking) return null;

  const [transactions, setTransactions] = useState<BurnTransaction[]>([
    { id: "1", amount: 102.311, timestamp: Date.now() - 5000 },
    { id: "2", amount: 102.311, timestamp: Date.now() - 10000 },
    { id: "3", amount: 102.311, timestamp: Date.now() - 15000 },
    { id: "4", amount: 102.311, timestamp: Date.now() - 20000 },
  ]);

  const containerVariants = {
    animate: {
      x: [0, -2000],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop" as const,
          duration: 50,
          ease: "linear",
        },
      },
    },
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const newTransaction = {
        id: Math.random().toString(36).substring(2, 9),
        amount: 102.311,
        timestamp: Date.now(),
      };

      setTransactions((prev) => [...prev.slice(-20), newTransaction]);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-[#0F0F0F] overflow-hidden fixed top-[60px] left-0 right-0 z-50 drop-shadow-2xl shadow-2xl shadow-black">
      <div className="relative flex items-center h-[36px]">
        <motion.div
          className="flex items-center px-4 absolute whitespace-nowrap h-full"
          variants={containerVariants}
          animate="animate"
        >
          {[
            ...transactions,
            ...transactions,
            ...transactions,
            ...transactions,
          ].map((tx, index) => (
            <div
              key={`${tx.id}-${index}`}
              className="flex items-center relative gap-1 max-w-[163px] w-[163px] h-full px-4 bg-[url('/images/burn_bg.png')] bg-cover bg-center bg-no-repeat"
            >
              <LogoIcon className="w-5 h-5 text-white" />
              <span className="text-white font-medium text-sm md:text-base">
                102.31
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
