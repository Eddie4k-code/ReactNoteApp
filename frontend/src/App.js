import Nav from './components/Nav'
import Auth from "./components/Auth";
import React from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import addNote from './components/AddNote';
import Dashboard from './components/Dashboard';





toast.configure()
function App() {
    
    return (
        <div className="App">
         
            
            <BrowserRouter>

                <header>
                    <Nav />
                </header>

                <Routes>

                    <Route path="/auth" element={<Auth />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </BrowserRouter>

        </div>
    );
}

export default App;
