import React, { useState, useEffect } from "react";
import DeleteConfirmationModalScreen from "../modal-screens/DeleteConfirmationModalScreen";

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
    const [workshopToDeleteId, setWorkshopToDeleteId] = useState(null);
    const [workshopToDeleteName, setWorkshopToDeleteName] = useState(null);

    useEffect(() => {
        fetch('/api/workshop')
            .then(res => res.json())
            .then(data => {
                setWorkshops(data.data);
                console.log("Fetched workshops: ", data.data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [isOpen]); // Add isOpen as a dependency

    const editWorkshop = (id) => {
        setWorkshopId(id);
        setSidePanelContent("edit");
        setIsOpen(true);
        setRotateSpan(true);
    };

    const handleDeleteClick = (id, name, e) => {
        e.preventDefault();
        setWorkshopToDeleteId(id);
        setWorkshopToDeleteName(name)
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleModalSave = (editedType) => {
        setShowModal(false);
    };

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mr-6 ml-6">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 light:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 light:bg-gray-700 light:text-gray-400">
                <tr>
                    <th className="px-6 py-3">Workshop Naam</th>
                    <th className="px-6 py-3">Catergorie</th>
                    <th className="px-6 py-3">Materialen</th>
                    <th className="px-6 py-3">Datum Aangemaakt</th>
                    <th className="px-6 py-3">Bewerken</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {workshops.map(workshop => (
                    <tr key={workshop.id}
                        className="odd:bg-white odd:light:bg-gray-900 even:bg-gray-50 even:light:bg-gray-800 border-b light:border-gray-700">
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap light:text-white">
                            {workshop.name}
                        </td>
                        <td className="px-6 py-4">{workshop.subject}</td>
                        <td className="px-6 py-4">{workshop.category}</td>
                        <td className="px-6 py-4">{workshop.createdAt}</td>
                        <td className="px-6 py-4">
                            <a href="#" onClick={(e) => {
                                e.preventDefault();
                                editWorkshop(workshop.id);
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
        </div>
    );
}