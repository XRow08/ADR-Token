import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { TokenInfoSection } from "@/components/TokenInfoSection";
import { ImpactSection } from "@/components/ImpactSection";
import { CarouselSection } from "@/components/CarouselSection";
import { TokenomicsChart } from "@/components/TokenomicsChart";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-[#0F0F0F]">
      <Header />
      <HeroSection />
      <TokenInfoSection />
      <ImpactSection />
      <CarouselSection />
      <TokenomicsChart />
    </section>
  );
}
