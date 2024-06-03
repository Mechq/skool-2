import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar';
import Customers from './pages/customers';
import Workshop from './pages/workshop';
import MailTemplates from './pages/mailTemplates';
import Commission from './pages/commission';
import Worklocation from './pages/worklocation';
import Login from './pages/login';

function App() {
    const location = useLocation();
    const isLoginPage = location.pathname === "/";

    React.useEffect(() => {
        if (isLoginPage) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isLoginPage]);

    return (
        <div className="flex flex-col min-h-screen">
            {!isLoginPage && <NavBar />}
            <div className="container mx-auto flex-grow py-4">
                <Routes>
                    <Route path="*" element={<h1>Not Found</h1>} />
                    <Route path="/" element={<Login />} />
                    <Route path="/workshops" element={<Workshop />} />
                    <Route path="/mailTemplates" element={<MailTemplates />} />
                    <Route path="/opdracht" element={<Commission />} />
                    <Route path="/werklocatie" element={<Worklocation />} />
                    <Route path="/customers" element={<Customers />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
