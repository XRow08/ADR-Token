"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StakingCard } from "@/components/StakingCard";

export default function StakingPage() {
  return (
    <section className="w-full min-h-screen">
      <Header />
      <div className="flex flex-col items-center justify-start bg-[url('/images/bg-staking.png')] bg-cover bg-center min-h-screen py-20">
        <div className="flex flex-col items-end max-w-[1280px] mt-20 w-full px-4 mx-auto">
          <StakingCard />
        </div>
      </div>
      <Footer />
    </section>
  );
}
