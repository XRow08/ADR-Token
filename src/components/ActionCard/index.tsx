"use client";

import { Button } from "@/components/Button";
import { ScrollAnimation } from "@/components/ScrollAnimation";

interface ActionCardProps {
  imageUrl: string;
  buttonText: string;
  buttonWidth?: string;
  buttonHeight?: string;
  delay?: number;
}

export const ActionCard = ({
  imageUrl,
  buttonText,
  buttonWidth = "w-[288px]",
  buttonHeight = "h-[56px]",
  delay = 0.35,
}: ActionCardProps) => {
  return (
    <ScrollAnimation
      type="scale"
      duration={0.6}
      delay={delay}
      className="flex flex-col justify-center items-center w-full h-full p-4 rounded-xl transition-all duration-300"
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <ScrollAnimation type="scale" duration={0.5} delay={0.7}>
        <Button className={`${buttonWidth} ${buttonHeight}`}>
          {buttonText}
        </Button>
      </ScrollAnimation>
    </ScrollAnimation>
  );
};
