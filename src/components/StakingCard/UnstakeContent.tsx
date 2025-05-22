import { Button } from "../Button";
import { useUnstaking } from "@/hooks/useUnstaking";
import { useEffect, useState } from "react";

function formatTimeLeft(seconds: number) {
  if (seconds <= 0) return "00:00:00";
  const h = Math.floor(seconds / 3600)
    .toString()
    .padStart(2, "0");
  const m = Math.floor((seconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${h}:${m}:${s}`;
}

export function UnstakeContent() {
  const { stakeInfo, onUnstake, isLoading } = useUnstaking();
  const [secondsLeft, setSecondsLeft] = useState<number>(0);

  useEffect(() => {
    if (!stakeInfo) return;
    setSecondsLeft(Math.max(0, Math.floor(stakeInfo.secondsLeft)));
    if (stakeInfo.secondsLeft <= 0) return;
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [stakeInfo]);

  if (!stakeInfo) {
    return <div className="text-center py-8">Loading stake info...</div>;
  }

  const canUnstake = secondsLeft <= 0 && !stakeInfo.claimed;

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-6">
        <div>
          <h2 className="mb-4 font-semibold text-xl">Resume</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-[#B4B4B4]">Staked Amount:</span>
              <span className="font-bold">{stakeInfo.amount || "0"} $ADR</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#B4B4B4]">Period:</span>
              <span className="font-bold">{stakeInfo.period}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#B4B4B4]">Start Time:</span>
              <span className="font-bold">
                {stakeInfo.startTime?.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#B4B4B4]">Unlock Time:</span>
              <span className="font-bold">
                {stakeInfo.unlockTime?.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#B4B4B4]">Status:</span>
              <span
                className={`font-bold ${
                  stakeInfo.claimed ? "text-green-500" : "text-yellow-400"
                }`}
              >
                {stakeInfo.claimed
                  ? "Claimed"
                  : secondsLeft > 0
                  ? "Locked"
                  : "Available"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#B4B4B4]">Time Left:</span>
              <span className="font-mono text-lg">
                {secondsLeft > 0 ? formatTimeLeft(secondsLeft) : "00:00:00"}
              </span>
            </div>
            {/* Se você tiver earnings/rewards, pode mostrar aqui */}
            {/* <div className="flex justify-between">
              <span className="">Earnings to Claim:</span>
              <span className="font-bold text-[#FFD60A]">
                {stakeInfo.stakedBalance} $ADR
              </span>
            </div> */}
          </div>
        </div>
      </div>

      <Button
        onClick={onUnstake}
        disabled={isLoading || !canUnstake}
        className="w-1/3 mt-8 h-[44px] self-end"
      >
        {isLoading
          ? "Processing..."
          : stakeInfo.claimed
          ? "Already Claimed"
          : secondsLeft > 0
          ? "Wait to Unstake"
          : "Confirm Unstake"}
      </Button>
    </div>
  );
}
