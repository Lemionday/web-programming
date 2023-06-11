import { ArcElement, Chart, ChartData, Chart as ChartJS, ChartOptions, Colors, Legend, RadialLinearScale, Tooltip } from 'chart.js';
import { useEffect, useState } from 'react';
import { PolarArea } from 'react-chartjs-2';
import { Car } from '../../../components/models/Car';
import { CapitalizeFirstLetter } from '../../../components/util/util';
import { useData } from './RegisteredCars';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);
Chart.register(Colors);

const options: ChartOptions<'polarArea'> = {
    plugins: {
        colors: {
            enabled: true
        }
        // autocolors: {
        //     mode: 'dataset',
        //     offset: Math.floor(Math.random() * 3)
        // }
    }
}

export function CarModelChart({ T, minPercent, title }: { T: keyof Car; minPercent?: number; title: string; }) {
    const [chartData, setChartData] = useState<ChartData<'polarArea'>>({ labels: [], datasets: [] });
    const { data: cars } = useData();

    useEffect(() => {
        const data = new Map<string, number>();
        if (minPercent === undefined) {
            minPercent = 0;
        }

        cars.forEach(function (car) {
            const prop = car[T]! as string;
            if (!data.has(prop)) {
                data.set(prop, 0);
            }

            data.set(prop, data.get(prop)! + 1);
        });

        const labels = [];
        let others = 0;
        const dataValues = [];

        data.forEach((numOfCars, prop) => {
            if (numOfCars / cars.length >= minPercent!) {
                labels.push(CapitalizeFirstLetter(prop));
                dataValues.push(numOfCars);
            } else {
                others += numOfCars;
            }
        });

        if (minPercent !== 0) {
            labels.push("Khác");
            dataValues.push(others);
        }

        setChartData({
            labels: labels,
            datasets: [{
                label: title,
                data: dataValues,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                    'rgba(255, 159, 64, 0.5)',
                ],
            }]
        });
    }, [cars]);

    return <div>
        <PolarArea options={options} data={chartData} />
    </div>;
}
