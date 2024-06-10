import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';
import { jwtDecode } from 'jwt-decode';
import {use} from "chai";

export default function PageSecurity() {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [user ,setUser] = useState({}); // Add this line
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
            setUser(decodedToken.user); // Set the email state

            // console.log(user)
        }
    }, [isAuthenticated, navigate, cookies]);

    return user; // Return the email state
}