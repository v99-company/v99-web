import Link from "next/link";
import { useEffect, useState } from "react";
import { verifyPermission } from "../RBAC";
import { ChevronDown, LayoutDashboard } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const AdminNavbar = () => {
  const [userRole, setUserRole] = useState<string>("vistor");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("loginToken");
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decode JWT token
        const role = decodedToken.role || null;
        setUserRole(role);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Invalid token:", error);
        setIsLoggedIn(false);
        setUserRole("vistor");
      }
    } else {
      setIsLoggedIn(false);
      setUserRole("vistor");
    }
  }, []);

  return (
    <header className="w-full shadow-md py-1 px-8 flex justify-between items-start">
      <div className="relative group mr-4">
        <button className="w-36 h-10 bg-zinc-800 flex items-center space-x-2 p-2 rounded-md cursor-pointer">
          <LayoutDashboard className="h-5 w-5 text-white text-base" />
          <Link href="/admin" className="text-white">
            Dashboard
          </Link>
        </button>
      </div>

      {/* Center-aligned buttons */}
      {isLoggedIn && (
        <div className="flex items-center space-x-4">
          {/* Pages Link (Visible to users with 'create_page' or 'update_page' permission) */}
          {verifyPermission(userRole, "create_page") ||
          verifyPermission(userRole, "update_page") ? (
            <Link
              href="/admin/clients"
              className="w-36 h-10 bg-white hover:bg-zinc-300 text-zinc-800 flex items-center justify-center space-x-2 p-2 cursor-pointer"
            >
              <span>Pages</span>
            </Link>
          ) : null}

          {/* Home Listing Link (Visible to users with 'update_home_listing' permission) */}
          {verifyPermission(userRole, "update_home_listing") ? (
            <Link
              href="/admin/listing"
              className="w-36 h-10 bg-white hover:bg-zinc-300 text-zinc-800 flex items-center justify-center space-x-2 p-2 cursor-pointer"
            >
              <span>Home Listing</span>
            </Link>
          ) : null}

          {/* Offers Page Link (Visible to users with 'create_offer' or 'update_offer' permission) */}
          {verifyPermission(userRole, "create_offer") ||
          verifyPermission(userRole, "update_offer") ? (
            <Link
              href="/admin/offers"
              className="w-36 h-10 bg-white hover:bg-zinc-300 text-zinc-800 flex items-center justify-center space-x-2 p-2 cursor-pointer"
            >
              <span>Offers</span>
            </Link>
          ) : null}

          {/* Offers Page Link (Visible to users with 'create_offer' or 'update_offer' permission) */}
          {verifyPermission(userRole, "admins") ? (
            <Link
              href="/admin/rbac/admins"
              className="w-36 h-10 bg-white hover:bg-zinc-300 text-zinc-800 flex items-center justify-center space-x-2 p-2 cursor-pointer"
            >
              <span>Admins</span>
            </Link>
          ) : null}

          {verifyPermission(userRole, "freelancers") ? (
            <Link
              href="/admin/rbac/freelancers"
              className="w-36 h-10 bg-white hover:bg-zinc-300 text-zinc-800 flex items-center justify-center space-x-2 p-2 cursor-pointer"
            >
              <span>Freelancers</span>
            </Link>
          ) : null}

          {verifyPermission(userRole, "client_creds") ? (
            <Link
              href="/admin/clientCreds"
              className="w-36 h-10 bg-white hover:bg-zinc-300 text-zinc-800 flex items-center justify-center space-x-2 p-2 cursor-pointer"
            >
              <span>Client Credentials</span>
            </Link>
          ) : null}

          <div className="relative group">
            {/* Dropdown Trigger */}
            <DropdownMenu>
              <DropdownMenuTrigger className="w-48 h-10 bg-white hover:bg-zinc-300 text-zinc-800 flex items-center justify-between p-2 cursor-pointer rounded-md shadow">
                <span className="font-medium">Admin Actions</span>
                <ChevronDown className="text-zinc-800" />
              </DropdownMenuTrigger>

              {/* Dropdown Content */}
              <DropdownMenuContent className="bg-white text-black rounded-md shadow-lg mt-2 w-48">
                {/* Create Page Approvals */}
                {verifyPermission(userRole, "create_page_approvals") && (
                  <DropdownMenuItem asChild>
                    <Link
                      href="/admin/addPageApproval"
                      className="block w-full p-2 text-zinc-800 hover:bg-zinc-200"
                    >
                      Create Page Approvals
                    </Link>
                  </DropdownMenuItem>
                )}

                {/* Add Business Requests */}
                {verifyPermission(userRole, "add_business_requests") && (
                  <DropdownMenuItem asChild>
                    <Link
                      href="/admin/businessRequests"
                      className="block w-full p-2 text-zinc-800 hover:bg-zinc-200"
                    >
                      Add Business Requests
                    </Link>
                  </DropdownMenuItem>
                )}

                {/* Update Histories */}
                {verifyPermission(userRole, "update_histories") && (
                  <DropdownMenuItem asChild>
                    <Link
                      href="/admin/updateHistories"
                      className="block w-full p-2 text-zinc-800 hover:bg-zinc-200"
                    >
                      Update Histories
                    </Link>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {verifyPermission(userRole, "create_approvals") ? (
            <Link
              href="/admin/rbac/freelancers"
              className="w-36 h-10 bg-white hover:bg-zinc-300 text-zinc-800 flex items-center justify-center space-x-2 p-2 cursor-pointer"
            >
              <span>Freelancers</span>
            </Link>
          ) : null}
        </div>
      )}

      {/* Logout Button */}
      {isLoggedIn && (
        <button
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
          className="bg-transparent text-gray-500 hover:text-red-400 hover:bg-slate-300 px-4 py-2 rounded-md"
        >
          Logout
        </button>
      )}
    </header>
  );
};

export default AdminNavbar;
