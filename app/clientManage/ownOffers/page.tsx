'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Offer } from '@/app/utils/interfaces';
import OfferForm from '@/app/admin/common/OfferForm';
import { Card } from '@/components/ui/card';

export default function OwnOffersPage() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [clientId, setClientId] = useState<number | null>(null);
  const [message, setMessage] = useState<string | null>(null);

    // Fetch client_id safely after component mounts
    useEffect(() => {
        const token = localStorage.getItem("clientLoginToken");
        if (token) {
          try {
            const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode JWT token
            setClientId(decodedToken.client_id);
          } catch (error) {
            console.error("Error parsing client token:", error);
          }
        }
      }, []);

  useEffect(() => {
    if (!clientId) return;

    const fetchOffers = async () => {
      try {
        const response = await fetch(`/api/offers/${clientId}`);
        if (!response.ok) throw new Error('Failed to fetch offers');
        const data = await response.json();
        console.log("Offers Data: ", data.data);
        setOffers(data.data);
      } catch (error) {
        console.error('Error fetching offers:', error);
      }
    };

    fetchOffers();
  }, [clientId]);

  const handleOfferSubmit = async (offerData: any) => {
    const apiUrl = "/api/offers";
    const method = offerData.offer_id ? "PUT" : "POST";
    offerData.created_by = 4; // Updating created_by to 4

    try {
      const response = await fetch(apiUrl, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(offerData),
      });

      if (!response.ok) throw new Error("Failed to submit offer");

    //   alert(offerData.offer_id ? "Offer updated successfully!" : "Offer added successfully!");
      setMessage("Offer added successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error submitting offer:", error);
      alert("Something went wrong!");
    }
  };

  const handleDeleteOffer = async (offerId: number) => {
    const confirmDelete = confirm("Are you sure you want to delete this offer?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/offers/${offerId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete offer");

    //   alert("Offer deleted successfully!");
    setMessage("Offer deleted successfully!");
      setOffers(offers.filter((offer) => offer.id !== offerId));
    } catch (error) {
      console.error("Error deleting offer:", error);
      alert("Failed to delete offer");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Manage Your Offers</h1>
      <OfferForm existingOffer={undefined} onSubmit={handleOfferSubmit} />

        {message && (
            <h3 className="text-lg font-semibold px-4">{message}</h3>
        )}
      <div className="mt-16 space-y-4">
        <h3 className="text-lg font-semibold px-4">Existing Offers</h3>
        {offers.length > 0 ? (
            offers.map((offer) => (
            <Card key={offer.id} className="p-4 border rounded-lg shadow-md flex flex-col gap-2">
                {/* Offer Title */}
                <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-blue-600">{offer.offer_title}</h3>
                {offer.id !== undefined && (
                    <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteOffer(offer.id as number)}
                    >
                    Delete
                    </Button>
                )}
                </div>

                {/* Offer Description */}
                <p className="text-gray-700">{offer.offer_description}</p>

                {/* Offer Details */}
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                <div>
                    <strong>Type:</strong> {offer.offer_type}
                </div>
                <div>
                    <strong>Start Date:</strong> {offer.start_date}
                </div>
                <div>
                    <strong>End Date:</strong> {offer.end_date}
                </div>
                </div>
            </Card>
            ))
        ) : (
            <p className="text-gray-500">No offers available.</p>
        )}
        </div>
    </div>
  );
}
