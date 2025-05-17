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
  NETWORK,
  PAYMENT_TOKEN_MINT,
} from "@/constants";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

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
      const nftMint = Keypair.generate();
      const nftMetadata = Keypair.generate();

      const payerPaymentTokenAccount = await getAssociatedTokenAddress(
        new PublicKey(PAYMENT_TOKEN_MINT),
        provider.wallet.publicKey
      );

      const nftTokenAccount = await getAssociatedTokenAddress(
        nftMint.publicKey,
        provider.wallet.publicKey
      );

      const newAmount = amount * Math.pow(10, 9);

      const tx = await program.methods
        .mintNftWithPayment(
          COLLECTION_NAME,
          COLLECTION_SYMBOL,
          COLLECTION_URI,
          new BN(newAmount)
        )
        .accounts({
          payer: provider.wallet.publicKey,
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
        .rpc({
          skipPreflight: true,
          maxRetries: 5,
        });

      const result = {
        tx,
        nftMint: nftMint.publicKey.toString(),
        nftMetadata: nftMetadata.publicKey.toString(),
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
