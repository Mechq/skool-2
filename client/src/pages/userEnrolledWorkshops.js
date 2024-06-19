import React, { useEffect, useState } from 'react';
import DashboardCardsCommission from '../components/Cards/DashboardCardsCommission';
import {jwtDecode} from 'jwt-decode';

export default function UserEnrolledWorkshops() {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [commissions, setCommissions] = useState([]);
    const [userWorkshops, setUserWorkshops] = useState([]);
    const [times, setTimes] = useState([]);
    const [acceptedWorkshops, setAcceptedWorkshops] = useState([]);

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
                    if (!res.ok) {
                        console.error('Failed to fetch user data');
                        return;
                    }
                    if (!commissionDataRes.ok) {
                        console.error('Failed to fetch commission data');
                        return;
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

        fetchData().then();
    }, []);

    useEffect(() => {
        if (userWorkshops) {
            const accepted = userWorkshops.filter((workshop) => workshop.status === 'geaccepteerd');
            setAcceptedWorkshops(accepted);
            setLoading(false);
        }
    }, [userWorkshops]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex justify-center">
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="block mb-2 text-sm font-medium max-w-8xl text-gray-900 flex-1">
                    <h1 className="text-3xl font-bold mb-4">Mijn Opdrachten</h1>
                    {acceptedWorkshops.length > 0 ? (
                        <DashboardCardsCommission userWorkshops={acceptedWorkshops} />
                    ) : (
                        <p className="text-lg">Er zijn geen geaccepteerde workshops.</p>
                    )}
                </div>
            </div>
        </div>

);
}

