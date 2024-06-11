import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CustomProviders } from "../../provider";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Login",
  description: "Login Page",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CustomProviders>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </CustomProviders>
  );
}
