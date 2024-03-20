import React from 'react';
import './App.css';
import GitHubSearch from './GitHubSearch';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <div className="App">
            <h1>GitHub QR Code Generator</h1>
            <GitHubSearch />
            <ToastContainer />
        </div>
    );
}

export default App;
