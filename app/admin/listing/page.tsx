"use client";
import { Client } from "@/app/utils/interfaces";
import React, { useEffect, useState } from "react";
import { ListingDataTable } from "../datatables/ListingDataTable";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PriorityListDataTable } from "../datatables/priorityListDataTable";
import AdminNavbar from "../common/AdminNavbar";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const Listing = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [priorityClients, setPriorityClients] = useState<Client[]>([]);
  const [filterValue, setFilterValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState(filterValue); // State for search input

  const router = useRouter();

  async function search(searchQuery: string) {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("loginToken");
      const result = await fetch(`/api/search?query=${searchQuery}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!result.ok) {
        console.log("Error searching");
      }
      const data = await result.json();
      console.log("clients data", data.data);
      setClients(data.data.data);
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchClientList() {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("loginToken");

      const result = await fetch("/api/admin/clients/", {
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

  async function fetchPriorityClientList() {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("loginToken");

      const result = await fetch("/api/homeList/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!result.ok) {
        console.log("Error fetching");
      }
      const data = await result.json();
      console.log("priority clients data", data.data);
      setPriorityClients(data.data.data);
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

    fetchPriorityClientList();
    fetchClientList();
  }, []);

  const handleInputBlur = () => {
    fetchClientList();
  };

  const handleSearch = (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLInputElement>
  ) => {
    // Prevent default action if this is part of a form or a keypress
    event.preventDefault();

    // Check if the event is a keypress and ensure it's the "Enter" key
    if ("key" in event && event.key !== "Enter") {
      return; // Exit if it's not the Enter key
    }

    console.log("Search initiated with:", searchValue);

    search(searchValue); // Call the search function
  };

  const handleClear = () => {
    setSearchValue(""); // Clear the search input
    fetchClientList(); // Refresh the client list
  };

  const handleAdd = (data: Client) => {
    console.log("Add client: ", data);

    const updatedPriorityClients = [...priorityClients, data];
    console.log("Updated priority clients: ", updatedPriorityClients);
    setPriorityClients(updatedPriorityClients);
  };

  const handleSave = async (updatedData: Client[]) => {
    // Construct priority data where index + 1 becomes the priority
    const priorityData = updatedData.map((client, index) => ({
      client_id: client.id,
      priority: index + 1  // Starting from 1 instead of 0
    }));
  
    try {
      const token = localStorage.getItem("loginToken");
      const response = await fetch("/api/homeList/", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ priorities: priorityData })
      });
  
      if (!response.ok) throw new Error("Failed to update order");
  
      console.log("Updated priorities:", priorityData);
      toast({
        title: "Success",
        description: "Home Listing updated successfully"
      });
    } catch (error) {
      console.error("Error updating priorities:", error);
      toast({
        title: "Error",
        description: "Failed to update Home Listing",
        variant: "destructive"
      });
    }
  };

  const handleRemove = async (clientId: number) => {
    console.log("Remove client: ", clientId);

    const updatedPriorityClients = priorityClients.filter(
      (client) => client.id !== clientId
    );
    setPriorityClients(updatedPriorityClients);
  }

  return (
    <main>
        <AdminNavbar />
      <h1 className="w-full text-center text-2xl font-bold py-8">Home Custom Listing</h1>

      <div className="flex items-start justify-between lg:px-32">

        {/* Priority Clients list */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Selected Pages</h2>
          <div className="pb-32">
          <PriorityListDataTable data={priorityClients} onSave={handleSave} onRemove={handleRemove} />
          </div>

        </div>

        {/* All Clients list */}
        <div>
            <h2 className="text-2xl font-bold mb-6">All Pages</h2>
          <div className="relative flex gap-2 items-center">
            <Input
              placeholder="Search..."
              onChange={(e) => setSearchValue(e.target.value)} // Update local state
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch(e); // Trigger search when Enter is pressed
                }
              }}
              className="max-w-lg w-60 p-1.5 pl-4 pr-3 text-zinc-600"
              onBlur={handleInputBlur}
            />
            {/* <Button
              onClick={handleSearch} // Trigger search on button click
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Search
            </Button> */}
            <Button
              onClick={handleClear} // Trigger search on button click
              variant="destructive"
              className="px-4 py-2 text-white rounded-md "
            >
              Clear
            </Button>
          </div>
          <ListingDataTable data={clients} onAdd={handleAdd} />
        </div>

      </div>
    </main>
  );
};

export default Listing;
