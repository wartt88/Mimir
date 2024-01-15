import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip
);


export const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Résumé cartes par deck',
      },
    },
  };
  
  const labels = ['Deck1', 'Deck2', 'Deck3', 'Deck4', 'Deck5', 'Deck6', 'Deck7'];
  
  export const data = {
    labels,
    datasets: [
      {
        label: 'Réussies',
        data: labels.map(() => faker.number.int({min:0,max:1000})),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Echouées',
        data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  
  export default function BarChart():JSX.Element {

    return (
        <Bar data={data} options={options}/>
    );
  }