'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Client } from '@/app/utils/interfaces';
import Loading from '@/components/ui/Loading';
import { ClientDataTable } from '../datatables/clientsDataTable';
import Navbar from '../common/Navbar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Page: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [filterValue, setFilterValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState(filterValue); // State for search input
  
  
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("loginToken");
    if (!token) {
      router.push("/admin");
    }
  }, []);
  
  async function fetchClientList(){
    setIsLoading(true);
    try {
      const token = localStorage.getItem("loginToken");

      const result = await fetch('/api/admin/clients/',{
        method:'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      if(!result.ok){
        console.log('Error fetching')
      }
      const data = await result.json()
      console.log("clients data",data.data);
      setClients(data.data)
    } catch (error) {
      console.log('error',error)
    }
    finally{
      setIsLoading(false);
    }
  }
  useEffect(()=>{
    
    fetchClientList();

  }, []);

  
    async function search(searchQuery: string) {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("loginToken");
        const result = await fetch(`/api/search?search=${searchQuery}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!result.ok) {
          console.log('Error searching');
        }
        const data = await result.json();
        setClients(data.data.data);
        console.log(data.data)
      } catch (error) {
        console.log('error', error);
      }
      finally{
        setIsLoading(false);
      }
    }
  
 
  const handleEdit = (data:Client) => {
    const filteredClients = data
    const url = `/admin/clients/addClient?clientId=${filteredClients.id}`;
    window.open(url, '_blank');
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

  const handleInputBlur = () => {
    fetchClientList();
  }

  
  const handleSearch = (event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>) => {
    // Prevent default action if this is part of a form or a keypress
    event.preventDefault();
  
    // Check if the event is a keypress and ensure it's the "Enter" key
    if ('key' in event && event.key !== 'Enter') {
      return; // Exit if it's not the Enter key
    }
  
    console.log('Search initiated with:', searchValue);
  
    search(searchValue); // Call the search function
  };

  const handleClear = () => {
    setSearchValue(''); // Clear the search input
    fetchClientList(); // Refresh the client list
  };
  
  return (
      <div className="flex">
        <div className="w-screen h-screen ">
        
          <div className="flex items-center justify-center">
            <form className="bg-[#EDEAE0] w-full p-8 flex flex-col">
              <div className="mb-7">
                <h1 className="text-2xl text-black font-bold mb-1">Client Management</h1>
                <h3>Manage Clients here</h3>
              </div>
              <Card className="bg-[#dce1de] w-[100%] p-4  ">
                {isLoading ? (
                  <div className="flex justify-center items-center h-64">
                    <Loading />
                  </div>
                  ) : clients &&
                  <div>
                    {/* Search Input */}
                    <div className='flex justify-end'>
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
                      <Button
                        onClick={handleSearch} // Trigger search on button click
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                      >
                        Search
                      </Button>
                      <Button
                        onClick={handleClear} // Trigger search on button click
                        variant="destructive"
                        className="px-4 py-2 text-white rounded-md "
                      >
                        Clear
                      </Button>
                    </div>
                    </div>


                    <ClientDataTable
                      data={clients}
                      onRemove={handleRemove}
                      onEdit={handleEdit}
                      />
                  </div>

                }
              </Card>
            </form>
          </div>
        </div>
      </div>
  );
};

export default Page;
