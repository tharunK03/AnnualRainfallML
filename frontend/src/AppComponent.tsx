import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import PredictRainfallPage from './pages/PredictRainfallPage';
import CountryTrendPage from './pages/CountryTrendPage';
import IndexPage from './pages/IndexPage';

const Navigation: React.FC = () => {
  const location = useLocation();

  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-[#1c1c27] text-white border-r border-gray-800">
      <div className="p-6">
        <div className="flex items-center mb-8">
          <div className="w-8 h-8">
            <svg viewBox="0 0 24 24" className="w-full h-full fill-current text-purple-500">
              <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" />
            </svg>
          </div>
          <span className="ml-3 text-xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
            Rainfall Analysis
          </span>
        </div>
        
        <nav className="space-y-4">
          <Link
            to="/"
            className={`block py-2.5 px-4 rounded transition duration-200 ${
              location.pathname === '/' 
                ? 'bg-[#2d2d3b] text-purple-400 border border-purple-500/20' 
                : 'hover:bg-[#2d2d3b] text-gray-400 hover:text-purple-400'
            }`}
          >
            <div className="flex items-center">
              <span className="ml-3">Dashboard</span>
            </div>
          </Link>
          
          <Link
            to="/predict"
            className={`block py-2.5 px-4 rounded transition duration-200 ${
              location.pathname === '/predict'
                ? 'bg-[#2d2d3b] text-purple-400 border border-purple-500/20'
                : 'hover:bg-[#2d2d3b] text-gray-400 hover:text-purple-400'
            }`}
          >
            <div className="flex items-center">
              <span className="ml-3">Predict Rainfall</span>
            </div>
          </Link>
          
          <Link
            to="/country-trend"
            className={`block py-2.5 px-4 rounded transition duration-200 ${
              location.pathname === '/country-trend'
                ? 'bg-[#2d2d3b] text-purple-400 border border-purple-500/20'
                : 'hover:bg-[#2d2d3b] text-gray-400 hover:text-purple-400'
            }`}
          >
            <div className="flex items-center">
              <span className="ml-3">Country Trends</span>
            </div>
          </Link>
        </nav>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-[#151520] flex">
        <Navigation />
        <main className="flex-1 ml-64 p-8 bg-[#151520]">
          <Routes>
            <Route path="/" element={<IndexPage />} />
            <Route path="/predict" element={<PredictRainfallPage />} />
            <Route path="/country-trend" element={<CountryTrendPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App; 