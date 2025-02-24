export interface Offer {
    id?: number;
    client_id: number;
    offer_title: string;
    offer_description: string;
    offer_type: "announcement" | "discount" | "notice";
    start_date: string;
    end_date: string;
    created_by: number;
    created_at?: string;
    updated_at?: string;
  }
export interface Client {
    uid:number;
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
    approved: number;
    created_by: string;
    creator_name: string;
}


export interface BusinessRequest {
  id: number;
  business_name: string;
  contact_person: string;
  contact_number: string;
  whatsapp_number: string;
  address: string;
  description?: string;
  latitude: number;
  longitude: number;
  status: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
}

export interface UpdateHistory {
  id: number;
  client_id: number;
  uid: number;
  company_name: string;
  description: string;
  full_description?: string;
  address: string;
  state: string;
  city: string;
  pincode: string;
  contact_person: string;
  email: string;
  mobile_number: string;
  whatsapp: string;
  gmap?: string;
  yt_video?: string;
  logo: string;
  images?: string;
  youtube?: string;
  instagram?: string;
  twitter?: string;
  facebook?: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  created_by: string;
  updated_by: string;
}

export interface ClientCreds {
  id: string;
  client_id: string;
  name: string;
  username: string;
  password: string;
  // role: "super" | "dev" | "visitor" | "editor" | "freelancer" | "client"; // Restrict to known roles
  role: "client";
  blocked: 0 | 1; // 0 for active, 1 for blocked
}