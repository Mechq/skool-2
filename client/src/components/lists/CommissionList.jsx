import React, { useEffect, useState } from "react";

export default function CommissionList({    isOpen,
                                           setIsOpen,
                                           setSidePanelContent,
                                           setCommissionId,
                                           commissions,
                                           setRotateSpan,
                                           setCommissions
}) {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        fetch('/api/commission')
            .then(res => res.json())
            .then(data => {
                console.log("Fetched commissions: ", data.data);
                setCommissions(data.data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [isOpen]);

    const getCustomers = (commission) => {
        fetch(`/api/commission/customer/${commission.id}`)
            .then(res => res.json())
            .then(data => {
                console.log("Fetched customers: ", data.data);
                setCustomers(prevCustomers => [...prevCustomers, data.data]);
            })
            .catch(error => console.error('Error fetching data:', error));
    };

    useEffect(() => {
        commissions.forEach(commission => {
            getCustomers(commission);
        });
    }, [commissions]);

    const formatDate = (dateString) => {
        if (!dateString) return "";
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const editCommission = (id) => {
        setCommissionId(id);
        setSidePanelContent("edit");
        setIsOpen(true);
        setRotateSpan(true);
    };

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mr-6 ml-6">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 light:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 light:bg-gray-700 light:text-gray-400">
                <tr>
                    <th className="px-6 py-3">Klant</th>
                    <th className="px-6 py-3">Opdracht details</th>
                    <th className="px-6 py-3">Doelgroep</th>
                    <th className="px-6 py-3">Datum</th>
                    <th className="px-6 py-3">Bewerken</th>
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
                                    <button className="font-medium text-[#f49700] light:text-[#f49700] hover:underline" onClick={() => editCommission(commission.id)}>Bewerken</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
