"use client";
import { useState } from "react";
import OfferForm from "../common/OfferForm";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AdminNavbar from "../common/AdminNavbar";

export default function Offers() {
  const [message, setMessage] = useState<string | null>(null);
  const [selectedClientId, setSelectedClientId] = useState<string>("");

  const handleOfferSubmit = async (offerData: any) => {
    const apiUrl = "/api/offers"; // Internal API
    const method = offerData.offer_id ? "PUT" : "POST";

    try {
      const response = await fetch(apiUrl, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(offerData),
      });

      if (!response.ok) throw new Error("Failed to submit offer");

      // alert(offerData.offer_id ? "Offer updated successfully!" : "Offer added successfully!");
      setMessage(offerData.offer_id ? "Offer updated successfully!" : "Offer added successfully!");
    } catch (error) {
      console.error("Error submitting offer:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <main>
      <AdminNavbar />

      <div className="mt-8">
      {/* Client ID */}
      <div className="max-w-md mx-auto flex flex-col justify-end my-8">
            <Label htmlFor="clientId" className="text-sm font-medium text-gray-700">
              Client ID / Page ID
            </Label>
            <Input
              id="client_id"
              name="client_id"
              placeholder="Enter Client Id / Page Id"
              value={selectedClientId}
              onChange={(e) => setSelectedClientId(e.target.value)}
              required
            />
          </div>
      <OfferForm existingOffer={undefined} onSubmit={handleOfferSubmit} />
      {message && <p>{message}</p>}
      </div>

      

    </main>
  );
}