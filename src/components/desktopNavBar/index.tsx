import Link from "next/link";
import React from "react";

const DesktopNavBar: React.FC = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold hover:text-yellow-400 transition-colors"
        >
          <div className="text-2xl font-bold">Marvel API</div>
        </Link>

        <ul className="flex space-x-6">
          <li>
            <Link
              href="/comics"
              className="hover:text-yellow-400 transition-colors"
            >
              Comics
            </Link>
          </li>
          <li>
            <Link
              href="/series"
              className="hover:text-yellow-400 transition-colors"
            >
              Series
            </Link>
          </li>
          <li>
            <Link
              href="/creators"
              className="hover:text-yellow-400 transition-colors"
            >
              Creators
            </Link>
          </li>
          <li>
            <Link
              href="/events"
              className="hover:text-yellow-400 transition-colors"
            >
              Events
            </Link>
          </li>
          <li>
            <Link
              href="/stories"
              className="hover:text-yellow-400 transition-colors"
            >
              Stories
            </Link>
          </li>
          <li>
            <Link
              href="/characters"
              className="hover:text-yellow-400 transition-colors"
            >
              Characters
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default DesktopNavBar;
