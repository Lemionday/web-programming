import { Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";
import NavBar from "../components/shared/Navbar";

export default function AboutPage() {
    const members_list = [
        { name: "Lương Nhật Hào", github_account: "Lemionday", msv: "21020196", contact_number: "0988972003", job: "Backend" },
        { name: "Nguyễn Đức Nam", github_account: "ndn2107", msv: "21020222", contact_number: "0345316858", job: "Frontend" },
        { name: "Nguyễn Hữu Trọng", github_account: "tronglacnhue", msv: "21021547", contact_number: "0961308192", job: "Frontend" },
    ];

    return (
        <>
            <NavBar />
            <div className="flex flex-col h-screen mx-10">
                <Typography variant="h2">
                    Thông tin thành viên
                </Typography>
                <div className="flex justify-between gap-10 mt-10">
                    {members_list.map((member) => (
                        <Card className="w-90 h-100 bg-blue-gray-100">
                            <CardHeader shadow={false} floated={false} className="flex justify-center w-80">
                                <img alt={member.name} src={`https://avatars.githubusercontent.com/${member.github_account}`} />
                            </CardHeader>

                            <CardBody>

                                <Typography variant="h6">{member.name}</Typography>
                                <Typography>{member.msv}</Typography>
                                <Typography>Lập trình {member.job}</Typography>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            </div >
        </>
    );
}