import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    IconButton,
    Input,
    Typography
} from "@material-tailwind/react";
import { useState } from "react";
import { useAuth } from "../components/hooks/useAuth";

export default function LoginPage() {
    const auth = useAuth();
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [error, setError] = useState<string>()

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

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        (async function () {
            const res = await auth.login({
                username: username,
                password: password,
            })
            setError(res)
        })()
    }

    return (
        <div className={`flex flex-col justify-center w-screen h-screen
        bg-no-repeat bg-cover bg-center bg-fixed
        bg-[url('../images/pexels-jeerayut-rianwed-144171.jpg')]`}>
            <Card className="w-1/3 ml-20">
                <CardHeader
                    variant="gradient"
                    color="blue"
                    className="mb-4 grid h-28 place-items-center"
                >
                    <Typography variant="h3" className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-300">
                        Dịch vụ công đăng kiểm xe ô tô
                    </Typography>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardBody className="flex flex-col gap-4">
                        <Input label="Tên đăng nhập" size="lg"
                            autoComplete="username"
                            onChange={e => setUsername(e.target.value)}
                            autoFocus
                        />
                        <div className="relative flex w-full">
                            <Input label="Mật khẩu" size="lg"
                                type={isShowPassword ? "text" : "password"}
                                autoComplete="current-password"
                                onChange={e => setPassword(e.target.value)}
                            />
                            <ShowPasswordButton />
                        </div>
                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">{error}</p>
                        {/* <div className="-ml-2.5">
                        <Checkbox label="Remember Me" />
                    </div> */}
                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button variant="gradient" type="submit" fullWidth>
                            Đăng nhập
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}