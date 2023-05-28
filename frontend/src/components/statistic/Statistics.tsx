import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartData,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Period } from '../models/Period';
import { Car } from '../models/Car';
import { useData } from '../../pages/Cars/Statistics';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    scales: {
        y: {
            // beginAtZero: true
        }
    }
}

function MonthChart(cars: Car[]): [string[], number[]] {
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const data = Array(12).fill(0);

    cars.forEach(car => {
        if (car.least_recently_registered !== undefined) {
            const registrationDate = new Date(car.least_recently_registered);
            const registrationMonth = registrationDate.getMonth();
            const registrationYear = registrationDate.getFullYear();

            if (registrationYear === 2022) {
                data[registrationMonth] += 1;
            }
        }
    });


    return [labels, data]
}

function QuarterChart(cars: Car[]): [string[], number[]] {
    const labels = ['Quý 1', 'Quý 2', 'Quý 3', 'Quý 4'];
    const data = Array(4).fill(0);

    cars.forEach(car => {
        if (car.least_recently_registered !== undefined) {
            const registrationDate = new Date(car.least_recently_registered);
            const registrationMonth = registrationDate.getMonth();
            const registrationYear = registrationDate.getFullYear();
            const registrationQuarter = Math.floor(registrationMonth / 3);

            if (registrationYear === 2022) {
                data[registrationQuarter] += 1;
            }
        }
    });

    return [labels, data]
}

function YearChart(cars: Car[]): [string[], number[]] {
    const carQuantityByYear = new Map<number, number>;
    const years: number[] = [];

    cars.forEach((car) => {
        if (car.least_recently_registered !== undefined) {
            const registrationDate = new Date(car.least_recently_registered);
            const registrationYear = registrationDate.getFullYear();

            if (carQuantityByYear.has(registrationYear)) {
                const current_val = carQuantityByYear.get(registrationYear)
                if (current_val !== undefined) {
                    carQuantityByYear.set(registrationYear, current_val + 1);
                }
            } else {
                carQuantityByYear.set(registrationYear, 1);
                years.push(registrationYear);
            }
        }
    });

    years.sort((a, b) => a - b); // Sort years in ascending order

    const data = years.map((year) => {
        const temp = carQuantityByYear.get(year)
        if (temp === undefined) return 0
        else return temp
    });
    return [years.map(String), data]
}

function Statistics({ type }: { type: Period }) {
    const [chartData, setChartData] = useState<ChartData<'line'>>()
    const { data: cars } = useData()

    useEffect(() => {
        let data: number[] = []
        let labels: string[] = []
        switch (type) {
            case Period.Month:
                [labels, data] = MonthChart(cars)
                break
            case Period.Quarter:
                [labels, data] = QuarterChart(cars)
                break
            case Period.Year:
                [labels, data] = YearChart(cars)
                break
        }

        setChartData({
            labels: labels,
            datasets: [{
                label: 'số lượng xe đăng ký',
                data: data,
                backgroundColor: 'rgba(0, 123, 255, 0.5)',
                borderColor: 'rgba(0, 123, 255, 1)',
                borderWidth: 1
            }]
        })
    }, [cars])


    if (chartData !== undefined) {
        return <>
            <Line options={options} data={chartData} />
        </>;
    } else {
        return <></>;
    }
}

export default Statistics;