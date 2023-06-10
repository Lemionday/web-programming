import { createContext, useContext, useEffect, useRef, useState } from "react";
import { Car } from "../../../components/models/Car";
import { Period } from "../../../components/models/Period";
import { config } from "../../../conf/config";
import { useAuth } from "../../../components/hooks/useAuth";
import Statistics from "./RegisteredCharts";
import { CarModelChart } from './CarModelChart';
import CarsListPage from "../AllCarsList";
import { Typography } from "@material-tailwind/react";
import { Role } from "../../../components/models/Session";

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
        const toReturn: Car[] = []
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
    }
}

interface DataContext {
    data: Car[]
    setData: React.Dispatch<React.SetStateAction<Car[]>>
    carsSortByInvalidatedDate: Car[]
}

const dataContext = createContext<DataContext>(null!)

export function DataProvider({ children }: { children: React.ReactNode }) {
    const auth = useAuth()
    const [cars, setCars] = useState<Car[]>(() => [])
    const [carsSortByInvalidatedDate, setCarsSortByInvalidatedDate] = useState<Car[]>(() => [])

    useEffect(() => {
        (async () => {
            let center = "main"
            if (auth.session.account?.role === Role.UserFromRegistryCenter) {
                center = auth.session.account.center!
            }
            const data = await fetchData(auth.session.token, Period.All, center)
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
                Thống kê xe đăng kiểm qua từng năm
            </Typography>
            <DataProvider >
                <div className="flex flex-col items-center justify-center w-full">
                    <div className="w-3/4">
                        <Statistics type={Period.Month} K={"least_recently_registered"} />
                    </div>
                    <div className="w-3/4">
                        <Statistics type={Period.Quarter} K={"least_recently_registered"} />
                    </div>
                    <div className="w-3/4">
                        <Statistics type={Period.Year} K={"least_recently_registered"} />
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
            </DataProvider>
        </div >
    )
}