import { useEffect, useState } from "react";
import { useAuth } from "../../components/hooks/useAuth";
import { OwnerIsCompany, OwnerIsPerson } from "../../components/models/Owner";
import { config } from "../../conf/config";
import { useParams } from "react-router-dom";
import Profile from "../../components/profile/Profile";

// async function fetchData(token: string, ownerId: string): Promise<OwnerIsCompany | OwnerIsPerson> {
//     const res = await fetch(`${config.baseUrl}/owner/${ownerId}`, {
//         headers: {
//             "Authorization": `Bearer ${token}`,
//         },
//     });

//     const data = await res.json();

//     if ((data.id as String).startsWith("p")) {
//         return data as OwnerIsPerson
//     }

//     return data as OwnerIsCompany
// }

export default function OwnerProfilePage() {
    const auth = useAuth()
    const [owner, setOwner] = useState<OwnerIsPerson | OwnerIsCompany>()
    const { ownerId } = useParams()

    useEffect(() => {
        (async function () {
            const res = await fetch(`${config.baseUrl}/owner/${ownerId}`, {
                headers: {
                    "Authorization": `Bearer ${auth.session.token}`,
                },
            });

            const data = await res.json();

            console.log(data)
            if ((data.id as string).startsWith("p")) {
                setOwner(data as OwnerIsPerson)
            }

            setOwner(data as OwnerIsCompany)
        })()
    }, [])

    return (
        <div>
            <Profile data={owner as OwnerIsPerson} />
        </div>
    )
}