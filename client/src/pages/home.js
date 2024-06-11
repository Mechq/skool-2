import React, { useState, useEffect } from 'react';
import DashboardCardsCommission from '../components/DashboardCardsCommission';
import {jwtDecode} from "jwt-decode";

function Home() {
    const [disableUseEffect, setDisableUseEffect] = useState(false);
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [userWorkshop, setUserWorkshop] = useState({});
    const [commissions, setCommissions] = useState([]);

    const getCommissionDate = (commissionId) => {
        const commission = commissions.find(c => c.id === commissionId);
        console.log("commission", commission)
        if (commission) {
            const date = new Date(commission.date);
            return date.toLocaleDateString('nl-NL', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
            });
        }
        return 'Unknown Date';
    };




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
        <>
        <div className='bg-white rounded-lg shadow-lg p-6 mb-8 text-center'>
            
        <h1 className='text-2xl font-bold mb-4'>
    Welkom <span className='text-brand-orange'>{user.firstName}</span>, je volgende workshop is gepland op <span className='text-brand-orange'>{getCommissionDate(userWorkshop.commissionId)}</span>
</h1>

        </div>
        <div className='block mb-2 text-sm font-medium text-gray-900 pl-6'>
            <h1 pd-><strong>Inschrijvingen</strong></h1>
            <DashboardCardsCommission user={user} />
        </div>

        </>
    );
}

export default Home;