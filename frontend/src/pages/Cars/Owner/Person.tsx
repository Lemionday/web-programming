import { Typography } from "@material-tailwind/react";
import { OwnerIsPerson } from "../../../components/models/Owner";
import { CapitalizeFirstLetter, FormatDateToString } from "../../../components/util/util";

export default function OwnerIsPersonProfile({ owner }: { owner: OwnerIsPerson }) {
    return (
        <div className="grid grid-cols-2 justify-between gap-4">
            <Typography variant="h6">Họ và tên</Typography>
            <Typography> {CapitalizeFirstLetter(owner.name)} </Typography>

            <Typography variant="h6">Mã số cccd/cmnd</Typography>
            <Typography> {owner.ssn}</Typography>

            <Typography variant="h6">Giới tính</Typography>
            <Typography> {owner.sex === "female" ? "Nam" : "Nữ"}</Typography>

            <Typography variant="h6">Ngày sinh</Typography>
            <Typography>{FormatDateToString(new Date(owner.birthdate))}</Typography>

            <Typography variant="h6">Nơi sinh</Typography>
            <Typography>{owner.birthplace}</Typography>
        </div>
    )
}