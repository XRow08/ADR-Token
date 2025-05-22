import { Keypair } from "@solana/web3.js";

export * from "./currency"

export const createKeypairFromPrivateKey = (privateKeyArray: number[]) => {
  const privateKey = new Uint8Array(privateKeyArray);
  return Keypair.fromSecretKey(privateKey);
};