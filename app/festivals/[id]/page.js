'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function FestivalDetailPage() {
  const { id } = useParams();
  const router = useRouter();
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
      <div className="text-center py-12 min-h-[95svh]">
        <div className="text-gray-500 flex justify-center">
          <div className='h-16 aspect-square rounded-full border-4 border-gray-500 border-t-transparent animate-spin'></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => router.push('/festivals')}
          className="mt-4 text-indigo-600 hover:text-indigo-800"
        >
          Back to Festivals
        </button>
      </div>
    );
  }

  if (!festival) return null;

  const startDate = new Date(festival.startDate).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const endDate = new Date(festival.endDate).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className='min-h-[95svh]'>
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="text-indigo-600 hover:text-indigo-800 flex items-center"
        >
          ← Back
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="relative h-96 w-full">
          <Image
            src={festival.imageUrl || '/images/placeholder.jpg'}
            alt={festival.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{festival.name}</h1>

          <div className="flex flex-wrap gap-2 mb-4">
            {festival.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">When</h2>
              <p className="text-gray-600">{startDate}</p>
              {startDate !== endDate && (
                <p className="text-gray-600">to {endDate}</p>
              )}
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Where</h2>
              <p className="text-gray-600">{festival.location}</p>
              <p className="text-gray-600">{festival.address}</p>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">About This Festival</h2>
            <p className="text-gray-600 whitespace-pre-line">{festival.description}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            {festival.ticketUrl && (
              <a
                href={festival.ticketUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-indigo-600 text-white px-6 py-2 rounded-md font-medium hover:bg-indigo-700 transition-colors text-center"
              >
                Get Tickets
              </a>
            )}

            {festival.contactEmail && (
              <a
                href={`mailto:${festival.contactEmail}`}
                className="border border-indigo-600 text-indigo-600 px-6 py-2 rounded-md font-medium hover:bg-indigo-50 transition-colors text-center"
              >
                Contact Organizer
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
