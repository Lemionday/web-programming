import { Typography } from "@material-tailwind/react";
import { OwnerIsCompany } from "../../../components/models/Owner";
import { CapitalizeFirstLetter } from "../../../components/util/util";
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