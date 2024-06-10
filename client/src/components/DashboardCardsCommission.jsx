import React, { useState, useEffect } from 'react';
import PageSecurity from "../PageSecurity";
import DashboardCardsCommissionDetailsModal from "./modal-screens/DashboardCardsCommissionDetails";

function DashboardCardsCommission({ teacherId }) {
    const userEmail = PageSecurity();
    const [commissions, setCommissions] = useState([]);
    const [selectedCommission, setSelectedCommission] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const teacherEmail = userEmail ? userEmail.email : null;

    const truncateDescription = (description, maxLength) => {
        if (description.length > maxLength) {
            return description.slice(0, maxLength) + '...';
        }
        return description;
    };

    const handleDetailsClick = (commission, e) => {
        e.preventDefault();
        setSelectedCommission(commission);
        setShowDetailsModal(true);
    };

    const handleModalClose = () => {
        setShowDetailsModal(false);
        setSelectedCommission(null);
    };

    useEffect(() => {
        if (teacherEmail && teacherId !== null) {
            fetch(`/api/dashboard/${teacherId}`)
                .then(res => res.json())
                .then(data => {
                    if (Array.isArray(data.data)) {
                        setCommissions(data.data);
                        console.log("Fetched commissions: ", data.data);
                    } else {
                        console.error('Error: Data fetched is not an array', data);
                    }
                })
                .catch(error => console.error('Error fetching data:', error));
        }
    }, [teacherEmail, teacherId]);

    if (userEmail === null) {
        return null;
    }

    const getCommission = (commissionId) => {
        return commissions.find(commission => commission.id === commissionId);
    };

    return (
        <div className="area">
            {showDetailsModal && selectedCommission && (
                <div>
                    <DashboardCardsCommissionDetailsModal
                        onClose={handleModalClose}
                        commission={selectedCommission}
                    />
                </div>
            )}

            {commissions.map((commission, index) => (
                <div key={index} className="w-1/2 px-4 lg:w-1/3">
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden my-6 grid grid-cols-[auto,1fr]">
                        <div className="bg-gray-100 px-5 py-2 grid items-end justify-center __col h-full">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">{commission.name}</h2>
                            <a 
                                href="#" 
                                className="text-blue-600 font-medium hover:text-blue-800" 
                                onClick={(e) => handleDetailsClick(commission, e)}
                            >
                                Meer informatie
                            </a>
                        </div>
                        <div className="p-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">{commission.title}</h2>
                            <p className="text-gray-600">{truncateDescription(commission.description, 100)}</p>
                        </div>
                    </div>
                </div>
            ))}

            <ul className="circles">
                {Array.from({ length: commissions.length }).map((_, index) => (
                    <li key={index}></li>
                ))}
            </ul>
        </div>
    );
}

export default DashboardCardsCommission;
