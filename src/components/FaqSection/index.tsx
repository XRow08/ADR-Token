"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../Button";
import { IoIosArrowDown } from "react-icons/io";

const faqData = [
  {
    question: "What is the tokenomics of the $ADR token?",
    answer:
      "The $ADR token is a utility token for the Vila Cruzeiro community. It has a fixed supply of 1 billion tokens, with 30% allocated to community initiatives, 25% for platform development, 20% for the team and advisors (vested over 3 years), 15% for marketing and partnerships, and 10% for liquidity provisioning.",
  },
  {
    question: "How can I use ADR Tokens on the platform?",
    answer:
      "ADR Tokens can be used to purchase mystery boxes with chances to win exclusive items, access premium features, participate in community governance decisions, and receive special benefits within the platform ecosystem.",
  },
  {
    question: "Is ADR Token available on multiple blockchains?",
    answer:
      "Currently, ADR Token is available on the Solana blockchain. We chose Solana for its fast transaction speeds, low fees, and environmental efficiency. We may explore cross-chain compatibility in the future based on community needs.",
  },
  {
    question: "How do I get started with ADR Tokens?",
    answer:
      "To get started, connect your Solana wallet (like Phantom or Solflare), purchase ADR Tokens either directly through our platform or from supported exchanges, and then use them to access platform features like mystery boxes.",
  },
  {
    question: "Are there any fees for purchasing or using ADR Tokens?",
    answer:
      "When purchasing ADR Tokens, you'll only pay the standard Solana network transaction fees, which are typically less than $0.01. There are no additional platform fees for holding or using your tokens within our ecosystem.",
  },
];

const FaqItem = ({
  question,
  answer,
  isOpen,
  onClick,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <motion.div
      className="border-b border-gray-700 last:border-b-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <button
        onClick={onClick}
        className="flex justify-between items-center w-full py-5 px-4 text-left focus:outline-none"
      >
        <h3 className="text-base sm:text-lg font-semibold text-white pr-4">{question}</h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          <IoIosArrowDown className="text-emerald-400 text-xl" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="px-4 pb-5 text-sm sm:text-base text-gray-300">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full flex flex-col items-center justify-start py-16 sm:py-24 overflow-hidden bg-[#0F0F0F]">
      <motion.div
        className="flex flex-col md:flex-row md:items-start md:justify-between max-w-[1280px] w-full gap-8 md:gap-12 lg:gap-16 px-6 lg:px-0"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-start justify-start text-start mb-8 md:mb-0 w-full md:w-auto">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            FAQ
          </motion.h2>
          <motion.p
            className="text-sm sm:text-base text-gray-300 max-w-md mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Clear answers to the questions we hear most — because trust starts
            with transparency
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="w-full sm:w-auto"
          >
            <Button className="w-full sm:w-auto px-6 sm:px-8 py-3 text-base sm:text-lg">Buy token $ADR</Button>
          </motion.div>
        </div>

        <motion.div
          className="w-full md:w-3/5 rounded-xl overflow-hidden shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {faqData.map((faq, index) => (
            <FaqItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => toggleFaq(index)}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
