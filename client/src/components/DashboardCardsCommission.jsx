import React, { useEffect, useState } from "react";
import UserCommissionCard from "./UserCommissionCard";
import UserWorkshopDetailsModalScreen from "./modal-screens/UserWorkshopDetailsModalScreen";

export default function DashboardCardsCommission({ user, userWorkshops, setUserWorkshops }) {
    const [commissions, setCommissions] = useState([]);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedWorkshop, setSelectedWorkshop] = useState(null);
    const [selectedCommission, setSelectedCommission] = useState(null);
    const [loading, setLoading] = useState(true);
    const [workshopCommission, setWorkshopCommission] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const[acceptedWorkshops, setAcceptedWorkshops] = useState([]);

    const handleDetailsClick = (workshop, commission, e) => {
        e.preventDefault();
        setSelectedWorkshop(workshop);
        setSelectedCommission(commission);
        setShowDetailsModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        setShowDetailsModal(false);
    };

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const [, commissionsRes] = await Promise.all([
    //                 fetch('/api/commission/'),
    //             ]);
    //
    //             const commissionsData = await commissionsRes.json();
    //
    //             const workshopsWithUniqueKey = userWorkshops.data.map((workshop, index) => ({
    //                 ...workshop,
    //                 unique: index + 1 // Incremented number starting from 1
    //             }));
    //
    //             setUserWorkshops(workshopsWithUniqueKey);
    //
    //             setCommissions(commissionsData.data);
    //
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };
    //
    //     fetchData();
    //
    //
    // }, [user.id, setUserWorkshops]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const res = await fetch('/api/workshop/commission');
    //             if (!res.ok) {
    //                 throw new Error('Failed to fetch data');
    //             }
    //             const data = await res.json();
    //             setWorkshopCommission(data.data);
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };
    //
    //     fetchData();
    // }, []);


    useEffect(() => {
        console.log('userWorkshops', userWorkshops);
        if (userWorkshops) {
            const accepted = userWorkshops.filter((workshop) => workshop.status === 'geaccepteerd');
            setAcceptedWorkshops(accepted);
            setLoading(false);
        }
    }, [userWorkshops]);


    const formatDate = (commissionDate) => {
        if (commissionDate) {
            const date = new Date(
                typeof commissionDate === 'string' ? commissionDate : commissionDate.date
            );
            return date.toLocaleDateString('nl-NL', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
            });
        }

        return 'Unknown Date';
    };



    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            {showDetailsModal && (
                <UserWorkshopDetailsModalScreen
                    onClose={handleModalClose}
                    workshop={selectedWorkshop}
                    commission={selectedCommission}
                />
            )}
            {acceptedWorkshops && acceptedWorkshops.map((acceptedUserWorkshop) => ( // Check if userWorkshops is defined

                <div
                    key={acceptedUserWorkshop.enrollmentId}
                    onClick={(e) => handleDetailsClick(acceptedUserWorkshop,acceptedUserWorkshop.commissionId, e)}
                >
                    <UserCommissionCard
                        onClose={handleModalClose}
                        userWorkshop={acceptedUserWorkshop}
                        commissionDate={formatDate(acceptedUserWorkshop.date)}

                    />
                </div>
            ))}
        </>
    );
}
