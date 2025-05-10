"use client";
import { useRef, useEffect, useState } from "react";
import { LogoIcon } from "../Icons/LogoIcon";
import { Button } from "../Button";
import Image from "next/image";
import { SimulationIcon } from "../Icons/SimulationIcon";
import { PurchaseIcon } from "../Icons/PurchaseIcon";
import ItemCard from "../ItemCard.tsx";
import { ScrollAnimation } from "../ScrollAnimation";
import { motion, AnimatePresence } from "framer-motion";
import { itensData } from "@/constants";
import { usePurchase } from "@/hooks/usePurchase";

export function BoxSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [processingStage, setProcessingStage] = useState<
    "processing" | "result" | null
  >(null);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isMobile, setIsMobile] = useState(false);
  const { initializeCollection } = usePurchase();

  useEffect(() => {
    initializeCollection();
  }, []);

  const carouselItems = [];
  for (let i = 0; i < 30; i++) {
    const item = itensData[i % itensData.length];
    carouselItems.push(item);
  }

  const itemWidth = 160;
  const itemGap = 60;
  const speed = 0.1;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const animate = () => {
    if (!carouselRef.current) return;
    const currentTransform =
      carouselRef.current.style.transform || "translateX(0px)";
    let position = parseFloat(
      currentTransform.replace("translateX(", "").replace("px)", "")
    );
    position -= speed;
    const resetPoint = -((itemWidth + itemGap) * itensData.length);
    if (position <= resetPoint) {
      position = 0;
    }
    carouselRef.current.style.transform = `translateX(${position}px)`;
    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.style.transform = "translateX(0px)";
    }
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const handlePurchaseSimulation = () => {
    setShowModal(true);
    setProcessingStage("processing");
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * itensData.length);
      setSelectedItem(itensData[randomIndex]);
      setProcessingStage("result");
    }, 3000);
  };

  const closeModal = () => {
    setShowModal(false);
    setProcessingStage(null);
    setSelectedItem(null);
  };

  return (
    <>
      <section className="flex flex-col items-center justify-center w-full">
        <ScrollAnimation
          type="fade"
          direction="up"
          duration={0.8}
          className="bg-[#0F0F0F] mt-[56px] md:mt-[64px] flex flex-col items-center justify-center border-y border-[#222222] w-full h-[250px] sm:h-[280px] md:h-[318px] relative overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center z-0">
            <motion.div
              className="bg-[#6E6E6E]/50 w-[20rem] sm:w-[30rem] md:w-[40rem] h-[20rem] sm:h-[30rem] md:h-[40rem] rounded-full blur-[80px] md:blur-[140px]"
              animate={{
                scale: isHovered ? 1.1 : 1,
                opacity: isHovered ? 0.7 : 0.5,
                transition: { duration: 1.2, ease: "easeInOut" },
              }}
            />
          </div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center z-0">
            <motion.div
              className="w-[20rem] sm:w-[30rem] md:w-[40rem] h-[20rem] sm:h-[30rem] md:h-[40rem] rounded-full border-[2px] md:border-[3px] border-[rgb(58,58,58)]"
              animate={{
                scale: isHovered ? 1.05 : 1,
                borderWidth: isHovered ? "3px" : "2px",
                transition: { duration: 1, ease: "easeInOut" },
              }}
            />
          </div>

          <div
            ref={containerRef}
            className="relative w-full h-full overflow-hidden z-10"
          >
            {/* Gradiente de fade à esquerda */}
            <div className="absolute left-0 top-0 bottom-0 z-20 w-[15%] sm:w-[20%] md:w-[25%] pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-r from-[#0F0F0F] via-[#0F0F0F]/80 to-transparent"></div>
            </div>

            {/* Itens do carrossel */}
            <div
              ref={carouselRef}
              className="absolute flex items-center h-full"
              style={{ gap: `${itemGap}px` }}
            >
              {carouselItems.map((item, index) => (
                <motion.div
                  key={`item-${index}`}
                  className="flex-shrink-0 bg-fill bg-center bg-no-repeat rounded-md"
                  style={{ 
                    width: `${itemWidth * (isMobile ? 0.8 : 1)}px`, 
                    height: `${itemWidth * (isMobile ? 0.8 : 1)}px` 
                  }}
                  whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={100000}
                    height={100000}
                    className="w-full h-full object-fill"
                  />
                </motion.div>
              ))}
            </div>

            <div className="absolute right-0 top-0 bottom-0 z-20 w-[15%] sm:w-[20%] md:w-[25%] pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-l from-[#0F0F0F] via-[#0F0F0F]/80 to-transparent"></div>
            </div>
          </div>
        </ScrollAnimation>

        <div className="flex flex-col w-full max-w-[1280px] px-6 md:px-0 pt-6">
          <ScrollAnimation
            type="fade"
            direction="up"
            delay={0.2}
            duration={0.7}
          >
            <div className="flex flex-col md:flex-row items-start md:items-center w-full justify-between gap-4 md:gap-16">
              <div className="flex items-center gap-4 sm:gap-8">
                <motion.div
                  whileHover={{
                    rotate: [0, -5, 5, -5, 0],
                    transition: { duration: 0.5 },
                  }}
                  className="w-24 h-16 sm:w-32 sm:h-auto"
                >
                  <Image
                    src="/images/random-box.png"
                    alt="random"
                    width={130}
                    height={88}
                    className="w-full h-full object-contain"
                  />
                </motion.div>
                <div className="flex flex-col gap-2">
                  <motion.h1
                    className="bg-gradient-to-r from-[#FFF7A8] to-[#FFEB28] bg-clip-text text-transparent font-bold text-xl sm:text-2xl"
                    animate={{
                      textShadow: isHovered
                        ? "0 0 8px rgba(255, 235, 40, 0.5)"
                        : "0 0 0px rgba(255, 235, 40, 0)",
                      transition: {
                        duration: 0.5,
                        repeat: Infinity,
                        repeatType: "reverse",
                      },
                    }}
                  >
                    Box!
                  </motion.h1>
                  <p className="text-xs sm:text-sm text-[#B4B4B4] max-w-[300px] sm:max-w-none">
                    We value the importance of solidarity and empathy, offering
                    the opportunity to win essential products that make a
                    difference in everyday life!
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-start md:items-end gap-2 w-full md:w-auto mt-4 md:mt-0">
                <motion.div
                  className="flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                >
                  <LogoIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span className="font-bold text-xl sm:text-2xl">100.00</span>
                </motion.div>
                <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                  <motion.div whileHover={{ scale: 1.03 }} className="w-full sm:w-auto">
                    <Button
                      className="w-full sm:w-[209px] h-[44px] sm:h-[52px]"
                      variant="secondary"
                      onClick={handlePurchaseSimulation}
                    >
                      <SimulationIcon className="w-5 h-5" />
                      <span className="ml-1 text-sm sm:text-base">Simulation</span>
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.03 }} className="w-full sm:w-auto">
                    <Button
                      className="w-full sm:w-[209px] h-[44px] sm:h-[52px]"
                      variant="primary"
                      onClick={handlePurchaseSimulation}
                    >
                      <PurchaseIcon className="w-5 h-5" />
                      <span className="ml-1 text-sm sm:text-base">Purchase</span>
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </ScrollAnimation>

          <ScrollAnimation
            type="fade"
            direction="up"
            delay={0.4}
            duration={0.7}
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 mt-10">
              {itensData.map((box, index) => (
                <motion.div
                  key={box.id + index}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <ItemCard key={box.id} item={box} />
                </motion.div>
              ))}
            </div>
          </ScrollAnimation>
        </div>
      </section>

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/80"
              onClick={closeModal}
            />
            <motion.div
              className="bg-[#0F0F0F] p-4 sm:p-8 rounded-xl w-[90%] max-w-[550px] relative z-10"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
                onClick={closeModal}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              {processingStage === "processing" && (
                <div className="flex flex-col items-center justify-center py-6 sm:py-10">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 mb-6">
                    <motion.div
                      className="absolute inset-0 border-4 border-t-[#FFD700] border-r-transparent border-b-transparent border-l-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    <motion.div
                      className="absolute inset-2 border-4 border-t-[#FFD700] border-r-transparent border-b-transparent border-l-transparent rounded-full"
                      animate={{ rotate: -360 }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-center mb-2">
                    Processing your purchase
                  </h3>
                  <p className="text-[#B4B4B4] text-center text-sm sm:text-base">
                    Opening your mystery box...
                  </p>
                </div>
              )}

              {processingStage === "result" && selectedItem && (
                <div className="flex flex-col items-center justify-center py-4 sm:py-6">
                  <motion.div
                    initial={{ scale: 0, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", damping: 10, stiffness: 100 }}
                    className="mb-4 sm:mb-6 relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700]/30 to-[#FFA500]/30 rounded-full filter blur-xl"></div>
                    <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-xl overflow-hidden">
                      <div className="w-full h-full">
                        <Image
                          src={selectedItem.image}
                          alt={selectedItem.title}
                          width={160}
                          height={160}
                          className="w-full h-full object-fill"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0F0F0F]/30"></div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-center"
                  >
                    <motion.h3
                      className="text-xl sm:text-2xl font-bold mb-2 bg-gradient-to-r from-[#FFF7A8] to-[#FFEB28] bg-clip-text text-transparent"
                      animate={{
                        textShadow: [
                          "0 0 8px rgba(255, 235, 40, 0.2)",
                          "0 0 15px rgba(255, 235, 40, 0.4)",
                          "0 0 8px rgba(255, 235, 40, 0.2)",
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      Congratulations!
                    </motion.h3>
                    <h4 className="text-lg sm:text-xl font-semibold mb-1">
                      {selectedItem.title}
                    </h4>
                    <p className="text-[#B4B4B4] text-sm sm:text-base mb-3">
                      Value:{" "}
                      {selectedItem.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </p>

                    <div className="flex justify-center mt-4">
                      <Button
                        className="w-full max-w-[280px] h-[48px]"
                        variant="primary"
                        onClick={closeModal}
                      >
                        Awesome!
                      </Button>
                    </div>
                  </motion.div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
