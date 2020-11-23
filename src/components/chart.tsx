// @ts-ignore
import {LineChart, Line, CartesianGrid, XAxis, Tooltip, Legend, YAxis} from 'recharts';
import React, {useEffect, useState} from "react";
import {io} from "socket.io-client";
const ENDPOINT = "https://charts-backend-mo.herokuapp.com";


let orangeClicks = 0;
let blueClicks = 0;

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
        const timer = setInterval(() => {
            setSeconds(seconds + 1);
        }, 1000);
        const data = [...chartData];
        data.push(
            {
                name: seconds,
                blue: blueClicks,
                orange: orangeClicks
            });
        setChartData(data);
        return () => clearInterval(timer);
    }, [seconds]);





    return (
        <section>
            <div className="stats">
                <div>
                    Time Elapsed: {seconds} seconds
                </div>
                <div>
                    Orange Clicks: {orangeClicks}
                </div>

                <div>
                    Blue Clicks:  {blueClicks}
                </div>
        
            </div>
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
                <YAxis offset={-30} allowDecimals={false}  label={{value: 'Clicks', angle: -90}} domain={[0, 'auto']} type="number"/>
                <Tooltip/>
                <Legend/>
                <Line type="monotone" dataKey="blue" stroke="#007bff" activeDot={{r: 8}}/>
                <Line type="monotone" dataKey="orange" stroke="#fd7e14"/>
            </LineChart>

        </section>
    );
}




