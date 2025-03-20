import Link from 'next/link';
import FeaturedFestivals from './components/FeaturedFestivals';
// import FeaturedFestivals from '@/components/FeaturedFestivals';
// FeaturedFestivals

export default function HomePage() {
  return (
    <div>
      <div className="bg-indigo-700 text-white rounded-lg p-8 mb-8">
        <h1 className="text-3xl font-bold mb-4">Discover Local Festivals</h1>
        <p className="text-lg mb-6">Find and explore amazing festivals happening in your area</p>
        <Link 
          href="/festivals" 
          className="bg-white text-indigo-700 px-6 py-2 rounded-md font-medium hover:bg-indigo-50 transition-colors"
        >
          Browse All Festivals
        </Link>
      </div>
      
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Featured Festivals</h2>
          <Link 
            href="/festivals" 
            className="text-indigo-600 hover:text-indigo-800 font-medium"
          >
            View All →
          </Link>
        </div>
        <FeaturedFestivals />
      </section>
      
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-indigo-600 text-xl font-bold mb-2">1</div>
            <h3 className="text-lg font-semibold mb-2">Find Festivals</h3>
            <p className="text-gray-600">Search for festivals by location, date, or category to find events that interest you.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-indigo-600 text-xl font-bold mb-2">2</div>
            <h3 className="text-lg font-semibold mb-2">Get Details</h3>
            <p className="text-gray-600">View all the important information about each festival including dates, location, and ticketing.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-indigo-600 text-xl font-bold mb-2">3</div>
            <h3 className="text-lg font-semibold mb-2">Enjoy the Event</h3>
            <p className="text-gray-600">Attend the festival and make unforgettable memories with friends and family.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
