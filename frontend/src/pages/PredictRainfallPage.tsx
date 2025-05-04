import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const STATES = ['Tamil Nadu', 'Uttar Pradesh', 'Karnataka', 'Maharashtra', 'Gujarat'];

const PredictRainfallPage: React.FC = () => {
  const [selectedState, setSelectedState] = useState<string>('');
  const [rainfallData, setRainfallData] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedState) {
      fetchRainfallData();
    }
  }, [selectedState]);

  const fetchRainfallData = async () => {
    setError(null);
    try {
      // This would be replaced with actual API call to get historical data
      // For now using mock data
      const mockData = Array.from({ length: 12 }, () => 
        Math.floor(Math.random() * (300 - 50) + 50)
      );
      setRainfallData(mockData);
    } catch (err) {
      setError('Error fetching rainfall data. Please try again.');
      console.error(err);
    }
  };

  const chartData = {
    labels: [
      'January', 'February', 'March', 'April', 
      'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December'
    ],
    datasets: [
      {
        label: `${selectedState} Rainfall Trends`,
        data: rainfallData,
        fill: true,
        borderColor: 'rgba(149, 76, 233, 1)',
        backgroundColor: 'rgba(149, 76, 233, 0.1)',
        tension: 0.4,
        pointBackgroundColor: 'rgba(149, 76, 233, 1)',
        pointBorderColor: '#2d2d3b',
        pointHoverBackgroundColor: '#2d2d3b',
        pointHoverBorderColor: 'rgba(149, 76, 233, 1)',
        pointRadius: 4,
        pointHoverRadius: 6,
      }
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
        labels: {
          color: '#ffffff',
          usePointStyle: true,
          padding: 20,
          font: { size: 12 },
        },
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        backgroundColor: 'rgba(45, 45, 59, 0.9)',
        titleColor: '#ffffff',
        bodyColor: '#a0aec0',
        borderColor: 'rgba(149, 76, 233, 0.2)',
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Rainfall (mm)',
          color: '#ffffff',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
        },
        ticks: {
          color: '#a0aec0',
          callback: function(tickValue: number | string) {
            return `${tickValue}mm`;
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#a0aec0',
        },
      },
    },
  };

  return (
    <div className="bg-[#1c1c27] shadow-lg rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">State Rainfall Trends</h2>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-purple-500"></div>
          <span className="text-gray-400 text-sm">Live Updates</span>
        </div>
      </div>
      
      <div className="mb-6">
        <label htmlFor="state" className="block text-sm font-medium text-gray-300 mb-2">
          Select State
        </label>
        <select
          id="state"
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-600 bg-[#2d2d3b] text-white shadow-sm focus:border-purple-500 focus:ring-purple-500"
        >
          <option value="">Choose a state</option>
          {STATES.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-900/20 border-l-4 border-red-500">
          <p className="text-red-400">{error}</p>
        </div>
      )}

      {selectedState && rainfallData.length > 0 && (
        <div className="mt-6">
          <div className="h-[400px] bg-[#2d2d3b] rounded-lg p-4">
            <Line data={chartData} options={chartOptions} />
          </div>
          <div className="mt-4 grid grid-cols-4 gap-4">
            {rainfallData.map((value, index) => (
              <div key={index} className="bg-[#2d2d3b] p-4 rounded-lg border border-gray-700">
                <p className="text-sm text-gray-400">{chartData.labels[index]}</p>
                <div className="flex items-end space-x-1 mt-1">
                  <p className="text-lg font-semibold text-white">{value}</p>
                  <p className="text-sm text-purple-400 mb-0.5">mm</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PredictRainfallPage; 