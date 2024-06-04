import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';

export default function PageSecurity() {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const navigate = useNavigate();
    const cookies = new Cookies();

    useEffect(() => {
        // Check if the user is authenticated
        fetch('http://localhost:5000/api/verifyToken', {
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
            console.log('Token:', token); // Ensure this logs the correct token
        }
    }, [isAuthenticated, navigate, cookies]);

    if (isAuthenticated === null) {
        // Optionally render a loading indicator while checking authentication status
        return <div>Loading...</div>;
    }

    if (isAuthenticated === true) {
        return (
            <div>
                {/* Render your protected content here */}
                Protected Content
            </div>
        );
    }

    return null; // This line ensures nothing is rendered while redirecting
}
