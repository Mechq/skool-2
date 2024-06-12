import React, { useEffect, useState } from "react";

export default function EnrollmentList({
  isOpen,
  setIsOpen,
  setSidePanelContent,
  setEnrollmentId,
  enrollments,
  setEnrollments,
}) {
  useEffect(() => {
    fetch('/api/enrollment')
      .then(res => res.json())
      .then(data => {
        setEnrollments(data.data);
        console.log("Fetched enrollments: ", data.data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [isOpen]);

  const formatDate = (date) => {
    if (!date) return "";
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString("nl-NL", options);
  };

  // Group enrollments by commissionWorkshopId
  const groupedEnrollments = enrollments.reduce((acc, enrollment) => {
    const { date, workshopName, customer } = enrollment;
    const groupKey = `${formatDate(date)}: ${customer} - ${workshopName}`;
    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }
    acc[groupKey].push(enrollment);
    return acc;
  }, {});

  const handleSubmit = (status, enrollment) => {
    console.log("Submitting enrollment status:", status);
    console.log("Enrollment:", enrollment);
    fetch(`/api/enrollment/${enrollment.enrollmentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // Refresh enrollments after successful update
        fetch('/api/enrollment')
          .then(res => res.json())
          .then(data => {
            setEnrollments(data.data);
            console.log("Fetched enrollments: ", data.data);
          })
          .catch(error => console.error('Error fetching data:', error));
      })
      .catch((error) => console.error("Error updating enrollment:", error));
  };
  


  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      {Object.keys(groupedEnrollments).map((groupKey) => (
        <div key={groupKey}>
          <h2 className="text-lg font-semibold my-4">
            {groupKey}
          </h2>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 light:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 light:bg-gray-700 light:text-gray-400">
              <tr>
                <th className="px-6 py-3">Naam</th>
                <th className="px-6 py-3 text-right">Actie</th>
              </tr>
            </thead>
            <tbody>
              {groupedEnrollments[groupKey].map((enrollment) => (
                <tr
                  key={enrollment.id}
                  className="odd:bg-white odd:light:bg-gray-900 even:bg-gray-50 even:light:bg-gray-800 border-b light:border-gray-700"
                >
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap light:text-white">
                    {enrollment.firstName + ' ' + enrollment.lastName}
                  </td>
                  <td className="px-6 py-4 text-right">
                    {/* Placeholder for accept/reject buttons */}
                    <button onClick={() => handleSubmit("geaccepteerd", enrollment)} className="bg-custom-blue text-white px-2 py-1 rounded mr-2">Accepteren</button>
                    <button onClick={() => handleSubmit("geweigerd", enrollment)} className="bg-custom-red text-white px-2 py-1 rounded">Weigeren</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
