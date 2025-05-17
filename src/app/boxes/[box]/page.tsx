"use client";
import { Header } from "@/components/Header";
import { BoxSection } from "@/components/BoxSection";

export default function BoxPage() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-[#0F0F0F] text-white pb-24 w-full">
      <Header />
      <BoxSection />
    </div>
  );
}
