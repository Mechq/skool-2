import React from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/home';
import Customers from './pages/customers';
import Workshop from './pages/workshop';
import MailTemplates from './pages/mailTemplates';
import Commission from './pages/commission';
import Worklocation from './pages/worklocation';
import Login from './pages/login';
import Register from './pages/register';
import User from './pages/user';
import Users from './pages/users';
import PageSecurity from "./PageSecurity";


function App() {
    const location = useLocation();
    const isLoginPage = location.pathname === "/login";
    const isRegisterPage = location.pathname === "/register";

    React.useEffect(() => {
        if (isLoginPage || isRegisterPage) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isLoginPage, isRegisterPage]);

    function PrivateRoute({ children, roleRequired }) {
        const user = PageSecurity();
        console.log(user)
        if (user !== null) {
            if (user.role !== roleRequired) {
                console.log(user.role, 'should be', roleRequired)
                return <Navigate to="/"/>;
            }
        }
        return children;
    }

    return (
        <div className="flex flex-col min-h-screen">
            {!(isLoginPage || isRegisterPage) && <NavBar />}
            <div className="container mx-auto flex-grow py-4">
                <Routes>
                    <>
                        <Route path="/workshops" element={
                            <PrivateRoute roleRequired="admin">
                                <Workshop />
                            </PrivateRoute>
                        } />
                        <Route path="/mailTemplates" element={
                            <PrivateRoute roleRequired="admin">
                                <MailTemplates />
                            </PrivateRoute>
                        } />
                        <Route path="/users" element={
                            <PrivateRoute roleRequired="admin">
                                <Users />
                            </PrivateRoute>
                        } />
                        <Route path="/werklocatie" element={
                            <PrivateRoute roleRequired="admin">
                                <Worklocation />
                            </PrivateRoute>
                        } />
                        <Route path="/customers" element={
                            <PrivateRoute roleRequired="admin">
                                <Customers />
                            </PrivateRoute>
                        } />
                    </>
                    <Route path="*" element={<h1>Not Found</h1>} />
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/opdracht" element={<Commission />} />
                    <Route path="/login" element={<Login />} />
                    <Route path='/user' element={<User />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
