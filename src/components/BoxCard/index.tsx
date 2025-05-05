'use client';

import Image from 'next/image';
import Link from 'next/link';

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
        <div className="w-full h-64 relative">
          <Image 
            src={box.image}
            alt={box.title}
            fill
            className="object-contain p-6"
          />
        </div>
        <div className="p-4 border-t border-gray-800">
          <h3 className="text-lg font-medium mb-2">{box.title}</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
              <span className="font-bold">{box.price}</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </Link>
    </div>
  );
} 