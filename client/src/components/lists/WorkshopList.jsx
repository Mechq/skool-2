import React, { useState, useEffect } from "react";
import DeleteConfirmationModalScreen from "../modal-screens/DeleteConfirmationModalScreen";
import WorkshopDetailsModalScreen from "../modal-screens/WorkshopDetailsModalScreen";

export default function WorkshopList({
    isOpen,
    setIsOpen,
    setSidePanelContent,
    setWorkshopId,
    workshops,
    setRotateSpan,
    setWorkshops
}) {
    const [showModal, setShowModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [workshopToDeleteId, setWorkshopToDeleteId] = useState(null);
    const [workshopToDeleteName, setWorkshopToDeleteName] = useState(null);
    const [selectedWorkshopId, setSelectedWorkshopId] = useState(null); // Add state for selected workshop ID
    const [selectedWorkshopName, setSelectedWorkshopName] = useState(null); // Add state for selected workshop name

    useEffect(() => {
        fetch('/api/workshop')
            .then(res => res.json())
            .then(data => {
                setWorkshops(data.data);
                console.log("Fetched workshops: ", data.data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [isOpen]); // Add isOpen as a dependency
    const editWorkshop = (id, e) => {
        e.preventDefault();
        e.stopPropagation(); // Prevent row click event
        setWorkshopId(id);
        setSidePanelContent("edit");
        setIsOpen(true);
        setRotateSpan(true);
    };

    const handleDetailsClick = (id, name, e) => {
        e.preventDefault();
        setSelectedWorkshopId(id); // Set the selected workshop ID
        setSelectedWorkshopName(name); // Set the selected workshop name
        setShowDetailsModal(true);
    };

    const handleDeleteClick = (id, name, e) => {
        e.preventDefault();
        e.stopPropagation(); // Prevent row click event
        setWorkshopToDeleteId(id);
        setWorkshopToDeleteName(name);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        setShowDetailsModal(false);
    };

    const handleModalSave = (editedType) => {
        setShowModal(false);
    };
    const formatDate = (date) => {
        if (!date) return "";
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString("nl-NL", options);
    }

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mr-6 ml-6">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 light:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 light:bg-gray-700 light:text-gray-400">
                    <tr>
                        <th className="px-6 py-3">Workshop Naam</th>
                        <th className=""></th>
                        <th className="px-6 py-3">Categorie</th>
                        <th className="px-6 py-3">Datum Aangemaakt</th>
                        <th className="px-6 py-3">Bewerken</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {workshops.map(workshop => (
                        <tr key={workshop.id}
                            className="odd:bg-white odd:light:bg-gray-900 even:bg-gray-50 even:light:bg-gray-800 border-b light:border-gray-700 hover:cursor-pointer"
                            onClick={(e) => handleDetailsClick(workshop.id, workshop.name, e)}>
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap light:text-white">
                                {workshop.name}
                            </td>
                            <td className="px-6 py-4">{workshop.subject}</td>
                            <td className="px-6 py-4">{workshop.category}</td>
                             <td className="px-6 py-4">{formatDate(workshop.creationDate)}</td>
                            <td className="px-6 py-4">-</td>
                            <td className="px-6 py-4">
                                <a href="#" onClick={(e) => {
                                    editWorkshop(workshop.id, e);
                                }} className="font-medium text-[#f49700] light:text-[#f49700] hover:underline">Bewerken</a>
                            </td>
                            <td className="px-">
                                <a href="#" onClick={(e) => handleDeleteClick(workshop.id, workshop.name, e)}>
                                    <svg className="w-5 h-5 mx-2 text-danger hover:text-red-600" aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                        viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                                    </svg>
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showModal && (
                <div>
                    <DeleteConfirmationModalScreen
                        onClose={handleModalClose}
                        onSave={handleModalSave}
                        workshopId={workshopToDeleteId}
                        workshopName={workshopToDeleteName}
                    />
                </div>
            )}

            {showDetailsModal && (
                <div>
                    <WorkshopDetailsModalScreen
                        onClose={handleModalClose}
                        onSave={handleModalSave}
                        workshopId={selectedWorkshopId}
                    />
                </div>
            )}

        </div>
    );
}