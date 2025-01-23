'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import Image from 'next/image';

export default function Navbar({ bgColor = "bg-transparent" }) {
  const [isOpen, setIsOpen] = useState(false);

  // Function to close the mobile menu
  const handleLinkClick = () => {
    if (isOpen) {
      setIsOpen(false);
    }
  };

  return (
    <nav className={`px-2 md:px-16 lg:px-32  ${bgColor}`}>
      <div className=" w-full px-4 sm:px-6 lg:px-8">
        <div className="flex w-full items-center justify-between h-16">
        <Link href={"/"}>
          <div className="flex items-center">
            <Image
              src="/favicon.ico"
              alt="Logo"
              width={50}
              height={50}
              className="mr-2 rounded-md"
            />
            <div className="text-xl font-bold text-white cursor-pointer">V99</div>
          </div>
          </Link>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4 font-semibold text-white text-lg">
              {/* <Link href="/" onClick={handleLinkClick} className="text-teal-300 hover:underline px-3 py-2 rounded-md text-sm font-medium">Home</Link> */}
              <Link href="/add-business" onClick={handleLinkClick} className="hover:underline px-3 py-2 rounded-md">Add Your Business</Link>
              <Link href="/about" onClick={handleLinkClick} className=" hover:underline px-3 py-2 rounded-md ">About</Link>
              <Link href="/contact" onClick={handleLinkClick} className=" hover:underline px-3 py-2 rounded-md ">Contact</Link>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-100 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
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
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden w-full flex items-center justify-end" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 font-semibold">
            <Link href="/add-business" onClick={handleLinkClick} className="text-teal-300 hover:underline block px-3 py-2 rounded-md text-base ">Add your business</Link>
            <Link href="/about" onClick={handleLinkClick} className="text-teal-300 hover:underline block px-3 py-2 rounded-md text-base ">About Us</Link>
            {/* <Link href="/" onClick={handleLinkClick} className="text-teal-300 hover:underline block px-3 py-2 rounded-md text-base font-medium">Home</Link> */}
          </div>
        </div>
      )}
    </nav>
  )
}