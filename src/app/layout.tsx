import Providers from "@/components/Providers";
import type { Metadata } from "next";
import {
  neulisNeue,
  neulisSans,
  neulisNeueAdditional,
} from "../constants/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "ADR Token",
  description: "ADR Token",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${neulisSans.variable}`}
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
