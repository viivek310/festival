// app/admin/edit/[id]/page.js
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import FestivalForm from '@/components/FestivalForm';

export default function EditFestivalPage() {
  const { id } = useParams();
  const [festival, setFestival] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFestival = async () => {
      try {
        const response = await fetch(`/api/festivals/${id}`);
        if (!response.ok) {
          throw new Error('Festival not found');
        }
        const data = await response.json();
        setFestival(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFestival();
  }, [id]);

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Loading festival details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!festival) return null;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Festival</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <FestivalForm festival={festival} isEditing={true} />
      </div>
    </div>
  );
}