import React, { useState, useEffect } from 'react';
import DashboardCardsCommission from '../components/DashboardCardsCommission';
import {jwtDecode} from "jwt-decode";

function Home() {
    const [disableUseEffect, setDisableUseEffect] = useState(false);
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [commissions, setCommissions] = useState([]);
    const [userWorkshops, setUserWorkshops] = useState([]);


    const getEarliestDate = (items) => {
        if (!items || items.length === 0) {
            return null; // Return null if the list is empty or not provided
        }

        // Parse the dates and sort the items by date
        const sortedItems = items.sort((a, b) => new Date(a.date) - new Date(b.date));

        // Return the earliest date
        return sortedItems[0].date;
    };

    const formatDate = (date) => {
        if (!date) return "";
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString("nl-NL", options);
    }


    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const decodedToken = jwtDecode(token);
                    setUser(decodedToken);
                    // console.log("User: ", decodedToken.id)
                    const res = await fetch(`/api/dashboard/${decodedToken.id}`);
                    const commissionDataRes = await fetch('/api/commission/');
                    if (!res.ok) {
                        throw new Error('Failed to fetch data');
                    }
                    const data = await res.json();
                    const commissionData = await commissionDataRes.json();
                    setCommissions(commissionData.data);

                    setUserWorkshops(data.data);
                    console.log("Fetched workshops: ", data.data);
                    console.log(userWorkshops); // Print fetched data after setting state
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);






    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className='bg-white rounded-lg shadow-lg p-6 mb-8 text-center'>
                <h1 className='text-2xl font-bold mb-4'>
                    {console.log(userWorkshops)}
                    Welkom <span className='text-brand-orange'>{user.firstName}</span>, je volgende workshop is gepland op <span className='text-brand-orange'>{formatDate(getEarliestDate(userWorkshops))}</span>
                </h1>
            </div>
            <div className='flex'>
                <div className='block mb-2 text-sm font-medium text-gray-900 pl-24 flex-1'>
                    <h1 className='text-2xl mb-4 pd-6'><strong>Inschrijvingen</strong></h1>
                    <DashboardCardsCommission user={user}
                                              userWorkshops={userWorkshops}
                                              setUserWorkshops={setUserWorkshops}/>
                </div>
                <div className='block mb-2 text-sm font-medium text-gray-900 text-right pr-24 flex-1'>
                    <h1 className='text-2xl mb-4 pd-6'><strong>Openstaand</strong></h1>
                </div>
            </div>
        </>
    );
}

export default Home;