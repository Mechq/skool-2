import React, { useEffect, useState } from "react";
import UserCommissionCard from "./UserCommissionCard";
import UserWorkshopDetailsModalScreen from "./modal-screens/UserWorkshopDetailsModalScreen";

export default function DashboardCardsCommission({ user, userWorkshops, setUserWorkshops }) {
    console.log("UserWorkshops: ", userWorkshops)
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


    const getCommission = (commissionId) => {
        const commission = userWorkshops.find(c => c.commissionId === commissionId);
        if (commission) {
            console.log("commission", commission)
            return {
                id: commission.commissionId,
                date: commission.date,
                materials: commission.materials,
                targetAudience: commission.targetAudience,
                locationId: commission.locationId,
                details: commission.details,
                customerId: commission.customerId,
            };
        }
        return 'Unknown Commission';
    }
    const refreshPage = () => {
        window.location.reload();
    };


    return (
        <>
            {showDetailsModal && (
                <UserWorkshopDetailsModalScreen
                    onClose={handleModalClose}
                    workshop={selectedWorkshop}
                    commission={selectedCommission}
                    onRefresh={refreshPage}
                />
            )}
            {userWorkshops && userWorkshops.map((userWorkshop) => ( // Check if userWorkshops is defined

                <div
                    key={userWorkshop.enrollmentId}
                    onClick={(e) => handleDetailsClick(userWorkshop,getCommission(userWorkshop.commissionId), e)}
                >
                    <UserCommissionCard
                        onClose={handleModalClose}
                        userWorkshop={userWorkshop}
                        commissionDate={formatDate(userWorkshop.date)}

                    />
                </div>
            ))}
        </>
    );
}
