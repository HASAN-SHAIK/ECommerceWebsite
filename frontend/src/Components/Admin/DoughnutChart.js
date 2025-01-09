import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
// Registering necessary Chart.js components and datalabels plugin
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, ChartDataLabels);



const DoughnutChart = ({ ordersUpdated }) => {
  const [pendingOrders, setPendingOrders] = useState(0);
  const [completedOrders, setCompletedOrders] = useState(0);
  const [cancelledOrders, setCancelledOrders] = useState(0);
  useEffect(() => {
    const getAllOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/order`);
        const orders = response.data;
        if (orders) {
          var pend = 0, comp = 0, cancel = 0;
          orders.map((order) => {
            if (order.status === "Pending")
              pend += 1;
            if (order.status === "Completed")
              comp += 1;
            if (order.status === "Cancelled")
              cancel += 1
          })
          setPendingOrders(pend);
          setCancelledOrders(cancel);
          setCompletedOrders(comp);
        }
      }
      catch (err) {
        console.log("Error", err);
      }
    }
    getAllOrders();
  }, [ordersUpdated]);

  const data = {
    labels: ["Cancelled", "Completed", "Pending"],
    datasets: [
      {
        data: [cancelledOrders, completedOrders, pendingOrders],
        backgroundColor: ["#e74c3c", "#2ecc71", "#3498db"],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#c8c8c8'
        }
      },
      tooltip: {
        callbacks: {
          // Customize tooltip to show percentage and value
          label: function (tooltipItem) {
            const dataIndex = tooltipItem.dataIndex;
            const value = tooltipItem.raw;
            const total = tooltipItem.dataset.data.reduce((acc, curr) => acc + curr, 0);
            const percentage = ((value / total) * 100).toFixed(1); // Calculate percentage
            return `${data.labels[dataIndex]}: ${value} (${percentage}%)`;
          },
        },
      },
      datalabels: {
        // Display value and percentage directly on the doughnut chart
        display: true,
        formatter: function (value, context) {
          const total = context.dataset.data.reduce((acc, curr) => acc + curr, 0);
          const percentage = ((value / total) * 100).toFixed(1);
          const label = context.chart.data.labels[context.dataIndex];
          return `${label}: ${percentage}%`; // Format label and percentage
        },
        color: 'white', // Text color for labels
        font: {
          // weight: 'bold',
          size: 18,
        },
        innerHeight: '20px'

      },
    },
  };
  return <Doughnut data={data} options={options} />;
};

export default DoughnutChart;