"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { company, primaryNav } from "@/lib/site";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="hidden md:flex items-center justify-between bg-navy-dark text-white text-sm px-6 lg:px-12 py-2">
        <span>{company.address}</span>
        <a href={`mailto:${company.email}`} className="hover:text-amber-light">
          {company.email}
        </a>
      </div>

      <div className="flex items-center justify-between px-6 lg:px-12 py-3">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/crox_logo.png"
            alt="CROX Oil & Gas logo"
            width={160}
            height={48}
            className="h-11 w-auto"
            priority
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-8 text-navy font-medium">
          {primaryNav.map((item) =>
            item.children ? (
              <div key={item.label} className="relative group">
                <button className="flex items-center gap-1 py-2 hover:text-amber cursor-pointer">
                  {item.label}
                </button>
                <div className="absolute left-0 top-full hidden group-hover:block bg-white shadow-lg rounded-md py-2 min-w-56 border border-gray-100">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block px-4 py-2 text-sm hover:bg-gray-50 hover:text-amber"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link key={item.href} href={item.href} className="py-2 hover:text-amber">
                {item.label}
              </Link>
            )
          )}
        </nav>

        <a
          href={`tel:${company.phoneHref}`}
          className="hidden lg:inline-block rounded-full bg-amber px-5 py-2.5 text-white font-semibold hover:bg-amber-light transition-colors"
        >
          {company.phone}
        </a>

        <button
          className="lg:hidden text-navy"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="lg:hidden border-t border-gray-100 px-6 py-4 flex flex-col gap-1 text-navy font-medium">
          {primaryNav.map((item) =>
            item.children ? (
              <div key={item.label} className="py-1">
                <span className="block py-1 text-navy/70 text-sm uppercase tracking-wide">
                  {item.label}
                </span>
                {item.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className="block py-2 pl-3"
                    onClick={() => setOpen(false)}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="py-2"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            )
          )}
          <a href={`tel:${company.phoneHref}`} className="mt-2 font-semibold text-amber">
            {company.phone}
          </a>
        </nav>
      )}
    </header>
  );
}
