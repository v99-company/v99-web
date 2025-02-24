"use client";

import { LayoutDashboard, UsersRound } from "lucide-react";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ClientDashboard = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("freelancerLoginToken");
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
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        {isLoggedIn ? (
          <main>
            <h1 className="text-2xl font-semibold mb-4">Welcome!</h1>

            <div className="flex gap-4">
                {/* Button to update own page */}
                <Link href="/admin/addClient">
                <Button variant="default">Create New Page</Button>
                </Link>

                <Link href="/freelanceManage/myCreatedPage">
                <Button variant="outline">Your Created Pages</Button>
                </Link>
            </div>
          </main>
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

export default ClientDashboard;

// test 6