import React, {useState} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import './App.css';
import Chart from "./components/chart";
import Client from "./components/client";

import {useEffect} from "react";

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/client">
                    <div>
                        <Client />
                    </div>
                </Route>
                <Route path="/dashboard">
                    <div className="App">
                        <Chart />
                    </div>
                </Route>

            </Switch>
        </Router>
    
    );
}

export default App;
