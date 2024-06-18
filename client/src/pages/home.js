import React, { useEffect, useState } from 'react';
import DashboardCardsCommission from '../components/Cards/DashboardCardsCommission';
import {jwtDecode} from 'jwt-decode';

function Home() {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [commissions, setCommissions] = useState([]);
    const [userWorkshops, setUserWorkshops] = useState([]);
    const [times, setTimes] = useState([]);
    const [acceptedWorkshops, setAcceptedWorkshops] = useState([]);
    const [signedUpWorkshops, setSignedUpWorkshops] = useState([]);
    const [invitedWorkshops, setInvitedWorkshops] = useState([]);
    const [inviteState, setInviteState] = useState(false);

    const getEarliestDate = (items) => {
        if (!items || items.length === 0) {
            return null;
        }
        const sortedItems = items.sort((a, b) => new Date(a.commissionDate) - new Date(b.commissionDate));
        return sortedItems[0].commissionDate;
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

    const fetchInvitedWorkshops = async (userId) => {
        try {
            const res = await fetch(`/api/invite/user/${userId}`);
            const data = await res.json();
            console.log(" aaaaaaaaaaaaa" , data.data)
            setInvitedWorkshops(data.data);
            setInviteState(true);
        } catch (error) {
            console.error('Error fetching invited workshops:', error);
            setInvitedWorkshops([]);
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

                    await fetchInvitedWorkshops(decodedToken.id);
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
            const signedUp = userWorkshops.filter((workshop) => workshop.status === 'aangemeld');
            const limitedAccepted = accepted.slice(0, 5);
            setAcceptedWorkshops(limitedAccepted);
            setSignedUpWorkshops(signedUp);
            setLoading(false);
        }
    }, [userWorkshops]);

    if (loading) {
        return <div>Loading...</div>;
    }

    const earliestDate = getEarliestDate(acceptedWorkshops);

    return (
        <>
            <div className='bg-white rounded-lg shadow-lg p-6 mb-8 text-center m-8'>
                <h1 className='text-2xl font-bold mb-4'>
                    Welkom <span className='text-brand-orange'>{user.firstName}</span>,{' '}
                    {acceptedWorkshops.length > 0 ? (
                        <>
                            je volgende workshop is gepland op <span className='text-brand-orange'>
                            {earliestDate ? `${formatDate(earliestDate)} om ${times.startTime}` : ''}
                        </span>
                        </>
                    ) : (
                        <span> er zijn geen workshops gepland</span>
                    )}
                </h1>
            </div>
            <div className='flex'>
                <div className='block mb-2 text-sm font-medium text-gray-900 pl-24 flex-1'>
                    <h1 className='text-2xl mb-4 pd-6'><strong>Bevestigingen</strong></h1>
                    {acceptedWorkshops.length > 0 ? (
                        <DashboardCardsCommission userWorkshops={acceptedWorkshops} inviteState={inviteState} />
                    ) : (
                        <p>Er zijn geen bevestigde workshops.</p>
                    )}
                </div>
                <div className='block mb-2 text-sm font-medium text-gray-900 pr-24 flex-1'>
                    <h1 className='text-2xl mb-4 pd-6'><strong>Aangemelde workshops</strong></h1>
                    {signedUpWorkshops.length > 0 ? (
                        <DashboardCardsCommission userWorkshops={signedUpWorkshops} inviteState={inviteState} />
                    ) : (
                        <p>Er zijn geen ingeschreven workshops.</p>
                    )}
                </div>
                <div className='block mb-2 text-sm font-medium text-gray-900 pr-24 flex-1'>
                    <h1 className='text-2xl mb-4 pd-6'><strong>Uitgenodigde workshops</strong></h1>
                    {invitedWorkshops.length > 0 ? (
                        <DashboardCardsCommission userWorkshops={invitedWorkshops} inviteState={inviteState} />
                    ) : (
                        <p>Er zijn geen uitgenodigde workshops.</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default Home;
