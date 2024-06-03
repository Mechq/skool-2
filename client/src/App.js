import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/home';
import Customers from './pages/customers';
import Workshop from './pages/workshop';
import MailTemplates from './pages/mailTemplates';
import Commission from './pages/commission';
import Worklocation from './pages/worklocation';
import Login from './components/LoginPage';

function App() {
    return (
        <div className="flex flex-col min-h-screen">
            <NavBar />
            <div className="container mx-auto flex-grow py-4">
                <Routes>
                    <Route path="*" element={<h1>Not Found</h1>} />
                    <Route path="/" element={<Home />} />
                    <Route path="/workshops" element={<Workshop />} />
                    <Route path="/mailTemplates" element={<MailTemplates />} />
                    <Route path="/opdracht" element={<Commission />} />
                    <Route path="/werklocatie" element={<Worklocation />} />
                    <Route path="/customers" element={<Customers />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
