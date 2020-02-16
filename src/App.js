import React from 'react';
import './App.css';
import { BrowserRouter as Router } from "react-router-dom";
import Routermenu from './Routermenu';
function App() {
    return (
        <div className="App">
            <Router>
                <Routermenu />
            </Router>
        </div>
    );
}

export default App;
