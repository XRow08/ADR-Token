"use client";
import { motion } from "framer-motion";
import { useLanguage, Language } from "@/contexts/LanguageContext";

interface LanguageToggleProps {
  className?: string;
}

export function LanguageToggle({ className = "" }: LanguageToggleProps) {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    const newLanguage: Language = language === "en" ? "pt" : "en";
    setLanguage(newLanguage);
  };

  return (
    <motion.button
      onClick={toggleLanguage}
      className={`relative flex items-center gap-2 px-3 py-2 rounded-lg border border-[#333] bg-[#1A1A1A] hover:bg-[#2A2A2A] transition-all duration-200 ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title={language === "en" ? "Switch to Portuguese" : "Mudar para Inglês"}
    >
      <div className="flex items-center gap-1">
        <motion.div
          className={`w-5 h-3 rounded-sm overflow-hidden ${
            language === "en" ? "opacity-100" : "opacity-50"
          }`}
          animate={{ scale: language === "en" ? 1 : 0.8 }}
          transition={{ duration: 0.2 }}
        >
          {/* US Flag */}
          <svg viewBox="0 0 24 16" className="w-full h-full">
            <rect width="24" height="16" fill="#B22234" />
            <rect width="24" height="1.23" y="1.23" fill="white" />
            <rect width="24" height="1.23" y="3.69" fill="white" />
            <rect width="24" height="1.23" y="6.15" fill="white" />
            <rect width="24" height="1.23" y="8.61" fill="white" />
            <rect width="24" height="1.23" y="11.07" fill="white" />
            <rect width="24" height="1.23" y="13.53" fill="white" />
            <rect width="9.6" height="8.61" fill="#3C3B6E" />
          </svg>
        </motion.div>

        <span className="text-xs text-gray-400">/</span>

        <motion.div
          className={`w-5 h-3 rounded-sm overflow-hidden ${
            language === "pt" ? "opacity-100" : "opacity-50"
          }`}
          animate={{ scale: language === "pt" ? 1 : 0.8 }}
          transition={{ duration: 0.2 }}
        >
          {/* Brazil Flag */}
          <svg viewBox="0 0 24 16" className="w-full h-full">
            <rect width="24" height="16" fill="#009739" />
            <polygon points="12,2 22,8 12,14 2,8" fill="#FEDD00" />
            <circle cx="12" cy="8" r="3" fill="#012169" />
          </svg>
        </motion.div>
      </div>

      {/* Current Language Code */}
      <motion.span
        className="text-xs font-medium text-white uppercase"
        key={language}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {language}
      </motion.span>
    </motion.button>
  );
}
