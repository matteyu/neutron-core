'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { Web3AuthNoModal } from '@web3auth/no-modal';

interface Web3ContextType {
  selectedWallet: EIP6963ProviderDetail | null;
  setSelectedWallet: React.Dispatch<React.SetStateAction<EIP6963ProviderDetail | null>>;
  walletAddress: string;
  setWalletAddress: React.Dispatch<React.SetStateAction<string>>
  web3authContext: Web3AuthNoModal | null;
  setWeb3auth: React.Dispatch<React.SetStateAction<Web3AuthNoModal | null>>;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export const Web3Provider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedWallet, setSelectedWallet] = useState<EIP6963ProviderDetail | null>(null);
  const [web3authContext, setWeb3auth] = useState<Web3AuthNoModal | null>(null);
  const [walletAddress, setWalletAddress] = useState<string>('');

  return (
    <Web3Context.Provider value={{ selectedWallet, setSelectedWallet, web3authContext, setWeb3auth, walletAddress, setWalletAddress }}>
      {children}
    </Web3Context.Provider>
  );
};

// Custom hook to access the Web3Context
export const useWeb3Context = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3Context must be used within a Web3Provider');
  }
  return context;
};
