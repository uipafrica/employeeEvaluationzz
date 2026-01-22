import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { generateEvaluationPDF } from '../utils/generatePDF';

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [evaluations, setEvaluations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchParams, setSearchParams] = useState({
    employeeName: '',
    department: '',
    reviewPeriodFrom: '',
    reviewPeriodTo: '',
    search: '',
  });

  const ADMIN_PASSWORD = '0000';

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPasswordError('');
      fetchEvaluations();
    } else {
      setPasswordError('Incorrect password. Please try again.');
      setPassword('');
    }
  };

  useEffect(() => {
    // Don't fetch if not authenticated
    if (!isAuthenticated) {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const fetchEvaluations = async () => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams();
      Object.keys(searchParams).forEach((key) => {
        if (searchParams[key]) {
          params.append(key, searchParams[key]);
        }
      });

      const response = await axios.get(
        `/api/admin/evaluations?${params.toString()}`
      );
      setEvaluations(response.data.data);
    } catch (err) {
      setError(
        err.response?.data?.message || 
        'Error loading evaluations. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchEvaluations();
  };

  const handleClearSearch = () => {
    setSearchParams({
      employeeName: '',
      department: '',
      reviewPeriodFrom: '',
      reviewPeriodTo: '',
      search: '',
    });
    setTimeout(() => {
      fetchEvaluations();
    }, 100);
  };

  const handleDownloadPDF = async (evaluation) => {
    try {
      // Generate PDF on client side
      await generateEvaluationPDF(evaluation);
    } catch (err) {
      console.error('Error generating PDF:', err);
      alert('Error generating PDF. Please try again.');
    }
  };

  // Password protection screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="max-w-md w-full px-6 py-8 bg-white rounded-lg shadow-lg border-2 border-[#800020]">
          <h2 className="text-2xl font-bold text-[#800020] mb-6 text-center">
            Admin Access
          </h2>
          <form onSubmit={handlePasswordSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError('');
                }}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#800020] focus:border-[#800020]"
                placeholder="Enter admin password"
                autoFocus
              />
              {passwordError && (
                <p className="mt-2 text-sm text-red-600">{passwordError}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-[#800020] text-white rounded-md hover:bg-[#6b0019] transition-colors font-medium"
            >
              Access Admin Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-[#800020] mb-6 sm:mb-8">Admin Dashboard</h1>

      {/* Search Form */}
      <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 mb-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Search Evaluations</h2>
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                General Search
              </label>
              <input
                type="text"
                name="search"
                value={searchParams.search}
                onChange={handleSearchChange}
                placeholder="Search by name, department, or reference number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#800020] focus:border-[#800020]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Employee Name
              </label>
              <input
                type="text"
                name="employeeName"
                value={searchParams.employeeName}
                onChange={handleSearchChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#800020] focus:border-[#800020]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Department
              </label>
              <input
                type="text"
                name="department"
                value={searchParams.department}
                onChange={handleSearchChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#800020] focus:border-[#800020]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Review Period From
              </label>
              <input
                type="date"
                name="reviewPeriodFrom"
                value={searchParams.reviewPeriodFrom}
                onChange={handleSearchChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#800020] focus:border-[#800020]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Review Period To
              </label>
              <input
                type="date"
                name="reviewPeriodTo"
                value={searchParams.reviewPeriodTo}
                onChange={handleSearchChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#800020] focus:border-[#800020]"
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2 bg-[#800020] text-white rounded-md hover:bg-[#6b0019] transition-colors"
            >
              Search
            </button>
            <button
              type="button"
              onClick={handleClearSearch}
              className="w-full sm:w-auto px-6 py-2 border-2 border-[#800020] rounded-md text-[#800020] hover:bg-[#800020] hover:text-white transition-colors"
            >
              Clear
            </button>
          </div>
        </form>
      </div>

      {/* Results */}
      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-600">Loading evaluations...</p>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">
              Evaluations ({evaluations.length})
            </h2>
          </div>
          
          {evaluations.length === 0 ? (
            <div className="p-12 text-center text-gray-600">
              No evaluations found.
            </div>
          ) : (
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Reference
                    </th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Employee
                    </th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                      Department
                    </th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                      Review Period
                    </th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                      Created
                    </th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {evaluations.map((evaluation) => (
                    <tr key={evaluation._id} className="hover:bg-gray-50">
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">
                        {evaluation.referenceNumber}
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                        {evaluation.employeeName}
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 hidden md:table-cell">
                        {evaluation.department}
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 hidden lg:table-cell">
                        {new Date(evaluation.reviewPeriodFrom).toLocaleDateString()} -{' '}
                        {new Date(evaluation.reviewPeriodTo).toLocaleDateString()}
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                        {evaluation.acknowledged ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Acknowledged
                          </span>
                        ) : (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            Pending
                          </span>
                        )}
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 hidden md:table-cell">
                        {new Date(evaluation.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-medium">
                        <button
                          onClick={() => handleDownloadPDF(evaluation)}
                          className="text-[#800020] hover:text-[#6b0019] font-medium"
                        >
                          Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminPage;

