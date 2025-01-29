"use client";

import { LayoutDashboard, UsersRound } from "lucide-react";

import { useEffect, useState } from "react";
import Navbar from "./common/Navbar";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Dashboard = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("loginToken");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);


  const router = useRouter();

  const handleNavigation = (url: string) => {
    router.push(url);
  };

  const handleLogout = ()=>{
    localStorage.clear()
    window.location.reload()
  }

  return (
    <div className=" min-h-screen w-full ">

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
          <div className="relative group">
            <button
              className="w-36 h-10 bg-white hover:bg-zinc-300 text-zinc-800 flex items-center space-x-2 p-2 cursor-pointer"
              onClick={() => handleNavigation("/admin/clients")}
            >
              <UsersRound className="h-5 w-5 text-base" />
              <span>Clients</span>
            </button>
          </div>
        </div>
        }

        {isLoggedIn && 
        <Button 
          onClick={handleLogout} 
          className="bg-transparent text-gray-500 hover:text-red-400 hover:bg-slate-300">
          Logout
        </Button>}

      </header>



      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        {isLoggedIn ? (
          <h1 className="text-2xl font-semibold">Welcome back!</h1>
        ) : (
          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-semibold">Please log in.</h1>
            <Button
              onClick={() => handleNavigation("/admin/login")}
              className="mt-4 px-6 py-2 bg-green-800 text-white rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Log In
            </Button>
          </div>
        )}
      </div>


    </div>
  );
};

export default Dashboard;

// test 2