"use client";
import { Header } from "@/components/Header";
import { BoxSection } from "@/components/BoxSection";
import { useParams } from "next/navigation";

export default function BoxPage() {
  const { box } = useParams();
  const boxName = box as string;

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#0F0F0F] text-white pb-24 w-full">
      <Header />
      <BoxSection boxName={boxName} />
    </div>
  );
}
