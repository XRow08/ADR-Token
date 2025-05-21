import { motion } from "framer-motion";
import { Button } from "../Button";
import { LogoIcon } from "../Icons/LogoIcon";
import { useUnstaking } from "@/hooks/useUnstaking";

export function UnstakeContent() {
  const unstaking = useUnstaking();

  return (
    <div className="min-h-[420px] flex flex-col">
      <div className="flex-1 space-y-6">
        <motion.div className="bg-[#1A1A1A] rounded-lg p-4 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm opacity-75">Total Staked</span>
            <span className="font-bold">{unstaking.stakedBalance} $ADR</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm opacity-75">Earnings</span>
            <span className="font-bold text-[#FFD60A]">
              +{unstaking.earningBalance} $ADR
            </span>
          </div>
        </motion.div>

        <div>
          <div className="flex justify-between mb-2">
            <span>Amount to unstake</span>
            <span>Available: {unstaking.stakedBalance} $ADR</span>
          </div>
          <div className="flex items-center bg-[#1A1A1A] rounded p-2">
            <div className="flex items-center gap-1 text-sm bg-[#313131] rounded p-1 px-[8px]">
              <LogoIcon className="w-4 h-4" /> $ADR
            </div>
            <input
              type="text"
              value={unstaking.amount}
              onChange={unstaking.handleAmountChange}
              placeholder="0.00"
              className="bg-transparent flex-1 mx-2 outline-none w-full"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={unstaking.handleMaxClick}
              className="text-[#FFD60A] hover:brightness-110 transition-all"
            >
              MAX
            </motion.button>
          </div>
          {Number(unstaking.amount) > unstaking.stakedBalance && (
            <p className="text-red-500 text-sm mt-1">
              Amount exceeds staked balance
            </p>
          )}
        </div>

        <div>
          <h2 className="mb-4 font-semibold text-xl">Resume</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-[#B4B4B4]">Unstaking Amount:</span>
              <span className="font-bold">{unstaking.amount || "0"} $ADR</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#B4B4B4]">Earnings to Claim:</span>
              <span className="font-bold text-[#FFD60A]">
                {unstaking.earningBalance} $ADR
              </span>
            </div>
          </div>
        </div>
      </div>

      <Button
        onClick={unstaking.handleUnstake}
        disabled={!unstaking.isValid || unstaking.isLoading}
        className="w-1/3 mt-2 h-[44px] self-end"
      >
        {unstaking.isLoading ? "Processing..." : "Confirm Unstake"}
      </Button>
    </div>
  );
}
