import React, { useEffect } from "react";

export default function CommissionWorkshopList({
  setCommissionWorkshopId,
  commissionWorkshops,
  setCommissionWorkshops,
}) {

  useEffect(() => {
    fetch('/api/commissionWorkshop')
        .then(res => res.json())
        .then(data => {
            setCommissionWorkshops(data.data);
            console.log("Fetched workshops: ", data.data);
        })
        .catch(error => console.error('Error fetching data:', error));
}, []);

  const formatDate = (date) => {
    if (!date) return "";
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString("nl-NL", options);
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 light:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 light:bg-gray-700 light:text-gray-400">
          <tr>
            <th className="px-6 py-3">Datum</th>
            <th className="px-6 py-3">Klant</th>
            <th className="px-6 py-3">Workshop</th>
            <th className="px-6 py-3">Docent</th>
            <th className="px-6 py-3">Docent uitnodigen</th>
          </tr>
        </thead>
        <tbody>
          {commissionWorkshops.map((commissionWorkshop) => (
            <tr
              key={commissionWorkshop.commissionWorkshopId}
              className="odd:bg-white odd:light:bg-gray-900 even:bg-gray-50 even:light:bg-gray-800 border-b light:border-gray-700"
            >
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap light:text-white">
                {formatDate(commissionWorkshop.date)}
              </td>
              <td className="px-6 py-4">{commissionWorkshop.customerName}</td>
              <td className="px-6 py-4">{commissionWorkshop.workshopName}</td>
              <td className="px-6 py-4">{commissionWorkshop.teacherFirstName + ' ' + commissionWorkshop.teacherLastName}</td>
              <td className="px-6 py-4"></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}