import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export default function PageSecurity() {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const navigate = useNavigate();
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

    if (isAuthenticated === false) {
        navigate('/login');
        return null;
    }
}