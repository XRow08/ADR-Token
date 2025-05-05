'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Header } from '@/components/Header';
import { BoxItem } from '@/components/BoxCard';
import BuyBoxButton from '@/components/BuyBoxButton';

// Mock data - in a real app, this would come from an API
const boxesData: BoxItem[] = [
  {
    id: 'adr-premium',
    title: 'ADR prêmios',
    image: '/images/boxes/adr-box.png',
    price: 10.21,
  },
  {
    id: 'cryptos',
    title: 'Cryptos',
    image: '/images/boxes/crypto-box.png',
    price: 10.21,
  },
  {
    id: 'super-premio',
    title: 'Super prêmio',
    image: '/images/boxes/super-box.png',
    price: 10.21,
  }
];

// Mock prizes data
const prizesData = [
  { id: 1, name: 'Soccer Jersey', image: '/images/prizes/jersey.png', rarity: 'Common', chance: '15%' },
  { id: 2, name: 'Premium Crypto', image: '/images/prizes/crypto.png', rarity: 'Rare', chance: '5%' },
  { id: 3, name: 'Sports Shoes', image: '/images/prizes/shoes.png', rarity: 'Uncommon', chance: '10%' },
  { id: 4, name: 'Digital Art NFT', image: '/images/prizes/nft.png', rarity: 'Epic', chance: '1%' },
];

export default function BoxDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  const [box, setBox] = useState<BoxItem | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Simulate API fetch
    const foundBox = boxesData.find(box => box.id === id);
    
    if (foundBox) {
      setBox(foundBox);
    } else {
      // Box not found
      router.push('/boxes');
    }
  }, [id, router]);

  if (!box) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const totalPrice = (box.price * quantity).toFixed(2);

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white">
      {/* Breadcrumb navigation */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center text-sm text-gray-400">
          <Link href="/boxes" className="hover:text-white transition-colors">
            Boxes
          </Link>
          <span className="mx-2">/</span>
          <span className="text-white">{box.title}</span>
        </div>
      </div>

      {/* Box details */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Box image */}
          <div className="bg-[#171717] rounded-lg overflow-hidden p-8">
            <div className="relative w-full h-[400px]">
              <Image
                src={box.image}
                alt={box.title}
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Box information */}
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold mb-4">{box.title}</h1>
            
            <div className="bg-[#171717] rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Purchase Details</h2>
              
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-400">Price per box:</span>
                <span className="font-bold text-lg">{box.price} ADR</span>
              </div>
              
              <div className="flex items-center justify-between mb-6">
                <span className="text-gray-400">Quantity:</span>
                <div className="flex items-center bg-[#1E1E1E] rounded-lg">
                  <button 
                    onClick={decreaseQuantity}
                    className="px-3 py-2 text-xl"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 font-bold">{quantity}</span>
                  <button 
                    onClick={increaseQuantity}
                    className="px-3 py-2 text-xl"
                  >
                    +
                  </button>
                </div>
              </div>
              
              <div className="border-t border-gray-700 pt-4 mb-6">
                <div className="flex items-center justify-between text-lg">
                  <span className="font-semibold">Total:</span>
                  <span className="font-bold">{totalPrice} ADR</span>
                </div>
              </div>
              
              <BuyBoxButton 
                itemId={box.id}
                amount={quantity}
                label="Buy Now"
                className="w-full py-4 text-lg"
              />
            </div>
            
            <div className="bg-[#171717] rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Box Description</h2>
              <p className="text-gray-300 mb-4">
                Open this exclusive box for a chance to win amazing prizes. Each box contains unique digital collectibles and rewards.
              </p>
              <p className="text-gray-300">
                This is an ADR Token special collection box. All items are unique and some are extremely rare!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Possible prizes */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6">Possible Prizes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {prizesData.map((prize) => (
            <div key={prize.id} className="bg-[#171717] rounded-lg overflow-hidden">
              <div className="p-4 relative h-48">
                <Image
                  src={prize.image}
                  alt={prize.name}
                  fill
                  className="object-contain p-2"
                />
              </div>
              <div className="p-4 border-t border-gray-800">
                <h3 className="font-medium mb-1">{prize.name}</h3>
                <div className="flex justify-between items-center">
                  <span className={`text-xs px-2 py-1 rounded ${
                    prize.rarity === 'Epic' ? 'bg-purple-900 text-purple-200' :
                    prize.rarity === 'Rare' ? 'bg-blue-900 text-blue-200' :
                    prize.rarity === 'Uncommon' ? 'bg-green-900 text-green-200' :
                    'bg-gray-700 text-gray-200'
                  }`}>
                    {prize.rarity}
                  </span>
                  <span className="text-xs text-gray-400">{prize.chance}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 