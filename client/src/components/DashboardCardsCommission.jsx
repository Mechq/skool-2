import React, { useEffect, useState } from "react";
import UserCommissionCard from "./UserCommissionCard";
import DashboardCardsCommissionDetails from "./modal-screens/DashboardCardsCommissionDetails";


export default function DashboardCardsCommission({ userWorkshops, setUserWorkshops }) {
    const [commissions, setCommissions] = useState([]);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedWorkshop, setSelectedWorkshop] = useState(null);
    const [selectedCommission, setSelectedCommission] = useState(null);
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
        fetch('/api/workshop/commission')
            .then(res => res.json())
            .then(data => {
                const workshopsWithUniqueKey = data.data.map((workshop, index) => ({
                    ...workshop,
                    unique: index + 1 // Incremented number starting from 1
                }));
                setUserWorkshops(workshopsWithUniqueKey);
                console.log("Fetched workshops: ", workshopsWithUniqueKey);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [setUserWorkshops]);

    useEffect(() => {
        fetch('/api/commission/')
            .then(res => res.json())
            .then(data => {
                setCommissions(data.data);
                console.log("Fetched commissions: ", data.data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const getCommission = (commissionId) => {
        const commission = commissions.find(c => c.id === commissionId);
        if (commission) {
            return commission;
        }
        return 'Unknown Commission';
    }

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