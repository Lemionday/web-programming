import {
    ArcElement,
    CategoryScale,
    ChartData,
    Chart as ChartJS,
    ChartOptions,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    RadialLinearScale,
    Title,
    Tooltip,
} from 'chart.js';
import autocolors from 'chartjs-plugin-autocolors';
import { useEffect, useRef, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Car } from '../../../components/models/Car';
import { Period } from '../../../components/models/Period';
import { useData } from './RegisteredCars';

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

function MonthChart(cars: Car[], K: keyof Car) {
    const chartData: ChartData<'line'> = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: []
    }

    const data = new Map<number, Array<number>>()
    let yearsInData = new Array<number>()

    cars.forEach(car => {
        const registrationDate = new Date(car[K]! as string);
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
        })
    })

    return [{
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: "Số lượng xe đăng kiểm từng tháng qua các năm"
            },
            autocolors: {
                offset: Math.floor(Math.random() * 5)
            }
        }
    }, chartData] as const
}

function QuarterChart(cars: Car[], K: keyof Car) {
    const chartData: ChartData<'line'> = {
        labels: ['Quý 1', 'Quý 2', 'Quý 3', 'Quý 4'],
        datasets: []
    }

    const data = new Map<number, Array<number>>()
    let yearsInData = new Array<number>()

    cars.forEach(car => {
        const registrationDate = new Date(car[K]! as string);
        const registrationMonth = registrationDate.getMonth();
        const registrationYear = registrationDate.getFullYear();

        if (!data.has(registrationYear)) {
            data.set(registrationYear, new Array<number>(4).fill(0))
            yearsInData.push(registrationYear)
        }

        const monthsArr = data.get(registrationYear)!
        monthsArr[Math.floor(registrationMonth / 3)] += 1
    });

    yearsInData = yearsInData.sort((a, b) => a - b)

    yearsInData.forEach(function (year) {
        chartData.datasets.push({
            label: String(year),
            data: data.get(year)!,
        })
    })

    return [{
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: "Số lượng xe đăng kiểm từng quý qua các năm"
            },
            autocolors: {
                offset: Math.floor(Math.random() * 5)
            }
        }
    }, chartData] as const
}

function YearChart(cars: Car[], K: keyof Car) {
    const years: number[] = [];
    const carQuantityByYear = new Map<number, number>();

    cars.forEach((car) => {
        const registrationDate = new Date(car[K]! as string);
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
            },
            autocolors: {
                offset: Math.floor(Math.random() * 5)
            }
        }
    }, chartData] as const
}

function Statistics({ type, K }: { type: Period, K: keyof Car }) {
    const [chartData, setChartData] = useState<ChartData<'line'>>()
    const options = useRef<ChartOptions<'line'>>()
    const { data: cars } = useData()

    useEffect(() => {
        if (type === Period.Month) {
            const [o, d] = MonthChart(cars, K)
            options.current = o
            setChartData(d)
        } else if (type === Period.Quarter) {
            const [o, d] = QuarterChart(cars, K)
            options.current = o
            setChartData(d)
        }
        else if (type === Period.Year) {
            const [o, d] = YearChart(cars, K)
            options.current = o
            setChartData(d)
        }
    }, [cars])


    if (chartData !== undefined) return <> <Line options={options.current} data={chartData} /> </>;
    else return <></>;
}

export default Statistics;