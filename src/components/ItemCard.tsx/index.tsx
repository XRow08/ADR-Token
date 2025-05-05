"use client";

import Image from "next/image";
import { LogoIcon } from "../Icons/LogoIcon";

interface ItemCardProps {
  item: {
    id: string;
    title: string;
    image: string;
    price: number;
    probability?: number;
  };
}

export default function ItemCard({ item }: ItemCardProps) {
  return (
    <div className="bg-[#171717] rounded-lg overflow-hidden hover:bg-[#1E1E1E] transition-colors">
      <div className="w-full h-[150px] relative">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-contain p-1 pt-4"
        />
      </div>
      <div className="flex gap-2 p-4 justify-between">
        <div className="flex flex-col w-full gap-2">
          <h3 className="text-lg bg-gradient-to-r from-[#FFF7A8] to-[#FFEB28] bg-clip-text text-transparent font-bold mb-2">
            {item.title}
          </h3>
          <div className="flex items-center w-full justify-between">
            <div className="flex items-center bg-[#222222] rounded-lg px-2 py-1 gap-2 w-min">
              <LogoIcon className="w-5 h-6" />
              <span className="font-bold">{item.price}</span>
            </div>
            <p className="flex items-center bg-[#222222] rounded-lg px-2 py-1 gap-2 w-min">
              {item.probability}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
