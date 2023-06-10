import { CardBody, Typography } from "@material-tailwind/react";
import { OwnerIsCompany, OwnerIsPerson } from "../../../components/models/Owner";
import { CapitalizeFirstLetter, FormatDateToString } from "../../../components/util/util";
import { useTimelineItem } from "@material-tailwind/react/components/Timeline/TimelineItem";
import OwnerIsPersonProfile from "./Person";

export default function OwnerIsCompanyProfile({ owner: companyOwner }: { owner: OwnerIsCompany }) {
    return (
        <div className="grid grid-cols-2 gap-4">
            <Typography variant="h6">Tên công ty</Typography>
            <Typography> {CapitalizeFirstLetter(companyOwner.name)} </Typography>

            <Typography variant="h6">Địa chỉ</Typography>
            <Typography> {companyOwner.office_address} </Typography>

            <Typography variant="h6">Người đại diện pháp luật</Typography>
            <OwnerIsPersonProfile owner={companyOwner.legal_representative} />
        </div>
    )
}