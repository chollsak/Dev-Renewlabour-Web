import type { Metadata } from "next";
import { Inter } from "next/font/google";
import './globals.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

  const kanitFontStyle: React.CSSProperties = {
    fontFamily: 'Kanit, sans-serif',
  };
  

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link href="https://fonts.googleapis.com/css?family=Kanit" rel="stylesheet"/>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
