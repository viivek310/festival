'use client';

import { useState, useEffect } from 'react';

export default function FilterSection({ onFilter }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTag, setSelectedTag] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Fetch categories from the API
        const fetchCategories = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('/api/categories'); // Replace with your API endpoint
                if (response.ok) {
                    const data = await response.json();
                    setCategories(data);
                } else {
                    console.error('Failed to fetch categories');
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        onFilter({
            search: searchTerm,
            tag: selectedTag,
            date: selectedDate,
        });
    };

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedTag('');
        setSelectedDate('');
        onFilter({});
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-4 mb-6">
            <h2 className="text-lg font-semibold mb-4">Find Festivals</h2>
            <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="search" className="block text-sm font-medium text-gray-700">
                            Search
                        </label>
                        <input
                            type="text"
                            id="search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Festival name or keyword..."
                        />
                    </div>

                    <div>
                        <label htmlFor="tag" className="block text-sm font-medium text-gray-700">
                            Category
                        </label>
                        <select
                            id="tag"
                            value={selectedTag}
                            onChange={(e) => setSelectedTag(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            disabled={isLoading}
                        >
                            <option value="">All Categories</option>
                            {categories.map((category, index) => (
                                <option key={category.id || index} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>

                    </div>

                    <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                            Date
                        </label>
                        <input
                            type="date"
                            id="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div className="flex space-x-2">
                        <button
                            type="submit"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Apply Filters
                        </button>
                        <button
                            type="button"
                            onClick={clearFilters}
                            className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Clear
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
