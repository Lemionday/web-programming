import { Button, Typography } from "@material-tailwind/react";
import { useNavigate, useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError() as Error;
    const navigate = useNavigate()
    return (
        <div className="flex flex-col justify-center items-center h-screen gap-4">
            <Typography className="lg:text-8xl font-bold text-transparent text-8xl bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">Oops!</Typography>
            <Typography className="text-3xl">Có lỗi xảy ra, chi tiết về lỗi:</Typography>
            <Typography variant="paragraph" className="text-2xl">
                {JSON.stringify(error, null, "\t") || error.message}
            </Typography>
            <Button variant="outlined" onClick={() => { navigate('/') }}>
                Trở về trang chủ
            </Button>
        </div>
    );
}