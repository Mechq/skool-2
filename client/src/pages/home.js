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
        console.log("Decoded token: ", user);
    }, []);



    if (loading) {
        return <div>Loading...</div>;
    }
else {
        return (
            <>
                <div className='bg-white rounded-lg shadow-lg p-6 mb-8 text-center'>

                    <h1 className='text-2xl font-bold mb-4'>
                        Welkom <span className='text-brand-orange'>{user.name}</span>, je volgende workshop is gepland
                        op <span className='text-brand-orange'>{user?.nextWorkshopDate}</span>
                    </h1>

                </div>
                <div className='block mb-2 text-sm font-medium text-gray-900 pl-6'>
                    <h1 pd-><strong>Inschrijvingen</strong></h1>
                    <DashboardCardsCommission user={user}/>
                </div>

            </>
        );
    }
}

export default Home;