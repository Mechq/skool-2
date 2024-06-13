import React, {useEffect, useState} from "react";
import DeleteCommissionModalScreen from "./ConfirmDeleteModal_commissions";

export default function List_commissions({
                                           isOpen,
                                           setIsOpen,
                                           setSidePanelContent,
                                           setCommissionId,
                                           commissions,
                                           setRotateSpan,
                                           setCommissions
                                       }) {
    const [customers, setCustomers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [commissionToDeleteId, setCommissionToDeleteId] = useState(null);
    const [commissionToDeleteName, setCommissionToDeleteName] = useState(null);
    const [commissionToDeleteDate, setCommissionToDeleteDate] = useState(null);

    useEffect(() => {
        fetch('/api/commission')
            .then(res => res.json())
            .then(data => {
                setCommissions(data.data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [isOpen]);

    const getAllCustomers = () => {
        fetch(`/api/customer`)
            .then(res => res.json())
            .then(data => {
                setCustomers(data.data);
            })
            .catch(error => console.error('Error fetching data:', error));
    };

    useEffect(() => {
        getAllCustomers()
    }, [commissions]);

    const formatDate = (dateString) => {
        if (!dateString) return "";
        const options = {year: 'numeric', month: 'long', day: 'numeric'};
        return new Date(dateString).toLocaleDateString("nl-NL", options);
    };

    const editCommission = (id) => {
        setCommissionId(id);
        setSidePanelContent("edit");
        setIsOpen(true);
        setRotateSpan(true);
    };

    const handleDeleteClick = (id, date, e) => {
        e.preventDefault();
        e.stopPropagation();

        const commission = commissions.find(commission => commission.id === id);
        const customer = customers.find(cust => cust.id === commission.customerId);

        setCommissionToDeleteId(id);
        setCommissionToDeleteName(customer ? customer.name : 'Unknown Customer');
        setCommissionToDeleteDate(date);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        setShowDetailsModal(false);
    };

    const handleModalSave = () => {
        // Make an API call to delete the commission
        fetch(`/api/commission/${commissionToDeleteId}`, {
            method: 'DELETE'
        })
            .then(res => {
                if (res.ok) {
                    setShowModal(false);
                    setCommissionToDeleteId(null);
                    setCommissionToDeleteName(null);
                    const updatedCommissions = commissions.filter(commission => commission.id !== commissionToDeleteId);
                    setCommissions(updatedCommissions);
                } else {
                    throw new Error('Failed to delete commission');
                }
            })
            .catch(error => console.error('Error deleting commission:', error));
    };

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 light:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 light:bg-gray-700 light:text-gray-400">
                <tr>
                    <th className="px-6 py-3">Klant</th>
                    <th className="px-6 py-3">Opdracht details</th>
                    <th className="px-6 py-3">Doelgroep</th>
                    <th className="px-6 py-3">Datum</th>
                    <th className="px-6 py-3">Bewerken</th>
                    <th className="px-6 py-3 flex justify-center">Verwijderen</th>
                </tr>
                </thead>
                <tbody>
                {commissions.map(commission => {
                    const customer = customers.find(cust => cust.id === commission.customerId);
                    return (
                        <tr key={commission.id}
                            className="odd:bg-white odd:light:bg-gray-900 even:bg-gray-50 even:light:bg-gray-800 border-b light:border-gray-700">
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap light:text-white">
                                {customer ? customer.name : 'Unknown Customer'}
                            </td>
                            <td className="px-6 py-4">{commission.details}</td>
                            <td className="px-6 py-4">{commission.targetAudience}</td>
                            <td className="px-6 py-4">{formatDate(commission.date) || ''}</td>
                            <td className="px-6 py-4">
                                <button className="font-medium text-[#f49700] light:text-[#f49700] hover:underline"
                                        onClick={() => editCommission(commission.id)}>Bewerken
                                </button>
                            </td>
                            <td className="px-6 py-4 flex justify-center">
                                <a href="#" onClick={(e) => handleDeleteClick(commission.id, commission.date, e)}>
                                    <svg
                                        className="w-5 h-5 text-danger hover:text-red-600"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                                        />
                                    </svg>
                                </a>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
            {showModal && (
                <div>
                    <DeleteCommissionModalScreen
                        onClose={handleModalClose}
                        onSave={handleModalSave}
                        commissionName={commissionToDeleteName}
                        commissionDate={commissionToDeleteDate}
                    />
                </div>
            )}
        </div>
    );
}