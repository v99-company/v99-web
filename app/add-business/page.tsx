"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { SuccessPage } from "../admin/common/SuccessPage";
import { useRouter } from "next/navigation";
import Navbar from "../common/Navbar";

export default function AddBusinessForm() {
  const router = useRouter(); 

  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [loadingLocation, setLoadingLocation] = useState(false);

  const [formData, setFormData] = useState({
    // businessName: "",
    // contactPerson: "",
    // contactNumber: "",
    // whatsappNumber: "",
    // address: "",
    // description: "",
    // latitude: "",
    // longitude: "",

    businessName: "Test Business",
    contactPerson: "John Doe",
    contactNumber: "1234567890",
    whatsappNumber: "1234567890",
    address: "123, Test Street, Test City",
    description: "This is a test business for API testing.",
    latitude: "17.3752",
    longitude: "78.4328",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const getLocation = () => {
    setLoadingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData((prev) => ({
            ...prev,
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString(),
          }));
          console.log("Location captured successfully!");
          setLoadingLocation(false);
        },
        () => {
          alert("Failed to get location. Please enable GPS.");
          setLoadingLocation(false);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
      setLoadingLocation(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.whatsappNumber) {
      setFormData((prev) => ({ ...prev, whatsappNumber: prev.contactNumber }));
    }

    try {
      const response = await fetch("/api/add-business", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setIsSuccess(true);
        // setSuccessMessage(data.message);
        setSuccessMessage("Business added successfully!");
        // toast.success("Business added successfully!");
      } else {
        alert(data.message || "Something went wrong.");
      }
    } catch (error) {
      alert("Failed to submit form.");
    }
  };

  return (
    <main className="bg-blue-50 min-h-screen">
      <Navbar />
      <div className="flex justify-center items-start lg:items-center px-4 py-10 min-h-screen">
        <Card className="p-6 w-full max-w-md bg-white shadow-lg rounded-xl border border-blue-700">
          <h2 className="text-2xl font-bold text-blue-700 text-center mb-6">Add Your Business</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Business Name */}
            <div className="flex flex-col space-y-2">
              <Label htmlFor="businessName" className="text-blue-700 font-medium">Business Name</Label>
              <Input 
                id="businessName" 
                name="businessName" 
                placeholder="Enter business name" 
                value={formData.businessName} 
                onChange={handleChange} 
                required 
                className="border border-blue-300 focus:ring-blue-700"
              />
            </div>

            {/* Contact Person */}
            <div className="flex flex-col space-y-2">
              <Label htmlFor="contactPerson" className="text-blue-700 font-medium">Contact Person</Label>
              <Input 
                id="contactPerson" 
                name="contactPerson" 
                placeholder="Enter contact person name" 
                value={formData.contactPerson} 
                onChange={handleChange} 
                required 
                className="border border-blue-300 focus:ring-blue-700"
              />
            </div>

            {/* Contact Number */}
            <div className="flex flex-col space-y-2">
              <Label htmlFor="contactNumber" className="text-blue-700 font-medium">Contact Number</Label>
              <Input 
                id="contactNumber" 
                name="contactNumber" 
                type="tel" 
                placeholder="Enter contact number" 
                value={formData.contactNumber} 
                onChange={handleChange} 
                required 
                className="border border-blue-300 focus:ring-blue-700"
              />
            </div>

            {/* WhatsApp Number */}
            <div className="flex flex-col space-y-2">
              <Label htmlFor="whatsappNumber" className="text-blue-700 font-medium">WhatsApp Number</Label>
              <Input 
                id="whatsappNumber" 
                name="whatsappNumber" 
                type="tel" 
                placeholder="Enter WhatsApp number (optional)" 
                value={formData.whatsappNumber} 
                onChange={handleChange} 
                className="border border-blue-300 focus:ring-blue-700"
              />
            </div>

            {/* Address */}
            <div className="flex flex-col space-y-2">
              <Label htmlFor="address" className="text-blue-700 font-medium">Address</Label>
              <Input 
                id="address" 
                name="address" 
                placeholder="Enter business address" 
                value={formData.address} 
                onChange={handleChange} 
                required 
                className="border border-blue-300 focus:ring-blue-700"
              />
            </div>

            {/* Short Description */}
            <div className="flex flex-col space-y-2">
              <Label htmlFor="description" className="text-blue-700 font-medium">Short Description</Label>
              <Textarea 
                id="description" 
                name="description" 
                placeholder="Write a short description about your business" 
                value={formData.description} 
                onChange={handleChange} 
                required 
                className="border border-blue-300 focus:ring-blue-700"
              />
            </div>

            {/* Get Location Button */}
            <div className="flex flex-col space-y-2">
              <Label className="text-blue-700 font-medium">Business Location</Label>
              <Button 
                type="button" 
                onClick={getLocation} 
                className="w-full bg-green-900 hover:bg-green-800 text-white py-2 rounded-lg transition-all flex items-center justify-center"
              >
                {loadingLocation ? "Fetching Location..." : "Get Current Location"}
              </Button>
              <p className="text-xs text-gray-600 mt-1 text-center">
                We use your location to help customers find your business easily.
              </p>
            </div>

            {/* Latitude & Longitude Display (Hidden but stored in formData) */}
            {formData.latitude && formData.longitude && (
              <div className="text-sm text-green-700 text-center">
                📍 Location Captured: ({formData.latitude}, {formData.longitude})
              </div>
            )}

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-lg transition-all"
            >
              Submit
            </Button>
          </form>
        </Card>
      </div>

      {/* Success Message Modal */}
      {isSuccess && (
        <SuccessPage 
          message={successMessage}
          onClose={() => {
            setIsSuccess(false);
            router.push("/");
          }}
        />
      )}
    </main>
  );
}