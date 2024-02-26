import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
  const [requestData, setRequestData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/request/allrequests')
      .then(response => {
        const processedData = processRequestData(response.data);
        setRequestData(processedData);
      })
      .catch(error => console.error('Error fetching requests:', error));
  }, []);

  const processRequestData = (requests) => {
    const today = new Date();
    const datesCount = {};

    // Initialize count for the last 30 days
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      datesCount[date.toISOString().split('T')[0]] = 0;
    }

    // Count requests per day
    requests.forEach(request => {
      const requestDate = new Date(request.updatedAt).toISOString().split('T')[0];
      if (requestDate in datesCount) {
        datesCount[requestDate]++;
      }
    });

    return Object.values(datesCount);
  };

  const labels = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date.toISOString().split('T')[0];
  }).reverse();

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Number of Requests per Day',
        data: requestData,
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
