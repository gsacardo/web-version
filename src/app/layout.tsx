import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import NavBar from "@/components/NavBar";
import { Providers } from "@/components/providers/Provider";
import { NextUIProvider } from "@nextui-org/system";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Web-Teste",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="text-[#828282]">
      <body className={inter.className}>
        <Providers>
          <NextUIProvider>
            <NavBar />
            <div className="flex-1 pb-20 sm:ml-20 sm:pb-0">
              {children}
            </div>
          </NextUIProvider>
        </Providers>
      </body>
    </html>
  );
}
