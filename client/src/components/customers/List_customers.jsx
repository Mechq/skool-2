import React, {useEffect} from "react";

export default function List_customers({
                                         isOpen,
                                         setIsOpen,
                                         setSidePanelContent,
                                         setCustomerId,
                                         setRotateSpan,
                                         customers,
                                         setCustomers,
                                     }) {

    useEffect(() => {
        fetch('/api/customer')
            .then(res => res.json())
            .then(data => {
                setCustomers(data.data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [isOpen]);

    const editCustomer = (id) => {
        setCustomerId(id);
        setSidePanelContent("edit");
        setIsOpen(true);
        setRotateSpan(true);
    };

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 light:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 light:bg-gray-700 light:text-gray-400">
                <tr>
                    <th className="px-6 py-3">Klant Naam</th>
                    <th className="px-6 py-3">Email</th>
                    <th className="px-6 py-3">Telefoonnummer</th>
                    <th className="px-6 py-3"></th>
                    <th className="px-6 py-3">Bewerken</th>
                </tr>
                </thead>
                <tbody>
                {customers.map((customer) => (
                    <tr
                        key={customer.id}
                        className="odd:bg-white odd:light:bg-gray-900 even:bg-gray-50 even:light:bg-gray-800 border-b light:border-gray-700"
                    >
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap light:text-white">
                            {customer.name}
                        </td>
                        <td className="px-6 py-4">{customer.email}</td>
                        <td className="px-6 py-4">{customer.phone}</td>
                        <td className="px-6 py-4">{}</td>
                        <td className="px-6 py-4">
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    editCustomer(customer.id);
                                }}
                                className="font-medium text-[#f49700] light:text-[#f49700] hover:underline"
                            >
                                Bewerken
                            </a>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}