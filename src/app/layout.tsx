import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Village SACCO - Digital Financial Services for Rural Communities",
  description: "Empowering rural communities with digital SACCO services including savings, loans, virtual cards, and USDT transfers powered by Bitnob.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased min-h-screen bg-gray-50`}
      >
        {children}
      </body>
    </html>
  );
}
