"use client";

import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Loader } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ClientCreds } from "@/app/utils/interfaces";
import AdminNavbar from "../common/AdminNavbar";
import { Label } from "@/components/ui/label";

const ClientCredsPage = () => {
  const [clientCreds, setClientCreds] = useState<ClientCreds[]>([]);
  const [loading, setLoading] = useState(true);

  const [newClientCred, setNewClientCred] = useState({
    name: "",
    client_id: "",
    username: "",
    role: "client",
    password: "",
    blocked: 0
  });
  const [editingClientCred, setEditingClientCred] = useState<ClientCreds | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(true);
  const [showBlocked, setShowBlocked] = useState(false);

  // Fetch freelancer list from API
  useEffect(() => {
    const fetchClientCreds = async () => {
      try {
        const token = localStorage.getItem("loginToken");

        const result = await fetch(`/api/admin/clientCreds`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await result.json();
        setClientCreds(data.data);
      } catch (error) {
        console.error("Error fetching clients creds:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchClientCreds();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editingClientCred) {
      setEditingClientCred({ ...editingClientCred, [name]: value });
    } else {
      setNewClientCred({ ...newClientCred, [name]: value });
    }
  };

  const handleBlockToggle = (id: string, currentStatus: number) => {
    const updatedBlockedStatus = currentStatus === 1 ? 0 : 1;
    updateFreelancer(id, { blocked: updatedBlockedStatus });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const clientCredData = editingClientCred || newClientCred;
      console.log("Client Cred Data:", clientCredData);

      const method = editingClientCred ? "PUT" : "POST";
      const url = editingClientCred
        ? `/api/admin/clientCreds/${editingClientCred.id}`
        : "/api/admin/clientCreds/";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
           Authorization: `Bearer ${localStorage.getItem("loginToken")}`
        },
        body: JSON.stringify(clientCredData)
      });

      const data = await res.json();
      console.log("Response:", res);
      console.log("Response Data Data:", data.data);

      if (res.ok) {
        const clientCred = data.data.clientCred;
        console.log("clientCred:", clientCred);

        if (editingClientCred) {
          setClientCreds(
            clientCreds.map((clientCred) =>
                clientCred.id === clientCred.id ? clientCred : clientCred
            )
          );
        } else {
          setClientCreds([...clientCreds, clientCred]);
        }

        setSuccessMessage(
          `Client Cred ${clientCred.name} (${clientCred.username}) has been ${
            editingClientCred ? "updated" : "added"
          } successfully. ${
            clientCredData.password ? `. Password: ${clientCredData.password}` : ""
          }
          
          \n\nLogin Credentials
          Username: ${clientCred.username}
          Password: ${clientCredData.password}
          `
        );
        setNewClientCred({
          name: "",
          client_id: "",
          username: "",
          role: "",
          password: "",
          blocked: 0
        });
        setEditingClientCred(null);
        setShowPassword(false);
      }
    } catch (error) {
      console.error("Error submitting freelancer:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateFreelancer = async (id: string, data: Partial<ClientCreds>) => {
    try {
      const res = await fetch(`/api/admin/clientCreds/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("loginToken")}`
        },
        body: JSON.stringify(data)
      });

      if (res.ok) {
        const data = await res.json();
        const updatedFreelancer = data.data.freelancer;
        console.log("Updated client Cred:", updatedFreelancer);
        setClientCreds(
          clientCreds.map((clientCred) =>
            clientCred.id === id ? { ...clientCred, ...updatedFreelancer } : clientCred
          )
        );
      }
    } catch (error) {
      console.error("Error updating client Cred:", error);
    }
  };

  const handleEditPassword = (clientCred: ClientCreds) => {
    setEditingClientCred({ ...clientCred, password: "" });
    setShowPassword(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container mx-auto">
      <AdminNavbar />
      <h1 className="text-2xl font-bold  text-center mt-8 mb-12 text-gray-500">
        Client Cred Roles & Permissions
      </h1>
      {/* Freelancer Form */}
      <Card className="p-8 w-full mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {editingClientCred ? "Update Client Cred" : "Add New Client Cred"}
        </h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-8 relative"
        >
          {/* Client ID */}
          <div className="flex flex-col justify-end">
            <Label htmlFor="clientId" className="text-sm font-medium text-gray-700">
              Client ID / Page ID
            </Label>
            <Input
              id="client_id"
              name="client_id"
              placeholder="Enter Client Id / Page Id"
              value={editingClientCred ? editingClientCred.client_id : newClientCred.client_id}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Name */}
          <div className="flex flex-col justify-end">
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter Name"
              value={editingClientCred ? editingClientCred.name : newClientCred.name}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Username */}
          <div className="flex flex-col">
            <Label
              htmlFor="username"
              className="text-sm font-medium text-gray-700"
            >
              Username
            </Label>
            <Input
              id="username"
              name="username"
              placeholder="Enter Username"
              value={editingClientCred ? editingClientCred.username : newClientCred.username}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Password */}
          <div className="relative flex flex-col">
            <Label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="text"
              placeholder="Enter Password"
              value={editingClientCred ? editingClientCred.password : newClientCred.password}
              onChange={handleInputChange}
              required={!editingClientCred}
            />
          </div>

          {/* Blocked Toggle */}
          <div className="flex flex-col">
            <Label className="text-sm font-medium text-gray-700">Blocked</Label>
            <div className="flex items-center mt-1">
              <Switch
                checked={
                  editingClientCred
                    ? editingClientCred.blocked === 1
                    : newClientCred.blocked === 1
                }
                onCheckedChange={(checked) => {
                  if (editingClientCred) {
                    setEditingClientCred({
                      ...editingClientCred,
                      blocked: checked ? 1 : 0
                    });
                  } else {
                    setNewClientCred({ ...newClientCred, blocked: checked ? 1 : 0 });
                  }
                }}
              />
              <span className="ml-2 text-sm text-gray-600">
                {editingClientCred?.blocked === 1 ? "Blocked" : "Active"}
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <Button type="submit" className="" disabled={loading}>
              {loading ? <Loader className="animate-spin mr-2" /> : null}
              {editingClientCred ? "Update Client Cred" : "Add Client Cred"}
            </Button>
          </div>
        </form>
      </Card>

      {/* Success Message */}
      {successMessage && (
        <Alert className="mt-4 border border-green-500 bg-green-100 text-green-900 shadow-lg p-4 rounded-lg">
          <AlertTitle className="font-bold text-lg">✅ Success</AlertTitle>
          <AlertDescription className="text-sm leading-relaxed">
            {successMessage.split("\n").map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </AlertDescription>
        </Alert>
      )}

      <div className="flex flex-col lg:flex-row items-start justify-center space-x-8">
        {/* Loading State */}

        <div className="flex-1">
          {loading ? (
            <div className="flex justify-center items-center">
              <Loader className="animate-spin w-6 h-6 text-gray-600" />
            </div>
          ) : (
            <>
          {/* Toggle to show blocked or all clientcreds */}
          <div className="mb-4 flex items-center justify-between space-x-8">
            <h2 className="text-xl font-semibold">Client Creds List</h2>

            <div>
              <span className="mr-2 text-sm text-black">
                {showBlocked ? "Show All" : "Show Blocked"}
              </span>
            <Switch
              checked={showBlocked}
              onCheckedChange={(checked) => setShowBlocked(checked)}
            >
            </Switch>
            </div>
          </div>

              {/* Display ClientCreds */}
              <div className="space-y-4">
                {clientCreds && clientCreds
                .filter((clientCred) => showBlocked || clientCred.blocked === 0) 
                .map((clientCred) => (
                  <Card
                    key={clientCred.id}
                    className="p-4 flex items-center justify-between border rounded-lg shadow"
                  >
                    <div>
                      <h3 className="text-lg font-semibold text-blue-600">
                        {clientCred.name}
                      </h3>
                      <h3 className="text-md  text-gray-500">
                        Username: {clientCred.username}
                      </h3>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center">
                        <span className="text-sm text-gray-600 mr-2">
                          Blocked
                        </span>
                        <Switch
                          checked={clientCred.blocked === 1}
                          onCheckedChange={() =>
                            handleBlockToggle(clientCred.id, clientCred.blocked)
                          }
                        />
                      </div>

                      <Button onClick={() => handleEditPassword(clientCred)}>
                        Update Password
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientCredsPage;
