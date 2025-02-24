import { useState, useEffect, useRef } from 'react';
import { LoaderCircle } from 'lucide-react';
import { List } from './List';
import Pagination from './Pagination';
import { Client } from '../utils/interfaces';

interface ClientListProps {
  searchTerm: string; // Add a prop for the search term
}

export default function ClientList({ searchTerm }: ClientListProps) {
  const [searchList, setSearchList] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  async function fetchClients(search: string, page: number = 1) {
    setIsLoading(true);
    try {
      const endpoint = search
        ? `/api/search?query=${search}&page=${page}&limit=20`
        : `/api/homeList?page=${page}&limit=20`;
        // : `/api/allClients?page=${page}&limit=20`;

      const result = await fetch(endpoint, { method: 'GET' });
      if (!result.ok) {
        console.log('Error fetching clients');
        return;
      }
      const data = await result.json();
      console.log('data', data.data);
      setSearchList(data.data.data || []);
      setTotalPages(data.data.total_pages);
      setCurrentPage(data.data.current_page);
    } catch (error) {
      console.log('Error fetching clients:', error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    // Debounce the fetch call for the search term
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      fetchClients(searchTerm);
    }, 500);

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [searchTerm]);

  const handlePageChange = (page: number) => {
    fetchClients(searchTerm, page);

    // Smooth scroll to the top of the list
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <main className="flex-1">
      <div className="relative z-10 min-h-screen">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="flex items-center justify-center h-full gap-6">
                <span>Loading Data...</span>{' '}
                <LoaderCircle className="animate-spin h-6 w-6 text-gray-500" />
              </div>
            </div>
          ) : (
            <>
              <List items={searchList} />

              <div className='h-16'></div>
              {/* <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              /> */}
            </>
          )}
        </div>
      </div>
    </main>
  );
}
