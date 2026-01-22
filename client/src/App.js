import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateEvaluation from './pages/CreateEvaluation';
import EmployeeReview from './pages/EmployeeReview';
import AdminPage from './pages/AdminPage';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <nav className="bg-[#800020] shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-14 sm:h-16">
              <div className="flex items-center">
                <h1 className="text-lg sm:text-xl font-bold text-white">
                  Employee Evaluation System
                </h1>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-4">
                <a
                  href="/"
                  className="text-white hover:text-gray-200 px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors"
                >
                  Home
                </a>
                <a
                  href="/create"
                  className="text-white hover:text-gray-200 px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors"
                >
                  Create
                </a>
                <a
                  href="/admin"
                  className="text-white hover:text-gray-200 px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors"
                >
                  Admin
                </a>
              </div>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateEvaluation />} />
          <Route path="/evaluation/:token" element={<EmployeeReview />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

