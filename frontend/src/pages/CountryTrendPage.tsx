import React, { useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface RainfallData {
  subdivision: string;
  average_rainfall: number;
}

const CountryTrendPage: React.FC = () => {
  const [startYear, setStartYear] = useState<number>(1901);
  const [endYear, setEndYear] = useState<number>(2015);
  const [data, setData] = useState<RainfallData[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      // Mock data for now
      const mockData: RainfallData[] = [
        { subdivision: "Rajasthan", average_rainfall: 1200 },
        { subdivision: "Gujarat", average_rainfall: 1190 },
        { subdivision: "Madhya Pradesh", average_rainfall: 1180 },
        { subdivision: "Punjab", average_rainfall: 1185 },
        { subdivision: "Kerala", average_rainfall: 1187 },
        { subdivision: "Maharashtra", average_rainfall: 1183 },
        { subdivision: "Uttar Pradesh", average_rainfall: 1189 },
        { subdivision: "West Bengal", average_rainfall: 1186 },
        { subdivision: "Karnataka", average_rainfall: 1182 },
        { subdivision: "Tamil Nadu", average_rainfall: 1178 },
        { subdivision: "Andhra Pradesh", average_rainfall: 1175 },
        { subdivision: "Bihar", average_rainfall: 1180 },
        { subdivision: "Odisha", average_rainfall: 1170 },
        { subdivision: "Telangana", average_rainfall: 1165 },
        { subdivision: "Haryana", average_rainfall: 1160 }
      ];
      setData(mockData);
    } catch (err) {
      setError('Error fetching data. Please try again.');
      console.error(err);
    }
  };

  const chartData = {
    labels: data.map(item => item.subdivision),
    datasets: [
      {
        label: 'Average Annual Rainfall (mm)',
        data: data.map(item => item.average_rainfall),
        backgroundColor: 'rgba(149, 76, 233, 0.2)',
        borderColor: 'rgba(149, 76, 233, 1)',
        borderWidth: 1,
        borderRadius: 4,
        barThickness: 16,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#ffffff',
          font: {
            size: 12
          }
        }
      },
      title: {
        display: true,
        text: 'Average Annual Rainfall by State',
        color: '#ffffff',
        font: {
          size: 16,
          weight: 'bold' as const
        }
      },
      tooltip: {
        backgroundColor: 'rgba(45, 45, 59, 0.9)',
        titleColor: '#ffffff',
        bodyColor: '#a0aec0',
        borderColor: 'rgba(149, 76, 233, 0.2)',
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
      }
    },
    scales: {
      y: {
        type: 'linear' as const,
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.05)'
        },
        border: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#a0aec0',
          callback: function(tickValue: number | string) {
            const value = typeof tickValue === 'string' ? parseFloat(tickValue) : tickValue;
            return `${value} mm`;
          }
        },
        title: {
          display: true,
          text: 'Rainfall (mm)',
          color: '#ffffff',
          font: {
            size: 12
          }
        }
      },
      x: {
        type: 'category' as const,
        grid: {
          display: false
        },
        border: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#a0aec0',
          maxRotation: 45,
          minRotation: 45
        }
      }
    }
  };

  const topWettest = data.slice(0, 5);
  const topDriest = data.slice(-5).reverse();

  return (
    <div className="space-y-6">
      <div className="bg-[#1c1c27] shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Country Rainfall Trends</h2>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-purple-500"></div>
            <span className="text-gray-400 text-sm">Historical Data</span>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="startYear" className="block text-sm font-medium text-gray-300">
                Start Year
              </label>
              <input
                type="number"
                id="startYear"
                value={startYear}
                onChange={(e) => setStartYear(parseInt(e.target.value))}
                min={1901}
                max={2015}
                required
                className="mt-1 block w-full rounded-md border-gray-600 bg-[#2d2d3b] text-white shadow-sm focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
            <div>
              <label htmlFor="endYear" className="block text-sm font-medium text-gray-300">
                End Year
              </label>
              <input
                type="number"
                id="endYear"
                value={endYear}
                onChange={(e) => setEndYear(parseInt(e.target.value))}
                min={1901}
                max={2015}
                required
                className="mt-1 block w-full rounded-md border-gray-600 bg-[#2d2d3b] text-white shadow-sm focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
          >
            Show Trends
          </button>
        </form>
      </div>

      {error && (
        <div className="p-4 bg-red-900/20 border-l-4 border-red-500">
          <p className="text-red-400">{error}</p>
        </div>
      )}

      {data.length > 0 && (
        <>
          <div className="bg-[#1c1c27] shadow-lg rounded-lg p-6">
            <div className="h-[500px]">
              <Bar data={chartData} options={chartOptions} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Top 5 Wettest States */}
            <div className="bg-[#1c1c27] shadow-lg rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Top 5 Wettest States</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-800">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">State</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Average Rainfall</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {topWettest.map((item) => (
                      <tr key={item.subdivision} className="hover:bg-[#2d2d3b] transition-colors duration-150">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{item.subdivision}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-400">{item.average_rainfall.toFixed(2)} mm</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Top 5 Driest States */}
            <div className="bg-[#1c1c27] shadow-lg rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Top 5 Driest States</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-800">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">State</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Average Rainfall</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {topDriest.map((item) => (
                      <tr key={item.subdivision} className="hover:bg-[#2d2d3b] transition-colors duration-150">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{item.subdivision}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-400">{item.average_rainfall.toFixed(2)} mm</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CountryTrendPage; 