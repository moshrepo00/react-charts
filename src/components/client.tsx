import React from "react";

const ENDPOINT = "https://charts-backend-mo.herokuapp.com";


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
export default function Client() {
    return (
        <div>
            <div className="button-container">
                <button className="button button--orange" onClick={() => post('orange')}>Orange</button>
                <button className="button button--blue"  onClick={() => post('blue')}>Blue</button>
            </div>
        </div>
    );
}
