import React, { useEffect, useState } from 'react';
import { ChartData } from 'chart.js';
import { PolarArea } from 'react-chartjs-2';
import { Car } from '../../../components/models/Car';
import { useData } from './Main';
import { capitalizeFirstLetter } from '../../../components/util/util';


export function CarModelChart({ T, minPercent, title }: { T: keyof Car; minPercent?: number; title: string; }) {
    const [chartData, setChartData] = useState<ChartData<'polarArea'>>({ labels: [], datasets: [] });
    const { data: cars } = useData();

    useEffect(() => {
        let data = new Map<string, number>();
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

        // data = new Map([...data].sort((a, b) => a[1] - b[1]))
        const labels = [];
        let others = 0;
        const dataValues = [];

        data.forEach((numOfCars, prop) => {
            if (numOfCars / cars.length > minPercent!) {
                labels.push(capitalizeFirstLetter(prop));
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
        <PolarArea options={{
            plugins: {
                autocolors: {
                    mode: 'data'
                }
            }
        }} data={chartData} />
    </div>;
}
