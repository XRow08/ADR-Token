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
import { Program, AnchorProvider, BN, web3 } from "@coral-xyz/anchor";
import { idl } from "@/constants/idl";
import {
  CONFIG_ACCOUNT,
  PAYMENT_TOKEN_MINT,
  PROGRAM_ID,
} from "@/constants";
import { useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { StakingPeriod } from "@/interfaces";

interface PeriodInfo {
  label: string;
  apy: number;
  minutes: number;
  period: StakingPeriod;
}

const PERIOD_INFO: Record<StakingPeriod, PeriodInfo> = {
  [StakingPeriod.Minutes1]: {
    label: "7 Days",
    apy: 5,
    minutes: 1,
    period: StakingPeriod.Minutes1
  },
  [StakingPeriod.Minutes2]: {
    label: "14 Days",
    apy: 10,
    minutes: 2,
    period: StakingPeriod.Minutes2
  },
  [StakingPeriod.Minutes5]: {
    label: "30 Days",
    apy: 20,
    minutes: 5,
    period: StakingPeriod.Minutes5
  },
  [StakingPeriod.Minutes10]: {
    label: "90 Days",
    apy: 40,
    minutes: 10,
    period: StakingPeriod.Minutes10
  },
  [StakingPeriod.Minutes30]: {
    label: "180 Days",
    apy: 50,
    minutes: 30,
    period: StakingPeriod.Minutes30
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

      const stakerTokenAccount = await getAssociatedTokenAddress(
        new PublicKey(PAYMENT_TOKEN_MINT),
        publicKey
      );

      const stakeTokenAccount = await getAssociatedTokenAddress(
        new PublicKey(PAYMENT_TOKEN_MINT),
        stakeAuthority,
        true
      );

      const config = new PublicKey(CONFIG_ACCOUNT);

      const stakeTokenAccountInfo = await connection.getAccountInfo(stakeTokenAccount);
      if (!stakeTokenAccountInfo) {
        console.log("Creating stake token account...");
        const createAtaIx = createAssociatedTokenAccountInstruction(
          publicKey,
          stakeTokenAccount,
          stakeAuthority,
          new PublicKey(PAYMENT_TOKEN_MINT)
        );
        const tx = new Transaction().add(createAtaIx);
        tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
        tx.feePayer = publicKey;
        const signedTx = await signTransaction(tx);
        const sig = await connection.sendRawTransaction(signedTx.serialize());
        await connection.confirmTransaction(sig);
        console.log("Stake token account created successfully!");
      }

      const selectedPeriodInfo = { [selectedPeriod]: {} };

      const tx = await program.methods
        .stakeTokens(new BN(Number(amount) * 1e9), selectedPeriodInfo)
        .accounts({
          staker: wallet.publicKey,
          tokenMint: new PublicKey(PAYMENT_TOKEN_MINT),
          stakerTokenAccount,
          stakeAccount,
          stakeTokenAccount,
          stakeAuthority,
          config,
          tokenProgram: TOKEN_PROGRAM_ID,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId,
          rent: SYSVAR_RENT_PUBKEY,
        })
        .rpc({
          skipPreflight: true,
          commitment: "confirmed",
          maxRetries: 5,
        });


      setTimeout(() => {
        getBalance();
        console.log("Staking successful!", tx);
        setAmount("");
        setSelectedPeriod(StakingPeriod.Minutes1);
      }, 2000);
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
      ...info,
      period: key as StakingPeriod
    }))
  };
}