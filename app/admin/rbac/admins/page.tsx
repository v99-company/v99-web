"use client";

import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

interface Admin {
  id: string;
  name: string;
  username: string;
  password: string;
  // role: "super" | "dev" | "visitor" | "editor" | "freelancer" | "client"; // Restrict to known roles
  role: string;
  blocked: 0 | 1; // 0 for active, 1 for blocked
}

const AdminRoles = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredScopes, setFilteredScopes] = useState<{
    [key: string]: string[];
  }>({});

  const [newAdmin, setNewAdmin] = useState({
    name: "",
    username: "",
    role: "",
    password: "",
    blocked: 0
  });
  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(true);

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

  // Fetch admin list from API
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const token = localStorage.getItem("loginToken");

        const result = await fetch(`/api/admin/rbac/admins`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await result.json();
        setAdmins(data.data);
      } catch (error) {
        console.error("Error fetching admins:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAdmins();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editingAdmin) {
      setEditingAdmin({ ...editingAdmin, [name]: value });
    } else {
      setNewAdmin({ ...newAdmin, [name]: value });
    }
  };

  const handleRoleChange = (value: string) => {
    if (editingAdmin) {
      setEditingAdmin({ ...editingAdmin, role: value });
    } else {
      setNewAdmin({ ...newAdmin, role: value });
    }
  };

  const handleBlockToggle = (id: string, currentStatus: number) => {
    const updatedBlockedStatus = currentStatus === 1 ? 0 : 1;
    updateAdmin(id, { blocked: updatedBlockedStatus });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const adminData = editingAdmin || newAdmin;
      const method = editingAdmin ? "PUT" : "POST";
      const url = editingAdmin
        ? `/api/admin/rbac/admins/${editingAdmin.id}`
        : "/api/admin/rbac/admins/";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
           Authorization: `Bearer ${localStorage.getItem("loginToken")}`
        },
        body: JSON.stringify(adminData)
      });

      const data = await res.json();
      console.log("Response:", res);
      console.log("Response Data:", data);

      const admin = data.data.admin;
      if (res.ok) {
        if (editingAdmin) {
          setAdmins(
            admins.map((admin) =>
              admin.id === admin.id ? admin : admin
            )
          );
        } else {
          setAdmins([...admins, admin]);
        }
        setSuccessMessage(
          `Admin ${admin.name} (${admin.username}) has been ${
            editingAdmin ? "updated" : "added"
          } successfully. Role: ${admin.role}${
            adminData.password ? `. Password: ${adminData.password}` : ""
          }
          
          \n\nLogin Credentials
          \nUsername: ${admin.username}
          Password: ${adminData.password}
          `
        );
        setNewAdmin({
          name: "",
          username: "",
          role: "",
          password: "",
          blocked: 0
        });
        setEditingAdmin(null);
        setShowPassword(false);
      }
    } catch (error) {
      console.error("Error submitting admin:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateAdmin = async (id: string, data: Partial<Admin>) => {
    try {
      const res = await fetch(`/api/admin/rbac/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("loginToken")}`
        },
        body: JSON.stringify(data)
      });

      if (res.ok) {
        const updatedAdmin = await res.json();
        setAdmins(
          admins.map((admin) =>
            admin.id === id ? { ...admin, ...updatedAdmin } : admin
          )
        );
      }
    } catch (error) {
      console.error("Error updating admin:", error);
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

  const handleEditPassword = (admin: Admin) => {
    setEditingAdmin({ ...admin, password: "" });
    setShowPassword(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container mx-auto">
      <AdminNavbar />
      <h1 className="text-2xl font-bold  text-center mt-8 mb-12 text-gray-500">
        Admin Roles & Permissions
      </h1>
      {/* Admin Form */}
      <Card className="p-8 w-full mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {editingAdmin ? "Update Admin" : "Add New Admin"}
        </h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-6 grid grid-cols-3 gap-x-8 relative"
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
              value={editingAdmin ? editingAdmin.name : newAdmin.name}
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
              value={editingAdmin ? editingAdmin.username : newAdmin.username}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Role Selection */}
          <div className="flex flex-col">
            <Label htmlFor="role" className="text-sm font-medium text-gray-700">
              Role
            </Label>
            <Select
              name="role"
              onValueChange={handleRoleChange}
              value={editingAdmin ? editingAdmin.role : newAdmin.role}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(filteredScopes).map((role) => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
              value={editingAdmin ? editingAdmin.password : newAdmin.password}
              onChange={handleInputChange}
              required={!editingAdmin}
            />
          </div>

          {/* Blocked Toggle */}
          <div className="flex flex-col">
            <Label className="text-sm font-medium text-gray-700">Blocked</Label>
            <div className="flex items-center mt-1">
              <Switch
                checked={
                  editingAdmin
                    ? editingAdmin.blocked === 1
                    : newAdmin.blocked === 1
                }
                onCheckedChange={(checked) => {
                  if (editingAdmin) {
                    setEditingAdmin({
                      ...editingAdmin,
                      blocked: checked ? 1 : 0
                    });
                  } else {
                    setNewAdmin({ ...newAdmin, blocked: checked ? 1 : 0 });
                  }
                }}
              />
              <span className="ml-2 text-sm text-gray-600">
                {editingAdmin?.blocked === 1 ? "Blocked" : "Active"}
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <Button type="submit" className="" disabled={loading}>
              {loading ? <Loader className="animate-spin mr-2" /> : null}
              {editingAdmin ? "Update Admin" : "Add Admin"}
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
              {/* Display Admins */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold mb-4">Admin List</h2>
                {admins.map((admin) => (
                  <Card
                    key={admin.id}
                    className="p-4 flex items-center justify-between border rounded-lg shadow"
                  >
                    <div>
                      <h3 className="text-lg font-semibold text-blue-600">
                        {admin.name}
                      </h3>
                      <h3 className="text-md  text-gray-500">
                        Username: {admin.username}
                      </h3>
                      <p className="text-gray-500">Role: {admin.role}</p>
                    </div>

                    <div className="flex items-center gap-4">
                      {/* Role Selection */}
                      <Select
                        onValueChange={(value) =>
                          updateAdmin(admin.id, { role: value })
                        }
                        defaultValue={admin.role}
                      >
                        <SelectTrigger className="w-40">
                          <SelectValue placeholder="Select Role" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.keys(filteredScopes).map((role) => (
                            <SelectItem key={role} value={role}>
                              {role}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <div className="flex items-center">
                        <span className="text-sm text-gray-600 mr-2">
                          Blocked
                        </span>
                        <Switch
                          checked={admin.blocked === 1}
                          onCheckedChange={() =>
                            handleBlockToggle(admin.id, admin.blocked)
                          }
                        />
                      </div>
                      <Button onClick={() => handleEditPassword(admin)}>
                        Update Password
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Display Role Permissions */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Permissions List</h2>
          <div className="grid grid-cols-1 gap-6 mb-4">
            {Object.entries(filteredScopes).map(([role, permissions]) => (
              <Card key={role} className="p-4 border rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold text-gray-800 capitalize mb-2">
                  {role}
                </h2>
                <div className="grid grid-cols-4 gap-2">
                  {permissions.map((perm) => (
                    <Badge
                      key={perm}
                      className="text-sm bg-gray-300 text-zinc-600 hover:bg-gray-500"
                    >
                      {perm}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminRoles;
