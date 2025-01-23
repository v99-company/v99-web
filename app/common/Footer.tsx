import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React from 'react'

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-8">
  <div className="flex flex-col md:flex-row items-center justify-between px-4">
        {/* Footer Left Section */}
        <div className="flex items-center space-x-2">
      Developed By 
      <Link 
        href="https://primeintech.com" 
        target="_blank" 
        className="text-blue-400 hover:text-blue-300 transition duration-200 px-1"
      >
        PrimeInTech Team
      </Link>
    </div>

    <p className="text-center text-sm md:text-left">
      &copy; {new Date().getFullYear()} V99. All rights reserved.
    </p>

    <Link
      href={`https://wa.me/+919704271714?text=${encodeURIComponent(
        "Hello PrimeInTech Team,\nI visited V99 website and would like to inquire. Could you please provide more details or guide me on how to proceed?\nThank you!"
      )}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center text-gray-300 font-semibold hover:text-green-400 transition duration-200 text-sm md:text-md"
    >
      <FontAwesomeIcon
        icon={faWhatsapp}
        className="mr-2 h-5 w-5 text-green-500"
      />
      <span>WhatsApp for Website/App Development & SEO</span>
    </Link>
  </div>
</footer>

  )
}

export default Footer