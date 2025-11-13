import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import HeaderBar from "@/components/HeaderBar";
import Footer from "@/components/Footer";
//import TawkToWidget from "@/components/TawkToWidget";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mitho Masala",
  description: "Delight in Every Spice - Mitho Masala",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <HeaderBar />
        {children}
        <Footer/>
        {/* <TawkToWidget /> */}
      </body>
    </html>
  );
}
