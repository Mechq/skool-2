import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';
import { jwtDecode } from 'jwt-decode';
import {use} from "chai";

export default function PageSecurity() {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [email, setEmail] = useState(null); // Add this line
    const [role, setRole] = useState(null)
    const[user, setUser] = useState(null)
    const navigate = useNavigate();
    const cookies = new Cookies();

    useEffect(() => {
        // Check if the user is authenticated
        fetch('/api/verifyToken', {
            method: 'POST',
            credentials: 'include', // Include cookies
        })
            .then(res => {
                if (res.status === 200) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            })
            .catch(error => {
                console.error('Error verifying token:', error);
                setIsAuthenticated(false);
            });
    }, []);

    useEffect(() => {
        if (isAuthenticated === false) {
            navigate('/login');
        } else if (isAuthenticated === true) {
            const token = cookies.get('token');
            const decodedToken = jwtDecode(token);
            setEmail(decodedToken.user.email); // Set the email state
            setRole(decodedToken.user.role)

            // Only update user state if decodedToken.user is different from current user state
            if (JSON.stringify(user) !== JSON.stringify(decodedToken.user)) {
                setUser(decodedToken.user);
            }
            console.log(user)
        }
    }, [isAuthenticated, navigate, cookies, user]);

    return user; // Return the email state
}