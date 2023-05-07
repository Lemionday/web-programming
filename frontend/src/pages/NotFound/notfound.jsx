import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function NotFound() {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                minHeight: '100vh',
            }}
        >
            <Typography component="h1" variant="h2" className="p404">
                404
            </Typography>
            <Typography component="h1" variant="h5">
                Trang không tồn tại
            </Typography>
            {/* <Typography paragraph={true}>
                Xin lỗi, chúng tôi không tìm thấy trang bạn cần tìm.
            </Typography>
            <Typography paragraph={true}>
                Về trang chủ bằng nút bên dưới.
            </Typography> */}
            <Link to="/">
                <Button variant="contained">
                    Về trang chủ
                </Button>
            </Link>
        </Box>
    );
};

export default NotFound;