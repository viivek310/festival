'use client';

import { useEffect, useState } from 'react';
// import FestivalCard from './FestivalCard';
import FestivalCard from './FestivalCard';

export default function FeaturedFestivals() {
  const [festivals, setFestivals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedFestivals = async () => {
      try {
        const response = await fetch('/api/festivals?featured=true');
        if (response.ok) {
          const data = await response.json();
          setFestivals(data.slice(0,6));
        }
      } catch (error) {
        console.error('Error fetching featured festivals:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedFestivals();
  }, []);

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Loading featured festivals...</p>
      </div>
    );
  }

  if (festivals.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No featured festivals available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {festivals.map((festival) => (
        <FestivalCard key={festival._id} festival={festival} />
      ))}
    </div>
  );
}