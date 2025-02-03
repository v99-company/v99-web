"use client";

import { LayoutDashboard, UsersRound } from "lucide-react";

import { useEffect, useState } from "react";
import Navbar from "./common/AdminNavbar";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import AdminNavbar from "./common/AdminNavbar";

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
      <AdminNavbar />

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

// test 4