import React from "react";
import { useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const headerClass = `dark:bg-neutral-800 text-white sticky top-0 z-50 ${
    !isHomePage ? "border-t border-opacity-50 border-slate-200" : ""
  }`;

  return (
    <footer className={headerClass}>
      <div className="w-full p-4 md:py-12">
        <div className="flex items-center justify-center">
          <ul className="flex text-sm font-medium text-gray-500  dark:text-gray-400">
            <li>
              <a href="/" className="hover:underline  italic">
                FastXR
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
