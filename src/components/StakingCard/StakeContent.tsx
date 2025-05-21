import { motion } from "framer-motion";
import { Button } from "../Button";
import { LogoIcon } from "../Icons/LogoIcon";
import { useStaking } from "@/hooks/useStaking";

export function StakeContent() {
  const staking = useStaking();

  return (
    <div className="min-h-[420px] flex flex-col">
      <div className="flex-1 space-y-6">
        <div>
          <div className="flex justify-between mb-2">
            <span>Amount to stake</span>
            <span>Balance: {staking.balance} $ADR</span>
          </div>
          <div className="flex items-center bg-[#1A1A1A] rounded p-2">
            <div className="flex items-center gap-1 text-sm bg-[#313131] rounded p-1 px-[8px]">
              <LogoIcon className="w-4 h-4" /> $ADR
            </div>
            <input
              type="text"
              value={staking.amount}
              onChange={staking.handleAmountChange}
              placeholder="0.00"
              className="bg-transparent flex-1 mx-2 outline-none w-full"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={staking.handleMaxClick}
              className="text-[#FFD60A] hover:brightness-110 transition-all"
            >
              MAX
            </motion.button>
          </div>
          {Number(staking.amount) > staking.balance && (
            <p className="text-red-500 text-sm mt-1">Insufficient balance</p>
          )}
        </div>

        <div>
          <h2 className="mb-2 font-semibold text-xl">Lock-up Period</h2>
          <div className="flex flex-wrap gap-2">
            {staking.periods.map((periodInfo) => (
              <motion.button
                key={periodInfo.period}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => staking.setSelectedPeriod(periodInfo.period)}
                className={`${
                  staking.selectedPeriod === periodInfo.period
                    ? "bg-[#FFD60A] text-black"
                    : "bg-[#1A1A1A] hover:bg-[#2A2A2A]"
                } px-4 py-2 rounded-lg transition-all duration-200`}
              >
                {periodInfo.label}
                <span className="block text-xs opacity-75">
                  APY {periodInfo.apy}%
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-4 font-semibold text-xl">Resume</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-[#B4B4B4]">Staking Amount:</span>
              <span className="font-bold">{staking.amount || "0"} $ADR</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#B4B4B4]">Lock-up Period:</span>
              <span className="font-bold">
                {staking.periods.find(p => p.period === staking.selectedPeriod)?.label || "None"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#B4B4B4]">Estimated Rewards:</span>
              <span className="font-bold">
                {staking.estimatedRewards.toFixed(3)} $ADR
              </span>
            </div>
          </div>
        </div>
      </div>

      <Button
        onClick={staking.onStake}
        disabled={!staking.isValid || staking.isLoading}
        className="w-1/3 mt-2 h-[44px] self-end"
      >
        {staking.isLoading ? "Processing..." : "Confirm Staking"}
      </Button>
    </div>
  );
}
