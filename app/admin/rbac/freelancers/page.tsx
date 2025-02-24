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
import { scopes } from "../../RBAC";
import AdminNavbar from "../../common/AdminNavbar";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";

interface Freelancer {
  id: string;
  name: string;
  username: string;
  password: string;
  // role: "super" | "dev" | "visitor" | "editor" | "freelancer" | "client"; // Restrict to known roles
  role: "freelancer";
  blocked: 0 | 1; // 0 for active, 1 for blocked
}

const FreelancerRoles = () => {
  const [freelancers, setFreelancers] = useState<Freelancer[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredScopes, setFilteredScopes] = useState<{
    [key: string]: string[];
  }>({});

  const [newFreelancer, setNewFreelancer] = useState({
    name: "",
    username: "",
    role: "freelancer",
    password: "",
    blocked: 0
  });
  const [editingFreelancer, setEditingFreelancer] = useState<Freelancer | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(true);
  const [showBlocked, setShowBlocked] = useState(false);

  useEffect(() => {
    // Exclude the 'dev' role from the scopes
    const newScopes = Object.entries(scopes).reduce(
      (acc, [role, permissions]) => {
        if (role !== "dev") {
          acc[role] = permissions; // Add roles other than 'dev' to the accumulator
        }
        return acc;
      },
      {} as { [key: string]: string[] }
    );

    setFilteredScopes(newScopes); // Set the filtered scopes in state
  }, []);

  // Fetch freelancer list from API
  useEffect(() => {
    const fetchFreelancers = async () => {
      try {
        const token = localStorage.getItem("loginToken");

        const result = await fetch(`/api/admin/rbac/freelancers`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await result.json();
        setFreelancers(data.data);
      } catch (error) {
        console.error("Error fetching freelancers:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFreelancers();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editingFreelancer) {
      setEditingFreelancer({ ...editingFreelancer, [name]: value });
    } else {
      setNewFreelancer({ ...newFreelancer, [name]: value });
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
      const freelancerData = editingFreelancer || newFreelancer;
      const method = editingFreelancer ? "PUT" : "POST";
      const url = editingFreelancer
        ? `/api/admin/rbac/freelancers/${editingFreelancer.id}`
        : "/api/admin/rbac/freelancers/";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
           Authorization: `Bearer ${localStorage.getItem("loginToken")}`
        },
        body: JSON.stringify(freelancerData)
      });

      const data = await res.json();
      console.log("Response:", res);
      console.log("Response Data Data:", data.data);

      if (res.ok) {
        const freelancer = data.data.freelancer;
        console.log("Freelancer:", freelancer);

        if (editingFreelancer) {
          setFreelancers(
            freelancers.map((freelancer) =>
              freelancer.id === freelancer.id ? freelancer : freelancer
            )
          );
        } else {
          setFreelancers([...freelancers, freelancer]);
        }
        setSuccessMessage(
          `Freelancer ${freelancer.name} (${freelancer.username}) has been ${
            editingFreelancer ? "updated" : "added"
          } successfully. Role: ${freelancer.role}${
            freelancerData.password ? `. Password: ${freelancerData.password}` : ""
          }
          
          \n\nLogin Credentials
          Username: ${freelancer.username}
          Password: ${freelancerData.password}
          `
        );
        setNewFreelancer({
          name: "",
          username: "",
          role: "",
          password: "",
          blocked: 0
        });
        setEditingFreelancer(null);
        setShowPassword(false);

      }
    } catch (error) {
      console.error("Error submitting freelancer:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateFreelancer = async (id: string, data: Partial<Freelancer>) => {
    try {
      const res = await fetch(`/api/admin/rbac/freelancers/${id}`, {
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
        console.log("Updated Freelancer:", updatedFreelancer);
        setFreelancers(
          freelancers.map((freelancer) =>
            freelancer.id === id ? { ...freelancer, ...updatedFreelancer } : freelancer
          )
        );
      }
    } catch (error) {
      console.error("Error updating freelancer:", error);
    }
  };

  // // Handle role update
  // const handleRoleChange = async (id: string, newRole: string) => {
  //   try {
  //     // Find the admin with the given ID from the local state
  //     const adminToUpdate = admins.find((admin) => admin.id === id);

  //     if (!adminToUpdate) {
  //       console.error("Admin not found");
  //       return;
  //     }

  //     // Create the updated admin object
  //     const updatedAdmin = {
  //       ...adminToUpdate,
  //       role: newRole
  //     };

  //     const res = await fetch(`/api/admin/rbac/`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${localStorage.getItem("loginToken")}`
  //       },
  //       body: JSON.stringify(updatedAdmin) // Send 0 or 1
  //     });

  //     setAdmins((prev) =>
  //       prev.map((admin) =>
  //         admin.id === id
  //           ? { ...admin, role: newRole as Admin["role"] } // Ensure newRole matches expected type
  //           : admin
  //       )
  //     );
  //   } catch (error) {
  //     console.error("Error updating role:", error);
  //   }
  // };

  // // Handle block status toggle
  // // Handle block status toggle
  // const handleBlockToggle = async (id: string, isBlocked: 0 | 1) => {
  //   console.log("Toggling block status for admin ID:", id);
  //   try {
  //     // Find the admin with the given ID from the local state
  //     const adminToUpdate = admins.find((admin) => admin.id === id);

  //     if (!adminToUpdate) {
  //       console.error("Admin not found");
  //       return;
  //     }

  //     // Toggle the blocked status
  //     const updatedBlockedStatus = adminToUpdate.blocked === 1 ? 0 : 1;

  //     // Create the updated admin object
  //     const updatedAdmin = {
  //       ...adminToUpdate,
  //       blocked: updatedBlockedStatus
  //     };

  //     const res = await fetch(`/api/admin/rbac/`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${localStorage.getItem("loginToken")}`
  //       },
  //       body: JSON.stringify(updatedAdmin) // Send 0 or 1
  //     });

  //     // Update local state
  //     setAdmins((prev) =>
  //       prev.map((admin) =>
  //         admin.id === id ? { ...admin, blocked: updatedBlockedStatus } : admin
  //       )
  //     );
  //   } catch (error) {
  //     console.error("Error updating block status:", error);
  //   }
  // };

  const handleEditPassword = (freelancer: Freelancer) => {
    setEditingFreelancer({ ...freelancer, password: "" });
    setShowPassword(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container mx-auto">
      <AdminNavbar />
      <h1 className="text-2xl font-bold  text-center mt-8 mb-12 text-gray-500">
        Freelancer Roles & Permissions
      </h1>
      {/* Freelancer Form */}
      <Card className="p-8 w-full mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {editingFreelancer ? "Update Freelancer" : "Add New Freelancer"}
        </h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-8 relative"
        >
          {/* Name */}
          <div className="flex flex-col justify-end">
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter Name"
              value={editingFreelancer ? editingFreelancer.name : newFreelancer.name}
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
              value={editingFreelancer ? editingFreelancer.username : newFreelancer.username}
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
              value={editingFreelancer ? editingFreelancer.password : newFreelancer.password}
              onChange={handleInputChange}
              required={!editingFreelancer}
            />
          </div>

          {/* Blocked Toggle */}
          <div className="flex flex-col">
            <Label className="text-sm font-medium text-gray-700">Blocked</Label>
            <div className="flex items-center mt-1">
              <Switch
                checked={
                  editingFreelancer
                    ? editingFreelancer.blocked === 1
                    : newFreelancer.blocked === 1
                }
                onCheckedChange={(checked) => {
                  if (editingFreelancer) {
                    setEditingFreelancer({
                      ...editingFreelancer,
                      blocked: checked ? 1 : 0
                    });
                  } else {
                    setNewFreelancer({ ...newFreelancer, blocked: checked ? 1 : 0 });
                  }
                }}
              />
              <span className="ml-2 text-sm text-gray-600">
                {editingFreelancer?.blocked === 1 ? "Blocked" : "Active"}
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <Button type="submit" className="" disabled={loading}>
              {loading ? <Loader className="animate-spin mr-2" /> : null}
              {editingFreelancer ? "Update Freelancer" : "Add Freelancer"}
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
          {/* Toggle to show blocked or all freelancers */}
          <div className="mb-4 flex items-center justify-between space-x-8">
            <h2 className="text-xl font-semibold">Freelancer List</h2>

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

              {/* Display Freelancers */}
              <div className="space-y-4">
                {freelancers && freelancers
                .filter((freelancer) => showBlocked || freelancer.blocked === 0) 
                .map((freelancer) => (
                  <Card
                    key={freelancer.id}
                    className="p-4 flex items-center justify-between border rounded-lg shadow"
                  >
                    <div>
                      <h3 className="text-lg font-semibold text-blue-600">
                        {freelancer.name}
                      </h3>
                      <h3 className="text-md  text-gray-500">
                        Username: {freelancer.username}
                      </h3>
                      <p className="text-gray-500">Role: {freelancer.role}</p>
                    </div>

                    <div className="flex items-center gap-4">
                      {/* Role Selection */}
                      <h3>{freelancer.role}</h3>

                      <div className="flex items-center">
                        <span className="text-sm text-gray-600 mr-2">
                          Blocked
                        </span>
                        <Switch
                          checked={freelancer.blocked === 1}
                          onCheckedChange={() =>
                            handleBlockToggle(freelancer.id, freelancer.blocked)
                          }
                        />
                      </div>

                      <Button onClick={() => handleEditPassword(freelancer)}>
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

export default FreelancerRoles;
