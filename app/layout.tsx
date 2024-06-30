import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ArtGPT - Describe and generate art using AI",
  description: "Decribe and generate art with AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const scrolled = false;
  return (
    <html lang="en">
      <body className={inter.variable}>
        <Toaster />
        <div className="fixed h-screen w-full bg-gradient-to-br from-zinc-100 via-teal-50 to-indigo-100" />
        <div
          className={`fixed top-0 w-full ${
            scrolled
              ? "border-b border-gray-200 bg-white/50 backdrop-blur-xl"
              : "bg-white/0"
          } z-30 transition-all`}
        >
          <div className="mx-5 flex h-16 max-w-screen-xl items-center justify-between xl:mx-auto">
            <Link href="/" className="flex items-center font-display text-2xl">
              <Image
                src="/logo.png"
                alt="Logo image of a chat bubble"
                width="30"
                height="30"
                className="mr-2 rounded-sm"
                unoptimized
              />
              <p>Encode AI Bootcamp</p>
            </Link>
            
          </div>
        </div>
        <main className="flex min-h-screen w-full flex-col items-center justify-center py-32">
          {children}
        </main>
      </body>
    </html>
  );
}
