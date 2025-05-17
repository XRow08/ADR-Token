"use client";
import type { PropsWithChildren } from "react";
import SolanaProvider from "./SolanaProvider";
import { FloatingTransactionButton } from "../FloatingTransactionButton";
import { Toaster } from "react-hot-toast";

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <SolanaProvider>
      {children}
      <Toaster position="bottom-right" />
      <FloatingTransactionButton />
    </SolanaProvider>
  );
};

export default Providers;
