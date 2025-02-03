'use client';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, UsersRound} from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";

const AdminNavbar = () => {
  const router = useRouter();

  const handleNavigation = (url: string) => {
    router.push(url);
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("loginToken");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  
  const handleLogout = ()=>{
    localStorage.clear()
    window.location.reload()
  }

  return (
    <header className="w-full shadow-md py-1 px-20 flex justify-between items-start">
    <div className="relative group mr-4">
      <button className="w-36 h-10 bg-zinc-800 flex items-center space-x-2 p-2 rounded-md cursor-pointer">
        <LayoutDashboard className="h-5 w-5 text-white text-base" />
        <Link href="/admin" className="text-white">
          Dashboard
        </Link>
      </button>
    </div>

    {/* Center-aligned buttons */}
    {isLoggedIn && 
    <div className="flex items-center space-x-4">  
      {/* <div className="relative group">
        <button
          className="w-36 h-10 bg-white hover:bg-zinc-300 text-zinc-800 flex items-center space-x-2 p-2 cursor-pointer"
          onClick={() => handleNavigation("/admin/clients")}
        >
          <UsersRound className="h-5 w-5 text-base" />
          <span>Clients</span>
        </button>
      </div> */}

      {/* <div></div> */}

      <Link href="/admin/clients" className="w-36 h-10 bg-white hover:bg-zinc-300 text-zinc-800 flex items-center space-x-2 p-2 cursor-pointer">
        <UsersRound className="h-5 w-5 text-base" />
        <span>Pages</span>
      </Link>

      <Link href="/admin/listing" className="w-36 h-10 bg-white hover:bg-zinc-300 text-zinc-800 flex items-center space-x-2 p-2 cursor-pointer">
        <UsersRound className="h-5 w-5 text-base" />
        <span>Home Listing</span>
      </Link>



    </div>
    }

    {isLoggedIn && 
    <Button 
      onClick={handleLogout} 
      className="bg-transparent text-gray-500 hover:text-red-400 hover:bg-slate-300">
      Logout
    </Button>}

  </header>
  );
};

export default AdminNavbar;
