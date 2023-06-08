import React, { useEffect, useRef, useState } from 'react';
import autocolors from 'chartjs-plugin-autocolors';
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
    ArcElement,
    RadialLinearScale,
    ChartOptions,
} from 'chart.js';
import { Line, Pie, PolarArea } from 'react-chartjs-2';
import { Period } from '../models/Period';
import { Car } from '../models/Car';
import { useData } from '../../pages/Cars/Statistics';
import { capitalizeFirstLetter } from '../util/util';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    RadialLinearScale,
    autocolors,
);

export function CarModelChart({ T, minPercent, title }: { T: keyof Car, minPercent?: number, title: string }) {
    const [chartData, setChartData] = useState<ChartData<'polarArea'>>({ labels: [], datasets: [] })
    const { data: cars } = useData()

    useEffect(() => {
        let data = new Map<string, number>()
        if (minPercent === undefined) {
            minPercent = 0
        }

        cars.forEach(function (car) {
            const prop = car[T]! as string
            if (!data.has(prop)) {
                data.set(prop, 0)
            }

            data.set(prop, data.get(prop)! + 1)
        })

        // data = new Map([...data].sort((a, b) => a[1] - b[1]))

        const labels = []
        let others = 0
        const dataValues = []

        data.forEach((numOfCars, prop) => {
            if (numOfCars / cars.length > minPercent!) {
                labels.push(capitalizeFirstLetter(prop))
                dataValues.push(numOfCars)
            } else {
                others += numOfCars
            }
        })

        if (minPercent !== 0) {
            labels.push("Khác")
            dataValues.push(others)
        }

        setChartData({
            labels: labels,
            datasets: [{
                label: title,
                data: dataValues
            }]
        })
    }, [cars])

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

function MonthChart(cars: Car[]) {
    const chartData: ChartData<'line'> = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: []
    }

    const data = new Map<number, Array<number>>()
    let yearsInData = new Array<number>()

    cars.forEach(car => {
        const registrationDate = new Date(car.least_recently_registered!);
        const registrationMonth = registrationDate.getMonth();
        const registrationYear = registrationDate.getFullYear();

        if (!data.has(registrationYear)) {
            data.set(registrationYear, new Array<number>(12).fill(0))
            yearsInData.push(registrationYear)
        }

        const monthsArr = data.get(registrationYear)!
        monthsArr[registrationMonth] += 1
    });

    yearsInData = yearsInData.sort((a, b) => a - b)

    yearsInData.forEach(function (year) {
        chartData.datasets.push({
            label: String(year),
            data: data.get(year)!,
            // borderWidth: 1
        })
    })

    // console.log(data)
    // console.log(chartData)
    return [{
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: "Số lượng xe đăng kiểm từng tháng qua các năm"
            }
        }
    }, chartData] as const
}

// function QuarterChart(cars: Car[]): ChartData<'line'> {
//     const chartData: ChartData<'line'> = {
//         labels: ['Quý 1', 'Quý 2', 'Quý 3', 'Quý 4'],
//         datasets: []
//     }
//     const data = Array(4).fill(0);

//     cars.forEach(car => {
//         if (car.least_recently_registered !== undefined) {
//             const registrationDate = new Date(car.least_recently_registered);
//             const registrationMonth = registrationDate.getMonth();
//             const registrationYear = registrationDate.getFullYear();
//             const registrationQuarter = Math.floor(registrationMonth / 3);

//             if (registrationYear === 2022) {
//                 data[registrationQuarter] += 1;
//             }
//         }
//     });

//     return [labels, data]
// }

function YearChart(cars: Car[]) {
    const years: number[] = [];
    const carQuantityByYear = new Map<number, number>();

    cars.forEach((car) => {
        const registrationDate = new Date(car.least_recently_registered!);
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
    });

    const chartData: ChartData<'line'> = {
        labels: years.sort((a, b) => a - b), // Sort years in ascending order
        datasets: [{
            label: 'số lượng xe đăng ký',
            data: years.map((year) => {
                const temp = carQuantityByYear.get(year)
                if (temp === undefined) return 0
                else return temp
            }),
            borderWidth: 1,
            tension: 0.1
        }]
    }

    return [{
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: "Số lượng xe đăng kiểm từng năm"
            }
        }
    }, chartData] as const
}

function Statistics({ type }: { type: Period }) {
    const [chartData, setChartData] = useState<ChartData<'line'>>()
    const [options, setOptions] = useState<ChartOptions<'line'>>()
    const { data: cars } = useData()

    useEffect(() => {
        if (type === Period.Month) {
            const [o, d] = MonthChart(cars)
            setOptions(o)
            setChartData(d)
        }
        else if (type === Period.Year) {
            const [o, d] = YearChart(cars)
            setOptions(o)
            setChartData(d)
        }
        // case Period.Quarter:
        //     [labels, data] = QuarterChart(cars)
        //     break
    }, [cars])


    if (chartData !== undefined) return <> <Line options={options} data={chartData} /> </>;
    else return <></>;
}

export default Statistics;