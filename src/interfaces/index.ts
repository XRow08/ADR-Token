import { PublicKey } from "@solana/web3.js";

export enum StakingPeriod {
  Minutes1 = "minutes1",
  Minutes2 = "minutes2",
  Minutes5 = "minutes5",
  Minutes10 = "minutes10",
  Minutes30 = "minutes30",
}

export interface StakeInfo {
  stakeAccount: PublicKey;
  owner: PublicKey;
  amount: number;
  startTime: number;
  unlockTime: number;
  period: StakingPeriod;
  claimed: boolean;
}

export interface Staking {
  balance: number;
  amount: string;
  handleAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleMaxClick: () => void;
  onStake: () => Promise<void>;
  onUnstake: () => Promise<void>;
  selectedPeriod: StakingPeriod;
  setSelectedPeriod: (period: StakingPeriod) => void;
  estimatedRewards: number;
  periods: {
    label: string;
    apy: number;
    minutes: number;
    period: StakingPeriod;
  }[];
  isLoading: boolean;
}

