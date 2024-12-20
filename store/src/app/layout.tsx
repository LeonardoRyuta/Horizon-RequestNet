"use client";

import { Montserrat } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { useState, createContext } from "react";
import { CartContext } from "@/lib/context";

const montserrat = Montserrat({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [cart, setCart] = useState<any>([]);

  return (
    <html lang="en">
      <body className={`${montserrat.className} pb-24`}>
        <CartContext.Provider value={{ cart, setCart }}>
          <Navbar />
          <main className="max-w-[1200px] w-full mx-auto px-5 py-8">
            {children}
          </main>
        </CartContext.Provider>
      </body>
    </html>
  );
}
