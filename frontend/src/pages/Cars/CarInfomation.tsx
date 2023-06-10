import { UserCircleIcon } from "@heroicons/react/24/outline";
import { Button, Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";
import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../components/hooks/useAuth";
import { Car } from "../../components/models/Car";
import { CapitalizeFirstLetter, FormatDateToString } from "../../components/util/util";
import { config } from "../../conf/config";

export async function FetchCarInformation(token: string, plate: string): Promise<Car> {
    const res = await fetch(`${config.baseUrl}/car/information/${plate}`, {
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });

    if (!res.ok) return new Car();

    const data = await res.json();
    return Object.assign(new Car(), data)
}

export function CarInfomation({ plate, setOwnerId }: { plate: string, setOwnerId?: React.Dispatch<React.SetStateAction<string>> }) {
    const auth = useAuth()
    const [vehicle, setVehicle] = useState<Row[]>()
    const [specification, setSpecification] = useState<Row[]>()
    const [centerRegistered, setcenterRegistered] = useState<Row[]>()

    useEffect(() => {
        (async () => {
            const data = await FetchCarInformation(auth.session.token, plate as string)
            if (data !== undefined) {
                if (setOwnerId !== undefined) setOwnerId(data.owner_id!)

                setVehicle([
                    ["Biển đăng ký", "Registration Number", data.plate],
                    ["Thân xe", "Carbody", CapitalizeFirstLetter(data.carbody)],
                    ["Nhẫn hiệu", "Mark", CapitalizeFirstLetter(data.manufacturer)],
                    ["Phiên bản", "Model", CapitalizeFirstLetter(data.model)],
                    ["Số máy", "Engine Number", data.engine_number],
                    ["Số khung", "Chassis Number", data.vin],
                    ["Mục đích sử dụng", "Usage", data.usage]
                ])

                setSpecification([
                    ["Công thức bánh xe", "Wheel Formula", "4x4"],
                    ["Kích thước bao", "Overall Dimension", data.size!.join("x") + " (mm)"],
                    ["Kích thước lòng thùng xe", "Inside cargo container dimension", "(mm)"],
                    ["Chiều dài cơ sở", "Wheelbase", data.wheel_base + " (mm)"],
                    ["Khối lượng bản thân", "Kerb mass", data.curb_weight + " (kg)"],
                    ["Loại nhiên liệu", "Type of Fuel Used", data.fueltype],
                    ["Công suất lớn nhất/tốc độ quay", "Max, output/rpm", `${data.horse_power} (Mã lực/horse power)/${data.peak_rpm}vp`],
                    ["Số sê-ri", "No.", data.register_number],
                    // ["Số phiếu kiểm định", "Inspection Report No.", data.register_number
                ])

                setcenterRegistered([
                    ["Đăng kiểm tại trung tâm", "Registration Center", data.center_registered],
                    ["Lần đăng kiểm gần nhất", "Least Recently Registered Date", FormatDateToString(new Date(data.least_recently_registered!))],
                    ["Ngày hết hạn đăng kiểm", "Valid Until", FormatDateToString(new Date(data.invalidate_date!))]
                ])
            }
        })()
    }, [])

    return (
        <div className="flex flex-col">
            <Typography variant="h4">I. Thông tin xe (VEHICLE)</Typography>
            <div className="grid grid-cols-2 gap-4">
                {vehicle?.map(function (spec) {
                    return (
                        <Fragment key={spec[1]}>
                            <div className="flex" key={spec[1]}>
                                <Typography variant="h6">{spec[0] + ": "}</Typography>
                                <Typography className="italic">({spec[1]})</Typography>
                            </div>
                            <Typography>{spec[2]}</Typography>
                        </Fragment>
                    )
                })}
            </div>

            <Typography variant="h4" className="mt-8">II. Thông số kỹ thuật (SPECIFICATION)</Typography>
            <div className="grid grid-cols-2 gap-4">
                {specification?.map(function (spec) {
                    return (
                        <Fragment key={spec[1]}>
                            <div className="flex" key={spec[1]}>
                                <Typography variant="h6">{spec[0] + ": "}</Typography>
                                <Typography className="italic">({spec[1]})</Typography>
                            </div>
                            <Typography>{spec[2]}</Typography>
                        </Fragment>
                    )
                })}
            </div>

            <Typography variant="h4" className="mt-8">III. Thông tin đăng kiểm (REGISTRY)</Typography>
            <div className="grid grid-cols-2 gap-4">
                {centerRegistered?.map(function (spec) {
                    return (
                        <Fragment key={spec[1]}>
                            <div className="flex" key={spec[1]}>
                                <Typography variant="h6">{spec[0] + ": "}</Typography>
                                <Typography className="italic">({spec[1]})</Typography>
                            </div>
                            <Typography>{spec[2]}</Typography>
                        </Fragment>
                    )
                })}
            </div>
        </div>
    )
}

// header, engHeader, conten
type Row = [string, string, string | number | undefined]

export default function CarInformationPage() {
    const { plate } = useParams()
    const [ownerId, setOwnerId] = useState("")
    const navigate = useNavigate()

    return (
        <Card className="w-full h-full">
            <CardHeader shadow={false} className="my-4 mx-4 flex justify-between items-center text-center">
                <Typography variant="h1" color="blue" textGradient>
                    Thông tin đăng kiểm xe
                </Typography>
                <Button variant="outlined"
                    className="flex items-center gap-3"
                    onClick={() => { navigate(`/owner/${ownerId}`) }}>
                    <UserCircleIcon className="h-6 w-6 text-gray-500" />Thông tin chủ sở hữu
                </Button>
            </CardHeader>
            <CardBody >
                <CarInfomation plate={plate!} setOwnerId={setOwnerId} />
            </CardBody>
        </Card>
    );
}