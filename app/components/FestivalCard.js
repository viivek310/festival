import Link from 'next/link';
import Image from 'next/image';

export default function FestivalCard({ festival }) {
  const startDate = new Date(festival.startDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
  
  const endDate = new Date(festival.endDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48 w-full">
        <Image 
          src={festival.imageUrl || '/images/placeholder.jpg'} 
          alt={festival.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{festival.name}</h3>
        <p className="text-sm text-gray-600 mt-1">{startDate} - {endDate}</p>
        <p className="text-sm text-gray-700 mt-1">{festival.location}</p>
        
        <div className="flex flex-wrap gap-1 mt-2">
          {festival.tags.map((tag, index) => (
            <span 
              key={index} 
              className="inline-block bg-gray-100 rounded-full px-2 py-1 text-xs font-semibold text-gray-600"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <p className="text-sm text-gray-700 mt-2 line-clamp-2">
          {festival.description}
        </p>
        
        <Link 
          href={`/festivals/${festival._id}`}
          className="mt-4 inline-block text-indigo-600 hover:text-indigo-800 font-medium"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}