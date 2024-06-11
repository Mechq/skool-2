import React, {useEffect, useState} from "react";

export default function WorkLocationList({
                                             setShowSidePanel,
                                             setSidePanelContent,
                                             setWorkLocationId,
                                             workLocations = [],
                                             setRotateSpan
                                         }) {

    const editWorkLocation = (id) => {
        setWorkLocationId(id);
        setSidePanelContent("edit");
        setShowSidePanel(true);
        setRotateSpan(true);
    };
const [customers, setCustomers] = useState([]);
    useEffect(() => {
        fetch('/api/customer')
            .then(res => res.json())
            .then(data => {
                setCustomers(data.data);
                console.log("Fetched worklocations: ", data.data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [])

    const formatDate = (date) => {
        if (!date) return "";
        const options = {year: 'numeric', month: 'long', day: 'numeric'};
        return new Date(date).toLocaleDateString("nl-NL", options);
    }
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 light:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 light:bg-gray-700 light:text-gray-400">
                <tr>
                    <th className="px-6 py-3">Locatie Naam</th>
                    <th className="px-6 py-3">Adres</th>
                    <th className="px-6 py-3">Klant</th>
                    <th className="px-6 py-3">Bewerken</th>
                </tr>
                </thead>
                <tbody>
                {workLocations.map(Worklocation => {
                    const customer = customers.find(cust => cust.id === Worklocation.customerId);
                    return(
                    <tr key={Worklocation.id}
                        className="odd:bg-white odd:light:bg-gray-900 even:bg-gray-50 even:light:bg-gray-800 border-b light:border-gray-700">
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap light:text-white">
                            {Worklocation.name}
                        </td>
                        <td className="px-6 py-4">{Worklocation.street + ' ' + Worklocation.houseNumber + ', ' + Worklocation.city + ' ' + Worklocation.postalCode}</td>
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap light:text-white">
                            {customer ? customer.name : ' '}
                        </td>
                        <td className="px-6 py-4">
                            <a href="#" onClick={(e) => {
                                e.preventDefault();
                                editWorkLocation(Worklocation.id);
                            }} className="font-medium text-[#f49700] light:text-[#f49700] hover:underline">Bewerken</a>
                        </td>
                    </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    );
}
