"use client";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  clusterApiUrl,
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
} from "@solana/web3.js";
import {
  TOKEN_PROGRAM_ID,
  getAssociatedTokenAddress,
  ASSOCIATED_TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { Program, AnchorProvider, BN } from "@coral-xyz/anchor";
import { idl } from "@/constants/idl";
import {
  COLLECTION_METADATA_KEYPAIR,
  CONFIG_ACCOUNT_KEYPAIR,
  COLLECTION_NAME,
  COLLECTION_SYMBOL,
  COLLECTION_URI,
  NETWORK,
  PAYMENT_TOKEN_MINT,
} from "@/constants";

export function usePurchase() {
  const wallet = useWallet();
  const connectionUrl =
    process.env.NEXT_PUBLIC_SOLANA_RPC_URL || clusterApiUrl(NETWORK);

  async function onMint(amount: number) {
    const connection = new Connection(connectionUrl, "confirmed");
    const provider = new AnchorProvider(connection, window.solana, {
      commitment: "confirmed",
    });

    const program = new Program(idl, provider);
    const nftMint = Keypair.generate();
    const nftMetadata = Keypair.generate();

    const payerPaymentTokenAccount = await getAssociatedTokenAddress(
      new PublicKey(PAYMENT_TOKEN_MINT),
      wallet.publicKey!
    );

    const nftTokenAccount = await getAssociatedTokenAddress(
      nftMint.publicKey,
      wallet.publicKey!
    );

    const tx = await program.methods
      .mintNftWithPayment(
        COLLECTION_NAME,
        COLLECTION_SYMBOL,
        COLLECTION_URI,
        new BN(amount)
      )
      .accounts({
        payer: wallet.publicKey!,
        nftMint: nftMint.publicKey,
        nftMetadata: nftMetadata.publicKey,
        nftTokenAccount: nftTokenAccount,
        collectionMetadata: COLLECTION_METADATA_KEYPAIR.publicKey,
        paymentTokenMint: new PublicKey(PAYMENT_TOKEN_MINT),
        payerPaymentTokenAccount: payerPaymentTokenAccount,
        config: CONFIG_ACCOUNT_KEYPAIR.publicKey,
        tokenProgram: TOKEN_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
        rent: SYSVAR_RENT_PUBKEY,
      })
      .signers([nftMint, nftMetadata])
      .rpc();

    return {
      tx,
      nftMint: nftMint.publicKey.toString(),
      nftMetadata: nftMetadata.publicKey.toString(),
    };
  }

  return { onMint };
}
