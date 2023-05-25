// import { Box, Button, Typography } from "@mui/material";
// import "./Home.scss";
import {
    ArrowLongRightIcon
} from "@heroicons/react/24/outline";
import {
    Button,
    Card,
    Typography
} from "@material-tailwind/react";
import NavbarComponent from "./Navbar";

export function HomePage() {
    return (
        <>
            <NavbarComponent />
            <Typography variant="h1" color="green" className="mb-2 text-center">
                Website đăng kiểm Việt Nam
            </Typography>
            <a href="/centers">
                <Button variant="text" className="flex items-center gap-2 mx-auto" size="lg">
                    Tìm kiếm trung tấm<ArrowLongRightIcon strokeWidth={2} className="h-5 w-5" />
                </Button>
            </a>
            <div className="mx-auto max-w-screen-md py-12">
                <Card className="mb-12 overflow-hidden">
                    <img
                        alt="aston martin"
                        className="h-full w-full object-cover object-center"
                        src="./src/assets/images/Toyota-Vios-White.jpg"
                    />
                </Card>
                <Typography variant="h2" color="blue" className="mb-2">
                    Đăng kiểm là gì?
                </Typography>
                <Typography className="text-gray-500 dark:text-gray-400" variant="paragraph">
                    Đăng kiểm là quá trình kiểm tra và xác nhận tính hợp lệ về mặt kỹ thuật và an toàn của phương tiện giao thông đường bộ. Thông thường, việc đăng kiểm bắt buộc được thực hiện định kỳ theo quy định của cơ quan quản lý giao thông trong mỗi quốc gia.

                    Quá trình đăng kiểm có thể bao gồm kiểm tra các thành phần cơ bản như đèn chiếu sáng, hệ thống phanh, hệ thống lái, hệ thống treo, hệ thống khung xe, động cơ, khung gầm, lốp xe và hệ thống khí thải. Mục đích của việc đăng kiểm là đảm bảo rằng phương tiện giao thông đáp ứng các tiêu chuẩn an toàn và môi trường cần thiết để hoạt động trên đường.

                    Việc đăng kiểm thường được thực hiện tại các trạm kiểm định hoặc các cơ sở được ủy quyền bởi cơ quan quản lý giao thông. Sau khi phương tiện đã qua kiểm tra và đạt yêu cầu, nó sẽ được cấp một biển kiểm định hoặc một tấm chứng chỉ để xác nhận tính hợp lệ của việc đăng kiểm.

                    Quá trình đăng kiểm giúp đảm bảo an toàn giao thông và giảm thiểu rủi ro tai nạn do sự cố kỹ thuật. Ngoài ra, việc đăng kiểm cũng có thể áp dụng các quy định về môi trường, như kiểm tra khí thải để đảm bảo phương tiện không gây ô nhiễm môi trường vượt quá mức cho phép.
                </Typography>
            </div>
            <div className="max-w-full max-h-screen bg-hero bg-no-repeat bg-cover bg-center bg-fixed">
                <div className="">
                    {/* <Header /> */}
                    {/* <Box id="introduction">
                        <Typography variant="h3" id="hero-title">
                        </Typography>
                        <Typography variant="h6" className="dark:text-white">
                            Theo dõi, thống kê, cấp đăng kiểm xe ô tô Việt Nam
                        </Typography>
                        <Button className="hover-btn" href="/centers">
                            Tìm kiếm trung tâm
                        </Button>
                        <Box id="hero-image" />
                    </Box> */}
                </div>
            </div>
        </>
    );
};