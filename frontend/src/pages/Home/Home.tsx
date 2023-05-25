import { Box, Button, CssBaseline, Typography } from "@mui/material";
// import "./Home.scss";
import NavbarComponent from "./Navbar";

export function HomePage() {
    return (
        <div>
            <NavbarComponent />
            <div className="dark:bg-gray-900">
                {/* <Header /> */}
                <Box id="introduction">
                    <Typography variant="h3" id="hero-title">
                        Website đăng kiểm Việt Nam
                    </Typography>
                    <Typography variant="h6" className="dark:text-white">
                        Theo dõi, thống kê, cấp đăng kiểm xe ô tô Việt Nam
                    </Typography>
                    <Button className="hover-btn" href="/centers">
                        Tìm kiếm trung tâm
                    </Button>
                    <Box id="hero-image" />
                </Box>
            </div>
        </div>
    );
};