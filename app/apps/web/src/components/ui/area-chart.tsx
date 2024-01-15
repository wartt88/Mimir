import { Line } from "react-chartjs-2";
import { faker } from '@faker-js/faker';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Title,
    Filler,
    Legend
  );

export default function AreaChart():JSX.Element {

    const options = {
        responsive: true,
        plugins: {
          legend: {
            display: false, // Masque la légende
          },
          title: {
            display: true,
            text: "Réussite quotidienne moyenne",
          },
        },
      };
    
      const labels = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
      ];
    
      const data = {
        labels,
        datasets: [
          {
            fill: true,
            label: "Dataset 2",
            data: labels.map(() => faker.number.int({min:0,max:1000})),
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235, 0.5)",
          },
        ],
      };

    return(
        <Line className="h-full w-full" data={data} options={options} />
    );
}