"use client"
import { useState } from "react";
import Link from "next/link";

import { 
  HomeIcon, 
  UserPlusIcon, 
  Bars3Icon, 
  XMarkIcon 
} from "@heroicons/react/24/outline";

const MobileNavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="fixed bottom-0 w-full bg-gray-800 text-white flex justify-around items-center py-2 md:hidden">
        <Link href="/">
          <div className="flex flex-col items-center cursor-pointer">
            <HomeIcon className="h-5 w-5 mb-1" />
            <span className="text-sm">Home</span>
          </div>
        </Link>

        <Link href="/signup">
          <div className="flex flex-col items-center cursor-pointer">
            <UserPlusIcon className="h-5 w-5 mb-1" />
            <span className="text-sm">Signup</span>
          </div>
        </Link>

        {/* Menu Button */}
        <button
          onClick={toggleMenu}
          className="flex flex-col items-center focus:outline-none"
        >
          <Bars3Icon className="h-5 w-5 mb-1" />
          <span className="text-sm">Menu</span>
        </button>
      </nav>

      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMenu}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-64 bg-gray-900 text-white z-50 transform transition-transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4">
          <button
            className="text-right w-full mb-4 focus:outline-none"
            onClick={toggleMenu}
          >
            <XMarkIcon className="h-6 w-6 inline-block mr-2" />
          </button>

          <ul className="space-y-4">
            <li>
              <Link href="/comics" onClick={() => setIsMenuOpen(false)}>
                Comics
              </Link>
            </li>
            <li>
              <Link href="/series" onClick={() => setIsMenuOpen(false)}>
                Series
              </Link>
            </li>
            <li>
              <Link href="/creators" onClick={() => setIsMenuOpen(false)}>
                Creators
              </Link>
            </li>
            <li>
              <Link href="/events" onClick={() => setIsMenuOpen(false)}>
                Events
              </Link>
            </li>
            <li>
              <Link href="/stories" onClick={() => setIsMenuOpen(false)}>
                Stories
              </Link>
            </li>
            <li>
              <Link href="/characters" onClick={() => setIsMenuOpen(false)}>
                Characters
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default MobileNavBar;
