// @ts-ignore
import {LineChart, Line, CartesianGrid, XAxis, Tooltip, Legend, YAxis} from 'recharts';
import React, {useEffect, useState} from "react";


let orangeClicks = 0;
let blueClicks = 0;
export default function Chart(props: any) {
    const [seconds, setSeconds] = useState(0);

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
        return () => clearInterval(timer);
    }, [seconds]);


    const updateClicks = (color: string) => {
        if (color === 'orange') {
            orangeClicks += 1;
        } else if (color === 'blue') {
            blueClicks += 1;
        }
        const data = [...chartData];
        data.push(
            {
                name: seconds,
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




