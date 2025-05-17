import { Keypair } from "@solana/web3.js";

export function truncateAddress(
  address: string,
  startChars: number = 4,
  endChars: number = 4
): string {
  if (!address) return "";
  if (address.length <= startChars + endChars) return address;
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
}

export const createKeypairFromPrivateKey = (privateKeyArray: number[]) => {
  const privateKey = new Uint8Array(privateKeyArray);
  return Keypair.fromSecretKey(privateKey);
};
