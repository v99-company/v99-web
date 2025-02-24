"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UpdateHistory } from "@/app/utils/interfaces";
import AdminNavbar from "../common/AdminNavbar";
import { UpdateClientHistoriesDataTable } from "../datatables/updateClientHistoriesDataTable";

export default function UpdateHistoryPage() {
  const router = useRouter();
  const [updateHistory, setUpdateHistory] = useState<UpdateHistory[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchUpdateHistory() {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("loginToken");

      const result = await fetch("/api/admin/updateHistory", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!result.ok) {
        console.log("Error fetching update history");
      }

      const data = await result.json();
      console.log("Fetched update history:", data);
      setUpdateHistory(data.data);
    } catch (error) {
      console.log("Error fetching update history:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("loginToken");
    if (!token) {
      router.push("/admin/login");
    }

    fetchUpdateHistory();
  }, []);


  const handleRemove = async (toRemove: UpdateHistory) => {
        console.log("Removing business request: ", toRemove);
        setIsLoading(true);
        try {
          const token = localStorage.getItem("loginToken") ||  "";
          const decodedToken = JSON.parse(atob(token.split(".")[1]));
    
          const result = await fetch(`/api/add-business`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              business_request_id: toRemove.id,
              deleted_by: decodedToken.id,
            }),
          });
    
          if (!result.ok) throw new Error("Failed to DELETE business request");
    
          console.log("Deletion successful");
        } catch (error) {
          console.error("Error deleting business request:", error);
        } finally {
          setIsLoading(false);
        }
      };

  return (
    <main>
      <AdminNavbar />
      <div className="px-8 py-8">
        {isLoading ? <p>Loading...</p> : <UpdateClientHistoriesDataTable data={updateHistory} onRemove={handleRemove} />}
      </div>
    </main>
  );
}
