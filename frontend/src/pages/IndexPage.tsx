import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
  Filler,
  Scale,
  ScaleOptionsByType,
  CartesianScaleTypeRegistry
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

const IndexPage: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // More realistic sample data for the chart
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: '2023 Rainfall (mm)',
        data: [120, 135, 95, 80, 65, 45, 35, 40, 75, 90, 110, 125],
        fill: true,
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        tension: 0.4,
        pointBackgroundColor: 'rgb(99, 102, 241)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(99, 102, 241)',
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: '2022 Rainfall (mm)',
        data: [115, 125, 90, 75, 60, 40, 30, 35, 70, 85, 105, 120],
        fill: false,
        borderColor: 'rgba(99, 102, 241, 0.5)',
        borderDash: [5, 5],
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 5,
      },
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
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#1f2937',
        bodyColor: '#4b5563',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
      },
    },
    scales: {
      y: {
        type: 'linear' as const,
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          callback: function(tickValue: number | string) {
            return `${tickValue}mm`;
          },
        },
      },
      x: {
        type: 'category' as const,
        grid: {
          display: false,
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
  };

  const stats = [
    { title: 'Total Predictions', value: '158', progress: 70 },
    { title: 'Accuracy Rate', value: '92%', progress: 92 },
    { title: 'Countries Analyzed', value: '25', progress: 50 },
  ];

  const quickActions = [
    {
      to: '/predict',
      title: 'Predict Rainfall',
      description: 'Get accurate rainfall predictions for any location using our advanced ML model.',
      icon: '🌧️',
    },
    {
      to: '/country-trend',
      title: 'View Country Trends',
      description: 'Analyze historical rainfall patterns and trends across different countries.',
      icon: '📊',
    },
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="bg-white rounded-lg shadow p-6 transform transition-all duration-200 hover:scale-105"
          >
            <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
            <p className="text-3xl font-bold text-indigo-600 mt-2">{stat.value}</p>
            <div className="flex items-center mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${stat.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Global Rainfall Trends</h2>
        <div className="h-[400px]">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quickActions.map((action) => (
          <Link
            key={action.title}
            to={action.to}
            className={`bg-white rounded-lg shadow p-6 transform transition-all duration-200 
              ${hoveredCard === action.title ? 'bg-indigo-50 scale-105' : 'hover:bg-indigo-50'}`}
            onMouseEnter={() => setHoveredCard(action.title)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="flex items-center">
              <span className="text-2xl mr-3">{action.icon}</span>
              <div>
                <h3 className="text-lg font-semibold text-indigo-600">{action.title}</h3>
                <p className="text-gray-600 mt-2">{action.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default IndexPage; 