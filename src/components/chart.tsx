// @ts-ignore
import {LineChart, Line, CartesianGrid, XAxis, Tooltip, Legend, YAxis} from 'recharts';
import React, {useEffect, useState} from "react";
import {io} from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:8080";


let orangeClicks = 0;
let blueClicks = 0;
let time = 0;

const socket = io(ENDPOINT);
socket.open();
socket.on("FromAPI", () => {
    orangeClicks+=1;
    socket.close();
});

setInterval(() => {
    time += 1;
    console.log('timer: ', time)
}, 1000);



export default function Chart(props: any) {
    const [seconds, setSeconds] = useState(0);
    const [socketResponse, setSocketResponse] = useState("");
    const [chartData, setChartData] = useState([
        {
            name: time,
            blue: blueClicks,
            orange: orangeClicks
        }
    ]);


    useEffect(() => {
        const socket = io(ENDPOINT);
        socket.open();
        socket.on("FromAPI", () => {
            updateClicks('orange')
            setSocketResponse('');
            socket.close();
        });
    }, [socketResponse])

    const updateClicks = (color: string) => {
        if (color === 'orange') {
            orangeClicks += 1;
        } else if (color === 'blue') {
            blueClicks += 1;
        }

        console.log("debugging chart data", chartData);
        const data = [...chartData];
        data.push(
            {
                name: time,
                blue: orangeClicks,
                orange: blueClicks
            });
        setChartData(data);
    };


    return (
        <section>
            <LineChart
                width={1000}
                height={300}
                data={chartData}
                margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis allowDecimals={false}  label={{value: 'Seconds', position: 'insideBottom'}}  domain={[0, 'auto']} dataKey="name" type="number"/>
                <YAxis allowDecimals={false}  label='Clicks' domain={[0, 'auto']} type="number"/>
                <Tooltip/>
                <Legend/>
                <Line type="monotone" dataKey="blue" stroke="#ff9559" activeDot={{r: 8}}/>
                <Line type="monotone" dataKey="orange" stroke="#82ca9d"/>
            </LineChart>

            <div>
                <div>
                    <button onClick={() => updateClicks('orange')}>Orange</button>
                    <button onClick={() => updateClicks('blue')}>Blue</button>
                </div>
            </div>
        </section>
    );
}




