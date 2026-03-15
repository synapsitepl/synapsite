"use client"

import { useState } from "react"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ContactForm } from "@/components/contact-form"

const navLinks = [
  { label: "Jak to działa", href: "#jak-to-dziala" },
  { label: "Oferta", href: "#cennik" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "FAQ", href: "#faq" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isContactOpen, setIsContactOpen] = useState(false)

  return (
    <header className="fixed top-0 z-50 w-full">
      <div className="mx-auto max-w-7xl px-4">
        <nav className="mt-4 flex items-center justify-between rounded-full border border-border bg-background/80 px-6 py-3 backdrop-blur-md">
          {/* Logo */}
          <a href="#" className="flex shrink-0 items-center gap-3">
            <Image
              src="/logo-icon.png"
              alt="Synapsite"
              width={44}
              height={44}
              className="h-10 w-10 rounded-full object-cover"
              priority
            />
            <span className="text-xl font-semibold tracking-tight text-foreground">
              <span className="text-white">SYNAP</span>
              <span className="text-primary">SITE</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => setIsContactOpen(true)}
            >
              Zamów bezpłatny projekt
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        <div
          className={cn(
            "mt-2 overflow-hidden rounded-2xl border border-border bg-background/95 backdrop-blur-md transition-all duration-300 md:hidden",
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 border-transparent"
          )}
        >
          <div className="flex flex-col gap-4 p-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-foreground transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            ))}
            <Button
              className="mt-2 w-full bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => { setIsOpen(false); setIsContactOpen(true) }}
            >
               Zamów bezpłatny projekt
            </Button>
          </div>
        </div>
      </div>

      {/* Contact Form Modal */}
      <ContactForm isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </header>
  )
}
