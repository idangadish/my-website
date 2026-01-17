"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type NavLink = {
  href: string;
  label: string;
};

const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/education", label: "Education" },
  { href: "/skills", label: "Skills" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white dark:bg-slate-900 dark:border-slate-700">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Brand */}
          <Link
            href="/"
            className="text-lg font-bold text-slate-900 dark:text-white hover:text-blue-500 dark:hover:text-blue-300 transition-colors duration-200"
            onClick={closeMenu}
          >
            My Portfolio
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors duration-200 ${
                    isActive
                      ? "bg-blue-400 text-white dark:bg-blue-400 dark:text-white"
                      : "text-slate-700 dark:text-slate-300 hover:text-blue-500 hover:bg-blue-50 dark:hover:text-blue-300 dark:hover:bg-blue-900/20"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:text-blue-500 hover:bg-blue-50 dark:hover:text-blue-300 dark:hover:bg-blue-900/20 transition-colors duration-200"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white dark:bg-slate-900 dark:border-slate-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className={`block px-4 py-3 rounded-lg text-base font-semibold transition-colors duration-200 ${
                      isActive
                        ? "bg-blue-500 text-white dark:bg-blue-500 dark:text-white"
                        : "text-slate-700 dark:text-slate-300 hover:text-blue-600 hover:bg-blue-50 dark:hover:text-blue-400 dark:hover:bg-blue-900/20"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
