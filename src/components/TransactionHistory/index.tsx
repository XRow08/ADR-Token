"use client";

import { useState, useRef } from "react";
import { LogoIcon } from "../Icons/LogoIcon";
import { ShirtIcon } from "../Icons/ShirtIcon";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { Header } from "../Header";

type Transaction = {
  id: string;
  name: string;
  value: number;
  status: "Completed" | "Error" | "Processing...";
  date: string;
};

export function TransactionHistory() {
  const [activeTab, setActiveTab] = useState<"all" | "recent">("all");
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  const transactions: Transaction[] = [
    {
      id: "0sda0da0sdx...",
      name: "Brazil Jersey",
      value: 123.0,
      status: "Completed",
      date: "03/03/2024 12:02:01",
    },
    {
      id: "0sda0da0sdx...",
      name: "Brazil Jersey",
      value: 123.0,
      status: "Completed",
      date: "03/03/2024 12:02:01",
    },
    {
      id: "0sda0da0sdx...",
      name: "Brazil Jersey",
      value: 123.0,
      status: "Error",
      date: "03/03/2024 12:02:01",
    },
    {
      id: "0sda0da0sdx...",
      name: "Brazil Jersey",
      value: 123.0,
      status: "Processing...",
      date: "03/03/2024 12:02:01",
    },
    {
      id: "0sda0da0sdx...",
      name: "Brazil Jersey",
      value: 123.0,
      status: "Completed",
      date: "03/03/2024 12:02:01",
    },
    {
      id: "0sda0da0sdx...",
      name: "Brazil Jersey",
      value: 123.0,
      status: "Processing...",
      date: "03/03/2024 12:02:01",
    },
    {
      id: "0sda0da0sdx...",
      name: "Brazil Jersey",
      value: 123.0,
      status: "Processing...",
      date: "03/03/2024 12:02:01",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="w-full bg-[#0F0F0F] min-h-screen ">
      <Header />
      <div className="w-full max-w-[1280px] mx-auto px-4 py-6 pt-20">
        <motion.div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4"
          variants={headerVariants}
          initial="hidden"
          animate="visible"
        >
          <h1 className="text-2xl font-bold text-white">
            Transaction History
          </h1>

          <button
            onClick={() => setActiveTab("recent")}
            className="px-4 py-2 rounded-md text-sm bg-[#1A1A1A] text-gray-400 hover:bg-[#222222] transition-colors"
          >
            Recent
            <span className="ml-2">→</span>
          </button>
        </motion.div>

        <motion.div
          ref={containerRef}
          className="bg-[#0F0F0F] border border-[#222222] rounded-md overflow-hidden"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Table header - visible only on desktop */}
          <div className="hidden sm:grid grid-cols-5 px-5 py-3 bg-[#1A1A1A] text-gray-400 text-sm font-medium">
            <div className="col-span-1">Name</div>
            <div className="col-span-1">ID</div>
            <div className="col-span-1">Value</div>
            <div className="col-span-1">Status</div>
            <div className="col-span-1">Date</div>
          </div>

          <div>
            {transactions.map((transaction, index) => (
              <motion.div
                key={index}
                className="border-b border-[#222222] last:border-b-0"
                variants={itemVariants}
                whileHover={{ backgroundColor: "rgba(26,26,26,0.5)" }}
              >
                {/* Desktop layout */}
                <div className="hidden sm:grid grid-cols-5 px-5 py-4 text-white">
                  <div className="col-span-1 flex items-center gap-2">
                    <ShirtIcon className="w-6 h-6 flex-shrink-0" />
                    <span className="text-sm">{transaction.name}</span>
                  </div>
                  <div className="col-span-1 text-gray-400 text-sm flex items-center">
                    {transaction.id}
                    <button className="ml-1 opacity-70 hover:opacity-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect
                          x="9"
                          y="9"
                          width="13"
                          height="13"
                          rx="2"
                          ry="2"
                        ></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                      </svg>
                    </button>
                  </div>
                  <div className="col-span-1 flex items-center">
                    <LogoIcon className="w-4 h-4 mr-1" />
                    <span className="text-sm">
                      {transaction.value.toFixed(2)}
                    </span>
                  </div>
                  <div className="col-span-1">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs ${
                        transaction.status === "Completed"
                          ? "bg-green-900/30 text-green-500"
                          : transaction.status === "Error"
                          ? "bg-red-900/30 text-red-500"
                          : "bg-amber-900/30 text-amber-500"
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </div>
                  <div className="col-span-1 text-gray-400 text-xs">
                    {transaction.date}
                  </div>
                </div>

                {/* Mobile layout */}
                <div className="sm:hidden p-4 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ShirtIcon className="w-6 h-6 flex-shrink-0" />
                      <span className="text-sm text-white">
                        {transaction.name}
                      </span>
                    </div>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs ${
                        transaction.status === "Completed"
                          ? "bg-green-900/30 text-green-500"
                          : transaction.status === "Error"
                          ? "bg-red-900/30 text-red-500"
                          : "bg-amber-900/30 text-amber-500"
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <LogoIcon className="w-4 h-4 mr-1" />
                      <span className="text-sm text-white">
                        {transaction.value.toFixed(2)}
                      </span>
                    </div>
                    <div className="text-gray-400 text-xs">
                      {transaction.date}
                    </div>
                  </div>

                  <div className="flex items-center text-gray-400 text-xs">
                    <span>ID: {transaction.id}</span>
                    <button className="ml-1 opacity-70 hover:opacity-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect
                          x="9"
                          y="9"
                          width="13"
                          height="13"
                          rx="2"
                          ry="2"
                        ></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
