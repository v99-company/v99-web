"use client"
import { Client } from "@/app/utils/interfaces";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ApprovalClientDataTable } from "../datatables/approvalClientsDataTable";
import AdminNavbar from "../common/AdminNavbar";

export default function AddPageApproval() {
    const router = useRouter();    

    const [clients, setClients] = useState<Client[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    

    async function fetchClientList() {
        setIsLoading(true);
        try {
          const token = localStorage.getItem("loginToken");
    
          const result = await fetch("/api/admin/approvals/", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          if (!result.ok) {
            console.log("Error fetching");
          }
          const data = await result.json();
          console.log("clients data", data);
          setClients(data.data);
        } catch (error) {
          console.log("error", error);
        } finally {
          setIsLoading(false);
        }
      }

    useEffect(() => {
        const token = localStorage.getItem("loginToken");
        if (!token) {
        router.push("/admin/login");
        }
    
        fetchClientList();
    }, []);

    
      const handleEdit = (data:Client) => {
        const filteredClients = data
        const url = `/admin/addClient?clientId=${filteredClients.id}`;
        window.open(url);
      };
    
      const handleApprovalToggle = async(data:Client, isApproved: number) => {
        console.log("handleApprovalToggle: ", data, isApproved);

        const token = localStorage.getItem("loginToken") || "";
        const decodedToken = JSON.parse(atob(token.split('.')[1]));

        const updatePayload: any = {
            ...data,
            approved: isApproved,
            updated_by: decodedToken.id
          };

          try {
            console.log("on submit", JSON.stringify(updatePayload));
            const result = await fetch("/api/admin/clients/", {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
              },
              body: JSON.stringify(updatePayload)
            });
    
            if (!result.ok) throw new Error("Failed to update client data");
    
            const data = await result.text();
            console.log("Update Response:", data);
     
            // refresh the clients list
            fetchClientList();
            // setSuccessMessage("Client updated successfully!");
            // setIsSuccess(true);
          } catch (error) {
            console.error("Error update submitting data:", error);
          }
      };
    
      const handleRemove = async (payload: Client) => {
        console.log("Remove client: ", payload)
        setIsLoading(true);
        try {
          const token = localStorage.getItem("loginToken");
          const result = await fetch(`/api/admin/clients/${payload.id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
          });
    
          if (!result.ok) throw new Error("Failed to DELETE client data");
    
          const data = await result.json();
          console.log('DELETE Response:', data.data);
    
          // refresh the clients list
          fetchClientList();
    
        } catch (error) {
          console.error('Error DELETE submitting data:', error);
        }
        finally{
          setIsLoading(false);
        }
      };

    
    return (
      <main>
      <AdminNavbar />

      <div className="px-8 py-8">        
      <ApprovalClientDataTable
        data={clients}
        onRemove={handleRemove}
        onEdit={handleEdit}
        handleApprovalToggle={handleApprovalToggle}
      />
      </div>
      
      </main>

    )
}