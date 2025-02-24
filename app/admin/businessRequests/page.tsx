"use client"
import { BusinessRequest, Client } from "@/app/utils/interfaces";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ApprovalClientDataTable } from "../datatables/approvalClientsDataTable";
import AdminNavbar from "../common/AdminNavbar";
import { BusinessRequestsDataTable } from "../datatables/businessRequestsDataTable";


export default function BusinessRequests() {
    const router = useRouter();
    const [businessRequests, setBusinessRequests] = useState<BusinessRequest[]>([]);
    const [isLoading, setIsLoading] = useState(false);
  
    async function fetchBusinessRequests() {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("loginToken");
  
        const result = await fetch("/api/add-business", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!result.ok) {
          console.log("Error fetching business requests");
        }
  
        const data = await result.json();
        console.log("Fetched business requests:", data);
        setBusinessRequests(data.data.data);
      } catch (error) {
        console.log("Error fetching business requests:", error);
      } finally {
        setIsLoading(false);
      }
    }
  
    useEffect(() => {
      const token = localStorage.getItem("loginToken");
      if (!token) {
        router.push("/admin/login");
      }
  
      fetchBusinessRequests();
    }, []);
  
    const handleStatusChange = async (businessRequest: BusinessRequest, status: BusinessRequest["status"]) => {
      console.log("Updating status: ", businessRequest, status);
  
      const token = localStorage.getItem("loginToken") || "";
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
  
      const updatePayload = {
        business_request_id: businessRequest.id,
        status: status,
        updated_by: decodedToken.id
      };
      console.log("updatePayload", updatePayload);
      try {
        console.log("Submitting update:", JSON.stringify(updatePayload));
  
        const result = await fetch("/api/add-business", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatePayload),
        });
  
        if (!result.ok) throw new Error("Failed to update business request status");
  
        console.log("Update successful");
        fetchBusinessRequests();
      } catch (error) {
        console.error("Error updating business request status:", error);
      }
    };
  
    const handleRemove = async (businessRequest: BusinessRequest) => {
      console.log("Removing business request: ", businessRequest);
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
            business_request_id: businessRequest.id,
            deleted_by: decodedToken.id,
          }),
        });
  
        if (!result.ok) throw new Error("Failed to DELETE business request");
  
        console.log("Deletion successful");
        fetchBusinessRequests();
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
          <BusinessRequestsDataTable
            data={businessRequests}
            onRemove={handleRemove}
            handleStatusChange={handleStatusChange}
          />
        </div>
      </main>
    );
  }