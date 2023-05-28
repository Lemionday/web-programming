import { createContext, useContext, useEffect, useRef, useState } from "react";
import { Car } from "../../components/models/Car";
import { Period } from "../../components/models/Period";
import { config } from "../../conf/config";
import { useAuth } from "../../components/hooks/useAuth";
import Statistics from "../../components/statistic/Statistics";

async function fetchData(token: string, period: Period, center: string): Promise<Car[]> {
    try {
        const res = await fetch(`${config.baseUrl}/cars/statistics?` + new URLSearchParams({
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
            toReturn.push(Object.assign(new Car(), car))
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
}

let dataContext = createContext<DataContext>(null!)

function DataProvider({ children }: { children: React.ReactNode }) {
    const auth = useAuth()
    const [cars, setCars] = useState<Car[]>(() => [])

    useEffect(() => {
        (async () => {
            const data = await fetchData(auth.session.token, Period.Year, "main")
            setCars(data)
            // console.log(data)
            // setCars(data)
        })()
    }, [])

    const value: DataContext = {
        data: cars,
        setData: setCars
    };
    // (async () => {
    //     const data = await fetchData(auth.session.token, Period.Year, "main")
    //     setCars(data)
    //     console.log(data)
    //     // setCars(data)
    // })()
    return <dataContext.Provider value={value}>{children}</dataContext.Provider>;
}

export function useData() {
    return useContext(dataContext)
}

export default function CarsStatisticsPage() {
    // const [cars, setCars] = useState<Car[]>(() => [])
    // const cars = useRef<Car[]>([])
    // const auth = useAuth()
    // const { data, setData } = useData()
    return (
        <DataProvider >
            <Statistics type={Period.Month} />
            <Statistics type={Period.Quarter} />
            <Statistics type={Period.Year} />
        </DataProvider>
    )
}