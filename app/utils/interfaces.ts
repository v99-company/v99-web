export interface Offer {
    id: number;
    client_id: number;
    offer_title: string;
    offer_description: string;
    offer_type: "announcement" | "discount" | "notice";
    start_date: string;
    end_date: string;
    created_at: string;
    updated_at: string;
  }
export interface Client {
    id: number;
    email: string;
    company_name: string;
    description: string;
    full_description: string;
    contact_person: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    mobile_number: string;
    whatsapp: string;
    gmap: string;
    offers: Offer[];
    yt_video: string;
    logo: string;
    images: string[];
    youtube: string;
    instagram: string;
    facebook: string;
    twitter: string;
}
