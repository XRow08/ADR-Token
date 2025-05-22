"use client";
import { ScrollAnimation } from "@/components/ScrollAnimation";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
export const ImpactSection = () => {
  const { t } = useLanguage();
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start pt-[144px] pb-20 md:pb-0">
      <div className="flex flex-col items-center justify-center max-w-[1062px] px-6 md:px-0">
        <ScrollAnimation
          type="slide"
          direction="down"
          duration={0.7}
          delay={0.1}
        >
          <h1 className="text-[#EEE] text-[30px] xl:text-[36px] w-full font-bold text-center leading-[40px] md:leading-[61.6px]">
            {t("impact.title")}
          </h1>
        </ScrollAnimation>

        <ScrollAnimation type="fade" direction="up" duration={0.7} delay={0.3}>
          <p className="xl:leading-[23.4px] text-center text-[#B4B4B4]">
            {t("impact.description1")}
          </p>
        </ScrollAnimation>
      </div>

      <ScrollAnimation
        type="scale"
        duration={0.8}
        delay={0.4}
        className="mt-8 w-full max-w-[1280px]"
      >
        <div className="relative w-full h-[368px] rounded-xl overflow-hidden">
          <Image
            src="/images/bg-section3.png"
            alt="Blockchain and Social Impact"
            fill
            className="object-cover"
            priority
          />
        </div>
      </ScrollAnimation>

      <ScrollAnimation type="slide" direction="up" duration={0.6} delay={0.6}>
        <p className="xl:leading-[23.4px] text-center text-[#B4B4B4] max-w-[1062px] mt-4 px-6 md:px-0">
          {t("impact.description2")}
        </p>
      </ScrollAnimation>
    </div>
  );
};
