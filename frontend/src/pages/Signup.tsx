import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Button, Card, CardBody, IconButton, Input, Option, Radio, Select, Typography } from '@material-tailwind/react';
import { FormEvent, useRef, useState } from "react";
import PasswordStrengthBar from 'react-password-strength-bar';
import { useLoaderData } from "react-router-dom";
import { useAuth } from '../components/hooks/useAuth';
import { Center } from "../components/models/Center";
import { Role, RoleToString } from "../components/models/Session";
import { config } from '../conf/config';

async function signUpAction(auth: string, newUser: { username: string, password: string }) {
    try {
        const result = await fetch(`${config.protectedUrl}/account/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${auth}`,
            },
            body: JSON.stringify(newUser),
        });

        if (!result.ok) {
            return
        }
    } catch (err) {
        console.log(err);
    }
}

export default function RegisterPage() {
    const centers = useLoaderData() as Center[]
    const currentSelectedCenter = useRef("")
    const currentSelectedRole = useRef(Role.UserFromRegistryCenter)

    const [username, setUsername] = useState("");
    const [usernameValidation, setUsernameValidation] = useState("");

    const [password, setPassword] = useState("");
    const [passwordValidation, setPasswordValidation] = useState("");

    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [passwordConfirmValidation, setPasswordConfirmValidation] = useState("");

    const [isShowPassword, setIsShowPassword] = useState(false);
    const auth = useAuth();

    function ShowPasswordButton() {
        return <IconButton
            onClick={() => {
                setIsShowPassword(!isShowPassword)
            }}
            variant="text" className="!absolute right-1 top-1">
            {isShowPassword ?
                <EyeIcon strokeWidth={2} className="h-5 w-5" /> :
                <EyeSlashIcon strokeWidth={2} className="h-5 w-5" />}
        </IconButton>;
    }

    function isError(helperText: string) {
        if (helperText !== "") {
            return true;
        }
        return false;
    }

    function usernameValidate(username: string) {
        const length = username.length;
        let helperText = "";
        if (length < 3) {
            helperText = "Tên đăng nhập quá ngắn, cần ít nhất 3 ký tự";
        } else if (length > 25) {
            helperText = "Tên đăng nhập quá dài, cần ngắn hơn 25 ký tự";
        }

        fetch(`${config.protectedUrl}/account/check/${username}`, {
            headers: {
                "Authorization": `Bearer ${auth.session.token}`,
            },
        }).then(res => {
            if (res.status === 409) {
                helperText = "Tên đăng nhập đã tồn tại"
            }

            setUsernameValidation(helperText)
            setUsername(username);
        })

        return isError(helperText);
    }

    function passwordValidate(password: string) {
        const length = password.length;
        let helperText = "";
        if (length === 0) {
            helperText = "Mật khẩu không được để trống";
        }

        setPasswordValidation(helperText)
        setPassword(password);

        return isError(helperText);
    }

    function passwordConfirmValidate(passwordConfirm: string) {
        let helperText = "";
        if (password !== passwordConfirm) {
            helperText = "Mật khẩu không khớp";
        }

        setPasswordConfirmValidation(helperText)
        setPasswordConfirm(passwordConfirm)
        return isError(helperText);
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (usernameValidate(username) || passwordConfirmValidate(passwordConfirm) || passwordValidate(password)) return;

        const newUserCredentials = {
            username: username,
            password: password,
            center: currentSelectedCenter.current,
            role: currentSelectedRole.current
        }

        signUpAction(auth.session.token, newUserCredentials);
    }

    return (
        <Card color="transparent" shadow={false}>
            <CardBody className="flex flex-col items-center">
                <Typography variant="h4" color="blue-gray">
                    Tạo tài khoản
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                    Nhập thông tin tài khoản
                </Typography>
                <form className="mt-8 mb-2 w-3/5" onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                        <Radio name="role"
                            value={Role.UserFromRegistryCenter}
                            label={RoleToString(Role.UserFromRegistryCenter)}
                            onChange={() => { currentSelectedRole.current = Role.UserFromRegistryCenter }}
                            defaultChecked />

                        <Radio name="role"
                            label={RoleToString(Role.UserFromMainCenter)}
                            value={Role.UserFromMainCenter}
                            onChange={() => { currentSelectedRole.current = Role.UserFromMainCenter }}
                        />
                    </div>

                    <div className="my-4">
                        <Select label="Chọn trung tâm đăng kiểm" id="center" size="lg"
                            value={currentSelectedCenter.current}
                            onChange={e => { currentSelectedCenter.current = e! }}>
                            {centers.map((c) => <Option key={c.id} value={c.id}>{c.name}</Option>)}
                        </Select>
                    </div>

                    <div className="mb-4 flex flex-col gap-6">
                        <div>
                            <Input size="lg"
                                label="Tên đăng nhập"
                                onChange={e => usernameValidate(e.target.value)}
                                error={isError(usernameValidation)!}
                                autoFocus
                            />
                            <p className="mt-2 text-sm text-red-600 dark:text-red-500">{usernameValidation}</p>
                        </div>

                        <div className="flex flex-col">
                            <div className="relative flex w-full">
                                <Input
                                    size="lg"
                                    label="Mật khẩu"
                                    type={isShowPassword ? "text" : "password"}
                                    autoComplete="new-password"
                                    onChange={e => passwordValidate(e.target.value)}
                                    error={isError(passwordValidation)}
                                />
                                <ShowPasswordButton />
                            </div>
                            <p className="mt-2 text-sm text-red-600 dark:text-red-500">{passwordValidation}</p>
                        </div>

                        <div className="flex flex-col">
                            <div className="relative flex w-full">
                                <Input
                                    size="lg"
                                    label="Xác nhận mật khẩu"
                                    autoComplete="current-password"
                                    type={isShowPassword ? "input" : "password"}
                                    onChange={e => passwordConfirmValidate(e.target.value)}
                                    error={isError(passwordConfirmValidation)}
                                />
                                <ShowPasswordButton />
                            </div>
                            <p className="mt-2 text-sm text-red-600 dark:text-red-500">{passwordConfirmValidation}</p>
                        </div>
                    </div>
                    <PasswordStrengthBar password={password}
                        shortScoreWord="quá ngắn"
                        scoreWords={['yếu', 'yếu', 'trung bình', 'tốt', 'mạnh']} />
                    <Button className="mt-6" type="submit" fullWidth>
                        Tạo tài khoản
                    </Button>
                </form>
            </CardBody>
        </Card>
    )
}