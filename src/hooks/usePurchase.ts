"use client";
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
  COLLECTION_NAME,
  COLLECTION_SYMBOL,
  COLLECTION_URI,
  PAYMENT_TOKEN_MINT,
} from "@/constants";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import axios from "axios";

export function usePurchase() {
  const { publicKey, connected } = useWallet();
  const [balance, setBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const connectionUrl =
    process.env.NEXT_PUBLIC_SOLANA_RPC_URL || "https://api.devnet.solana.com";

  const createKeypairFromPrivateKey = (privateKeyArray: number[]) => {
    const privateKey = new Uint8Array(privateKeyArray);
    return Keypair.fromSecretKey(privateKey);
  };

  const TOKEN_PRICE_FEED_ADDRESS = "HZ1JovNiVvGrGNiiYvEozEVgZ58xaU3RKwX8eACQBCt3"

  const COLLECTION_MINT_KEYPAIR = createKeypairFromPrivateKey([
    220, 182, 152, 247, 178, 241, 254, 90, 30, 27, 113, 184, 161, 23, 167, 177,
    91, 227, 254, 79, 165, 218, 166, 105, 192, 73, 114, 44, 223, 43, 91, 70, 225,
    186, 95, 164, 71, 219, 215, 206, 5, 227, 229, 96, 6, 9, 100, 73, 169, 48, 177,
    80, 222, 124, 193, 122, 30, 195, 230, 250, 163, 192, 3, 201,
  ]);

  const COLLECTION_METADATA_KEYPAIR = createKeypairFromPrivateKey([
    128, 214, 161, 26, 236, 116, 161, 118, 173, 38, 149, 23, 139, 40, 126, 130,
    225, 60, 175, 244, 239, 52, 165, 28, 241, 61, 128, 184, 164, 62, 227, 4,
    165, 75, 239, 249, 8, 219, 251, 116, 9, 234, 234, 178, 142, 104, 172, 84,
    54, 243, 45, 31, 60, 52, 113, 129, 174, 159, 198, 82, 205, 152, 169, 98,
  ]);

  const CONFIG_ACCOUNT_KEYPAIR = createKeypairFromPrivateKey([
    50, 225, 85, 148, 188, 51, 110, 186, 174, 224, 120, 131, 155, 65, 163, 107,
    71, 131, 126, 148, 92, 156, 21, 203, 92, 116, 165, 78, 194, 227, 14, 221,
    248, 154, 187, 68, 29, 105, 97, 200, 83, 69, 246, 93, 237, 49, 107, 99, 235,
    29, 229, 128, 54, 174, 157, 19, 59, 12, 23, 12, 113, 160, 155, 67,
  ]);

  async function deriveNftMintAddress(
    collectionMint: PublicKey,
    nftCounter: any,
    program: Program<any>
  ): Promise<[PublicKey, number]> {
    return await PublicKey.findProgramAddressSync(
      [Buffer.from("nft_mint"), collectionMint.toBuffer(), Buffer.from(nftCounter.count.toString())],
      program.programId
    );
  }

  async function deriveNftMetadataAddress(
    nftMint: PublicKey,
    program: Program<any>
  ): Promise<[PublicKey, number]> {
    return await PublicKey.findProgramAddressSync(
      [
        Buffer.from("nft_metadata"),
        nftMint.toBuffer(),
      ],
      program.programId
    );
  }

  /* async function getNftCounter(program: Program<any>) {
    const [nftCounterAddress] = await PublicKey.findProgramAddressSync(
      [Buffer.from("nft_counter")],
      program.programId
    );
    const nftCounter = await program.account.nftCounter.fetch(nftCounterAddress);
    console.log("Total NFTs minted:", nftCounter.count);
    return nftCounter.count;
  } */

  async function onMint(amount: number) {
    try {
      const connection = new Connection(connectionUrl, "confirmed");
      const provider = new AnchorProvider(connection, window.solana, {
        commitment: "confirmed",
      });

      const balance = await connection.getBalance(provider.wallet.publicKey);

      if (balance < 0.01 * 1e9) {
        toast.error("Balance insufficient to pay transaction fees");
        throw new Error(
          "Balance insufficient to pay transaction fees. You need at least 0.01 SOL."
        );
      }

      const program = new Program(idl, provider);
      const [nftCounterAddress] = await PublicKey.findProgramAddress(
        [Buffer.from("nft_counter")],
        program.programId
      );
      const nftCounter = await (program.account as any).nftCounter.fetch(nftCounterAddress);

      const [nftMintAddress] = await deriveNftMintAddress(
        COLLECTION_MINT_KEYPAIR.publicKey,
        nftCounter,
        program
      );

      const [nftMetadataAddress] = await deriveNftMetadataAddress(
        nftMintAddress,
        program
      );

      const payerPaymentTokenAccount = await getAssociatedTokenAddress(
        new PublicKey(PAYMENT_TOKEN_MINT),
        provider.wallet.publicKey
      );

      const tokenAccount = await connection.getTokenAccountBalance(payerPaymentTokenAccount);
      const nftTokenAccount = await getAssociatedTokenAddress(
        nftMintAddress,
        provider.wallet.publicKey
      );

      const [stakeAuthority] = await PublicKey.findProgramAddress(
        [Buffer.from("stake_authority")],
        program.programId
      );

      const { data } = await axios.post('/api/purchase', {
        itemId: 1,
        wallet: provider.wallet.publicKey.toString(),
        amount,
      });

      const { tokenAmount, timestamp, signature } = data;

      if (tokenAccount.value.uiAmount && tokenAccount.value.uiAmount < amount) {
        toast.error("Insufficient token balance");
        throw new Error("Insufficient token balance");
      }

      const tx = await program.methods
        .mintNftWithPayment(
          COLLECTION_NAME,
          COLLECTION_SYMBOL,
          COLLECTION_URI,
          tokenAmount,
          timestamp,
          signature
        )
        .accounts({
          payer: provider.wallet.publicKey,
          nftMint: nftMintAddress,
          nftMetadata: nftMetadataAddress,
          nftTokenAccount: nftTokenAccount,
          collectionMetadata: COLLECTION_METADATA_KEYPAIR.publicKey,
          paymentTokenMint: new PublicKey(PAYMENT_TOKEN_MINT),
          payerPaymentTokenAccount: payerPaymentTokenAccount,
          stakeAuthority: stakeAuthority,
          config: CONFIG_ACCOUNT_KEYPAIR.publicKey,
          tokenProgram: TOKEN_PROGRAM_ID,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId,
          rent: SYSVAR_RENT_PUBKEY,
        }).rpc({
          skipPreflight: true,
          maxRetries: 5,
        });

      await connection.confirmTransaction(tx, "confirmed");

      const events = await program.addEventListener("TokenBurnEvent", (event: any) => {
        if (event.payer.equals(provider.wallet.publicKey)) {
          console.log("Token burn event:", event);
        }
      });

      console.log("events", events);

      const result = {
        tx,
        nftMint: nftMintAddress.toString(),
        nftMetadata: nftMetadataAddress.toString(),
      };
      await getBalance();
      return result;
    } catch (error) {
      console.error("Error processing transaction:", error);
      throw error;
    }
  }

  const getBalance = async () => {
    if (!connected || !publicKey) return;
    setIsLoading(true);
    const connection = new Connection(connectionUrl, "confirmed");

    try {
      const tokenMint = new PublicKey(PAYMENT_TOKEN_MINT);

      getAssociatedTokenAddress(tokenMint, publicKey)
        .then((tokenAccount) => {
          return connection
            .getTokenAccountBalance(tokenAccount)
            .then((tokenAccountInfo) => {
              setBalance(
                parseFloat(tokenAccountInfo.value.uiAmount?.toString() || "0")
              );
            })
            .catch((err) => {
              console.log("Token account may not exist yet:", err);
              setBalance(0);
            });
        })
        .catch((error) => {
          console.error("Error fetching token balance:", error);
          setBalance(0);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } catch (error) {
      console.error("Invalid token mint address:", error);
      setIsLoading(false);
      setBalance(0);
    }
  };

  useEffect(() => {
    getBalance();
  }, [connected, publicKey]);

  return { onMint, balance, isLoading, connected };
}
