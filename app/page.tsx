'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'
import { HERO_SECTION_VIDEO } from './utils/strings'
import { Phone, User } from 'lucide-react'
import { Card } from '@/components/ui/card'

export default function LandingPage() {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const launchDate = new Date('2025-01-26T08:00:00+05:30')

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      const difference = launchDate.getTime() - now.getTime()

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setCountdown({ days, hours, minutes, seconds })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const companyInfo = {
    name: "Mr. Raheem",
    phone: "8688520059",
    email: "v99@gmail.com",
    whatsapp: "8688520059",
  };


  return (
    <div className="flex flex-col min-h-screen ">
      <header className="px-4 lg:px-6 h-14 flex items-center fixed w-full bg-white backdrop-blur-sm z-50">
        <Link className="flex items-center justify-center" href="#">
          <span className="sr-only">v99.in</span>
          <span className="font-bold text-2xl">v99.in</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#about">
            About
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#contact">
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 overflow-hidden my-8 md:my-2">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
          >
            <source src={HERO_SECTION_VIDEO} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Overlay */}
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-70 z-10"></div>

          <div className="container px-4 md:px-6 relative z-20 flex flex-col items-center">
            <div className="flex flex-col items-center space-y-4 text-center text-white">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-2"
              >
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Connecting India, One Service at a Time
                </h1>
                <p className="mx-auto max-w-[700px] md:text-xl">
                  v99.in is launching on Republic Day, bringing a revolution in local service discovery.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="grid grid-cols-4 gap-4 text-center"
              >
                <div className="flex flex-col">
                  <span className="text-4xl font-bold">{countdown.days}</span>
                  <span className="text-sm">Days</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-4xl font-bold">{countdown.hours}</span>
                  <span className="text-sm">Hours</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-4xl font-bold">{countdown.minutes}</span>
                  <span className="text-sm">Minutes</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-4xl font-bold">{countdown.seconds}</span>
                  <span className="text-sm">Seconds</span>
                </div>
              </motion.div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input
                    className="max-w-lg flex-1 bg-white/10 text-white placeholder-white/70"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button type="submit" variant="secondary">Notify Me</Button>
                </form>
                <p className="text-xs text-white/80">
                  Be the first to know when we launch. We respect your privacy.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section>
        <div className="w-full relative overflow-hidden bg-gradient-to-r from-orange-600 via-white to-green-600">
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ 
          repeat: Infinity, 
          duration: 20, 
          ease: 'linear',
          repeatType: "loop"
        }}
        className="flex whitespace-nowrap py-2"
      >
        {/* First set of content */}
        <div className="flex">
          <span className="inline-block px-4 text-lg py-4 text-black font-semibold">Launching on Republic Day 2025</span>
          <span className="inline-block px-4 text-lg py-4 text-black font-semibold">Find Local Services with Ease</span>
          <span className="inline-block px-4 text-lg py-4 text-black font-semibold">Join the Service Revolution</span>
          <span className="inline-block px-4 text-lg py-4 text-black font-semibold">v99.in - Your Local Service Directory</span>
        </div>
        {/* Duplicate content to ensure smooth infinite scroll */}
        <div className="flex">
          <span className="inline-block px-4 text-lg py-4 text-black font-semibold">Launching on Republic Day 2025</span>
          <span className="inline-block px-4 text-lg py-4 text-black font-semibold">Find Local Services with Ease</span>
          <span className="inline-block px-4 text-lg py-4 text-black font-semibold">Join the Service Revolution</span>
          <span className="inline-block px-4 text-lg py-4 text-black font-semibold">v99.in - Your Local Service Directory</span>
        </div>
      </motion.div>
    </div>
        </section>
        
        <section id="about" className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center justify-center space-y-4 text-center"
            >
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About v99.in</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  v99.in is revolutionizing how you connect with local service providers. Our platform offers a
                  seamless way to discover, evaluate, and contact professionals in your area. From plumbers to
                  photographers, find the right expert for your needs with our unique 5-digit lookup system.
                </p>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="grid gap-4 sm:grid-cols-2 md:grid-cols-3"
              >
                <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                  <svg
                    className=" h-10 w-10 fill-current text-blue-500"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <h3 className="text-xl font-bold">Local Focus</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                    Find service providers in your locality with ease.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                  <svg
                    className=" h-10 w-10 fill-current text-blue-500"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 2v20" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                  <h3 className="text-xl font-bold">Easy Access</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                    Simple 5-digit codes for quick provider lookup.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                  <svg
                    className=" h-10 w-10 fill-current text-blue-500"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect height="11" rx="2" ry="2" width="18" x="3" y="11" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <h3 className="text-xl font-bold">Comprehensive Profiles</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                    Detailed information about each service provider.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center justify-center space-y-4 text-center"
            >
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Get in Touch</h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Have questions or want to learn more? We would love to hear from you.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <Card className='py-4 flex flex-col items-start justify-start px-4 space-y-4 '>
                <div className="flex items-center space-x-4">
                  <User className="w-6 h-6 text-gray-900" />
                  <span className="text-gray-900">{companyInfo.name}</span>
                </div>
                <Link href={`tel:${companyInfo.phone}`} className="flex items-center space-x-4 cursor-pointer" >
                  <Phone className="w-6 h-6 text-gray-900" />
                  <span className="text-gray-900">{companyInfo.phone}</span>
                </Link>
                </Card>
                <div className="space-y-4 mb-8">
              </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 v99.in. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}
