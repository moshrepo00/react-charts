// @ts-ignore
import {LineChart, Line, CartesianGrid, XAxis, Tooltip, Legend, YAxis} from 'recharts';
import React, {useEffect, useState} from "react";
import {io} from "socket.io-client";
// const ENDPOINT = "http://127.0.0.1:8080";
const ENDPOINT = "https://charts-backend-mo.herokuapp.com";


let orangeClicks = 0;
let blueClicks = 0;
let time = 0;

const socket = io(ENDPOINT);
socket.open();
socket.on("orangeChecked", () => {
    console.log('orange updated');
    orangeClicks+=1;
});

socket.on("blueChecked", () => {
    console.log('blue updated');
    blueClicks += 1;
});


export default function Chart(props: any) {
    const [seconds, setSeconds] = useState(0);
    const [socketResponse, setSocketResponse] = useState("");
    const [chartData, setChartData] = useState([
        {
            name: seconds,
            blue: blueClicks,
            orange: orangeClicks
        }
    ]);


    useEffect(() => {
        console.log('debugging seconds: ', seconds);
        const timer = setInterval(() => {
            setSeconds(seconds + 1);
        }, 1000);
        const data = [...chartData];
        data.push(
            {
                name: seconds,
                blue: orangeClicks,
                orange: blueClicks
            });
        setChartData(data);
        return () => clearInterval(timer);
    }, [seconds]);

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
                name: seconds,
                blue: orangeClicks,
                orange: blueClicks
            });
        setChartData(data);
    };

    


    const post = (color: string) => {

        let body = JSON.stringify({ query: `{ ${color} }` })

        fetch(ENDPOINT + '/graphql', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: body
            })
        .then(response => response.json())
        .then(data => {
        console.log('loaded data', JSON.stringify(data));
        });
    }

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
                    <button onClick={() => post('orange')}>Orange</button>
                    <button onClick={() => post('blue')}>Blue</button>
                </div>
            </div>
        </section>
    );
}




