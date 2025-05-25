"use client";
import * as anchor from '@coral-xyz/anchor';
import { getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { SystemProgram, PublicKey } from '@solana/web3.js';
import { Program, AnchorProvider, BN } from "@coral-xyz/anchor";
import { CONFIG_ACCOUNT, PAYMENT_TOKEN_MINT, PROGRAM_ID } from "@/constants";
import { useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

export function useUnstaking() {
  const { publicKey, signTransaction, signAllTransactions } = useWallet();
  const { connection } = useConnection();
  const [isLoading, setIsLoading] = useState(false);
  const [stakeInfo, setStakeInfo] = useState<any>(null);

  const onUnstake = async () => {
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
      const idl = await anchor.Program.fetchIdl(PROGRAM_ID, provider);
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

      const stakeAccountData = await (program.account as any).stakeAccount.fetch(stakeAccount);
      console.log("Stake account data:", stakeAccountData);

      const now = Math.floor(Date.now() / 1000);
      if (now < stakeAccountData.unlockTime.toNumber()) {
        const secondsLeft = stakeAccountData.unlockTime.toNumber() - now;
        console.log("Você só pode des-stake em", secondsLeft, "segundos");
        throw new Error(`Você só pode des-stake em ${secondsLeft} segundos`);
      }

      const tx = await program.methods
        .unstakeTokens()
        .accounts({
          staker: publicKey,
          tokenMint: new PublicKey(PAYMENT_TOKEN_MINT),
          rewardTokenMint: new PublicKey(PAYMENT_TOKEN_MINT),
          stakerTokenAccount,
          stakeTokenAccount,
          stakeAuthority,
          stakeAccount,
          config: new PublicKey(CONFIG_ACCOUNT),
          tokenProgram: TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId,
        })
        .rpc({
          skipPreflight: true,
          commitment: "confirmed",
          maxRetries: 5,
        });
      setTimeout(() => {
        getCurrentStake();
        console.log("Unstaking successful!", tx);
      }, 2000);

      console.log("Unstaking successful!");
    } catch (error) {
      console.error("Unstaking failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getCurrentStake = async () => {
    if (!publicKey) throw new Error("Wallet not connected");

    const wallet: any = {
      publicKey,
      signTransaction,
      signAllTransactions,
    };

    const provider = new AnchorProvider(connection, wallet, { commitment: "confirmed" });
    const idl = await anchor.Program.fetchIdl(PROGRAM_ID, provider);
    const program = new Program(idl, provider);

    const [stakeAccount] = await PublicKey.findProgramAddress(
      [
        Buffer.from('stake_account'),
        publicKey.toBuffer(),
        new PublicKey(PAYMENT_TOKEN_MINT).toBuffer(),
      ],
      program.programId
    );

    const stakeInfo = await (program.account as any).stakeAccount.fetch(stakeAccount);

    console.log("Stake Info:", stakeInfo);
    const now = Date.now() / 1000;
    const secondsLeft = stakeInfo.unlockTime - now;

    const amount = stakeInfo.amount instanceof BN
      ? Number(stakeInfo.amount.toString()) / 1e9
      : Number(stakeInfo.amount) / 1e9;

    const startTime = stakeInfo.startTime instanceof BN
      ? new Date(Number(stakeInfo.startTime.toString()) * 1000)
      : new Date(Number(stakeInfo.startTime) * 1000);

    const unlockTime = stakeInfo.unlockTime instanceof BN
      ? new Date(Number(stakeInfo.unlockTime.toString()) * 1000)
      : new Date(Number(stakeInfo.unlockTime) * 1000);

    let period = "";
    if (typeof stakeInfo.period === "object") {
      period = Object.keys(stakeInfo.period)[0];
    } else {
      period = stakeInfo.period;
    }

    const claimed = stakeInfo.claimed;
    setStakeInfo({
      amount,
      startTime,
      unlockTime,
      period,
      claimed,
      secondsLeft
    });
  };

  useEffect(() => {
    getCurrentStake();
  }, [publicKey]);

  return {
    isLoading,
    onUnstake,
    stakeInfo,
  };
} 