"use client";

import { useState } from "react";
import { useSyncProviders } from "../hooks/useSyncProviders";
import { useWeb3Auth } from "../hooks/useWeb3Auth";
import { formatAddress } from "../utils";
import { Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWeb3Context } from "@/context/Web3Context";

export function DiscoverWalletProvidersComponent() {
  const { selectedWallet, setSelectedWallet, setWeb3auth, setWalletAddress } = useWeb3Context();
  const [userAccount, setUserAccount] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const providers = useSyncProviders();
  const { web3auth, loggedIn, login, logout: web3AuthLogout } = useWeb3Auth();

  const handleConnect = async (providerWithInfo: EIP6963ProviderDetail) => {
    try {
      const accounts = await providerWithInfo.provider.request({
        method: "eth_requestAccounts",
      });
      setSelectedWallet(providerWithInfo);
      setUserAccount(accounts?.[0]);
      setWalletAddress(accounts?.[0])
      setIsDropdownOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      if(loggedIn){
        await web3AuthLogout()
      }
      await login();
      setWeb3auth(web3auth)
      setIsDropdownOpen(false);
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  const logoutMethod = loggedIn ? web3AuthLogout:()=>{}

  return (
    <div className="flex items-center justify-end w-full gap-8">
      <div className="flex justify-center">
      <Button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center space-x-2"
      >
        <Wallet className="w-4 h-4" />
        <span>{userAccount || loggedIn ? formatAddress(userAccount) : "Login"}</span>
      </Button>
      </div>
      

      {isDropdownOpen && (
        <div className="absolute z-10 w-56 rounded-md shadow-lg mt-60 bg-white/30 backdrop-blur-md ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <button
              onClick={handleGoogleLogin}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 7.7 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                <path d="M1 1h22v22H1z" fill="none"/>
              </svg>
              <span>Google</span>
            </button>
            {providers.length > 0 ? (
              providers?.map((provider: EIP6963ProviderDetail) => (
                <button
                  key={provider.info.uuid}
                  onClick={() => handleConnect(provider)}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  <img
                    src={provider.info.icon}
                    alt={provider.info.name}
                    className="w-5 h-5 mr-3"
                  />
                  <span>{provider.info.name}</span>
                </button>
              ))
            ) : (
              <div className="px-4 py-2 text-sm text-gray-700">No Announced Wallet Providers</div>
            )}
          </div>
        </div>
      )}

      {(userAccount || loggedIn) && (
        <div className="p-4 mt-4 border rounded-md border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center space-x-3">
            {(selectedWallet && !loggedIn) ? (
              <img
                src={selectedWallet.info.icon}
                alt={selectedWallet.info.name}
                className="w-8 h-8"
              />
            ) : (
              <svg className="w-8 h-8" viewBox="0 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 7.7 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                <path d="M1 1h22v22H1z" fill="none"/>
              </svg>
            )}
            <div>
              <div className="font-semibold text-white">{(selectedWallet && !loggedIn) ? selectedWallet.info.name : "Google"}</div>
              <div className="text-sm text-gray-500">{formatAddress(userAccount)}</div>
            </div>
          </div>
          {loggedIn && <Button onClick={logoutMethod} className="w-full mt-2">Logout</Button>}
        </div>
      )}
    </div>
  );
}