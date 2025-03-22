'use client';

import { useState, useEffect } from 'react';
import FestivalCard from '../components/FestivalCard';
import FilterSection from '../components/FilterSection';
// import FestivalCard from '@/components/FestivalCard';
// import FilterSection from '@/components/FilterSection';

export default function FestivalsPage() {
  const [festivals, setFestivals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const fetchFestivals = async () => {
      setIsLoading(true);
      try {
        const queryParams = new URLSearchParams();
        if (filters.search) queryParams.append('search', filters.search);
        if (filters.tag) queryParams.append('tag', filters.tag);
        if (filters.date) queryParams.append('date', filters.date);

        const url = `/api/festivals?${queryParams.toString()}`;
        const response = await fetch(url);

        if (response.ok) {
          const data = await response.json();
          setFestivals(data);
        }
      } catch (error) {
        console.error('Error fetching festivals:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFestivals();
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className='min-h-[95svh] flex flex-col '>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Explore Festivals</h1>
        <p className="text-gray-600">Discover upcoming festivals and events in your area</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <FilterSection onFilter={handleFilterChange} />
        </div>

        <div className="lg:col-span-3 ">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="text-gray-500 flex justify-center">
                <div className='h-16 aspect-square rounded-full border-4 border-gray-500 border-t-transparent animate-spin'></div>
              </div>
            </div>
          ) : festivals.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No festivals found matching your criteria.</p>
              <button
                onClick={() => setFilters({})}
                className="mt-4 text-indigo-600 hover:text-indigo-800"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {festivals.map((festival) => (
                <FestivalCard key={festival._id} festival={festival} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}