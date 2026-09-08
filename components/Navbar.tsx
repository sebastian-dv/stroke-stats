"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const pathname = usePathname()

  const links = [
    { href: "/dashboard", label: "Home" },
    { href: "/play", label: "Play Round" },
    { href: "/social", label: "Social" },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-rough" style={{
      background: "linear-gradient(to right, var(--color-rough) 0%, var(--color-fairway) 20%, var(--color-fairway) 80%, var(--color-rough) 100%)"
    }}>
      <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-6">
        <span className="text-white font-bold text-lg mr-4">Stroke Stats</span>
        {links.map(link => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-sm font-medium transition-colors ${
              pathname === link.href
                ? "text-white"
                : "text-white/60 hover:text-white"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}