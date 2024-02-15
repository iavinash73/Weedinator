// ./components/PieChart.js

import React from "react"; // Import the necessary library such as React for now.
import {weedData} from "../../data/mainData" 


import Chart from "chart.js/auto"; // Import the Chart.js library.

import { Doughnut } from "react-chartjs-2"; // In the react-chartjs-2 library, import the Pie component.

// Define an array of labels.
const labels  = [
  'Parthenium (Parthenium hysterophorus)',
  'Senna (Cassia spp.)',
  'Convolvulus (Convolvulus arvensis)',
  'Echinochloa (Echinochloa spp.)',
  'Amaranthus (Amaranthus spp.)',
  'Chenopodium (Chenopodium album)',
  'Lantana (Lantana camara)',
  'Eupatorium (Eupatorium adenophorum)',
  'Imperata (Imperata cylindrica)',
  'Jatropha (Jatropha curcas)'
]

const dataCount = {
  'Parthenium (Parthenium hysterophorus)': 0,
  'Senna (Cassia spp.)': 0,
  'Convolvulus (Convolvulus arvensis)': 0,
  'Echinochloa (Echinochloa spp.)': 0,
  'Amaranthus (Amaranthus spp.)': 0,
  'Chenopodium (Chenopodium album)': 0,
  'Lantana (Lantana camara)': 0,
  'Eupatorium (Eupatorium adenophorum)': 0,
  'Imperata (Imperata cylindrica)': 0,
  'Jatropha (Jatropha curcas)' : 0
}

weedData.forEach((item) => {
  const type = item["Weed Type"];
  dataCount[type]++;
});



// Defined an object.
const data = {
  labels: labels,
  datasets: [
    {
      label: "Weed Count",
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
      data: Object.values(dataCount),
    },
  ],
};

/**
 * Define a functional component named PieChart
 * that returns a Pie component from react-chartjs-2,
 */
const PieChart = () => {
  return (
    <div>
      <Doughnut data={data} />
    </div>
  );
};

// PieChart component is exported as default module.
export default PieChart;
