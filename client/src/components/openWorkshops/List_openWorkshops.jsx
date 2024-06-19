import React, { useEffect, useState, useMemo, useCallback } from "react";
import UserWorkshopCard from "../Cards/UserWorkshopCard";
import UserWorkshopDetailsModalScreen from "../UserWorkshopDetailsModalScreen";

export default function List_openWorkshops({ user }) {
    const [commissions, setCommissions] = useState([]);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedWorkshop, setSelectedWorkshop] = useState(null);
    const [selectedCommission, setSelectedCommission] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [durations, setDurations] = useState([]);
    const [userWorkshops, setUserWorkshops] = useState([]);
    const [qualifications, setQualifications] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleDetailsClick = useCallback((workshop, commission, e) => {
        e.preventDefault();
        setSelectedWorkshop(workshop);
        setSelectedCommission(commission);
        setShowDetailsModal(true);
        document.body.style.overflow = 'hidden';
    }, []);

    const onRefresh = useCallback(() => {}, []);

    const handleModalClose = useCallback(() => {
        setShowModal(false);
        setShowDetailsModal(false);
        document.body.style.overflow = 'auto';
    }, []);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const [workshopsResponse, qualificationsResponse, commissionsResponse, durationsResponse] = await Promise.all([
                    fetch('/api/workshop/commission'),
                    fetch(`/api/teacherWorkshopQualification/${user.id}`),
                    fetch('/api/commission/'),
                    fetch('/api/commission/durations')
                ]);

                const [workshopsData, qualificationsData, commissionsData, durationsData] = await Promise.all([
                    workshopsResponse.json(),
                    qualificationsResponse.json(),
                    commissionsResponse.json(),
                    durationsResponse.json()
                ]);

                const workshopsWithUniqueKey = workshopsData.data.map((workshop, index) => ({
                    ...workshop,
                    unique: index + 1
                }));

                setQualifications(qualificationsData.data);
                setCommissions(commissionsData.data);
                setDurations(durationsData.data);

                const filteredWorkshops = workshopsWithUniqueKey.filter(workshop =>
                    qualificationsData.data.some(qualification => qualification.id === workshop.workshopId)
                );

                setUserWorkshops(filteredWorkshops);
                setLoading(false);

                console.log("Fetched and filtered data:", {
                    workshopsWithUniqueKey,
                    qualificationsData: qualificationsData.data,
                    filteredWorkshops,
                    commissionsData: commissionsData.data,
                    durationsData: durationsData.data
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchAllData();
    }, [user.id]);

    const getCommission = useCallback((commissionId) => {
        return commissions.find(c => c.id === commissionId) || 'Unknown Commission';
    }, [commissions]);

    const getCommissionName = useCallback((commissionId) => {
        const commission = getCommission(commissionId);
        return commission.details;
    }, [getCommission]);

    const getCommissionDate = useCallback((commissionId) => {
        const commission = getCommission(commissionId);
        const date = new Date(commission.date);
        return date.toLocaleDateString('nl-NL', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        });
    }, [getCommission]);

    const getCommissionTime = useCallback((commissionId) => {
        const duration = durations.find(c => c.commissionId === commissionId);
        return duration || { formattedDuration: 'Unknown Time', durationMin: 0 };
    }, [durations]);

    const getCommissionPay = useCallback((commissionId) => {
        const commissionTime = getCommissionTime(commissionId);
        const minutes = commissionTime ? commissionTime.durationMin : 0;
        return user.hourlyRate * minutes / 60;
    }, [getCommissionTime, user.hourlyRate]);

    if (loading) {
        return <p>Loading...</p>;
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
