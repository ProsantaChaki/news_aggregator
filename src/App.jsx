import './App.css'
import React, {useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import News from "./pages/News.jsx";

function App() {

    useEffect(() => {
        console.log(window.location.href + 'app');
    }, []);
    return (
        <Router>
            <Routes>
                <Route path="/" element={<News />} />
            </Routes>
        </Router>
    );
}

export default App;

