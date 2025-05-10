"use client";
import { StaggeredContainer } from "@/components/StaggeredContainer";
import { Card1, Card2, Card3, Card4 } from "@/components/Cards";

export const FeaturesGrid = () => {
  return (
    <StaggeredContainer
      className="flex flex-col mt-8 w-full px-6 sm:px-8 lg:px-0 max-w-[1440px] mx-auto"
      delay={0.2}
      staggerDelay={0.15}
      type="slide"
      direction="up"
    >
      <div className="hidden md:flex items-center justify-between h-[317px] w-full gap-3">
        <Card1
          title="More than a Token: A Movement"
          description="The Adriano Token stems from the genuine desire to give back to the community what football provided to Adriano. Using blockchain technology, the project connects innovation with real impact, creating opportunities and new paths for young people from Vila Cruzeiro."
          width="lg:min-w-[733px] w-[733px]"
        />

        <Card2
          title="Transformation in Vila Cruzeiro"
          description="Part of the resources generated with the Adriano Token will be allocated to social projects: education, sports, culture, and local entrepreneurship."
          width="w-full"
        />
      </div>

      <div className="hidden md:flex items-center justify-between h-[317px] w-full gap-3 mt-3">
        <Card3
          title="Strong roots, big dreams"
          description="Unlike disconnected initiatives, the Adriano Token is built around a true and living relationship with Vila Cruzeiro. It's not just about honoring history."
          width="lg:min-w-[843px] w-[843px]"
        />

        <Card4 
          buttonText="Buy token $ADR"
          width="w-full"
        />
      </div>

      <div className="flex flex-col md:hidden w-full gap-6">
        <div className="h-[280px] w-full">
          <Card1
            title="More than a Token: A Movement"
            description="The Adriano Token stems from the genuine desire to give back to the community what football provided to Adriano. Using blockchain technology, the project connects innovation with real impact, creating opportunities and new paths for young people from Vila Cruzeiro."
            width="w-full"
          />
        </div>
        
        <div className="h-[280px] w-full">
          <Card2
            title="Transformation in Vila Cruzeiro"
            description="Part of the resources generated with the Adriano Token will be allocated to social projects: education, sports, culture, and local entrepreneurship."
            width="w-full"
          />
        </div>
        
        <div className="h-[280px] w-full">
          <Card3
            title="Strong roots, big dreams"
            description="Unlike disconnected initiatives, the Adriano Token is built around a true and living relationship with Vila Cruzeiro. It's not just about honoring history."
            width="w-full"
          />
        </div>
        
        <div className="h-[140px] w-full">
          <Card4 
            buttonText="Buy token $ADR"
            width="w-full"
          />
        </div>
      </div>
    </StaggeredContainer>
  );
};
