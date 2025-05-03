'use client';

import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { buyBox, PurchaseRecord } from '@/libs/solana';
import { toast } from 'react-hot-toast';

interface BuyBoxButtonProps {
  itemId?: string;
  amount?: number;
  label?: string;
  className?: string;
  onSuccess?: (data: { 
    transaction: string, 
    purchaseRecord: PurchaseRecord 
  }) => void;
  onError?: (error: Error) => void;
}

export default function BuyBoxButton({
  itemId,
  amount,
  label = 'Buy Box',
  className = '',
  onSuccess,
  onError
}: BuyBoxButtonProps) {
  const { publicKey, connected, wallet, signTransaction } = useWallet();
  const [isLoading, setIsLoading] = useState(false);

  const handleBuyBox = async () => {
    if (!connected || !publicKey || !wallet) {
      toast.error('Please connect your wallet first');
      return;
    }

    setIsLoading(true);
    try {
      const result = await buyBox(wallet.adapter, itemId, amount);
      
      toast.success('Purchase successful!');
      
      if (onSuccess) {
        onSuccess({
          transaction: result.transaction,
          purchaseRecord: result.purchaseRecord
        });
      }
    } catch (error) {
      console.error('Purchase failed:', error);
      toast.error(error instanceof Error ? error.message : 'Purchase failed');
      
      if (onError && error instanceof Error) {
        onError(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      className={`px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      onClick={handleBuyBox}
      disabled={!connected || isLoading}
    >
      {isLoading ? 'Processing...' : label}
    </button>
  );
} 