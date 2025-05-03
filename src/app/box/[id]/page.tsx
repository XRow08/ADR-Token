'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useWallet } from '@solana/wallet-adapter-react';
import BuyBoxButton from '@/components/BuyBoxButton';
import { PurchaseRecord } from '@/libs/solana';

// Mock data for the box
const boxData = {
  id: 'mystery-box-01',
  name: 'ADR Mystery Box',
  description: 'Open this box for a chance to win exclusive rewards!',
  price: 0.001,
  image: '/images/box.png',
  possibleRewards: [
    { id: 'reward-1', name: 'Rare NFT', odds: '5%', image: '/images/reward-nft.png' },
    { id: 'reward-2', name: 'ADR Token Bundle', odds: '15%', image: '/images/reward-tokens.png' },
    { id: 'reward-3', name: 'Exclusive Access Pass', odds: '10%', image: '/images/reward-pass.png' },
    { id: 'reward-4', name: 'Digital Collectible', odds: '70%', image: '/images/reward-collectible.png' },
  ]
};

export default function BoxDetailPage({ params }: { params: { id: string } }) {
  const { connected } = useWallet();
  const [transaction, setTransaction] = useState<string | null>(null);
  
  const handlePurchaseSuccess = (data: { transaction: string, purchaseRecord: PurchaseRecord }) => {
    setTransaction(data.transaction);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Box Details */}
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex flex-col items-center mb-6">
            {/* Placeholder for box image */}
            <div className="w-64 h-64 bg-gray-700 rounded-lg mb-4 flex items-center justify-center">
              <Image 
                src={boxData.image} 
                alt={boxData.name} 
                width={200} 
                height={200}
                className="object-contain"
              />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">{boxData.name}</h1>
            <p className="text-gray-300 text-center mb-4">{boxData.description}</p>
            <div className="flex items-center mb-6">
              <span className="text-emerald-400 font-bold text-xl">{boxData.price} ADR Tokens</span>
            </div>
            
            <div className="w-full max-w-xs">
              <BuyBoxButton 
                itemId={params.id}
                amount={1000000} // 0.001 tokens (with 9 decimal places)
                label="Purchase Box with ADR Tokens"
                className="w-full"
                onSuccess={handlePurchaseSuccess}
              />
            </div>
            
            {transaction && (
              <div className="mt-4 p-4 bg-gray-700 rounded-lg w-full">
                <p className="text-emerald-400 font-semibold">Purchase Successful!</p>
                <a 
                  href={`https://explorer.solana.com/tx/${transaction}?cluster=testnet`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 underline text-sm break-all"
                >
                  View Transaction
                </a>
                <Link 
                  href={`/box/${params.id}/open`}
                  className="block w-full text-center bg-emerald-600 text-white font-semibold rounded-lg py-2 mt-2 hover:bg-emerald-700 transition-colors"
                >
                  Open Box
                </Link>
              </div>
            )}
          </div>
        </div>
        
        {/* Possible Rewards */}
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-bold text-white mb-4">Possible Rewards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {boxData.possibleRewards.map(reward => (
              <div key={reward.id} className="bg-gray-700 rounded-lg p-4 flex items-center">
                <div className="w-16 h-16 bg-gray-600 rounded-md mr-4 flex items-center justify-center">
                  <Image 
                    src={reward.image} 
                    alt={reward.name} 
                    width={50} 
                    height={50}
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-white font-medium">{reward.name}</h3>
                  <p className="text-emerald-400 text-sm">Odds: {reward.odds}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-gray-700 rounded-lg">
            <h3 className="text-white font-medium mb-2">How It Works</h3>
            <ol className="text-gray-300 list-decimal pl-5 space-y-2">
              <li>Purchase the mystery box using ADR Tokens</li>
              <li>Once purchased, you can open the box</li>
              <li>Each box contains one random reward from the possibilities above</li>
              <li>The odds determine your chance of receiving each reward</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
} 