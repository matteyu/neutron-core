import { useState, useEffect } from "react";
import {
  CHAIN_NAMESPACES,
  IWeb3AuthCoreOptions,
  WALLET_ADAPTERS,
} from "@web3auth/base";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { AuthAdapter, AuthLoginParams } from "@web3auth/auth-adapter";

const clientId =
  "BCcF0kN71OFXR9kXgyN9U4DVo_dr-S45tyazqUpDHRuZebtnPYbO1a4zKa6Q_5NwzYFUoWsg7QtT2dvrbHjrcdE"; // Replace with your Web3Auth client ID

export const useWeb3Auth = () => {
  const [web3auth, setWeb3Auth] = useState<Web3AuthNoModal | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const initWeb3Auth = async () => {

      //set instance
      const chainConfig = {
        chainId: "0xae3f3",
        displayName: "Kiichain Testnet",
        chainNamespace: CHAIN_NAMESPACES.EIP155,
        tickerName: "Kiichain Testnet",
        ticker: "KII",
        rpcTarget: "https://uno.sentry.testnet.v3.kiivalidator.com:8547",
        blockExplorerUrl: "https://app.kiichain.io",
        logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
      };
      const privateKeyProvider = new EthereumPrivateKeyProvider({
        config: { chainConfig },
      });
      const web3AuthConfig: IWeb3AuthCoreOptions = {
        clientId,
        web3AuthNetwork: "sapphire_devnet",
        privateKeyProvider,
      };
      const web3authInstance = new Web3AuthNoModal(web3AuthConfig);

      // set adapters
      const authAdapter = new AuthAdapter();
      web3authInstance.configureAdapter(authAdapter);
    //   const adapters = await getInjectedAdapters({ options: web3AuthConfig });
    //   adapters.forEach((adapter) => {
    //     web3authInstance.configureAdapter(adapter);
    //   });
      await web3authInstance.init();

      setWeb3Auth(web3authInstance);

      if (web3authInstance.connected) {
        setLoggedIn(true);
      }
    };

    initWeb3Auth();
  }, []);

  const login = async () => {
    if (!web3auth) return;
    await web3auth.connectTo<AuthLoginParams>(WALLET_ADAPTERS.AUTH, { loginProvider: "google" });
    setLoggedIn(true);
  };

  const logout = async () => {
    if (!web3auth) return;
    await web3auth.logout();
    setLoggedIn(false);
  };

  return { loggedIn, login, logout, web3auth };
};
