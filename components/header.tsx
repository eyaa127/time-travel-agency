"use client";

import { useState } from "react";
import { Menu, X, Clock } from "lucide-react";

const navLinks = [
  { label: "Destinations", href: "#destinations" },
  { label: "Quiz", href: "#quiz" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <Clock className="h-6 w-6 text-primary" />
          <span className="font-serif text-xl font-bold tracking-wide text-foreground">
            TimeTravel Agency
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm tracking-widest uppercase text-muted-foreground transition-colors duration-300 hover:text-primary"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#destinations"
            className="rounded-sm border border-primary bg-primary/10 px-5 py-2 text-sm font-medium tracking-wider uppercase text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
          >
            Book Now
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-foreground md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="border-t border-border/50 bg-background/95 px-6 pb-6 pt-4 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm tracking-widest uppercase text-muted-foreground transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#destinations"
              onClick={() => setMobileOpen(false)}
              className="mt-2 rounded-sm border border-primary bg-primary/10 px-5 py-3 text-center text-sm font-medium tracking-wider uppercase text-primary transition-all hover:bg-primary hover:text-primary-foreground"
            >
              Book Now
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
