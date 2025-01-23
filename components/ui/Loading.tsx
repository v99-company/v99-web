import { LoaderCircle } from 'lucide-react';


export default function Loading() {
  return (
    <div className="flex items-center justify-center h-full gap-6">
      <span>Loading Data...</span> <LoaderCircle className="animate-spin h-6 w-6 text-gray-500" />
    </div>
  );
}

