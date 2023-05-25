import { Box, Button, Container, CssBaseline, Typography } from "@mui/material";
// import "./Home.scss";
import Navbar from "./Navbar";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { Link } from "react-router-dom";

export function HomePage() {
    return (
        <>
            <CssBaseline />
            <Navbar />
            <div className="main">
                {/* <Header /> */}
                <Box id="introduction">
                    <Typography variant="h3" id="hero-title">
                        Website đăng kiểm Việt Nam
                    </Typography>
                    <Typography variant="h6" className="font-bold">
                        Theo dõi, thống kê, cấp đăng kiểm xe ô tô Việt Nam
                    </Typography>
                    <Button className="hover-btn" href="/centers">
                        Tìm kiếm trung tâm
                    </Button>
                    <Box id="hero-image" />
                </Box>
            </div>
        </>
    );
};