"use client";

import { AboutSection } from "@/components/AboutSection";
import { FeaturesGrid } from "@/components/FeaturesGrid";

export const TokenInfoSection = () => {
  return (
    <div className="w-full min-h-screen flex flex-col max-w-[1280px] pt-[144px]">
      <AboutSection />
      <FeaturesGrid />
    </div>
  );
};
