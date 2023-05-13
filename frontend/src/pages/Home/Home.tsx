import { Box, Container, CssBaseline, Typography } from "@mui/material";
import About from "./About";
import "./Home.scss";
import Navbar from "./Navbar";

export function HomePage() {
    return (
        <>
            <CssBaseline />
            <Navbar />
            <div className="main">
                {/* <Header /> */}
                <Box id="introduction">
                    <Typography variant="h3">
                        Website đăng kiểm Việt Nam
                    </Typography>
                    <Typography variant="h6">
                        Theo dõi, thống kê, cấp đăng kiểm xe ô tô Việt Nam
                    </Typography>
                    <Box id="hero-image" />
                </Box>
                <About />
            </div>
        </>
    );
};