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
        <div className="flex items-center gap-4">
          <span aria-label="Facebook" className="opacity-80 hover:opacity-100 hover:text-amber-light cursor-pointer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.16 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.89h2.78l-.44 2.91h-2.34V22c4.78-.78 8.44-4.94 8.44-9.94Z" />
            </svg>
          </span>
          <span aria-label="LinkedIn" className="opacity-80 hover:opacity-100 hover:text-amber-light cursor-pointer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002ZM7 8.48H3V21h4V8.48Zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-3.96 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.68-2.91V8.48Z" />
            </svg>
          </span>
          <span aria-label="Twitter" className="opacity-80 hover:opacity-100 hover:text-amber-light cursor-pointer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.9 2H22l-7.2 8.23L23.3 22h-6.66l-5.2-6.8L5.5 22H2.4l7.7-8.8L1 2h6.83l4.7 6.22L18.9 2Zm-1.16 18h1.7L7.35 3.9H5.53L17.74 20Z" />
            </svg>
          </span>
          <span aria-label="Instagram" className="opacity-80 hover:opacity-100 hover:text-amber-light cursor-pointer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2c2.72 0 3.06.01 4.12.06 1.06.05 1.79.22 2.43.47.66.26 1.22.6 1.77 1.15.5.5.88 1.11 1.15 1.77.25.64.42 1.37.47 2.43.05 1.06.06 1.4.06 4.12 0 2.72-.01 3.06-.06 4.12-.05 1.06-.22 1.79-.47 2.43-.27.66-.65 1.27-1.15 1.77-.5.5-1.11.88-1.77 1.15-.64.25-1.37.42-2.43.47-1.06.05-1.4.06-4.12.06-2.72 0-3.06-.01-4.12-.06-1.06-.05-1.79-.22-2.43-.47a4.92 4.92 0 0 1-1.77-1.15 4.92 4.92 0 0 1-1.15-1.77c-.25-.64-.42-1.37-.47-2.43C2.01 15.06 2 14.72 2 12c0-2.72.01-3.06.06-4.12.05-1.06.22-1.79.47-2.43.26-.66.6-1.22 1.15-1.77.5-.5 1.11-.88 1.77-1.15.64-.25 1.37-.42 2.43-.47C8.94 2.01 9.28 2 12 2Zm0 1.8c-2.67 0-2.99.01-4.04.06-.87.04-1.34.18-1.65.3-.42.16-.71.36-1.02.67-.31.31-.5.6-.67 1.02-.12.31-.26.78-.3 1.65C4.27 8.75 4.26 9.07 4.26 12s.01 3.25.06 4.3c.04.87.18 1.34.3 1.65.16.42.36.71.67 1.02.31.31.6.5 1.02.67.31.12.78.26 1.65.3 1.05.05 1.37.06 4.04.06s2.99-.01 4.04-.06c.87-.04 1.34-.18 1.65-.3.42-.16.71-.36 1.02-.67.31-.31.5-.6.67-1.02.12-.31.26-.78.3-1.65.05-1.05.06-1.37.06-4.3s-.01-3.25-.06-4.3c-.04-.87-.18-1.34-.3-1.65a2.7 2.7 0 0 0-.67-1.02 2.7 2.7 0 0 0-1.02-.67c-.31-.12-.78-.26-1.65-.3C14.99 3.81 14.67 3.8 12 3.8Zm0 3.05a5.15 5.15 0 1 1 0 10.3 5.15 5.15 0 0 1 0-10.3Zm0 1.8a3.35 3.35 0 1 0 0 6.7 3.35 3.35 0 0 0 0-6.7Zm5.35-1.98a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0Z" />
            </svg>
          </span>
        </div>
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
