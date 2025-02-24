"use client";

import React, { useState } from "react";
import OfferForm from "../../common/OfferForm";
import { Offer } from "@/app/utils/interfaces";

const AddUpdateOffer: React.FC = () => {
const [offerToEdit, setOfferToEdit] = useState<Offer | undefined>(undefined);

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

      alert(offerData.offer_id ? "Offer updated successfully!" : "Offer added successfully!");
    } catch (error) {
      console.error("Error submitting offer:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4">

      <h1 className="text-2xl font-bold mb-6">Manage Offer</h1>

      {/* Offer Form */}
      <OfferForm existingOffer={offerToEdit} onSubmit={handleOfferSubmit} />

      {/* Mock Edit Button */}
      <button
        className="mt-6 bg-yellow-500 text-white px-4 py-2 rounded"
        onClick={() =>
          setOfferToEdit({
            id: 1,
            client_id: 12345,
            offer_title: "Limited-Time Discount",
            offer_description: "Get 20% off on all products!",
            offer_type: "discount",
            start_date: "2023-11-01",
            end_date: "2023-11-30",
            created_by: 1,
          })
        }
      >
        Edit Existing Offer
      </button>
    </div>
  );
};

export default AddUpdateOffer;
