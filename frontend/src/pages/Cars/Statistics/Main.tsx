import { createContext, useContext, useEffect, useRef, useState } from "react";
import { Car } from "../../../components/models/Car";
import { Period } from "../../../components/models/Period";
import { config } from "../../../conf/config";
import { useAuth } from "../../../components/hooks/useAuth";
import Statistics from "./RegisteredCharts";
import { CarModelChart } from './CarModelChart';
import DaysLeftUntilInvalidatedTable from "./DaysLeftUntilInvalidatedTable";
import { Typography } from "@material-tailwind/react";

async function fetchData(token: string, period: Period, center: string): Promise<Car[]> {
    try {
        const res = await fetch(`${config.baseUrl}/car/statistics?` + new URLSearchParams({
            period: period,
            center: center,
        }), {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!res.ok) return [];

        const data = await res.json();
        let toReturn: Car[] = []
        data.forEach((car: any) => {
            const newCar: Car = Object.assign(new Car(), car)
            if (newCar.invalidate_date !== undefined)
                newCar.invalidate_date = new Date(newCar.invalidate_date)

            if (newCar.least_recently_registered !== undefined)
                newCar.least_recently_registered = new Date(newCar.least_recently_registered)

            toReturn.push(newCar)
        })

        return toReturn
    }
    catch (error) {
        return [];
    };
}

interface DataContext {
    data: Car[]
    setData: React.Dispatch<React.SetStateAction<Car[]>>
    carsSortByInvalidatedDate: Car[]
}

let dataContext = createContext<DataContext>(null!)

function DataProvider({ children }: { children: React.ReactNode }) {
    const auth = useAuth()
    const [cars, setCars] = useState<Car[]>(() => [])
    const [carsSortByInvalidatedDate, setCarsSortByInvalidatedDate] = useState<Car[]>(() => [])

    useEffect(() => {
        (async () => {
            const data = await fetchData(auth.session.token, Period.Year, "main")
            setCars(data)

            function sortByInvalidatedDate(a: Car, b: Car): number {
                if (a.invalidate_date === undefined || b.invalidate_date === undefined) {
                    return 0
                }

                return Number(a.invalidate_date) - Number(b.invalidate_date)
            }
            const sorted = data.sort(sortByInvalidatedDate)
            setCarsSortByInvalidatedDate(sorted)
        })()
    }, [])

    const value: DataContext = {
        data: cars,
        setData: setCars,
        carsSortByInvalidatedDate: carsSortByInvalidatedDate
    };

    return <dataContext.Provider value={value}>{children}</dataContext.Provider>;
}

export function useData() {
    return useContext(dataContext)
}

export default function CarsStatisticsPage() {
    return (
        <div className="flex flex-col justify-between items-center w-full">
            <Typography variant="h2">
                Thống kê xe
            </Typography>
            <DataProvider >
                <div className="flex items-center justify-center w-11/12">
                    <div className="flex-1">
                        <Statistics type={Period.Month} />
                    </div>
                    <div className="flex-1">
                        <Statistics type={Period.Year} />
                    </div>
                </div>
                <div className="flex justify-center items-center w-11/12 mt-10">
                    <div className="w-1/2">
                        <CarModelChart
                            T={"manufacturer"}
                            title="Thị phần các nhà sản xuất"
                            minPercent={0.04} />
                    </div>
                    <div className="w-1/2">
                        <CarModelChart
                            T={"carbody"}
                            title="Mẫu xe thịnh hành trên thị trường"
                        />
                    </div>
                </div>
                <DaysLeftUntilInvalidatedTable />
                {/* <Statistics type={Period.Quarter} /> */}
            </DataProvider>
        </div >
    )
}