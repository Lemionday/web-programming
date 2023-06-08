import { createContext, useContext, useEffect, useRef, useState } from "react";
import { Car } from "../../components/models/Car";
import { Period } from "../../components/models/Period";
import { config } from "../../conf/config";
import { useAuth } from "../../components/hooks/useAuth";
import Statistics from "../../components/statistic/Statistics";
import CarPage from "../../components/car-information/CarInformation";
import { useParams } from "react-router-dom";

async function fetchData(token: string, id: string): Promise<Car | undefined> {
    try {
        const res = await fetch(`${config.baseUrl}/car/information/${id}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!res.ok) return;

        const data = await res.json();

        const temp = Object.assign(new Car(), data)
        // console.log(temp)
        return temp
        // return data
    }
    catch (error) {
        return;
    };
}

export default function CarInformationPage() {
    const auth = useAuth()
    const [car, setCar] = useState<Car>()

    const { id } = useParams()

    useEffect(() => {
        (async () => {
            const data = await fetchData(auth.session.token, id as string)
            if (data !== undefined) {
                setCar(data)
            }
        })()
    }, [])

    return (
        <>
            <CarPage car={car} />
        </>
    );
}