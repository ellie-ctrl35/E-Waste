import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
  // Generate labels for 30 days
  const labels = Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`);

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Dataset for 30 days',
        data: labels.map(() => Math.floor(Math.random() * 100)), // Random data for demonstration
        backgroundColor: '#179A72',
        borderColor: 'rgba(53, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true
      }
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;
