import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import {weedData} from "../../data/mainData" 


import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};


const MonthCount = {
  Jan: 0,
  Feb: 0,
  Mar: 0,
  Apr: 0,
  May: 0,
  Jun: 0,
  Jul: 0,
  Aug: 0,
  Sep: 0,
  Oct: 0,
  Nov: 0,
  Dec: 0
};

const MonthsInd = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]


weedData.forEach((item) => {
  const month = item.Month-1;
  MonthCount[MonthsInd[month]]++;
});

const data = {
  labels: Object.keys(MonthCount), 
  datasets: [
    {
      label: "Weed Count per Month",
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
      fill: true,
      data: Object.values(MonthCount),
    },
  ],
};

const LineChart = () => {
  return (
    <div>
      <Line data={data} options={{ responsive: true }} />
    </div>
  );
};

export default LineChart;
