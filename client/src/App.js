import React from 'react';
import {Route, Routes, useLocation} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/home';
import Customers from './pages/customers';
import WorkshopTemplates from './pages/workshopTemplates';
import MailTemplates from './pages/mailTemplates';
import Commissions from './pages/commissions';
import Worklocation from './pages/workLocation';
import Login from './pages/login';
import Register from './pages/register';
import Profile from './pages/profile';
import Teachers from './pages/teachers';
import ProtectedRoute from "./ProtectedRoute";
import OpenWorkshops from "./pages/openWorkshops";
import TeacherEnrollments from "./pages/teacherEnrollments";
import Workshops from "./pages/workshops";
import Invites from "./pages/invites";
import TempMail from "./pages/tempMailer";

function App() {
    const location = useLocation();
    const isLoginPage = location.pathname === "/login";
    const isRegisterPage = location.pathname === "/registreren";
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
                        console.log('Profile data:', data);
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
            {!(isLoginPage || isRegisterPage) && <Navbar/>}
            <div className="container mx-auto flex-grow py-4">
                <Routes>
                    <Route path="*" element={<h1>Not Found</h1>}/>
                    <Route path="/" element={<ProtectedRoute access="everyone"><Home/></ProtectedRoute>}/>

                    <Route path="/login" element={<Login/>}/>
                    <Route path="/registreren" element={<Register/>}/>

                    <Route path="/workshop-templates"
                           element={<ProtectedRoute access="admin"><WorkshopTemplates/></ProtectedRoute>}/>
                    <Route path="/mail-templates"
                           element={<ProtectedRoute access="admin"><MailTemplates/></ProtectedRoute>}/>
                    <Route path="/workshop-docenten"
                           element={<ProtectedRoute access="admin"><Teachers/></ProtectedRoute>}/>
                    <Route path="/werklocaties"
                           element={<ProtectedRoute access="admin"><Worklocation/></ProtectedRoute>}/>
                    <Route path="/klanten" element={<ProtectedRoute access="admin"><Customers/></ProtectedRoute>}/>
                    <Route path="/inschrijvingen"
                           element={<ProtectedRoute access="admin"><TeacherEnrollments/></ProtectedRoute>}/>
                    <Route path="/workshops" element={<ProtectedRoute access="admin"><Workshops/></ProtectedRoute>}/>

                    <Route path="/opdrachten"
                           element={<ProtectedRoute access="admin"><Commissions/></ProtectedRoute>}/>
                    <Route path="/profiel" element={<ProtectedRoute access="everyone"><Profile/></ProtectedRoute>}/>
                    <Route path="/openstaande-workshops"
                           element={<ProtectedRoute access="everyone"><OpenWorkshops/></ProtectedRoute>}/>
                    <Route path='/uitnodigingen'
                           element={<ProtectedRoute access="teacher"><Invites/></ProtectedRoute>}/>
                    <Route path='/mail'
                           element={<ProtectedRoute access="everyone"><TempMail/></ProtectedRoute>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;
