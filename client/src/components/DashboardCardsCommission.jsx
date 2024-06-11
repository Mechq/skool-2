import React, { useEffect, useState } from "react";
import UserCommissionCard from "./UserCommissionCard";
import DashboardCardsCommissionDetails from "./modal-screens/DashboardCardsCommissionDetails";


export default function DashboardCardsCommission({ user }) {
    const [commissions, setCommissions] = useState([]);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedWorkshop, setSelectedWorkshop] = useState(null);
    const [selectedCommission, setSelectedCommission] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [userWorkshops, setUserWorkshops] = useState([]);
    const [loading, setLoading] = useState(true);
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
                const [workshopsRes, commissionsRes] = await Promise.all([
                    fetch(`/api/dashboard/${user.id}`),
                    fetch('/api/commission')
                ]);

                const workshopsData = await workshopsRes.json();
                const commissionsData = await commissionsRes.json();

                const workshopsWithUniqueKey = workshopsData.data.map((workshop, index) => ({
                    ...workshop,
                    unique: index + 1 // Incremented number starting from 1
                }));

                setUserWorkshops(workshopsWithUniqueKey);
                console.log("Fetched workshops: ", workshopsWithUniqueKey);

                setCommissions(commissionsData.data);
                console.log("Fetched commissions: ", commissionsData.data);

            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user.id, setUserWorkshops, setCommissions]);

    const getCommission = (commissionId) => {
        const commission = commissions.find(c => c.id === commissionId);
        if (commission) {
            return commission;
        }
        return 'Unknown Commission';
    }

    const getCommissionDate = (commissionId) => {
        console.log("commissionId", commissionId)
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

    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <>

            {showDetailsModal && (
                <div>
                    <DashboardCardsCommissionDetails
                        onClose={handleModalClose}
                        workshop={selectedWorkshop}
                        commission={selectedCommission}
                    />
                </div>
            )}

            {userWorkshops.map((userWorkshop) => (
                <div
                    onClick={(e) => handleDetailsClick(userWorkshop, getCommission(userWorkshop.commissionId), e)}
                >
                    <UserCommissionCard
                        key={userWorkshop.unique}
                        userWorkshop={userWorkshop}
                        commissionDate={getCommissionDate(userWorkshop.commissionId)} // Assuming id corresponds to commission id
                    />
                </div>
            ))}
        </>
    );
}