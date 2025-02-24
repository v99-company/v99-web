import { Button } from '@/components/ui/button';
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">

      {/* Top row with links and copyright */}
      <div className="container mx-auto px-4 py-6 border-b border-gray-700">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm font-bold">
            &copy; {new Date().getFullYear()} V99 Near by Locator. All rights reserved.
          </p>
          <Link 
              href="/freelancerLogin" 
              className="text-sm  transition duration-200"
            >
              <Button className='bg-green-300 text-black'>Freelancer Login</Button>

              
            </Link>
          <div className="flex items-center gap-4 font-bold">
            <Link 
              href="/Policy" 
              className="text-sm hover:text-blue-400 transition duration-200"
            >
              Terms & Privacy
            </Link>
            <Link 
              href="/Contact" 
              className="text-sm hover:text-blue-400 transition duration-200"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom row with developer credits */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-center text-xs text-gray-400">
          Designed & Developed by{' '}
          <Link
            href="https://primeintech.com"
            target="_blank"
            className="text-blue-400 hover:text-blue-300 transition duration-200 ml-1"
          >
            PrimeInTech Team
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;