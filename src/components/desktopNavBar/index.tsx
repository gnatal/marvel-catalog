"use client"
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const DesktopNavBar: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { name: "Comics", path: "/comics" },
    { name: "Series", path: "/series" },
    { name: "Creators", path: "/creators" },
    { name: "Events", path: "/events" },
    { name: "Stories", path: "/stories" },
    { name: "Characters", path: "/characters" },
  ];

  return (
    <nav className="hidden md:block sticky top-0 z-50 backdrop-blur-sm bg-black/80 border-b border-cyan-900/50">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        <Link
          href="/"
          className="group relative"
        >
          <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500 group-hover:from-fuchsia-400 group-hover:to-cyan-500 transition-all duration-300">
            MARVEL<span className="font-mono text-cyan-400">[NEXUS]</span>
          </div>
          <div className="h-0.5 w-12 bg-gradient-to-r from-cyan-500 to-fuchsia-500 group-hover:from-fuchsia-500 group-hover:to-cyan-500 transition-all duration-300"></div>
        </Link>

        {/* Nav Links */}
        <ul className="flex items-center space-x-1">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            
            return (
              <li key={item.name}>
                <Link
                  href={item.path}
                  className={`relative px-3 py-2 font-mono tracking-wide text-sm transition-all duration-300 group ${
                    isActive 
                      ? "text-cyan-400" 
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {/* Top line */}
                  <span className={`absolute top-0 left-0 h-0.5 w-0 bg-cyan-500 transition-all duration-300 ${
                    isActive ? "w-full" : "group-hover:w-full"
                  }`}></span>
                  
                  {/* Bottom line */}
                  <span className={`absolute bottom-0 right-0 h-0.5 w-0 bg-fuchsia-500 transition-all duration-300 ${
                    isActive ? "w-full" : "group-hover:w-full"
                  }`}></span>
                  
                  {/* The actual text */}
                  <span className="relative z-10">
                    {isActive ? `[${item.name.toUpperCase()}]` : item.name.toUpperCase()}
                  </span>
                  
                  {/* Active indicator */}
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full"></span>
                  )}
                </Link>
              </li>
            );
          })}
          
          {/* System status indicator */}
          <li className="ml-4">
            <div className="flex items-center space-x-2 border border-cyan-900/50 px-2 py-1 bg-black/50 rounded-sm">
              <div className="h-1.5 w-1.5 rounded-full bg-cyan-500 animate-pulse"></div>
              <span className="text-xs font-mono text-cyan-400">SYSTEM.ONLINE</span>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default DesktopNavBar;