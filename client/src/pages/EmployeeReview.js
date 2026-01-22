import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EmployeeReview = () => {
  const { token } = useParams();
  const [evaluation, setEvaluation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [acknowledging, setAcknowledging] = useState(false);
  const [acknowledged, setAcknowledged] = useState(false);
  const [employeeComments, setEmployeeComments] = useState('');
  const [signatureName, setSignatureName] = useState('');

  useEffect(() => {
    const fetchEvaluation = async () => {
      try {
        const response = await axios.get(`/api/evaluations/token/${token}`);
        setEvaluation(response.data.data);
        setAcknowledged(response.data.data.acknowledged);
        setEmployeeComments(response.data.data.employeeComments || '');
        setSignatureName(response.data.data.signatureName || '');
      } catch (err) {
        setError(
          err.response?.data?.message || 
          'Error loading evaluation. Please check your link.'
        );
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchEvaluation();
    }
  }, [token]);

  const handleAcknowledge = async (e) => {
    e.preventDefault();
    
    if (!signatureName.trim()) {
      setError('Please enter your name to acknowledge');
      return;
    }

    setAcknowledging(true);
    setError('');

    try {
      const response = await axios.post(`/api/evaluations/acknowledge/${token}`, {
        employeeComments,
        signatureName: signatureName.trim(),
      });
      setEvaluation(response.data.data);
      setAcknowledged(true);
    } catch (err) {
      setError(
        err.response?.data?.message || 
        'Error acknowledging evaluation. Please try again.'
      );
    } finally {
      setAcknowledging(false);
    }
  };

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

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <p className="text-gray-600">Loading evaluation...</p>
      </div>
    );
  }

  if (error && !evaluation) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  if (!evaluation) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-[#800020] mb-6 sm:mb-8">
        Employee Evaluation Review
      </h1>

      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {acknowledged && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          <p className="font-semibold">This evaluation has been acknowledged.</p>
          <p className="text-sm mt-1">
            Signed by: {evaluation.signatureName} on{' '}
            {new Date(evaluation.signatureTimestamp).toLocaleString()}
          </p>
        </div>
      )}

      <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 mb-6">
        {/* Employee Information */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-[#800020] mb-4">
            Employee Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Employee Name</p>
              <p className="font-medium text-gray-900">{evaluation.employeeName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Job Title</p>
              <p className="font-medium text-gray-900">{evaluation.jobTitle}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Department</p>
              <p className="font-medium text-gray-900">{evaluation.department}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Supervisor Name</p>
              <p className="font-medium text-gray-900">{evaluation.supervisorName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Review Period</p>
              <p className="font-medium text-gray-900">
                {new Date(evaluation.reviewPeriodFrom).toLocaleDateString()} to{' '}
                {new Date(evaluation.reviewPeriodTo).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Reference Number</p>
              <p className="font-medium text-gray-900">{evaluation.referenceNumber}</p>
            </div>
          </div>
        </div>

        {/* Performance Ratings */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-[#800020] mb-4">
            Performance Ratings (1-5 Scale)
          </h2>
          <div className="space-y-3">
            {performanceCriteria.map((criterion) => (
              <div key={criterion.key} className="flex items-center justify-between py-2 border-b">
                <span className="text-sm font-medium text-gray-700">
                  {criterion.label}
                </span>
                <span className="text-lg font-bold text-[#800020]">
                  {evaluation.performanceRatings[criterion.key]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Comments */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-[#800020] mb-4">Comments</h2>
          <div className="space-y-4">
            {evaluation.overallPerformanceComments && (
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">
                  Overall Performance Comments
                </p>
                <p className="text-gray-900 bg-gray-50 p-3 rounded">
                  {evaluation.overallPerformanceComments}
                </p>
              </div>
            )}
            {evaluation.supervisorComments && (
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">
                  Supervisor Comments
                </p>
                <p className="text-gray-900 bg-gray-50 p-3 rounded">
                  {evaluation.supervisorComments}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Acknowledgment Section */}
      {!acknowledged ? (
        <div className="bg-white shadow-md rounded-lg p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-[#800020] mb-4">
            Employee Acknowledgment
          </h2>
          <form onSubmit={handleAcknowledge}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Employee Comments (Optional)
              </label>
              <textarea
                value={employeeComments}
                onChange={(e) => setEmployeeComments(e.target.value)}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#800020] focus:border-[#800020]"
                placeholder="Enter any comments or feedback..."
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type Your Name to Acknowledge *
              </label>
              <input
                type="text"
                value={signatureName}
                onChange={(e) => setSignatureName(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#800020] focus:border-[#800020]"
                placeholder="Enter your full name"
              />
            </div>
            <button
              type="submit"
              disabled={acknowledging}
              className="w-full px-6 py-3 bg-[#800020] text-white rounded-md hover:bg-[#6b0019] disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {acknowledging ? 'Acknowledging...' : 'Acknowledge Evaluation'}
            </button>
          </form>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-[#800020] mb-4">
            Employee Acknowledgment
          </h2>
          {evaluation.employeeComments && (
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-1">
                Employee Comments
              </p>
              <p className="text-gray-900 bg-gray-50 p-3 rounded">
                {evaluation.employeeComments}
              </p>
            </div>
          )}
          <div className="border-t pt-4">
            <p className="text-sm text-gray-600">Acknowledged by:</p>
            <p className="font-medium text-gray-900">{evaluation.signatureName}</p>
            <p className="text-sm text-gray-600 mt-1">
              Date: {new Date(evaluation.signatureTimestamp).toLocaleString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeReview;

