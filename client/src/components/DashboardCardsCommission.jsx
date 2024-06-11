import React, { useEffect, useState } from "react";
import UserCommissionCard from "./UserCommissionCard";
import DashboardCardsCommissionDetails from "./modal-screens/DashboardCardsCommissionDetails";
import UserWorkshopDetailsModalScreen from "./modal-screens/UserWorkshopDetailsModalScreen";

export default function DashboardCardsCommission({ user, userWorkshops, setUserWorkshops }) {
    const [commissions, setCommissions] = useState([]);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedWorkshop, setSelectedWorkshop] = useState(null);
    const [selectedCommission, setSelectedCommission] = useState(null);
    const [loading, setLoading] = useState(true);
    const [workshopCommission, setWorkshopCommission] = useState([]);
    const [showModal, setShowModal] = useState(false);

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [, commissionsRes] = await Promise.all([
                    fetch('/api/commission/'),
                ]);

                const commissionsData = await commissionsRes.json();

                const workshopsWithUniqueKey = userWorkshops.data.map((workshop, index) => ({
                    ...workshop,
                    unique: index + 1 // Incremented number starting from 1
                }));

                setUserWorkshops(workshopsWithUniqueKey);

                setCommissions(commissionsData.data);

            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();


    }, [user.id, setUserWorkshops]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/workshop/commission');
                if (!res.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await res.json();
                setWorkshopCommission(data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    if (workshopCommission){
        console.log("allWorkshopCommissionsData", workshopCommission)}



    const getCommission = (commissionId) => {
        const commission = workshopCommission.find(c => c.commissionId === commissionId);
        return commission ? commission : 'Unknown Commission';
    }

    const getCommissionDate = (commissionId) => {
        console.log("commissionId:", commissionId);
        console.log("workshopCommission:", workshopCommission);

        // Find the commission by commissionId
        const commission = workshopCommission.find(c => c.commissionId === commissionId);
        console.log("Found commission:", commission);

        if (commission) {
            const date = new Date(commission.date);
            console.log("Commission date:", date);
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
            {userWorkshops && userWorkshops.map((userWorkshop) => ( // Check if userWorkshops is defined
                <div
                    key={userWorkshop.unique}
                    onClick={(e) => handleDetailsClick(userWorkshop, getCommission(userWorkshop.commissionId), e)}
                >
                    <UserCommissionCard
                        onClose={handleModalClose}
                        userWorkshop={userWorkshop}
                        commissionDate={getCommissionDate(userWorkshop.commissionId)}

                    />
                    {console.log("userWorkshop", userWorkshop)}
                </div>
            ))}
        </>
    );
}
