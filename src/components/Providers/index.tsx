"use client";
import type { PropsWithChildren } from "react";
import SolanaProvider from "./SolanaProvider";
import { Header } from "../Header";
import { FloatingTransactionButton } from "../FloatingTransactionButton";

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <SolanaProvider>
      {children}
      <FloatingTransactionButton />
    </SolanaProvider>
  );
};

export default Providers;
