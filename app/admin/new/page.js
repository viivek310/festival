// import FestivalForm from '@/components/FestivalForm';

import FestivalForm from "@/app/components/FestivalForm";

export default function NewFestivalPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Add New Festival</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <FestivalForm />
      </div>
    </div>
  );
}