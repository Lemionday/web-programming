import { Avatar, Box, Grid, Typography } from "@mui/material";

export default function AboutPage() {
    const members_list = [
        { name: "Lương Nhật Hào", github_account: "Lemionday", msv: "21020196", contact_number: "0988972003", job: "Backend" },
        { name: "Nguyễn Đức Nam", github_account: "ndn2107", msv: "21020222", contact_number: "0345316858", job: "Frontend" },
        { name: "Nguyễn Hữu Trọng", github_account: "tronglacnhue", msv: "21021547", contact_number: "0961308192", job: "Frontend" },
    ];

    return (
        <div id="about">
            <Typography variant="h6">
                Thông tin thành viên
            </Typography>
            <Grid container id="about"
                alignItems="center"
                justifyContent="space-between"
                spacing={0.5}
                sx={{ flexGrow: 1, minHeight: '15rem' }}>
                {members_list.map((member) => (
                    <Grid
                        item
                        xs={12}
                        md={3}
                        // minHeight={300}
                        key={member.msv}
                        className="member-card"
                    >
                        <Avatar className="avatar" alt={member.name} src={`https://avatars.githubusercontent.com/${member.github_account}`} />
                        <Typography variant="h6">{member.name}</Typography>
                        <Typography>{member.msv}</Typography>
                        <Typography>Lập trình {member.job}</Typography>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}