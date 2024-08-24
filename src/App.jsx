import './App.css'
import React, {useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import News from "./pages/News.jsx";
import { connect, Provider } from 'react-redux';
import Store from './stateManagement/Store';

function App() {

    return (
        <Provider store={Store}>
            <Router>
                <Routes>
                    <Route path="/" element={<News />} />
                </Routes>
            </Router>
        </Provider>
    );
}

export default App;

