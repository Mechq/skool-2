import React, {useEffect, useState} from "react";
import DeleteConfirmationModalScreen from "../modal-screens/DeleteConfirmationModalScreen";
import UserWorkshopDetailsModalScreen from "../modal-screens/UserWorkshopDetailsModalScreen";

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
    const [selectedWorkshopId, setSelectedWorkshopId] = useState(null);
    const [selectedWorkshopName, setSelectedWorkshopName] = useState(null);
    const [isAccordionOpen, setIsAccordionOpen] = useState([false, false, false, false, false, false]);

    useEffect(() => {
        fetch('/api/workshop')
            .then(res => res.json())
            .then(data => {
                setWorkshops(data.data);
                console.log("Fetched workshops: ", data.data);
                openFirstCategoryWithData(data.data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [isOpen]);

    const openFirstCategoryWithData = (workshops) => {
        const categories = ['Beeldende kunst', 'Dans', 'Media', 'Muziek', 'Sport', 'Theater'];
        const categorizedWorkshops = categories.map(category => workshops.filter(workshop => workshop.category === category));
        const firstNonEmptyCategoryIndex = categorizedWorkshops.findIndex(categoryWorkshops => categoryWorkshops.length > 0);
        if (firstNonEmptyCategoryIndex !== -1) {
            setIsAccordionOpen(prevState => prevState.map((isOpen, i) => i === firstNonEmptyCategoryIndex));
        }
    };

    const editWorkshop = (id, e) => {
        e.preventDefault();
        e.stopPropagation();
        setWorkshopId(id);
        setSidePanelContent("edit");
        setIsOpen(true);
        setRotateSpan(true);
    };

    const handleDetailsClick = (id, name, e) => {
        e.preventDefault();
        setSelectedWorkshopId(id);
        setSelectedWorkshopName(name);
        setShowDetailsModal(true);
    };

    const handleDeleteClick = (id, name, e) => {
        e.preventDefault();
        e.stopPropagation();
        setWorkshopToDeleteId(id);
        setWorkshopToDeleteName(name);
        setShowModal(true);
    };


    const handleModalClose = () => {
        setShowModal(false);
        setShowDetailsModal(false);
    };

    const handleModalSave = () => {
        // Make an API call to delete the workshop
        fetch(`/api/workshop/${workshopToDeleteId}`, {
            method: 'DELETE'
        })
            .then(res => {
                if (res.ok) {
                    setShowModal(false);
                    setWorkshopToDeleteId(null);
                    setWorkshopToDeleteName(null);
                    const updatedWorkshops = workshops.filter(workshop => workshop.id !== workshopToDeleteId);
                    setWorkshops(updatedWorkshops);
                } else {
                    throw new Error('Failed to delete workshop');
                }
            })
            .catch(error => console.error('Error deleting workshop:', error));
    };

    const toggleAccordion = (index) => {
        setIsAccordionOpen(prevState => prevState.map((isOpen, i) => i === index ? !isOpen : isOpen));
    };

    const categories = ['Beeldende kunst', 'Dans', 'Media', 'Muziek', 'Sport', 'Theater'];

    const categorizedWorkshops = categories.reduce((acc, category) => {
        acc[category] = workshops.filter(workshop => workshop.category === category);
        return acc;
    }, {});

    const renderAccordion = (category, index, totalCategories) => (
        <div key={index}>
            <h2 id={`accordion-collapse-heading-${index}`}>
                <button
                    type="button"
                    className={`flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border ${index === 0 ? 'rounded-t-lg' : ''} ${index === totalCategories - 1 ? '' : 'border-b-0'} border-gray-200 focus:ring-4 focus:ring-gray-200 light:focus:ring-gray-800 light:border-gray-700 light:text-gray-400 hover:bg-gray-100 light:hover:bg-gray-800 gap-3`}
                    onClick={() => toggleAccordion(index)}
                    aria-expanded={isAccordionOpen[index]}
                    aria-controls={`accordion-collapse-body-${index}`}
                >
                    <span>{category}</span>
                    <svg
                        data-accordion-icon
                        className={`w-3 h-3 ${isAccordionOpen[index] ? 'rotate-180' : ''} shrink-0`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5 5 1 1 5"
                        />
                    </svg>
                </button>
            </h2>
            <div
                id={`accordion-collapse-body-${index}`}
                className={`${isAccordionOpen[index] ? '' : 'hidden'}`}
                aria-labelledby={`accordion-collapse-heading-${index}`}
            >
                <div
                    className={`p-5 border  border-gray-200 light:border-gray-700 light:bg-gray-900 ${index === totalCategories - 1 ? '' : 'border-b-0'}`}>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        {categorizedWorkshops[category].length > 0 && (
                            <table
                                className="w-full text-sm text-left rtl:text-right text-gray-500 light:text-gray-400">
                                <colgroup>
                                    <col style={{width: '25%'}}/>
                                    <col style={{width: '25%'}}/>
                                    <col style={{width: '25%'}}/>
                                    <col style={{width: '25%'}}/>
                                </colgroup>
                                <thead
                                    className="text-xs text-gray-700 uppercase bg-gray-50 light:bg-gray-700 light:text-gray-400">
                                <tr>
                                    <th className="px-6 py-3">Workshop Naam</th>
                                    <th className="px-6 py-3">Materialen</th>
                                    <th className="px-6 py-3">Categorie</th>
                                    <th className="px-6 py-3">Bewerken</th>
                                    <th className="px-6 py-3">Verwijderen</th>
                                </tr>
                                </thead>
                                <tbody>
                                {categorizedWorkshops[category].map((workshop) => (
                                    <tr
                                        key={workshop.id}
                                        className="odd:bg-white odd:light:bg-gray-900 even:bg-gray-50 even:light:bg-gray-800 border-b light:border-gray-700 hover:cursor-pointer"
                                        onClick={(e) => handleDetailsClick(workshop.id, workshop.name, e)}
                                    >
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap light:text-white">
                                            {'Workshop ' + workshop.name}
                                        </td>
                                        <td className="px-6 py-4">{workshop.materials}</td>
                                        <td className="px-6 py-4">{workshop.category}</td>
                                        <td className="px-6 py-4">
                                            <a
                                                href="#"
                                                onClick={(e) => {
                                                    editWorkshop(workshop.id, e);
                                                }}
                                                className="font-medium text-[#f49700] light:text-[#f49700] hover:underline"
                                            >
                                                Bewerken
                                            </a>
                                        </td>
                                        <td className="px-6 py-4 flex justify-center">
                                            <a href="#"
                                               onClick={(e) => handleDeleteClick(workshop.id, workshop.name, e)}>
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
                                ))}
                                </tbody>
                            </table>
                        )}
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
                                <UserWorkshopDetailsModalScreen
                                    onClose={handleModalClose}
                                    onSave={handleModalSave}
                                    workshopId={selectedWorkshopId}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className={'shadow sm:rounded-lg'}>
            <div id="accordion-collapse" data-accordion="collapse">
                {categories.map((category, index) => renderAccordion(category, index, categories.length))}
            </div>
        </div>

    );
}
