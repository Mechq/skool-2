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



    useEffect(() => {
        console.log('userWorkshops', userWorkshops);
        if (userWorkshops) {
            const accepted = userWorkshops.filter((workshop) => workshop.status === 'geaccepteerd');
            const limitedAccepted = accepted.slice(0, 5);
            setAcceptedWorkshops(limitedAccepted);
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
            {acceptedWorkshops && acceptedWorkshops.map((acceptedUserWorkshop) => ( // Check if userWorkshops is defined

                <div
                    key={acceptedUserWorkshop.enrollmentId}
                    onClick={(e) => handleDetailsClick(acceptedUserWorkshop,getCommission(acceptedUserWorkshop.commissionId), e)}
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
