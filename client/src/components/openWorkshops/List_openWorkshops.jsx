import React, { useEffect, useState } from "react";
import UserWorkshopCard from "../Cards/UserWorkshopCard";
import UserWorkshopDetailsModalScreen from "../UserWorkshopDetailsModalScreen";

export default function List_openWorkshops({ userWorkshops, setUserWorkshops, user }) {
    const [commissions, setCommissions] = useState([]);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedWorkshop, setSelectedWorkshop] = useState(null);
    const [selectedCommission, setSelectedCommission] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [durations, setDurations] = useState([]);

    const handleDetailsClick = (workshop, commission, e) => {
        e.preventDefault();
        setSelectedWorkshop(workshop);
        setSelectedCommission(commission);
        setShowDetailsModal(true);
        document.body.style.overflow = 'hidden';
    };

    const onRefresh = () => {}

    const handleModalClose = () => {
        setShowModal(false);
        setShowDetailsModal(false);
        document.body.style.overflow = 'auto';
    };

    useEffect(() => {
        fetch('/api/workshop/commission')
            .then(res => res.json())
            .then(data => {
                const workshopsWithUniqueKey = data.data.map((workshop, index) => ({
                    ...workshop,
                    unique: index + 1
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

    useEffect(() => {
        fetch('/api/commission/durations')
            .then(res => res.json())
            .then(data => {
                setDurations(data.data);
                console.log("Fetched durations: ", data.data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const getCommission = (commissionId) => {
        const commission = commissions.find(c => c.id === commissionId);
        if (commission) {
            return commission;
        }
        return 'Unknown Commissions';
    }

    const getCommissionName = (commissionId) => {
        return getCommission(commissionId).details;
    }

    const getCommissionDate = (commissionId) => {
        const commission = getCommission(commissionId)
        const date = new Date(commission.date);
        return date.toLocaleDateString('nl-NL', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        });
    };

    const getCommissionTime = (commissionId) => {
        if (durations.length > 0) {
            return durations.find(c => c.commissionId === commissionId);
        }
        return 'Unknown Time';
    }

    const getCommissionPay = (commissionId) => {
        const minutes = getCommissionTime(commissionId).durationMin;
        return user.hourlyRate * minutes / 60;
    }

    return (
        <div>
            {showDetailsModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-auto">
                    <div className="relative w-full max-w-lg max-h-full p-4 bg-white rounded-lg shadow-lg overflow-y-auto">
                        <UserWorkshopDetailsModalScreen
                            onClose={handleModalClose}
                            workshop={selectedWorkshop}
                            commission={selectedCommission}
                            onRefresh={onRefresh}
                        />
                    </div>
                </div>
            )}

            <div className="flex flex-col items-center">
                {userWorkshops.map((userWorkshop) => (
                    <div
                        key={userWorkshop.unique}
                        className="w-full max-w-2xl p-4"
                    >
                        <div
                            className="cursor-pointer"
                            onClick={(e) =>
                                handleDetailsClick(
                                    userWorkshop,
                                    getCommission(userWorkshop.commissionId),
                                    e
                                )
                            }
                        >
                            <UserWorkshopCard
                                commissionName={getCommissionName(userWorkshop.commissionId)}
                                userWorkshop={userWorkshop}
                                commissionDate={getCommissionDate(userWorkshop.commissionId)}
                                commissionTime={getCommissionTime(userWorkshop.commissionId).formattedDuration}
                                commissionPay={getCommissionPay(userWorkshop.commissionId)}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
