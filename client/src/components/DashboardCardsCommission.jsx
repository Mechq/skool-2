import React, { useEffect, useState } from "react";
import UserCommissionCard from "./UserCommissionCard";
import DashboardCardsCommissionDetails from "./modal-screens/DashboardCardsCommissionDetails";

export default function DashboardCardsCommission({ user }) {
    const [commissions, setCommissions] = useState([]);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedWorkshop, setSelectedWorkshop] = useState(null);
    const [selectedCommission, setSelectedCommission] = useState(null);
    const [userWorkshops, setUserWorkshops] = useState([]);
    const [loading, setLoading] = useState(true);
    const [workshopCommission, setWorkshopCommission] = useState([]);

    const handleDetailsClick = (workshop, commission, e) => {
        e.preventDefault();
        setSelectedWorkshop(workshop);
        setSelectedCommission(commission);
        setShowDetailsModal(true);
    };

    const handleModalClose = () => {
        setShowDetailsModal(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [workshopsRes, commissionsRes, workshopCommissionRes] = await Promise.all([
                    fetch(`/api/dashboard/${user.id}`),
                    fetch('/api/commission/'),
                    fetch('/api/workshop/commission')
                ]);

                const workshopsData = await workshopsRes.json();
                const commissionsData = await commissionsRes.json();
                const workshopCommissionData = await workshopCommissionRes.json();

                const workshopsWithUniqueKey = workshopsData.data.map((workshop, index) => ({
                    ...workshop,
                    unique: index + 1 // Incremented number starting from 1
                }));

                setUserWorkshops(workshopsWithUniqueKey);
                console.log("Fetched workshops: ", workshopsWithUniqueKey);

                setCommissions(commissionsData.data);
                console.log("Fetched commissions: ", commissionsData.data);

                setWorkshopCommission(workshopCommissionData.data);
                console.log("Fetched workshopCommission: ", workshopCommissionData.data);

            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user.id]);

    const getCommission = (commissionId) => {
        console.log("workshopCommission", workshopCommission)
        const commission = workshopCommission.find(c => c.commissionId === commissionId);
        return commission ? commission : 'Unknown Commission';
    }

    const getCommissionDate = (commissionId) => {
        console.log("workshopCommission")
        const commission = workshopCommission.find(c => c.commissionId === commissionId);
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

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            {showDetailsModal && (
                <DashboardCardsCommissionDetails
                    user={user}
                    onClose={handleModalClose}
                    workshop={selectedWorkshop}
                    commission={selectedCommission}
                />
            )}

            {userWorkshops.map((userWorkshop) => (
                <div
                    key={userWorkshop.unique}
                    onClick={(e) => handleDetailsClick(userWorkshop, getCommission(userWorkshop.commissionId), e)}
                >

                    <UserCommissionCard
                        onClose={handleModalClose}
                        userWorkshop={userWorkshop}
                        commissionDate={getCommissionDate(userWorkshop.commissionId)}
                    />
                </div>
            ))}
        </>
    );
}
