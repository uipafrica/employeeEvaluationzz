import React, { useState } from 'react';
import axios from 'axios';

const CreateEvaluation = () => {
  const [formData, setFormData] = useState({
    employeeName: '',
    jobTitle: '',
    department: '',
    supervisorName: '',
    reviewPeriodFrom: '',
    reviewPeriodTo: '',
    employeeEmail: '',
    performanceRatings: {
      qualityOfWork: 3,
      attendancePunctuality: 3,
      reliability: 3,
      communicationSkills: 3,
      decisionMaking: 3,
      initiativeFlexibility: 3,
      cooperationTeamwork: 3,
      knowledgeOfPosition: 3,
      technicalSkills: 3,
      innovation: 3,
      trainingDevelopment: 3,
    },
    overallPerformanceComments: '',
    supervisorComments: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [referenceNumber, setReferenceNumber] = useState('');

  const performanceCriteria = [
    { key: 'qualityOfWork', label: 'Quality of Work' },
    { key: 'attendancePunctuality', label: 'Attendance & Punctuality' },
    { key: 'reliability', label: 'Reliability' },
    { key: 'communicationSkills', label: 'Communication Skills' },
    { key: 'decisionMaking', label: 'Decision Making' },
    { key: 'initiativeFlexibility', label: 'Initiative & Flexibility' },
    { key: 'cooperationTeamwork', label: 'Cooperation & Teamwork' },
    { key: 'knowledgeOfPosition', label: 'Knowledge of Position' },
    { key: 'technicalSkills', label: 'Technical Skills' },
    { key: 'innovation', label: 'Innovation' },
    { key: 'trainingDevelopment', label: 'Training & Development' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRatingChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      performanceRatings: {
        ...prev.performanceRatings,
        [key]: parseInt(value),
      },
    }));
  };

  const handleTextareaChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await axios.post('/api/evaluations/create', formData);
      setSuccess(true);
      setReferenceNumber(response.data.data.referenceNumber);
      
      // Reset form
      setFormData({
        employeeName: '',
        jobTitle: '',
        department: '',
        supervisorName: '',
        reviewPeriodFrom: '',
        reviewPeriodTo: '',
        employeeEmail: '',
        performanceRatings: {
          qualityOfWork: 3,
          attendancePunctuality: 3,
          reliability: 3,
          communicationSkills: 3,
          decisionMaking: 3,
          initiativeFlexibility: 3,
          cooperationTeamwork: 3,
          knowledgeOfPosition: 3,
          technicalSkills: 3,
          innovation: 3,
          trainingDevelopment: 3,
        },
        overallPerformanceComments: '',
        supervisorComments: '',
      });
    } catch (err) {
      setError(
        err.response?.data?.message || 
        err.response?.data?.errors?.[0]?.msg || 
        'Error creating evaluation. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-[#800020] mb-6 sm:mb-8">
        Create Employee Evaluation
      </h1>

      {success && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          <p className="font-semibold">Evaluation created successfully!</p>
          <p>Reference Number: <strong>{referenceNumber}</strong></p>
          <p className="text-sm mt-2">
            An email has been sent to the employee with a secure link to view their evaluation.
          </p>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-4 sm:p-6">
        {/* Employee Information */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-[#800020] mb-4">
            Employee Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Employee Name *
              </label>
              <input
                type="text"
                name="employeeName"
                value={formData.employeeName}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#800020] focus:border-[#800020]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Title *
              </label>
              <input
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#800020] focus:border-[#800020]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Department *
              </label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#800020] focus:border-[#800020]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Supervisor Name *
              </label>
              <input
                type="text"
                name="supervisorName"
                value={formData.supervisorName}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#800020] focus:border-[#800020]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Review Period From *
              </label>
              <input
                type="date"
                name="reviewPeriodFrom"
                value={formData.reviewPeriodFrom}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#800020] focus:border-[#800020]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Review Period To *
              </label>
              <input
                type="date"
                name="reviewPeriodTo"
                value={formData.reviewPeriodTo}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#800020] focus:border-[#800020]"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Employee Email *
              </label>
              <input
                type="email"
                name="employeeEmail"
                value={formData.employeeEmail}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#800020] focus:border-[#800020]"
              />
            </div>
          </div>
        </div>

        {/* Performance Ratings */}
        <div className="mb-8">
          <h2 className="text-xl md:text-2xl font-semibold text-[#800020] mb-4">
            Performance Ratings (1-5 Scale)
          </h2>
          <div className="space-y-4">
            {performanceCriteria.map((criterion) => (
              <div key={criterion.key} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 py-2 border-b border-gray-200">
                <label className="text-sm font-medium text-gray-700 sm:w-1/3 mb-2 sm:mb-0">
                  {criterion.label}
                </label>
                <div className="flex items-center space-x-1 sm:space-x-2 flex-1 justify-center sm:justify-start">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        handleRatingChange(criterion.key, rating);
                      }}
                      className="focus:outline-none transition-transform hover:scale-110 active:scale-95"
                      aria-label={`Rate ${rating} out of 5`}
                    >
                      <svg
                        className={`w-6 h-6 sm:w-7 sm:h-7 ${
                          formData.performanceRatings[criterion.key] >= rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    </button>
                  ))}
                  <span className="ml-2 text-sm font-medium text-gray-700 min-w-[20px]">
                    {formData.performanceRatings[criterion.key]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Comments */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-[#800020] mb-4">Comments</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Overall Performance Comments
              </label>
              <textarea
                name="overallPerformanceComments"
                value={formData.overallPerformanceComments}
                onChange={handleTextareaChange}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#800020] focus:border-[#800020]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Supervisor Comments
              </label>
              <textarea
                name="supervisorComments"
                value={formData.supervisorComments}
                onChange={handleTextareaChange}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#800020] focus:border-[#800020]"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 mt-6">
          <button
            type="button"
            onClick={() => window.location.href = '/'}
            className="w-full sm:w-auto px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto px-6 py-2 bg-[#800020] text-white rounded-md hover:bg-[#6b0019] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Submitting...' : 'Submit Evaluation'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEvaluation;

