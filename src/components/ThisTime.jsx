import React from 'react';
import {getTime} from "../utils/tools.js";

export default function ThisTime() {
    const [time, setTime] = React.useState(getTime());


    React.useEffect(() => {
        const interval = setInterval(() => {
            setTime(getTime());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div
            style={{
                fontSize: "larger",
                fontWeight: "bold",
                color: "rgb(107, 172, 163)",
                display: "inline-block",
            }}
        >
            {time}
        </div>
    );
}
