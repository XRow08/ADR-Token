import Providers from "@/components/Providers";
import type { Metadata } from "next";
import "./globals.css";
import { Nunito_Sans } from "next/font/google";

const nunito = Nunito_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "XXX Token",
  description: "XXX Token",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`scroll-smooth ${nunito.className}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
