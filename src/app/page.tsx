import { Button } from "@/components/Button";
import { Header } from "@/components/Header";
import { ScrollAnimation } from "@/components/ScrollAnimation";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-[#0F0F0F]">
      <Header />
      <div className="w-full min-h-screen flex flex-col items-center justify-start pt-[144px] bg-[url('/images/home_bg.webp')] bg-cover bg-center">
        <ScrollAnimation type="fade" direction="down" duration={0.8} delay={0.2}>
          <h1 className="text-[#EEE] text-[36px] xl:text-[56px] w-full text-center leading-[61.6px]">
            The only official <br /> <span className="bg-gradient-to-r from-[#FFF7A8] to-[#FFEB28] bg-clip-text text-transparent">Adriano Imperador</span> token
          </h1>
        </ScrollAnimation>
        
        <ScrollAnimation type="fade" direction="up" duration={0.7} delay={0.5}>
          <p className="xl:text-lg xl:leading-[23.4px] text-center text-[#B4B4B4]">
            Own a piece of Adriano Imperador legacy. Be a part of the $ADR
            movement—where <br /> holders play, win, and unlock exclusive rewards.
          </p>
        </ScrollAnimation>
        
        <ScrollAnimation type="scale" duration={0.6} delay={0.8}>
          <Button className="mt-[40px]">Buy token $ADR</Button>
        </ScrollAnimation>
      </div>
    </section>
  );
}
