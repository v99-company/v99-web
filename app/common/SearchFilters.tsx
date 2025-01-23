'use client'

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface SearchFiltersProps {
    onFilterChange: (searchTerm: string) => void
}
  
const SearchFilters = ({ onFilterChange }: SearchFiltersProps) => {
const [searchTerm, setSearchTerm] = useState("")

const handleSearch = () => {
    onFilterChange(searchTerm)
}

return (
    <div className="w-full flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-6">
    <div className="relative w-full mx-16">
        <Input
            type="text"
            placeholder="Search businesses and service providers nearby..."
            className="w-full text-black px-4 py-3 border border-gray-300 rounded-xl pl-4 pr-12"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    handleSearch();
                }
            }}
        />
        <button 
            className="absolute inset-y-0 right-0 flex items-center pr-4 bg-teal-700 rounded-r-xl border border-l-0 border-gray-300 pl-2"
            onClick={handleSearch}
            // style={{ background: '#0077b6', borderRadius: '0 4px 4px 0' }} // Add background color and adjust radius to match the input
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
        </button>
    </div>
</div>

)
}
export default SearchFilters