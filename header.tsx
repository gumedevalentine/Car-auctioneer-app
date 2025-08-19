"use client"

import { Button } from "@/components/ui/button"
import { Car, Menu, User } from "lucide-react"
import Link from "next/link"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/20 bg-gradient-to-r from-slate-800 via-slate-700 to-stone-700 backdrop-blur supports-[backdrop-filter]:bg-slate-800/90 shadow-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="relative">
            <Car className="h-8 w-8 text-amber-400 group-hover:text-amber-300 transition-all duration-300 drop-shadow-lg" />
            <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-sm group-hover:bg-amber-300/30 transition-all duration-300"></div>
          </div>
          <span className="text-xl font-serif font-bold text-white drop-shadow-md group-hover:text-amber-100 transition-colors duration-300">
            Elite Auto Auctions
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/"
            className="text-sm font-medium text-white/90 hover:text-amber-300 hover:drop-shadow-md transition-all duration-300 relative group"
          >
            Current Auction
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-300 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link
            href="/how-it-works"
            className="text-sm font-medium text-white/90 hover:text-amber-300 hover:drop-shadow-md transition-all duration-300 relative group"
          >
            How It Works
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-300 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link
            href="/past-auctions"
            className="text-sm font-medium text-white/90 hover:text-amber-300 hover:drop-shadow-md transition-all duration-300 relative group"
          >
            Past Auctions
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-300 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium text-white/90 hover:text-amber-300 hover:drop-shadow-md transition-all duration-300 relative group"
          >
            Contact
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-300 group-hover:w-full transition-all duration-300"></span>
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Link href="/auth">
            <Button
              variant="outline"
              size="sm"
              className="hidden sm:flex bg-white/10 border-white/30 text-white hover:bg-white hover:text-slate-800 hover:border-white transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-xl hover:scale-105"
            >
              <User className="h-4 w-4 mr-2" />
              Sign In
            </Button>
          </Link>
          <Button
            className="md:hidden text-white hover:text-amber-300 hover:bg-white/10 transition-all duration-300"
            variant="ghost"
            size="sm"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}
