'use client';

import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useConnection } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { getAssociatedTokenAddress } from '@solana/spl-token';
import { Header } from '@/components/Header';
import WalletButton from '@/components/WalletButton';

// ADR Token mint address
const TOKEN_MINT = 'FkrCkX4HfbRU1g5pbaU97nSZusQavmKwqNpEY1nBE9ti';

export default function WalletPage() {
  const { publicKey, connected } = useWallet();
  const { connection } = useConnection();
  const [balance, setBalance] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchBalance = async () => {
      if (!publicKey || !connected) {
        setBalance(null);
        return;
      }

      setIsLoading(true);
      try {
        // Get the associated token account for this wallet and token
        const tokenMint = new PublicKey(TOKEN_MINT);
        const tokenAccount = await getAssociatedTokenAddress(
          tokenMint,
          publicKey
        );

        try {
          // Try to fetch the token balance
          const tokenAccountInfo = await connection.getTokenAccountBalance(tokenAccount);
          setBalance(tokenAccountInfo.value.uiAmount);
        } catch (error) {
          // If there's an error (e.g., token account doesn't exist yet), show a zero balance
          console.log("Token account may not exist yet:", error);
          setBalance(0);
        }
      } catch (error) {
        console.error("Error fetching token balance:", error);
        setBalance(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBalance();
    
    // Set up interval to refresh balance
    const intervalId = setInterval(fetchBalance, 15000);
    
    return () => clearInterval(intervalId);
  }, [publicKey, connection, connected]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-3xl font-bold mb-8">Your Wallet</h1>
        
        {!connected ? (
          <div className="bg-gray-800 rounded-xl p-8 max-w-md mx-auto text-center">
            <h2 className="text-xl font-semibold mb-4">Connect Your Wallet</h2>
            <p className="text-gray-400 mb-6">
              Connect your Solana wallet to view your ADR Token balance and use the platform
            </p>
            <div className="flex justify-center">
              <WalletButton className="py-3 px-6 text-lg" />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Balance Card */}
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold mb-4">ADR Token Balance</h2>
              
              {isLoading ? (
                <div className="flex items-center justify-center h-20">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-500"></div>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">ADR</span>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-emerald-400">
                      {balance !== null ? balance : '—'}
                    </p>
                    <p className="text-gray-400 text-sm">ADR Tokens</p>
                  </div>
                </div>
              )}
              
              <div className="mt-6 pt-4 border-t border-gray-700">
                <p className="text-sm text-gray-400 mb-2">Connected as:</p>
                <p className="text-sm font-mono bg-gray-700 p-2 rounded break-all">
                  {publicKey?.toString()}
                </p>
              </div>
            </div>
            
            {/* Purchase Options */}
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg md:col-span-2">
              <h2 className="text-xl font-semibold mb-4">Purchase ADR Tokens</h2>
              <p className="text-gray-400 mb-6">
                ADR Tokens can be used to open mystery boxes and access exclusive rewards
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <TokenPurchaseCard amount={10} price={0.05} />
                <TokenPurchaseCard amount={50} price={0.2} isBest />
                <TokenPurchaseCard amount={100} price={0.35} />
              </div>
              
              <div className="mt-6 bg-gray-700 rounded-lg p-4">
                <h3 className="font-medium mb-2">About ADR Tokens</h3>
                <p className="text-sm text-gray-300">
                  ADR Tokens are utility tokens used within the platform for purchasing mystery boxes and other digital items. They are not investment instruments and have no monetary value outside the platform.
                </p>
              </div>
            </div>
            
            {/* Transaction History */}
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg md:col-span-3">
              <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
              
              <div className="overflow-hidden rounded-lg border border-gray-700">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-800 divide-y divide-gray-700">
                    {/* If there's no transaction history yet */}
                    <tr>
                      <td colSpan={4} className="px-6 py-8 text-center text-gray-400">
                        No transactions yet
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface TokenPurchaseCardProps {
  amount: number;
  price: number;
  isBest?: boolean;
}

function TokenPurchaseCard({ amount, price, isBest = false }: TokenPurchaseCardProps) {
  return (
    <div className={`border rounded-lg p-4 relative ${isBest ? 'border-emerald-500 bg-gray-700' : 'border-gray-700 bg-gray-800'}`}>
      {isBest && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold">
          Best Value
        </div>
      )}
      
      <div className="flex items-center justify-center mb-3">
        <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center">
          <span className="text-white font-bold">ADR</span>
        </div>
      </div>
      
      <div className="text-center mb-4">
        <p className="text-2xl font-bold">{amount}</p>
        <p className="text-gray-400 text-sm">ADR Tokens</p>
      </div>
      
      <div className="text-center mb-4">
        <p className="text-lg font-semibold">${price.toFixed(2)} USD</p>
        <p className="text-gray-400 text-xs">${(price / amount).toFixed(3)} per token</p>
      </div>
      
      <button className={`w-full py-2 rounded-lg font-medium transition-colors ${isBest ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : 'bg-gray-700 hover:bg-gray-600 text-white'}`}>
        Purchase
      </button>
    </div>
  );
} 