import { Accordion, AccordionBody, AccordionHeader, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useAuth } from "../../../components/hooks/useAuth";
import { Car } from "../../../components/models/Car";
import { CapitalizeFirstLetter } from "../../../components/util/util";
import { CarInfomation, FetchCarInformation } from "../CarInfomation";

export default function CarsListTable({ carsList: carsList }: { carsList: string[] }) {
    const [cars, setCars] = useState<Car[]>([])
    const auth = useAuth()
    const [open, setOpen] = useState(0);

    const handleOpen = (value: number) => {
        setOpen(open === value ? 0 : value);
    };

    useEffect(() => {
        (async function () {
            const temp = Array<Car>()

            for (const car_plate of carsList) {
                temp.push(await FetchCarInformation(auth.session.token, car_plate));
            }

            setCars(temp)
        })()
    }, [carsList])

    return (
        <div>
            <Typography variant="h3">Danh sách xe thuộc quyền sở hữu</Typography>

            {cars.map(function (car, idx) {
                return (
                    <Accordion open={open === idx + 1} key={idx + 1}>
                        <AccordionHeader onClick={() => handleOpen(idx + 1)}>
                            {`${car.plate} ${CapitalizeFirstLetter(car.manufacturer)} ${CapitalizeFirstLetter(car.model)}`}
                        </AccordionHeader>
                        <AccordionBody>
                            <CarInfomation plate={car.plate!} />
                        </AccordionBody>
                    </Accordion>
                )
            })}
        </div>
    )
}