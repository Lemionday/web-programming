import { Navigate, useRouteError } from "react-router-dom";

export default function ErrorPage() {
    let error = useRouteError() as Error;
    return (
        <div>
            <h1>Uh oh, something went terribly wrong 😩</h1>
            <pre>{error.message || JSON.stringify(error)}</pre>
            <button onClick={() => (<Navigate to='/dashboard' />)}>
                Click here to reload the app
            </button>
        </div>
    );
}