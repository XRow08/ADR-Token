"use client";
import {
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddress,
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID
} from '@solana/spl-token';
import {
  Transaction,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
  sendAndConfirmTransaction,
  PublicKey,
} from '@solana/web3.js';
import { Program, AnchorProvider, BN } from "@coral-xyz/anchor";
import { idl } from "@/constants/idl";
import {
  CONFIG_ACCOUNT,
  PAYMENT_TOKEN_MINT,
} from "@/constants";
import { useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { StakingPeriod } from "@/interfaces";

interface PeriodInfo {
  label: string;
  apy: number;
  minutes: number;
}

const PERIOD_INFO: Record<StakingPeriod, PeriodInfo> = {
  [StakingPeriod.Minutes1]: {
    label: "7 Days",
    apy: 5,
    minutes: 1
  },
  [StakingPeriod.Minutes2]: {
    label: "14 Days",
    apy: 10,
    minutes: 2
  },
  [StakingPeriod.Minutes5]: {
    label: "30 Days",
    apy: 20,
    minutes: 5
  },
  [StakingPeriod.Minutes10]: {
    label: "90 Days",
    apy: 40,
    minutes: 10
  },
  [StakingPeriod.Minutes30]: {
    label: "180 Days",
    apy: 50,
    minutes: 30
  },
};

export function useStaking() {
  const { publicKey, signTransaction, signAllTransactions, connected } = useWallet();
  const { connection } = useConnection();
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState<StakingPeriod>(StakingPeriod.Minutes1);
  const [isLoading, setIsLoading] = useState(false);

  const handleMaxClick = () => {
    setAmount(balance.toString());
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value) || value === "") {
      setAmount(value);
    }
  };

  const calculateRewards = () => {
    if (!amount || !selectedPeriod) return 0;
    const periodInfo = PERIOD_INFO[selectedPeriod];
    return (Number(amount) * periodInfo.apy / 100) * (periodInfo.minutes / (365 * 24 * 60));
  };


  const onStake = async () => {
    try {
      if (!publicKey) throw new Error("Wallet not connected");
      setIsLoading(true);

      const wallet: any = {
        publicKey,
        signTransaction,
        signAllTransactions,
      };

      if (!signTransaction || !signAllTransactions) {
        throw new Error("Wallet missing required methods");
      }

      const provider = new AnchorProvider(connection, wallet, {
        commitment: "confirmed",
      });

      const program = new Program(idl, provider);
      const [stakeAccount] = await PublicKey.findProgramAddress(
        [
          Buffer.from('stake_account'),
          publicKey.toBuffer(),
          new PublicKey(PAYMENT_TOKEN_MINT).toBuffer(),
        ],
        program.programId
      );

      const [stakeAuthority] = await PublicKey.findProgramAddress(
        [Buffer.from("stake_authority")],
        program.programId
      );

      console.log("Derived addresses:");
      console.log("- Stake Account:", stakeAccount.toBase58());
      console.log("- Stake Authority:", stakeAuthority.toBase58());

      const stakerTokenAccount = await getAssociatedTokenAddress(
        new PublicKey(PAYMENT_TOKEN_MINT),
        publicKey
      );

      const stakeTokenAccount = await getAssociatedTokenAddress(
        new PublicKey(PAYMENT_TOKEN_MINT),
        stakeAuthority,
        true
      );

      console.log("Token accounts:");
      console.log("- Staker Token Account:", stakerTokenAccount.toBase58());
      console.log("- Stake Token Account:", stakeTokenAccount.toBase58());

      const stakeTokenAccountInfo = await connection.getAccountInfo(stakeTokenAccount);

      if (!stakeTokenAccountInfo) {
        const createAtaIx = createAssociatedTokenAccountInstruction(
          publicKey,
          stakeTokenAccount,
          stakeAuthority,
          new PublicKey(PAYMENT_TOKEN_MINT)
        );

        const ataTx = new Transaction().add(createAtaIx);
        ataTx.feePayer = publicKey;
        ataTx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;

        const signedTx = await signTransaction(ataTx);
        const signature = await connection.sendRawTransaction(signedTx.serialize());
        await connection.confirmTransaction(signature, 'confirmed');
        console.log("Created stake token account:", signature);
      }

      console.log("Preparing stake transaction...");
      console.log("Amount:", new BN(Number(amount) * 1e9).toString());
      console.log("Config account:", new PublicKey(CONFIG_ACCOUNT).toBase58());

      const txId = await program.methods
        .stakeTokens(
          new BN(Number(amount) * 1e9),
          { selectedPeriod: {} }
        )
        .accounts({
          staker: publicKey,
          tokenMint: new PublicKey(PAYMENT_TOKEN_MINT),
          stakerTokenAccount,
          stakeAccount,
          stakeTokenAccount,
          stakeAuthority,
          config: new PublicKey(CONFIG_ACCOUNT),
          tokenProgram: TOKEN_PROGRAM_ID,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId,
          rent: SYSVAR_RENT_PUBKEY,
        })
        .rpc({
          skipPreflight: true,
          maxRetries: 5
        });

      console.log("Transaction sent:", txId);

      const confirmation = await connection.confirmTransaction(txId, 'confirmed');
      if (confirmation.value.err) {
        throw new Error(`Transaction failed: ${confirmation.value.err}`);
      }
      getBalance();
      console.log("Staking successful!");
      setAmount("");
      setSelectedPeriod(StakingPeriod.Minutes1);
    } catch (error) {
      console.error("Staking failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const estimatedRewards = calculateRewards();
  const isValid = amount && Number(amount) <= balance;

  const getBalance = async () => {
    if (!connected || !publicKey) return;
    setIsLoading(true);
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

  return {
    balance,
    amount,
    selectedPeriod,
    isLoading,
    handleAmountChange,
    handleMaxClick,
    onStake,
    setSelectedPeriod,
    estimatedRewards,
    isValid,
    periods: Object.entries(PERIOD_INFO).map(([key, info]) => ({
      period: key as StakingPeriod,
      ...info
    }))
  };
}