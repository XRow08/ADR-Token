"use client";
import { useWallet } from "@solana/wallet-adapter-react";
import {
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
import { useEffect, useState } from "react";
import { Program, AnchorProvider, BN } from '@coral-xyz/anchor';
import { idl } from "@/constants/idl";

const COLLECTION_NAME = "ADR Collection";
const COLLECTION_SYMBOL = "ADR";
const COLLECTION_URI = "https://your-collection-uri.com";

export function usePurchase() {
  const wallet = useWallet();
  const [program, setProgram] = useState<any>(null);
  const [collectionMint, setCollectionMint] = useState<Keypair | null>(null);
  const [collectionMetadata, setCollectionMetadata] = useState<Keypair | null>(null);
  const [configAccount, setConfigAccount] = useState<Keypair | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (wallet.connected) {
      const connection = new Connection("https://api.testnet.solana.com", "confirmed");

      const provider = new AnchorProvider(
        connection,
        wallet as any,
        { preflightCommitment: "processed" }
      );

      const program = new Program(idl, provider)

      console.log(program);
      setProgram(program);
      initializeCollection(program);
    }
  }, [wallet.connected]);

  const initializeCollection = async (program: any) => {
    if (!program) return;

    try {
      setLoading(true);

      const newCollectionMint = Keypair.generate();
      const newCollectionMetadata = Keypair.generate();
      const newConfigAccount = Keypair.generate();

      const collectionTokenAccount = await getAssociatedTokenAddress(
        newCollectionMint.publicKey,
        wallet.publicKey as any
      );

      const tx = await program.methods
        .initializeCollection(COLLECTION_NAME, COLLECTION_SYMBOL, COLLECTION_URI)
        .accounts({
          payer: wallet.publicKey,
          collectionMint: newCollectionMint.publicKey,
          collectionMetadata: newCollectionMetadata.publicKey,
          collectionTokenAccount,
          config: newConfigAccount.publicKey,
          tokenProgram: TOKEN_PROGRAM_ID,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId,
          rent: SYSVAR_RENT_PUBKEY,
        })
        .signers([newCollectionMint, newCollectionMetadata, newConfigAccount])
        .rpc();

      console.log("Coleção inicializada:", tx);

      setCollectionMint(newCollectionMint);
      setCollectionMetadata(newCollectionMetadata);
      setConfigAccount(newConfigAccount);

    } catch (error) {
      console.error("Erro ao inicializar coleção:", error);
    } finally {
      setLoading(false);
    }
  };

  const setPaymentToken = async (paymentTokenMint: string) => {
    if (!program || !configAccount) return;

    try {
      setLoading(true);
      const tx = await program.methods
        .setPaymentToken(new PublicKey(paymentTokenMint))
        .accounts({
          admin: wallet.publicKey,
          config: configAccount.publicKey,
        })
        .rpc();
      console.log("Token de pagamento definido:", tx);
    } catch (error) {
      console.error("Erro ao definir token de pagamento:", error);
    } finally {
      setLoading(false);
    }
  };

  const mintNFT = async (name: string, symbol: string, uri: string) => {
    if (!program || !collectionMetadata || !wallet.publicKey) return;

    try {
      setLoading(true);
      const nftMint = Keypair.generate();
      const nftMetadata = Keypair.generate();
      const nftTokenAccount = await getAssociatedTokenAddress(
        nftMint.publicKey,
        wallet.publicKey
      );
      const tx = await program.methods
        .mintNft(name, symbol, uri)
        .accounts({
          payer: wallet.publicKey,
          nftMint: nftMint.publicKey,
          nftMetadata: nftMetadata.publicKey,
          nftTokenAccount,
          collectionMetadata: collectionMetadata.publicKey,
          tokenProgram: TOKEN_PROGRAM_ID,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId,
          rent: SYSVAR_RENT_PUBKEY,
        })
        .signers([nftMint, nftMetadata])
        .rpc();

      console.log("NFT mintado:", tx);
      return { tx, nftMint: nftMint.publicKey, nftMetadata: nftMetadata.publicKey };

    } catch (error) {
      console.error("Erro ao mintar NFT:", error);
    } finally {
      setLoading(false);
    }
  };

  const mintNFTWithPayment = async (
    name: string,
    symbol: string,
    uri: string,
    paymentAmount: number,
    paymentTokenMint: string
  ) => {
    if (!program || !collectionMetadata || !configAccount || !wallet.publicKey) return;

    try {
      setLoading(true);
      const nftMint = Keypair.generate();
      const nftMetadata = Keypair.generate();
      const nftTokenAccount = await getAssociatedTokenAddress(
        nftMint.publicKey,
        wallet.publicKey
      );
      const payerPaymentTokenAccount = await getAssociatedTokenAddress(
        new PublicKey(paymentTokenMint),
        wallet.publicKey
      );
      const tx = await program.methods
        .mintNftWithPayment(
          name,
          symbol,
          uri,
          new BN(paymentAmount)
        )
        .accounts({
          payer: wallet.publicKey,
          nftMint: nftMint.publicKey,
          nftMetadata: nftMetadata.publicKey,
          nftTokenAccount,
          collectionMetadata: collectionMetadata.publicKey,
          paymentTokenMint: new PublicKey(paymentTokenMint),
          payerPaymentTokenAccount,
          config: configAccount.publicKey,
          tokenProgram: TOKEN_PROGRAM_ID,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId,
          rent: SYSVAR_RENT_PUBKEY,
        })
        .signers([nftMint, nftMetadata])
        .rpc();

      console.log("NFT mintado com pagamento:", tx);
      return { tx, nftMint: nftMint.publicKey, nftMetadata: nftMetadata.publicKey };

    } catch (error) {
      console.error("Erro ao mintar NFT com pagamento:", error);
    } finally {
      setLoading(false);
    }
  };

  return { initializeCollection, setPaymentToken, mintNFT, mintNFTWithPayment };
}
