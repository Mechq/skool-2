import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Adjusted import statement

const ProtectedRoute = ({ children, access }) => {
    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to="/login" />;
    }

    try {
        const decodedToken = jwtDecode(token, process.env.ACCESS_TOKEN_SECRET);

        if (!decodedToken) {
            return <Navigate to="/login" />;
        }

        if (access === 'admin' && decodedToken.role !== 'admin') {
            return <Navigate to="/" />;
        }

        if (access === 'teacher' && decodedToken.role !== 'teacher') {
            return <Navigate to="/" />;
        }
    } catch (error) {
        console.error('Error decoding token:', error);
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;
