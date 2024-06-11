import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';
import { jwtDecode } from 'jwt-decode';
import {use} from "chai";

export default function PageSecurity() {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [email, setEmail] = useState(null); // Add this line
    const [role, setRole] = useState(null)
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
            console.log(role)
            console.log(decodedToken)
        }
    }, [isAuthenticated, navigate]);

    return {email, role}; // Return the email state
}