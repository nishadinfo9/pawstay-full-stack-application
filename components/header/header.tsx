"use client";

import Link from "next/link";
import { useState } from "react";
import Container from "../container/container";
import Logo from "./_components/logo";
import BookNowBtn from "@/app/(auth)/_components/bookNowBtn";
import { useSession } from "next-auth/react";

const navItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Services",
    href: "/services",
  },
  {
    label: "How It Works",
    href: "/how-it-works",
  },
  {
    label: "About Us",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { status } = useSession();


  return (
    <header className="border-b border-gray-100 bg-white">
      <Container>
        <nav className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" onClick={() => setIsOpen(false)}>
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-gray-700 transition-colors hover:text-green-600"
              >
                {item.label}
              </Link>
            ))}
            {status === "authenticated" && (
              <Link
                href={'/dashboard'}
                className="text-sm font-medium text-gray-700 transition-colors hover:text-green-600"
              >
                Dashboard
              </Link>
            )}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <BookNowBtn />
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 lg:hidden"
          >
            {isOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="border-t border-gray-100 py-5 lg:hidden">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg px-3 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-green-600"
                >
                  {item.label}
                </Link>
              ))}

              {status === "authenticated" && (
                <Link
                  href={'/dashboard'}
                  className="rounded-lg px-3 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-green-600"
                >
                  Dashboard
                </Link>
              )}

              <div className="mt-3 px-3">
                <BookNowBtn />
              </div>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
};

export default Header;