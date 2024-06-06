import React, { useState, useEffect } from "react";

export default function ProfileWorkshopList({ user, editUser, workshops, qualifiedWorkshops }) {
    const [selectedWorkshops, setSelectedWorkshops] = useState([]);

    useEffect(() => {
        // Initialize the selected workshops with qualified workshops
        const initialSelectedWorkshops = qualifiedWorkshops.map(qw => qw.id);
        setSelectedWorkshops(initialSelectedWorkshops);
    }, [qualifiedWorkshops]);

    const handleCheckboxChange = (workshopId) => {
        setSelectedWorkshops((prevSelected) => {
            if (prevSelected.includes(workshopId)) {
                return prevSelected.filter(id => id !== workshopId);
            } else {
                return [...prevSelected, workshopId];
            }
        });
    };

    const handleUpdate = () => {
        console.log('Updating workshops for user:', user.id);
        console.log('Selected workshops:', selectedWorkshops);

        fetch(`/api/teacherWorkshopQualification/${user.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ workshops: selectedWorkshops }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                // Optionally, you can handle success here, like showing a success message
            })
            .catch((error) => {
                console.error('Error:', error);
                // Optionally, handle errors here
            });
    };


    return (
        <>
            <div className="justify-center">
                <div className="bg-white max-w-2xl shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                            Workshops
                        </h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                            Welke workshops kan ik aanbieden?
                        </p>
                    </div>
                    <div className="border-t border-gray-200">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                            <tr>
                                <th scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Name
                                </th>
                                <th scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Category
                                </th>
                                <th scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {workshops.map(workshop => (
                                <tr key={workshop.id}
                                    className="wfiodd:bg-white odd:light:bg-gray-900 even:bg-gray-50 even:light:bg-gray-800 border-b light:border-gray-700">
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap light:text-white">
                                        {workshop.name}
                                    </td>
                                    <td className="px-6 py-4">{workshop.category}</td>
                                    <td className="px-6 py-4 text-center">
                                        <input
                                            id={`checkbox-${workshop.id}`}
                                            type="checkbox"
                                            checked={selectedWorkshops.includes(workshop.id)}
                                            onChange={() => handleCheckboxChange(workshop.id)}
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 light:focus:ring-blue-600 light:ring-offset-gray-800 focus:ring-2 light:bg-gray-700 light:border-gray-600"
                                        />
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Update button */}
            <button
                onClick={handleUpdate}
                className="bg-brand-orange hover:bg-brand-orange-hover focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-white mt-4"
            >
                Update
            </button>
        </>
    )
}