"use client";

import { useState } from "react";
import Image from "next/image";
import BoxCard, { BoxItem } from "@/components/BoxCard";
import { Header } from "@/components/Header";

const boxData: BoxItem[] = [
  {
    id: "adr-premium",
    title: "ADR prêmios",
    image: "/images/boxes/adr-box.png",
    price: 10.21,
  },
  {
    id: "cryptos",
    title: "Cryptos",
    image: "/images/boxes/crypto-box.png",
    price: 10.21,
  },
  {
    id: "super-premio",
    title: "Super prêmio",
    image: "/images/boxes/super-box.png",
    price: 10.21,
  },
];

export default function BoxesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#0F0F0F] text-white pb-24 w-full">
      <Header />

      <div className="container w-full px-4 py-8 md:pt-[80px] mt-[80px] max-w-[1440px] md:mt-0">
        <div className='bg-[url("/images/banner.png")]  bg-cover bg-center h-[320px] sm:h-[320px] rounded-xl mb-8' />
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">All Boxes</h2>
          <div className="flex items-center space-x-2">
            <div className="text-sm text-gray-400 flex items-center">
              <span>Recentes</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="bg-[#1A1A1A] rounded-full px-4 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {boxData.map((box) => (
            <BoxCard key={box.id} box={box} />
          ))}
        </div>
      </div>
    </div>
  );
}
