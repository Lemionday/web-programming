import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import "./Navbar.scss";

export default function Navbar() {
    return (
        <nav className="navigation">
            <Link to='#' className='site-name'>
                Đăng kiểm Việt Nam
            </Link>
            <Box className="navigation-menu">
                <ul>
                    <li>
                        <Link to='/login'>Đăng nhập</Link>
                    </li>
                    <li>
                        <Link to='/#about'>Liên hệ</Link>
                    </li>
                </ul>
            </Box>
        </nav>
    );
}