"use client";import { useState } from 'react';import { useWallet } from '@solana/wallet-adapter-react';import { useWalletModal } from '@solana/wallet-adapter-react-ui';import { truncateAddress } from '@/utils/address';import { useLanguage } from '@/contexts/LanguageContext';interface WalletButtonProps {  className?: string;}export default function WalletButton({ className = '' }: WalletButtonProps) {  const { publicKey, connected, disconnect } = useWallet();  const { setVisible } = useWalletModal();  const [showDropdown, setShowDropdown] = useState(false);  const { t } = useLanguage();

  const handleConnect = () => {
    setVisible(true);
  };

  const handleDisconnect = () => {
    disconnect();
    setShowDropdown(false);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  if (!connected || !publicKey) {
    return (
      <button
        onClick={handleConnect}
        className={`px-4 py-2 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors ${className}`}
      >
        {t('wallet.connect')}
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className={`px-4 py-2 bg-gray-800 border border-emerald-500 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors flex items-center ${className}`}
      >
        <span className="mr-2">{truncateAddress(publicKey.toString())}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 transition-transform ${showDropdown ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10">
          <div className="p-3 border-b border-gray-700">
            <p className="text-sm text-gray-400">{t('wallet.connected')}</p>
            <p className="text-white font-medium break-all">{publicKey.toString()}</p>
          </div>
          <button
            onClick={handleDisconnect}
            className="w-full text-left px-4 py-2 text-red-400 hover:bg-gray-700 rounded-b-lg transition-colors"
          >
            {t('wallet.disconnect')}
          </button>
        </div>
      )}
    </div>
  );
} 