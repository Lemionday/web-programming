import { Card, CardBody, CardFooter, CardHeader, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../components/hooks/useAuth";
import { config } from "../../../conf/config";
import CarsListTable from "./CarList";
import OwnerIsCompanyProfile from "./Company";
import OwnerIsPersonProfile from "./Person";

export default function OwnerProfile() {
    const { ownerId } = useParams()
    const auth = useAuth()
    const [owner, setOwner] = useState()
    const [carsList, setCarsList] = useState<Array<string>>([])

    useEffect(() => {
        (async function () {
            const res = await fetch(`${config.protectedUrl}/owner/${ownerId}`, {
                headers: {
                    "Authorization": `Bearer ${auth.session.token}`,
                },
            });

            const data = await res.json();
            setCarsList(data.cars_list)
            setOwner(data)
        })()
    }, [])

    return (
        <Card>
            <CardHeader shadow={false} className="my-4 mx-4 flex justify-between items-center text-center">
                <Typography variant="h1" color="blue" textGradient>
                    Thông tin chủ sở hữu
                </Typography>
            </CardHeader>
            <CardBody>
                {owner !== undefined && (
                    (ownerId!).startsWith("c") ?
                        <OwnerIsCompanyProfile owner={owner} /> :
                        <OwnerIsPersonProfile owner={owner} />
                )}
            </CardBody>
            <CardFooter>
                <CarsListTable carsList={carsList} />
            </CardFooter>
        </Card>
    )
}