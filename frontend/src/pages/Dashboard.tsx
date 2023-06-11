import { Typography } from '@material-tailwind/react';

import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Tooltip,
} from "@material-tailwind/react";
import { useAuth } from '../components/hooks/useAuth';
import { Account, RoleToString } from '../components/models/Session';
import { config } from '../conf/config';

function Profile({ account }: { account: Account }) {
    return (
        <Card className="w-120">
            <CardHeader floated={false} className="bg-gray-800 h-80 flex flex-col justify-center items-center">
                <img
                    src={`${config.publicUrl}/avatar/${account.avatar}.svg`}
                    alt="avatar" />
            </CardHeader>
            <CardBody className="text-center">
                <Typography variant="h4" color="blue-gray" className="mb-2">
                    {account.username}
                </Typography>
                <Typography color="blue" className="font-medium" textGradient>
                    {RoleToString(account.role)}
                </Typography>
            </CardBody>
            <CardFooter className="flex justify-center gap-7 pt-2">
                <Tooltip content="Like">
                    <Typography
                        as="a"
                        href="#facebook"
                        variant="lead"
                        color="blue"
                        textGradient
                    >
                        <i className="fab fa-facebook" />
                    </Typography>
                </Tooltip>
                <Tooltip content="Follow">
                    <Typography
                        as="a"
                        href="#twitter"
                        variant="lead"
                        color="light-blue"
                        textGradient
                    >
                        <i className="fab fa-twitter" />
                    </Typography>
                </Tooltip>
                <Tooltip content="Follow">
                    <Typography
                        as="a"
                        href="#instagram"
                        variant="lead"
                        color="purple"
                        textGradient
                    >
                        <i className="fab fa-instagram" />
                    </Typography>
                </Tooltip>
            </CardFooter>
        </Card>);
}

export default function DashboardPage() {
    const auth = useAuth();
    const account = auth.session.account;
    if (account === undefined) {
        return <></>;
    }

    return (
        <div className='flex flex-col items-center justify-center w-full h-full'>
            <Typography variant="h1" className="text-center">
                Chào mừng trở lại
            </Typography>
            <Profile account={account} />
        </div>
    );
}