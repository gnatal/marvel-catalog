"use client"
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const MobileNavBar: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", path: "/", icon: "⌂" },
    { name: "Comics", path: "/comics", icon: "◈" },
    { name: "Characters", path: "/characters", icon: "⦿" },
    { name: "Series", path: "/series", icon: "❖" },
    { name: "Events", path: "/events", icon: "◎" },
  ];

  return (
    <nav className="fixed bottom-0 w-full z-50 md:hidden border-t border-cyan-900/50 bg-black/90 backdrop-blur-md">
      <div className="grid grid-cols-5 h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          
          return (
            <Link
              key={item.name}
              href={item.path}
              className="relative flex flex-col items-center justify-center group"
            >
              {/* Top highlight bar for active item */}
              {isActive && (
                <div className="absolute top-0 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-cyan-500 to-fuchsia-500"></div>
              )}
              
              {/* Icon */}
              <div className={`text-lg mb-1 ${
                isActive 
                  ? "text-cyan-400" 
                  : "text-gray-500 group-hover:text-white"
              }`}>
                {item.icon}
              </div>
              
              {/* Label */}
              <div className={`text-xs font-mono ${
                isActive 
                  ? "text-cyan-400" 
                  : "text-gray-500 group-hover:text-white"
              }`}>
                {isActive ? `[${item.name}]` : item.name}
              </div>
              
              {/* Bottom glow for active state */}
              {isActive && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-cyan-500/20 blur-sm"></div>
              )}
              
              {/* Highlight overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>
          );
        })}
      </div>
      
      {/* Decorative element */}
      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
        <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
      </div>
    </nav>
  );
};

export default MobileNavBar;