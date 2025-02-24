// UI Component for Offers
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullhorn, faTags, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { Offer } from "@/app/utils/interfaces";

const OfferCard: React.FC<{ offer: Offer }> = ({ offer }) => {
  // Determine the card color and icon based on the offer type
  const typeStyles: Record<Offer["offer_type"], { color: string; icon: any }> = {
    announcement: { color: "bg-orange-500", icon: faBullhorn },
    discount: { color: "bg-green-500", icon: faTags },
    notice: { color: "bg-blue-500", icon: faInfoCircle },
  };

  const { color, icon } = typeStyles[offer.offer_type];

  return (
    <div className={`p-4 rounded-lg shadow-md text-white ${color}`}>
      <div className="flex items-center gap-4 mb-2">
        <FontAwesomeIcon icon={icon} className="h-6 w-6" />
        <h3 className="text-lg font-bold">{offer.offer_title}</h3>
      </div>
      <p className="text-sm mb-4">{offer.offer_description}</p>
      <p className="text-xs">
        Valid from: <strong>{offer.start_date}</strong> to <strong>{offer.end_date}</strong>
      </p>
    </div>
  );
};

const OffersList: React.FC<{ offers: Offer[] }> = ({ offers }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {offers.map((offer) => (
        <OfferCard key={offer.id} offer={offer} />
      ))}
    </div>
  );
};

// Example usage with client data
const ClientOffers: React.FC<{ offers: Offer[] }> = ({ offers }) => {
  return (
    <div className="max-w-6xl mx-auto py-8">
      <OffersList offers={offers} />
    </div>
  );
};

export default ClientOffers;
