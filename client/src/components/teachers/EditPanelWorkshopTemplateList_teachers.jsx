import React, { useEffect, useState } from 'react';

export default function EditPanelWorkshopTemplateList_teachers({ userId, setShowSidePanel }) {
    const [user, setUser] = useState({});
    const [workshops, setWorkshops] = useState([]);
    const [qualifiedWorkshops, setQualifiedWorkshops] = useState([]);
    const [selectedWorkshops, setSelectedWorkshops] = useState([]);
    const [isAccordionOpen, setIsAccordionOpen] = useState([false, false, false, false, false, false]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [userRes, workshopsRes, qualifiedWorkshopsRes] = await Promise.all([
                    fetch(`/api/user/${userId}`),
                    fetch('/api/workshop'),
                    fetch(`/api/teacherWorkshopQualification/${userId}`)
                ]);

                const userData = await userRes.json();
                setUser(userData.data);

                const workshopData = await workshopsRes.json();
                setWorkshops(workshopData.data);

                const qualifiedWorkshopsData = await qualifiedWorkshopsRes.json();
                setQualifiedWorkshops(qualifiedWorkshopsData.data);

                const qualifiedIds = qualifiedWorkshopsData.data.map(qw => qw.id);
                setSelectedWorkshops(qualifiedIds);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [userId]);

    const handleCheckboxChange = (workshopId, checked) => {
        if (checked) {
            setSelectedWorkshops([...selectedWorkshops, workshopId]);
        } else {
            setSelectedWorkshops(selectedWorkshops.filter(id => id !== workshopId));
        }
    };

    const handleUpdate = () => {
        const unselectedWorkshops = workshops
            .filter(workshop => !selectedWorkshops.includes(workshop.id))
            .map(workshop => workshop.id);

        fetch(`/api/teacherWorkshopQualification/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ workshops: selectedWorkshops }),
        })
            .then(response => response.json())
            .catch((error) => {
                console.error('Error:', error);
            });

        // Send request to delete unselected workshops
        fetch(`/api/teacherWorkshopQualification/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ workshops: unselectedWorkshops }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Unselected Workshops Deleted:', data);
                // Optionally, you can handle success here, like showing a success message
            })
            .catch((error) => {
                console.error('Error deleting unselected workshops:', error);
                // Optionally, handle errors here
            });
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
                <button type="button"
                        className={`flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border ${index === totalCategories - 1 ? '' : 'border-b-0'} border-gray-200 focus:ring-4 focus:ring-gray-200 light:focus:ring-gray-800 light:border-gray-700 light:text-gray-400 hover:bg-gray-100 light:hover:bg-gray-800 gap-3`}
                        onClick={() => toggleAccordion(index)}
                        aria-expanded={isAccordionOpen[index]}
                        aria-controls={`accordion-collapse-body-${index}`}>
                    <span>{category}</span>
                    <svg data-accordion-icon
                         className={`w-3 h-3 ${isAccordionOpen[index] ? 'rotate-180' : ''} shrink-0`} aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M9 5 5 1 1 5"/>
                    </svg>
                </button>
            </h2>
            <div id={`accordion-collapse-body-${index}`} className={`${isAccordionOpen[index] ? '' : 'hidden'}`}
                 aria-labelledby={`accordion-collapse-heading-${index}`}>
                <div
                    className={`p-5 border  border-gray-200 light:border-gray-700 light:bg-gray-900 ${index === totalCategories - 1 ? '' : 'border-b-0'}`}>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        {categorizedWorkshops[category].length > 0 && (
                            <table
                                className="w-full text-sm text-left rtl:text-right text-gray-500 light:text-gray-400">
                                <colgroup>
                                    <col style={{ width: '50%' }} />
                                    <col style={{ width: '30%' }} />
                                    <col style={{ width: '20%' }} />
                                </colgroup>
                                <thead
                                    className="text-xs text-gray-700 uppercase bg-gray-50 light:bg-gray-700 light:text-gray-400">
                                <tr>
                                    <th className="px-6 py-3">Workshop Naam</th>
                                    <th className="px-6 py-3">Categorie</th>
                                    <th className="px-6 py-3">Selecteren</th>
                                </tr>
                                </thead>
                                <tbody>
                                {categorizedWorkshops[category].map(workshop => (
                                    <tr key={workshop.id}
                                        className="odd:bg-white odd:light:bg-gray-900 even:bg-gray-50 even:light:bg-gray-800 border-b light:border-gray-700 hover:cursor-pointer">
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap light:text-white">
                                            {"Workshop " + workshop.name}
                                        </td>
                                        <td className="px-6 py-4">{workshop.category}</td>
                                        <td className="px-6 py-4 text-center">
                                            <input
                                                id={`checkbox-${workshop.id}`}
                                                type="checkbox"
                                                checked={selectedWorkshops.includes(workshop.id)}
                                                onChange={(e) => handleCheckboxChange(workshop.id, e.target.checked)}
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                            />
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="px-6">
            <header className="pt-4 pb-4 font-bold text-lg">Workshop Kwalificaties Bewerken</header>
            <div className='side-panel-content'>
                <div className={'shadow sm:rounded-lg'}>
                    <div className="justify-center">
                        <div className="bg-white max-w-2xl  overflow-hidden sm:rounded-t-lg">
                            <div className="px-4 py-5 sm:px-6">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">
                                    Workshops
                                </h3>
                                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                    Pas de workshop kwalificaties van de docent aan.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div id="accordion-collapse" data-accordion="collapse">
                        {categories.map((category, index) => renderAccordion(category, index, categories.length))}
                    </div>
                </div>
                <button
                    onClick={handleUpdate}
                    className="bg-brand-orange hover:bg-brand-orange-hover focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-white mt-4"
                >
                    Opslaan
                </button>
            </div>
        </div>
    );
}
