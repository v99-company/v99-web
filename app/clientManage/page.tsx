"use client";

import { LayoutDashboard, UsersRound } from "lucide-react";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ClientDashboard = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("clientLoginToken");
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

  const handleUpdateOwnPage = ()=>{
    const token = localStorage.getItem("clientLoginToken") || "";

    const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode JWT token
    
    const clientID = decodedToken.client_id
    router.push("/clientManage/updateOwnPage?clientId="+clientID)
  }

  return (
    <div className=" min-h-screen w-full ">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        {isLoggedIn ? (
          <main>
            <h1 className="text-2xl font-semibold mb-4">Welcome!</h1>

            <div className="flex gap-4">
                {/* Button to update own page */}
                
                <Button variant="default" onClick={handleUpdateOwnPage}>Update Your Page</Button>
                
                {/* Button to manage own offers */}
                <Link href="/clientManage/ownOffers">
                <Button variant="outline">Manage Offers</Button>
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