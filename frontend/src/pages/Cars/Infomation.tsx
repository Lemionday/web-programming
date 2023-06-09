import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CarPage from "../../components/car-information/CarInformation";
import { useAuth } from "../../components/hooks/useAuth";
import { Car } from "../../components/models/Car";
import { config } from "../../conf/config";

async function fetchData(token: string, plate: string): Promise<Car | undefined> {
    try {
        const res = await fetch(`${config.baseUrl}/car/information/${plate}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!res.ok) return;

        const data = await res.json();

        const temp = Object.assign(new Car(), data)
        return temp
    }
    catch (error) {
        return;
    };
}

export default function CarInformationPage() {
    const auth = useAuth()
    const [car, setCar] = useState<Car>()

    const { plate } = useParams()

    useEffect(() => {
        (async () => {
            const data = await fetchData(auth.session.token, plate as string)
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