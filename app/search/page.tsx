"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { X } from "lucide-react";
import SearchFilters from "../common/SearchFilters";
import ClientList from "../common/ClientsList";
import { Client } from "../utils/interfaces";

const SearchView: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialSearchTerm = searchParams.get("search") || "";
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [searchResults, setSearchResults] = useState<Client[]>(() => {
    if (typeof window !== "undefined") {
        const storedClients = sessionStorage.getItem("clients");
        const clients = storedClients ? JSON.parse(storedClients) : [];

      return clients;
    }
    return [];
  });

  useEffect(() => {
    setSearchTerm(initialSearchTerm);
  }, [initialSearchTerm]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="sticky top-0 z-50 bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 flex items-start">
          <button
            onClick={() => router.push("/")}
            className="mr-2 mt-1 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Back to main view"
          >
            <X className="h-8 w-8 text-gray-500 hover:text-red-400" />
          </button>
          <SearchFilters onFilterChange={(newSearchTerm: string) => setSearchTerm(newSearchTerm)} placeholder="Search Other Businesses or Experts " />
        </div>

      {/* Search Term Heading */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4 pt-8">
        <h2 className="text-xl md:text-2xl font-bold text-gray-600">
          {searchTerm ? `Results for: "${searchTerm}"` : "Search Results"}
        </h2>
      </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <ClientList searchTerm={searchTerm}/>
      </div>
    </div>
  );
};

const WrappedSearchView = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <SearchView />
  </Suspense>
);

export default WrappedSearchView;
