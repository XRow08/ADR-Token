"use client";

import Image from "next/image";
import Link from "next/link";
import { LogoIcon } from "../Icons/LogoIcon";

export interface BoxItem {
  id: string;
  title: string;
  image: string;
  price: number;
}

interface BoxCardProps {
  box: BoxItem;
}

export default function BoxCard({ box }: BoxCardProps) {
  return (
    <div className="bg-[#171717] rounded-lg overflow-hidden hover:bg-[#1E1E1E] transition-colors">
      <Link href={`/boxes/${box.id}`} className="block">
        <div className="w-full h-[200px] relative">
          <Image
            src={box.image}
            alt={box.title}
            fill
            className="object-contain p-4"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg bg-gradient-to-r from-[#FFF7A8] to-[#FFEB28] bg-clip-text text-transparent font-bold mb-2">
            {box.title}
          </h3>
          <div className="flex items-center bg-[#222222] rounded-lg px-4 py-2 gap-2 w-min">
            <LogoIcon className="w-5 h-6" />
            <span className="font-bold">{box.price}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
