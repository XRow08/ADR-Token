"use client";
import { LogoIcon } from "@/components/Icons/LogoIcon";
import { ScrollAnimation } from "@/components/ScrollAnimation";
import { useLanguage } from "@/contexts/LanguageContext";
export const AboutSection = () => {
  const { t } = useLanguage();
  return (
    <div className="flex items-start md:items-center justify-between px-6 md:px-0">
      <ScrollAnimation
        type="slide"
        direction="right"
        duration={0.75}
        delay={0.1}
        className="w-full flex flex-col items-start justify-start "
      >
        <h1 className="text-[#EEE] text-[24px] xl:text-[36px] font-bold w-full md:leading-[61.6px]">
          {" "}
          <span className="font-black">{t("about.title")}</span>{" "}
        </h1>{" "}
        <p className="xl:text-lg xl:leading-[23.4px] text-[#B4B4B4]">
          {" "}
          {t("about.description")}{" "}
        </p>
      </ScrollAnimation>
      <ScrollAnimation
        type="rotate"
        duration={0.8}
        delay={0.3}
        className="flex items-center justify-center bg-[#222] border border-[#3A3A3A] w-[52px] h-[52px] px-2 rounded-[4px] overflow-hidden"
      >
        <LogoIcon />
      </ScrollAnimation>
    </div>
  );
};
