'use client';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { LayoutDashboard, UserRound, ChevronDown, BriefcaseBusiness, UsersRound, Cylinder, CircleUser, ContactRound, Network, Warehouse, CarFront } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  const handleNavigation = (url: string) => {
    router.push(url);
  };

  return (
    <main className="bg-white border-b border-t border-gray-200 mt-1"> 
      <div className="w-full shadow-md py-1 px-20 flex justify-center">
        <div className="relative group mr-4">
          <button className="w-36 h-10 bg-zinc-800 flex items-center space-x-2 p-2 rounded-md cursor-pointer">
            <LayoutDashboard className="h-5 w-5 text-white text-base" />
            <Link href='/' className="text-white">Dashboard</Link>
          </button>
        </div>

        {/* Center-aligned buttons */}
        <div className="flex items-center space-x-4">

          <div className="relative group">
            <button className="w-36 h-10 bg-white hover:bg-zinc-300 text-zinc-800 flex items-center space-x-2 p-2 cursor-pointer"
            onClick={() => handleNavigation('/admin/clients')}>
              <UsersRound className="h-5 w-5 text-base" />
              <span>Clients</span>
            </button>
          </div>
{/* 
          <div className="relative group">
            <button className="w-36 h-10 bg-white hover:bg-zinc-300 text-zinc-800 flex items-center space-x-2 p-2 cursor-pointer"
            onClick={() => handleNavigation('/users')}>
              <UsersRound className="h-5 w-5 text-base" />
              <span>Users</span>
            </button>
          </div>

          <div className="relative group">
            <button className="w-36 h-10 bg-white hover:bg-zinc-300 text-zinc-800 flex items-center space-x-2 p-2 cursor-pointer"
            onClick={() => handleNavigation('/employees')}>
              <BriefcaseBusiness className="h-5 w-5 text-base" />
              <span>Employees</span>   
            </button>
          </div>

          <div className="relative group">
            <button className="w-36 h-10 bg-white hover:bg-zinc-300 text-zinc-800 flex items-center space-x-2 p-2 cursor-pointer"
            onClick={() => handleNavigation('/vehicles')}>
              <CarFront className="h-5 w-5 text-base" />
              <span>Vehicles</span>   
            </button>
          </div> */}

        </div>

        {/* User menu */}
        <div className="flex justify-end ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-16 w-16" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleNavigation('/settings')}>Settings</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleNavigation('/support')}>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleNavigation('/login')}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </main>
  );
};

export default Navbar;
