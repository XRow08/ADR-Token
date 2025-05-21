"use client";
import {
  Connection,
  PublicKey,
  SystemProgram,
} from "@solana/web3.js";
import {
  TOKEN_PROGRAM_ID,
  getAssociatedTokenAddress,
} from "@solana/spl-token";
import { Program, AnchorProvider, BN, web3 } from "@coral-xyz/anchor";
import { idl } from "@/constants/idl";
import {
  PAYMENT_TOKEN_MINT,
} from "@/constants";
import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { StakingPeriod } from "@/interfaces";
import { usePurchase } from "./usePurchase";

interface PeriodInfo {
  label: string;
  apy: number;
  minutes: number;
}

const PERIOD_INFO: Record<StakingPeriod, PeriodInfo> = {
  [StakingPeriod.Minutes1]: {
    label: "1 Minute",
    apy: 5,
    minutes: 1
  },
  [StakingPeriod.Minutes2]: {
    label: "2 Minutes",
    apy: 7.5,
    minutes: 2
  },
  [StakingPeriod.Minutes5]: {
    label: "5 Minutes",
    apy: 12,
    minutes: 5
  },
  [StakingPeriod.Minutes10]: {
    label: "10 Minutes",
    apy: 20,
    minutes: 10
  },
  [StakingPeriod.Minutes30]: {
    label: "30 Minutes",
    apy: 25,
    minutes: 30
  },
};

export function useStaking() {
  const { publicKey, connected } = useWallet();
  const { wallet } = useWallet();
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState<StakingPeriod>(StakingPeriod.Minutes1);
  const [isLoading, setIsLoading] = useState(false);

  const connectionUrl =
    process.env.NEXT_PUBLIC_SOLANA_RPC_URL || "https://api.devnet.solana.com";

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

  const getStakeAuthorityPDA = async (
    programId: PublicKey
  ): Promise<[PublicKey, number]> => {
    return PublicKey.findProgramAddress(
      [Buffer.from('stake_authority')],
      programId
    );
  };

  const getStakeAccountPDA = async (
    programId: PublicKey,
    owner: PublicKey,
    tokenMint: PublicKey
  ): Promise<[PublicKey, number]> => {
    return PublicKey.findProgramAddress(
      [
        Buffer.from('stake_account'),
        owner.toBuffer(),
        tokenMint.toBuffer(),
      ],
      programId
    );
  };

  const onStake = async () => {
    try {
      setIsLoading(true);

      const connection = new Connection(connectionUrl, "confirmed");
      const provider = new AnchorProvider(connection, window.solana, {
        commitment: "confirmed",
      });

      const program = new Program(idl, provider);

      const [stakeAuthority] = await getStakeAuthorityPDA(program.programId);
      const [stakeAccount] = await getStakeAccountPDA(
        program.programId,
        provider.wallet.publicKey,
        new PublicKey(PAYMENT_TOKEN_MINT)
      );

      const stakerTokenAccount = await getAssociatedTokenAddress(
        new PublicKey(PAYMENT_TOKEN_MINT),
        provider.wallet.publicKey
      );

      const stakeTokenAccount = await getAssociatedTokenAddress(
        new PublicKey(PAYMENT_TOKEN_MINT),
        stakeAuthority,
        true
      );

      const tx = await program.methods
        .stakeTokens(
          new BN(Number(amount) * 1e9),
          selectedPeriod
        )
        .accounts({
          staker: provider.wallet.publicKey,
          tokenMint: new PublicKey(PAYMENT_TOKEN_MINT),
          stakerTokenAccount,
          stakeTokenAccount,
          stakeAuthority,
          stakeAccount,
          tokenProgram: TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId,
        })
        .transaction();

      const signature = await wallet?.adapter.sendTransaction(tx, connection);
      await connection.confirmTransaction(signature!, 'confirmed');

      setAmount("");
      setSelectedPeriod(StakingPeriod.Minutes1);
    } catch (error) {
      console.error("Staking failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const estimatedRewards = calculateRewards();
  const isValid = amount && Number(amount) <= balance;

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