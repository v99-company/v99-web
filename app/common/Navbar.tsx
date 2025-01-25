"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import SearchFilters from "./SearchFilters"

export default function Navbar({ bgColor = "bg-white", showSearch = false }) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const handleLinkClick = () => {
    if (isOpen) {
      setIsOpen(false)
    }
  }

  const handleSearch = (searchTerm: string) => {
    if (searchTerm.trim()) {
      // router.push(`/main?search=${encodeURIComponent(searchTerm)}`)
      router.push(`/?search=${encodeURIComponent(searchTerm)}`)
    }
  }

  return (
    <nav className={`px-4 md:px-8 lg:px-32 ${bgColor} py-2`}>
      <div className="w-full flex items-center justify-between">
        {/* Logo - always visible */}
        <Link href="/" className="flex-shrink-0">
          <Image src="/v99logo.png" alt="Logo" width={60} height={60} className="rounded-md" />
        </Link>

        {/* Navigation links - visible on larger screens when not searching */}
        {!showSearch && (
          <div className="hidden md:flex items-center space-x-4 font-semibold text-white text-lg">
            {/* <Link href="/add-business" className="hover:underline px-3 rounded-md"> */}
            <Link href="/contact" className="hover:underline px-3 rounded-md">
              Add Your Business
            </Link>
            <Link href="/about" className="hover:underline px-3 rounded-md">
              About
            </Link>
            <Link href="/contact" className="hover:underline px-3 rounded-md">
              Contact
            </Link>
          </div>
        )}

        {/* Search bar - visible when showSearch is true */}
        {showSearch && (
          <div className="flex-grow mx-4">
            <SearchFilters placeholder="Search other businesses" onFilterChange={handleSearch} />
          </div>
        )}

        {/* Mobile menu button - visible on smaller screens when not searching */}
        {!showSearch && (
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        )}
      </div>

      {/* Mobile menu - visible on smaller screens when open and not searching */}
      {isOpen && !showSearch && (
        <div className="md:hidden mt-4" id="mobile-menu">
          <div className="flex flex-col items-center space-y-2 font-semibold text-white">
            <Link
              // href="/add-business"
              href="/contact"
              onClick={handleLinkClick}
              className="hover:underline block px-3 py-2 rounded-md text-base w-full text-center"
            >
              Add your business
            </Link>
            <Link
              href="/about"
              onClick={handleLinkClick}
              className="hover:underline block px-3 py-2 rounded-md text-base w-full text-center"
            >
              About
            </Link>
            <Link
              href="/contact"
              onClick={handleLinkClick}
              className="hover:underline block px-3 py-2 rounded-md text-base w-full text-center"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}