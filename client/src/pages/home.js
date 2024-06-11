import React, { useState, useEffect } from 'react';
import PageSecurity from "../PageSecurity";
import DashboardCardsCommission from '../components/DashboardCardsCommission';
import {jwtDecode} from "jwt-decode";

function Home() {
    const [disableUseEffect, setDisableUseEffect] = useState(false);
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            let decodedToken;
            const token = localStorage.getItem('token');
            if (token) {
                decodedToken = jwtDecode(token);
                setUser(decodedToken);
            }
            setLoading(false);

        }
        fetchData();
    }, []);



    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='block mb-2 text-sm font-medium text-gray-900'>
            <h1><strong>Inschrijvingen</strong></h1>
            <DashboardCardsCommission user={user} />
        </div>
    );
}

export default Home;