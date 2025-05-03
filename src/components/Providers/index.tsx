"use client";
import type { PropsWithChildren } from "react";
import SolanaProvider from "./SolanaProvider";

const Providers = ({ children }: PropsWithChildren) => {
  return <SolanaProvider>{children}</SolanaProvider>;
};

export default Providers;
