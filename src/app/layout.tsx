import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import DesktopNavBar from "@/components/desktopNavBar";
import MobileNavBar from "@/components/mobileNavBar";
import styles from "@/components/carrousel/index.module.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MARVEL [NEXUS] | Cyberpunk Marvel Database",
  description: "Dive into the digital nexus of Marvel's multiverse. Advanced cyberpunk interface for exploring Marvel comics, characters, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white min-h-screen`}
      >
        <div className="fixed inset-0 bg-[url('/cyber-grid.png')] opacity-5 pointer-events-none z-0"></div>
        <div className={`fixed inset-0 bg-[url('/scanline.png')] opacity-10 pointer-events-none z-0 ${styles.scanline}`}></div>
        
        <div className="relative z-10 flex flex-col min-h-screen pb-16 md:pb-0">
          <DesktopNavBar />
          <main className="flex-grow">
            {children}
          </main>
          <MobileNavBar />
          
          <footer className="hidden md:block bg-black/80 border-t border-cyan-900/30 py-4 mt-8">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  <span className="text-cyan-500 font-mono">MARVEL[NEXUS]</span> <span className="text-gray-600">•</span> <span className="font-mono text-xs">v2.0.4</span>
                </div>
                <div className="text-xs text-gray-600 font-mono">
                  DATA.STREAM.ACTIVE <span className="inline-block w-1.5 h-1.5 bg-cyan-500 rounded-full ml-1 animate-pulse"></span>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}