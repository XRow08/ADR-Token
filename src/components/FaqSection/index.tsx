"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../Button";
import { IoIosArrowDown } from "react-icons/io";
import { useLanguage } from "@/contexts/LanguageContext";

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
        <h3 className="text-base sm:text-lg font-semibold text-white pr-4">
          {question}
        </h3>
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
            <p className="px-4 pb-5 text-sm sm:text-base text-gray-300">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { t } = useLanguage();
  const faqData = [
    { question: t("faq.question1"), answer: t("faq.answer1") },
    { question: t("faq.question2"), answer: t("faq.answer2") },
    { question: t("faq.question3"), answer: t("faq.answer3") },
    { question: t("faq.question4"), answer: t("faq.answer4") },
    { question: t("faq.question5"), answer: t("faq.answer5") },
  ];
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
            {t("faq.title")}{" "}
          </motion.h2>{" "}
          <motion.p
            className="text-sm sm:text-base text-gray-300 max-w-md mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {" "}
            {t("faq.description")}{" "}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="w-full sm:w-auto"
          >
            <Button className="w-full sm:w-auto px-6 sm:px-8 py-3 text-base sm:text-lg">
              {t("header.buyToken")}
            </Button>
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
