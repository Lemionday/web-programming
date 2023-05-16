import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { Avatar, IconButton, InputAdornment, Paper } from "@mui/material";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import { useRef, useState } from "react";
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import VisibilityOffTwoToneIcon from '@mui/icons-material/VisibilityOffTwoTone';
import signUpAction from './signupAction';
import PasswordStrengthBar from 'react-password-strength-bar';
import { useAuth } from '../../components/hooks/useAuth';

const beginState = {
    text: "",
    error: false,
    helperText: ""
};

function ShowPasswordButton({ isShowPassword, showPassword: toggleShowPassword }) {
    return <InputAdornment position='end'>
        <IconButton onClick={toggleShowPassword}>
            {isShowPassword ? <VisibilityTwoToneIcon /> : <VisibilityOffTwoToneIcon />}
        </IconButton>
    </InputAdornment>;
}

export default function RegisterPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const validate = useRef({
        username: "",
        password: "",
        passwordConfirm: ""
    })
    const [isShowPassword, setIsShowPassword] = useState(false);
    const auth = useAuth();

    function showPassword() {
        setIsShowPassword(!isShowPassword);
    }

    function isError(helperText) {
        if (helperText.length !== 0) {
            return false;
        }
        return true;
    }

    function usernameValidate(username) {
        const length = username.length;
        let helperText = "";
        if (length < 3) {
            helperText = "Tên đăng nhập quá ngắn, cần ít nhất 3 ký tự";
        } else if (length > 25) {
            helperText = "Tên đăng nhập quá dài, cần ngắn hơn 25 ký tự";
        }

        validate.current.username = helperText;
        setUsername(username);

        return isError(helperText);
    }

    function passwordValidate(password) {
        const length = password.length;
        let helperText = "";
        if (length === 0) {
            helperText = "Mật khẩu không được để trống";
        }

        validate.current.password = helperText;
        setPassword(password);

        return isError(helperText);
    }

    function passwordConfirmValidate(passwordConfirm) {
        let helperText = "";
        if (password !== passwordConfirm) {
            helperText = "Mật khẩu không khớp";
        }

        validate.current.passwordConfirm = helperText;
        setPasswordConfirm(passwordConfirm)
        return isError(helperText);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!usernameValidate(username) || !passwordConfirmValidate(passwordConfirm) || !passwordValidate(password)) return;


        const newUserCredentials = {
            username: username,
            password: password,
        }

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
                    error={validate.current.username.length === 0 ? false : true}
                    helperText={validate.current.username}
                    required
                    fullWidth
                    id="username"
                    label="Tên đăng nhập"
                    autoFocus
                    onChange={e => usernameValidate(e.target.value)}
                />
                <TextField
                    margin="normal"
                    error={validate.current.password.length === 0 ? false : true}
                    helperText={validate.current.password}
                    required
                    fullWidth
                    name="password"
                    label="Mật khẩu"
                    type={isShowPassword ? "input" : "password"}
                    id="password"
                    autoComplete="new-password"
                    onChange={e => passwordValidate(e.target.value)}
                    InputProps={{
                        endAdornment: <ShowPasswordButton isShowPassword={isShowPassword} showPassword={showPassword} />
                    }}
                />
                <TextField
                    margin="normal"
                    error={validate.current.passwordConfirm.length === 0 ? false : true}
                    helperText={validate.current.passwordConfirm}
                    required
                    fullWidth
                    name="password"
                    label="Xác nhận mật khẩu"
                    type={isShowPassword ? "input" : "password"}
                    id="passwordConfirm"
                    autoComplete="current-password"
                    onChange={e => passwordConfirmValidate(e.target.value)}
                    InputProps={{
                        endAdornment: <ShowPasswordButton isShowPassword={isShowPassword} showPassword={showPassword} />
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