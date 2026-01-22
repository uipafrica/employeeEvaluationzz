import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#800020] mb-4">
          Employee Evaluation System
        </h1>
        <p className="text-lg sm:text-xl text-gray-700">
          UIPA-QA-R-ADM-4-024 Employee Evaluation Form
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 sm:mt-12">
        <div className="bg-white rounded-lg shadow-md border-2 border-[#800020] p-5 sm:p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-xl sm:text-2xl font-semibold text-[#800020] mb-3">
            Create Evaluation
          </h2>
          <p className="text-gray-700 mb-4 text-sm sm:text-base">
            Supervisors can create a new employee evaluation form.
          </p>
          <Link
            to="/create"
            className="inline-block w-full sm:w-auto text-center bg-[#800020] text-white px-6 py-2 rounded-md hover:bg-[#6b0019] transition-colors"
          >
            Create New Evaluation
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md border-2 border-[#800020] p-5 sm:p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-xl sm:text-2xl font-semibold text-[#800020] mb-3">
            View Evaluation
          </h2>
          <p className="text-gray-700 mb-4 text-sm sm:text-base">
            Employees can view and acknowledge their evaluation using the secure link sent via email.
          </p>
          <p className="text-xs sm:text-sm text-gray-600 italic">
            Use the link from your email to access your evaluation.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md border-2 border-[#800020] p-5 sm:p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-xl sm:text-2xl font-semibold text-[#800020] mb-3">
            Admin Dashboard
          </h2>
          <p className="text-gray-700 mb-4 text-sm sm:text-base">
            View all evaluations, search, and download PDFs.
          </p>
          <Link
            to="/admin"
            className="inline-block w-full sm:w-auto text-center bg-[#800020] text-white px-6 py-2 rounded-md hover:bg-[#6b0019] transition-colors"
          >
            Go to Admin
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;

