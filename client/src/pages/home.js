import React, {useEffect, useState} from "react";
import DashboardCardsCommission from "../components/Cards/DashboardCardsCommission";
import {jwtDecode} from "jwt-decode";

function Home() {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [commissions, setCommissions] = useState([]);
    const [userWorkshops, setUserWorkshops] = useState([]);
    const [times, setTimes] = useState([]);
    const [acceptedWorkshops, setAcceptedWorkshops] = useState([]);
    const [signedUpWorkshops, setSignedUpWorkshops] = useState([]);
    const [invitedWorkshops, setInvitedWorkshops] = useState([]);

    const getEarliestDate = (items) => {
        if (!items || items.length === 0) {
            return null;
        }
        const sortedItems = items.sort(
            (a, b) => new Date(a.commissionDate) - new Date(b.commissionDate)
        );
        return sortedItems[0].commissionDate;
    };

    const formatDate = (date) => {
        if (!date) return "";
        const options = {year: "numeric", month: "long", day: "numeric"};
        return new Date(date).toLocaleDateString("nl-NL", options);
    };

    const fetchTimes = async (commissionId) => {
        try {
            const res = await fetch(`/api/commission/time/${commissionId}`);
            const data = await res.json();
            setTimes(data.data);
        } catch (error) {
            console.error("Error fetching time data:", error);
        }
    };

    const fetchInvitedWorkshops = async (userId) => {
        try {
            const res = await fetch(`/api/invite/user/${userId}`);
            const data = await res.json();

            const limitedInvitedWorkshops = data.data.slice(0, 4);
            setInvitedWorkshops(limitedInvitedWorkshops);
        } catch (error) {
            console.error("Error fetching invited workshops:", error);
            setInvitedWorkshops([]);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                if (token) {
                    const decodedToken = jwtDecode(token);
                    setUser(decodedToken);

                    const res = await fetch(`/api/dashboard/${decodedToken.id}`);
                    const commissionDataRes = await fetch("/api/commission/");
                    if (!res.ok) {
                        console.error("Failed to fetch user data");
                        return;
                    }
                    if (!commissionDataRes.ok) {
                        console.error("Failed to fetch commission data");
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
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData().then();
    }, []);

    useEffect(() => {
        if (userWorkshops) {
            const accepted = userWorkshops.filter(
                (workshop) => workshop.status === "geaccepteerd"
            );
            const signedUp = userWorkshops.filter(
                (workshop) => workshop.status === "aangemeld"
            );
            const limitedAccepted = accepted.slice(0, 4);
            setAcceptedWorkshops(limitedAccepted);

            const limitedSignedUp = signedUp.slice(0, 4);
            setSignedUpWorkshops(limitedSignedUp);

            setLoading(false);
        }
    }, [userWorkshops]);

    if (loading) {
        return <div>Loading...</div>;
    }

    const earliestDate = getEarliestDate(acceptedWorkshops);

    return (
        <div className="px-3 md:px-0">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8 text-center">
                <h1 className="text-2xl font-bold mb-4">
                    Welkom <span className="text-brand-orange">{user.firstName}</span>,
                    <span className="block sm:inline">{" "}</span>
                    {acceptedWorkshops.length > 0 ? (
                        <>
                            je volgende workshop is gepland op{" "}
                            <span className="sm:inline block">
            <span className="text-brand-orange">
              {earliestDate ? (
                  <>
                      {formatDate(earliestDate)}{" "}
                      <span className="text-black">om</span> {times.startTime}
                  </>
              ) : ""}
            </span>.
          </span>
                        </>
                    ) : (
                        <span> er zijn geen workshops gepland.</span>
                    )}
                </h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                <div className="block mb-8 text-sm font-medium text-gray-900">
                    <h1 className="text-2xl mb-4">
                        <strong>Bevestigingen</strong>
                    </h1>
                    {acceptedWorkshops.length > 0 ? (
                        <DashboardCardsCommission userWorkshops={acceptedWorkshops}/>
                    ) : (
                        <p className="text-gray-500">Er zijn geen bevestigde workshops.</p>
                    )}
                </div>
                <div className="block mb-8 text-sm font-medium text-gray-900">
                    <h1 className="text-2xl mb-4">
                        <strong>Aangemelde workshops</strong>
                    </h1>
                    {signedUpWorkshops.length > 0 ? (
                        <DashboardCardsCommission userWorkshops={signedUpWorkshops}/>
                    ) : (
                        <p className="text-gray-500">Er zijn geen ingeschreven workshops.</p>
                    )}
                </div>
                <div className="block mb-8 text-sm font-medium text-gray-900">
                    <h1 className="text-2xl mb-4">
                        <strong>Uitgenodigde workshops</strong>
                    </h1>
                    {invitedWorkshops.length > 0 ? (
                        <DashboardCardsCommission userWorkshops={invitedWorkshops}/>
                    ) : (
                        <p className="text-gray-500">Er zijn geen uitgenodigde workshops.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;
