import React from 'react';
import {Route, Routes, useLocation} from 'react-router-dom';
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
import ProtectedRoute from "./ProtectedRoute";
import UserWorkshops from "./pages/UserWorkshops";
import TeacherEnrollments from "./pages/teacherEnrollments";
import CommissionWorkshops from "./pages/commissionWorkshops";
import Invites from "./pages/invites";

function App() {
    const location = useLocation();
    const isLoginPage = location.pathname === "/login";
    const isRegisterPage = location.pathname === "/register";
    const [user, setUser] = React.useState(null);

    React.useEffect(() => {
        if (isLoginPage || isRegisterPage) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isLoginPage, isRegisterPage]);


    const fetchUserData = async (token) => {
        const response = await fetch('/api/verifyToken', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return await response.json();
    };

    React.useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetchUserData(token)
                .then(data => {
                    if (data.status === 'Success') {
                        console.log('User data:', data);
                        setUser(data.data)
                    } else {
                        console.error('Error fetching user data:', data);
                    }
                })
                .catch(error => console.error('Error fetching user data:', error));
        }
    });


    return (
        <div className="flex flex-col min-h-screen">
            {!(isLoginPage || isRegisterPage) && <NavBar/>}
            <div className="container mx-auto flex-grow py-4">
                <Routes>
                    <Route path="/workshops" element={<ProtectedRoute access="admin"><Workshop /></ProtectedRoute>} />
                    <Route path="/mailTemplates" element={<ProtectedRoute access="admin"><MailTemplates /></ProtectedRoute>} />
                    <Route path="/users" element={<ProtectedRoute access="admin"><Users /></ProtectedRoute>} />
                    <Route path="/werklocatie" element={<ProtectedRoute access="admin"><Worklocation /></ProtectedRoute>} />
                    <Route path="/customers" element={<ProtectedRoute access="admin"><Customers /></ProtectedRoute>} />
                    <Route path="/teacherEnrollments" element={<ProtectedRoute access="admin"><TeacherEnrollments /></ProtectedRoute>} />
                    <Route path="*" element={<h1>Not Found</h1>} />
                    <Route path="/" element={<ProtectedRoute access="everyone"><Home /></ProtectedRoute>} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/opdracht" element={<ProtectedRoute access="everyone"><Commission /></ProtectedRoute>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/user" element={<ProtectedRoute access="everyone"><User /></ProtectedRoute>} />
                    <Route path="/userWorkshops" element={<ProtectedRoute access="everyone"><UserWorkshops /></ProtectedRoute>} />
                    <Route path="/commissionWorkshops" element={<ProtectedRoute access="admin"><CommissionWorkshops /></ProtectedRoute>} />
                    <Route path='/invites' element={<ProtectedRoute access="everyone"><Invites /></ProtectedRoute>} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
