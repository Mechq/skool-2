import React, { useState, useEffect } from 'react';
import DashboardCardsCommission from '../components/DashboardCardsCommission';
import { jwtDecode } from "jwt-decode";

function Home() {
    const [disableUseEffect, setDisableUseEffect] = useState(false);
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [commissions, setCommissions] = useState([]);
    const [userWorkshops, setUserWorkshops] = useState([]);
    const [times, setTimes] = useState([]);
    const[acceptedWorkshops, setAcceptedWorkshops] = useState([]);
    const[signedUpWorkshops, setSignedUpWorkshops] = useState([]);

    const getEarliestDate = (items) => {
        if (!items || items.length === 0) {
            return null;
        }
        const sortedItems = items.sort((a, b) => new Date(a.date) - new Date(b.date));
        return sortedItems[0].date;
    };

    const formatDate = (date) => {
        if (!date) return "";
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString("nl-NL", options);
    }

    const fetchTimes = async (commissionId) => {
        try {
            const res = await fetch(`/api/commission/time/${commissionId}`);
            const data = await res.json();
            setTimes(data.data);
        } catch (error) {
            console.error('Error fetching time data:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const decodedToken = jwtDecode(token);
                    setUser(decodedToken);

                    const res = await fetch(`/api/dashboard/${decodedToken.id}`);
                    const commissionDataRes = await fetch('/api/commission/');
                    if (!res.ok || !commissionDataRes.ok) {
                        throw new Error('Failed to fetch data');
                    }
                    
                    const data = await res.json();
                    const commissionData = await commissionDataRes.json();
                    setCommissions(commissionData.data);
                    setUserWorkshops(data.data);

                    if (data.data && data.data.length > 0) {
                        await fetchTimes(data.data[0].commissionId);
                    }
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        console.log('userWorkshops', userWorkshops);
        if (userWorkshops) {
            const accepted = userWorkshops.filter((workshop) => workshop.status === 'geaccepteerd');
            const signedUp = userWorkshops.filter((workshop) => workshop.status === 'aangemeld');
            console.log(signedUp)
            const limitedAccepted = accepted.slice(0, 5);
            setAcceptedWorkshops(limitedAccepted);
            setSignedUpWorkshops(signedUp);
            setLoading(false);
        }
    }, [userWorkshops]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className='bg-white rounded-lg shadow-lg p-6 mb-8 text-center'>
                <h1 className='text-2xl font-bold mb-4'>
                    Welkom <span className='text-brand-orange'>{user.firstName}</span>, je volgende workshop is gepland op <span className='text-brand-orange'>{formatDate(getEarliestDate(userWorkshops))} om {times.startTime}</span>
                </h1>
            </div>
            <div className='flex'>
                <div className='block mb-2 text-sm font-medium text-gray-900 pl-24 flex-1'>
                    <h1 className='text-2xl mb-4 pd-6'><strong>Aankomende inschrijvingen</strong></h1>
                    <DashboardCardsCommission user={user}
                                              userWorkshops={acceptedWorkshops}
                                              setUserWorkshops={setAcceptedWorkshops}/>
                </div>
                <div className='block mb-2 text-sm font-medium text-gray-900     pr-24 flex-1'>
                    <h1 className='text-2xl mb-4 pd-6'><strong>Openstaand</strong></h1>
                    <DashboardCardsCommission user={user}
                                              userWorkshops={signedUpWorkshops}
                                              setUserWorkshops={setSignedUpWorkshops}/>
                </div>
            </div>
        </>
    );
}

export default Home;
