import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { Avatar, IconButton, InputAdornment, Paper } from "@mui/material";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import { useState } from "react";
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import VisibilityOffTwoToneIcon from '@mui/icons-material/VisibilityOffTwoTone';
import signUpAction from './signupAction';
import PasswordStrengthBar from 'react-password-strength-bar';
import { useAuth } from '../../components/hooks/useAuth';


export default function RegisterPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [openError, setOpenError] = useState(null);
    const auth = useAuth();

    function passwordMatch() {
        return password === passwordConfirm;
    }

    function showPassword() {
        setIsShowPassword(!isShowPassword);
    }

    function usernameValidation() {
        const length = username.length;
        if (length < 3 || length > 25) {
            return false;
        }

        return true;
    }

    function passwordValidation() {
        const rules = [
            /(?=.{8,})/, // >= 8 chars
            /(?=.*[A-Z])/, // >= 1 uppercase char
            /(?=.*[a-z])/, // >= 1 lowercase char
            /(?=.*[0-9])/, // >= 1 digit
            /([^A-Za-z0-9])/, // >= 1 special char
        ];
        let count = 0;
        if (password.test(rules[0])) {
            for (const rule of rules.slice(1)) {
                if (password.test(rule)) {
                    count += 1;
                }
            }
            switch (count) {
                case 0 | 1:
                    return 'weak';
                case 2:
                    return 'medium';
                case 3:
                    return 'strong';
            }
        }
        return 'very weak';
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!passwordMatch) {
            setOpenError("Passwords don't match!");
        }

        const newUserCredentials = {
            username: username,
            password: password,
        }

        console.log(newUserCredentials);
        console.log(auth.token);
        signUpAction(auth.token, newUserCredentials);
    }

    return (
        <Paper>
            <Avatar>
                <AccountBoxIcon />
            </Avatar>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Tên đăng nhập"
                    name="username"
                    autoFocus
                    onChange={e => { setUsername(e.target.value); }}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Mật khẩu"
                    type={isShowPassword ? "input" : "password"}
                    id="password"
                    autoComplete="new-password"
                    onChange={e => { setPassword(e.target.value); }}
                    InputProps={{
                        endAdornment: <InputAdornment position='end'>
                            <IconButton onClick={showPassword}>
                                {isShowPassword ? <VisibilityTwoToneIcon /> : <VisibilityOffTwoToneIcon />}
                            </IconButton>
                        </InputAdornment>,
                    }}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Xác nhận mật khẩu"
                    type={isShowPassword ? "input" : "password"}
                    id="passwordConfirm"
                    autoComplete="current-password"
                    onChange={e => { setPasswordConfirm(e.target.value); }}
                    InputProps={{
                        endAdornment: <InputAdornment position='end'>
                            <IconButton onClick={showPassword}>
                                {isShowPassword ? <VisibilityTwoToneIcon /> : <VisibilityOffTwoToneIcon />}
                            </IconButton>
                        </InputAdornment>,
                    }}
                />
                <PasswordStrengthBar password={password} />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Tạo tài khoản
                </Button>
            </Box>
        </Paper>
    )
}