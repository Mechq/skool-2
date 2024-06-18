import React, {useState} from "react";
import UserCommissionCard from "./UserCommissionCard";
import UserWorkshopDetailsModalScreen from "../UserWorkshopDetailsModalScreen";

export default function DashboardCardsCommission({userWorkshops, inviteState}) {
    console.log(" bbbbbbbbbbbbbb" ,userWorkshops);
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
                typeof commissionDate === 'string' ? commissionDate : commissionDate.formatDate
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
            console.log(commission);
            return {
                id: commission.commissionId,
                date: commission.commissionDate,
                materials: commission.materials,
                targetAudience: commission.targetAudience,
                locationId: commission.locationId,
                details: commission.details,
                customerId: commission.customerId,
            };
        }
        return 'Unknown Commissions';
    }
    const refreshPage = () => {
        window.location.reload();
    };

    return (
        <>
            {showDetailsModal && (
                <UserWorkshopDetailsModalScreen
                inviteState={inviteState}

                    onClose={handleModalClose}
                    workshop={selectedWorkshop}
                    commission={selectedCommission}
                    onRefresh={refreshPage}
                />
            )}
            {userWorkshops && userWorkshops.map((userWorkshop) => (
                <div
                    key={userWorkshop.enrollmentId}
                    onClick={(e) => handleDetailsClick(userWorkshop, getCommission(userWorkshop.commissionId), e)}
                >
                    <UserCommissionCard
                        onClose={handleModalClose}
                        userWorkshop={userWorkshop}
                        commissionDate={formatDate(userWorkshop.commissionDate)}
                    />
                </div>
            ))}
        </>
    );
}
