import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';

export default function Header() {
    const links = [
        { id: 1, route: 'About', url: 'https://blog.appseed.us/mui-react-coding-landing-page/' },
        { id: 2, route: 'More Apps', url: 'https://appseed.us/apps/react' },
    ];
    return <Box sx={{ marginBottom: '70px' }}>
        <AppBar>
            <Toolbar className="tool-bar">
                <Link to="#">
                    <Typography variant="h5" className="logo">
                        MUI Sample
                    </Typography>
                </Link>

                {/* <Box>
                    <IconButton
                        size="large"
                        edge="end"
                        color="inherit"
                        aria-label="menu"
                        onClick={toggleDrawer('right', true)}
                    >
                        <MenuIcon className={classes.menuIcon} fontSize="" />
                    </IconButton>

                    <Drawer
                        anchor="right"
                        open={state['right']}
                        onClose={toggleDrawer('right', false)}
                    >
                        {list('right')}
                    </Drawer>
                </Box> */}

                {links.map((link) => (
                    <Link to={link.url} key={link.id}>
                        <Typography>{link.route}</Typography>
                    </Link>
                ))}
            </Toolbar>
        </AppBar>
    </Box >;
}