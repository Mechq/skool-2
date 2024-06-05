import {useEffect} from "react";

export default function WorkshopList({
                                         isOpen,
                                         setIsOpen,
                                         setSidePanelContent,
                                         setWorkshopId,
                                         workshops,
                                         setRotateSpan,
                                         setWorkshops
                                     }) {

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
                        {/*<td className="px-6 py-4">{workshop.createdAt}</td>*/}
                        <td className="px-6 py-4">-</td>
                        <td className="px-6 py-4">
                            <a href="#" onClick={(e) => {
                                e.preventDefault();
                                editWorkshop(workshop.id);
                            }} className="font-medium text-[#f49700] light:text-[#f49700] hover:underline">Bewerken</a>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}