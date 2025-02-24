import { Offer } from "@/app/utils/interfaces";
import React, { useState } from "react";


interface OfferFormProps {
  existingOffer?: Offer; // If present, form works as "Edit Mode"
  onSubmit: (offerData: Offer) => void;
}

const OfferForm: React.FC<OfferFormProps> = ({ existingOffer, onSubmit }) => {
  const [formData, setFormData] = useState<Offer>({
    // client_id: existingOffer?.client_id || 0,
    // offer_title: existingOffer?.offer_title || "",
    // offer_description: existingOffer?.offer_description || "",
    // offer_type: existingOffer?.offer_type || "discount",
    // start_date: existingOffer?.start_date || "",
    // end_date: existingOffer?.end_date || "",
    // created_by: existingOffer?.created_by || 0,
    client_id: existingOffer?.client_id || 86868,
    offer_title: existingOffer?.offer_title || "Ramadan Notice",
    offer_description: existingOffer?.offer_description || "We will be closing the booking very soon, so hurry up and brink your clothes now.",
    offer_type: existingOffer?.offer_type || "notice",
    start_date: existingOffer?.start_date || "2023-11-01",
    end_date: existingOffer?.end_date || "2023-11-30",
    created_by: existingOffer?.created_by || 3,
  });

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md rounded-lg max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">
        {existingOffer ? "Update Offer" : "Add New Offer"}
      </h2>

      {/* Offer Title */}
      <label className="block mb-2 text-sm font-medium">Offer Title</label>
      <input
        type="text"
        name="offer_title"
        value={formData.offer_title}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />

      {/* Offer Description */}
      <label className="block mt-4 mb-2 text-sm font-medium">Description</label>
      <textarea
        name="offer_description"
        value={formData.offer_description}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />

      {/* Offer Type */}
      <label className="block mt-4 mb-2 text-sm font-medium">Offer Type</label>
      <select
        name="offer_type"
        value={formData.offer_type}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      >
        <option value="discount">Discount</option>
        <option value="announcement">Announcement</option>
        <option value="notice">Notice</option>
      </select>

      {/* Start Date */}
      <label className="block mt-4 mb-2 text-sm font-medium">Start Date</label>
      <input
        type="date"
        name="start_date"
        value={formData.start_date}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />

      {/* End Date */}
      <label className="block mt-4 mb-2 text-sm font-medium">End Date</label>
      <input
        type="date"
        name="end_date"
        value={formData.end_date}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full mt-6 bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
      >
        {existingOffer ? "Update Offer" : "Create Offer"}
      </button>
    </form>
  );
};

export default OfferForm;
