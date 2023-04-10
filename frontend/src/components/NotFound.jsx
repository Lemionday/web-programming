import "./NotFound.css";
import React, { useEffect, useState } from 'react';

export default function NotFound() {
    const [data, setData] = useState(null);
    useEffect(() => {
        fetch('http://localhost:8080/api').then(res => {
            return res.json();
        }).then(data => {
            setData(data);
        })
    }, [])
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            minHeight: '100vh',
        }}>
            <h1>
                404
            </h1>
            <h6>
                The page you’re looking for doesn’t exist.
            </h6>
            <button>
                Back Home + {data.message}
            </button>
        </div>
    );
}