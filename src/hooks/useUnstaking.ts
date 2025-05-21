import { useState } from "react";
import { usePurchase } from "./usePurchase";

export function useUnstaking() {
  const { balance } = usePurchase();
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const stakedBalance = 1000;
  const earningBalance = 50;

  const handleMaxClick = () => {
    setAmount(stakedBalance.toString());
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value) || value === "") {
      setAmount(value);
    }
  };

  const handleUnstake = async () => {
    try {
      setIsLoading(true);
      // Implement unstaking logic here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulation
      setAmount("");
    } catch (error) {
      console.error("Unstaking failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isValid = amount && Number(amount) <= stakedBalance;

  return {
    balance,
    amount,
    isLoading,
    handleAmountChange,
    handleMaxClick,
    handleUnstake,
    isValid,
    stakedBalance,
    earningBalance,
  };
} 