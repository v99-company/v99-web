// TypeScript Interface
export interface ClientData {
    id: number;
    company_name: string;
    description: string;
    full_description: string;
    address: string;
    state: string;
    city: string;
    pincode: number;
    contact_person: string;
    email: string;
    mobile_number: string;
    whatsapp: string;
    gmap: string;
    yt_video: string;
    logo: string;
    images: string[];
    youtube?: string;
    instagram?: string;
    twitter?: string;
    facebook?: string;
    created_at: string;
    updated_at: string;
    deleted_at?: string | null;
    offers: Offer[];
  }
  
  export interface Offer {
    id: number;
    client_id: number;
    offer_title: string;
    offer_description: string;
    offer_type: 'announcement' | 'discount' | 'notice';
    start_date: string;
    end_date: string;
    created_at: string;
    updated_at: string;
  }
  
  // UI Component for Chips
  import React, { JSX } from 'react';
  import { FaBullhorn, FaTags, FaInfoCircle } from 'react-icons/fa';

  interface OfferChipProps {
    offer: Offer;
  }
  
  const ClientOfferChips: React.FC<OfferChipProps> = ({ offer }) => {
    const { offer_type, offer_title } = offer;
  
    const typeStyles: Record<Offer['offer_type'], string> = {
      announcement: 'bg-orange-500 text-white',
      discount: 'bg-green-500 text-white',
      notice: 'bg-blue-500 text-white',
    };
  
    const typeIcons: Record<Offer['offer_type'], JSX.Element> = {
        announcement: <FaBullhorn className="mr-2 w-4 h-4" />,
        discount: <FaTags className="mr-2 w-4 h-4" />,
        notice: <FaInfoCircle className="mr-2 w-4 h-4" />,
    };

    return (
      <div
        className={`flex items-center px-3 py-1 rounded-full text-sm font-semibold ${typeStyles[offer_type]} shadow-sm`}
      >
        {typeIcons[offer_type]}
        <span>{offer_title}</span>
      </div>
    );
  };
  
  export default ClientOfferChips;
