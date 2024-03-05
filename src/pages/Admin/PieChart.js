import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import moment from 'moment';

Chart.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/request/allrequests') // Adjust this to your endpoint
      .then(response => {
        const processedData = processMonthlyData(response.data);
        setMonthlyData(processedData);
      })
      .catch(error => console.error('Error fetching requests:', error));
  }, []);

  // Function to process data for monthly count
  const processMonthlyData = (data) => {
    const months = [...Array(12)].map((_, i) => moment().month(i).format('MMMM'));
    const monthlyCount = months.map(month => {
      return data.filter(request => 
        moment(request.createdAt).format('MMMM') === month
      ).length;
    });
    return monthlyCount;
  };

  const data = {
    labels: [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ],
    datasets: [
      {
        label: 'Monthly Requests',
        data: monthlyData,
        backgroundColor: [
          // Add colors for each month
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', 
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'
        ],
        hoverBackgroundColor: [
          // Slightly darker colors for hover state
        ]
      }
    ]
  };

  return <Doughnut data={data} />;
};

export default DoughnutChart;
