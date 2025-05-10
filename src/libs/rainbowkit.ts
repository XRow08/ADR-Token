import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  metaMaskWallet,
  walletConnectWallet,
  binanceWallet,
  coinbaseWallet,
  rabbyWallet,
  phantomWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { createConfig, http } from "wagmi";
import { sepolia } from "wagmi/chains";

const projectChains = [sepolia] as const;

const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [metaMaskWallet],
    },
    {
      groupName: "Others",
      wallets: [
        binanceWallet,
        walletConnectWallet,
        rabbyWallet,
        coinbaseWallet,
        phantomWallet,
      ],
    },
  ],
  {
    appName: "ADR Token",
    projectId: "4ebbf2eddb8738c4c84cd8082b5e9756",
  }
);

export const config = createConfig({
  connectors,
  chains: projectChains,
  transports: {
    [sepolia.id]: http("https://ethereum-sepolia-rpc.publicnode.com"),
  },
  ssr: true,
});
