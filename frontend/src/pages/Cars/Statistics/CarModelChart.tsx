import { ChartData, ChartOptions } from 'chart.js';
import { useEffect, useRef, useState } from 'react';
import { PolarArea } from 'react-chartjs-2';
import { Car } from '../../../components/models/Car';
import { CapitalizeFirstLetter } from '../../../components/util/util';
import { useData } from './RegisteredCars';


export function CarModelChart({ T, minPercent, title }: { T: keyof Car; minPercent?: number; title: string; }) {
    const [chartData, setChartData] = useState<ChartData<'polarArea'>>({ labels: [], datasets: [] });
    const { data: cars } = useData();
    const options = useRef<ChartOptions<'polarArea'>>()

    useEffect(() => {
        options.current = {
            plugins: {
                autocolors: {
                    mode: 'data',
                    offset: Math.floor(Math.random() * 5)
                }
            }
        }

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
                data: dataValues
            }]
        });
    }, [cars]);

    return <div>
        <PolarArea options={options.current} data={chartData} />
    </div>;
}
