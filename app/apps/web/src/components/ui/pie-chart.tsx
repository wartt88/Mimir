import { faker } from '@faker-js/faker';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);



export default function PieChart():JSX.Element {

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom' as const,
            },
            title: {
                display: true,
                text: "Difficultés des cartes réussies",
            },
        },
      };

      const labels = ['Débutant', 'Modéré', 'Intermédiaire', 'avancé', 'expert', 'maître'];

      const data = {
        labels,
        datasets: [
          {
            label: 'nombre',
            data: labels.map(() => faker.number.int({min:0,max:100})),
            backgroundColor: [
              'rgba(47, 207, 0, 0.4)',
              'rgba(202, 209, 0, 0.4)',
              'rgba(209, 161, 0, 0.4)',
              'rgba(209, 0, 0, 0.4)',
              'rgba(120, 0, 209, 0.4)',
              'rgba(0, 0, 0, 0.4)',
            ],
            borderColor: [
                'rgba(47, 207, 0, 1)',
                'rgba(202, 209, 0, 1)',
                'rgba(209, 161, 0, 1)',
                'rgba(209, 0, 0, 1)',
                'rgba(120, 0, 209, 1)',
                'rgba(0, 0, 0, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };
      

    return(
        <div className="size-full flex flex-col justify-around items-center p-[3%]">
            <Pie data={data} options={options} />
        </div>
    );
}