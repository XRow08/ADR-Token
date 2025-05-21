import { PublicKey } from "@solana/web3.js";

export enum StakingPeriod {
  Minutes1 = 'Minutes1',
  Minutes2 = 'Minutes2',
  Minutes5 = 'Minutes5',
  Minutes10 = 'Minutes10',
  Minutes30 = 'Minutes30',
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