import React, { useState } from "react";

export default function ConfirmRejectModal_teacherEnrollments({ onClose, onConfirm, enrollment, setEnrollments }) {
    const [reason, setReason] = useState("");

    const handleReject = () => {
        fetch(`/api/enrollment/${enrollment.enrollmentId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: 'geweigerd' }),
        })
            .then((res) => res.json())
            .then((data) => {
                fetch('/api/enrollment')
                    .then(res => res.json())
                    .then(data => {
                        setEnrollments(data.data);
                        onConfirm(reason); // Pass the reason to the parent component
                    })
                    .catch(error => console.error('Error fetching data:', error));
            })
            .catch((error) => console.error("Error updating enrollment:", error));
    };

    const formatDate = (date) => {
        const formattedDate = new Date(date);
        return formattedDate.toLocaleDateString('nl-NL', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        });
    };

    return (
        <>
            <div className="fixed inset-0 z-10 bg-gray-900 bg-opacity-15" onClick={onClose} />
            <section className="w-full h-full flex items-center justify-center fixed top-0 left-0 z-20">
                <div className="flex flex-col items-center justify-center w-70">
                    <div className="w-full bg-white rounded-lg shadow light:border light:bg-gray-800 light:border-gray-700">
                        <div className="p-6 space-y-4 sm:space-y-6">
                            <span className="close text-xl" onClick={() => {
                                onClose();
                            }}>&times;</span>
                            <h1 className="text-xl font-medium m-0 p-0" style={{ marginTop: 0 }}>Workshop verwijderen</h1>
                            <h2 className="">Weet u zeker dat u de inschrijving
                                van <strong>{enrollment.firstName + ' ' + enrollment.lastName}</strong> voor de workshop<br />
                                '<strong>{enrollment.workshopName}</strong>'
                                op <strong>{formatDate(enrollment.date)}</strong><br />
                                wilt weigeren?
                            </h2>

                            <label htmlFor="reason"
                                   className="block text-sm font-medium text-gray-900 light:text-white">Reden</label>
                            <textarea id="reason" rows="4"
                                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500 resize-none"
                                      placeholder="Voer hier een reden in..."
                                      value={reason} onChange={(e) => setReason(e.target.value)}></textarea>

                            <button type="delete" onClick={handleReject}
                                    className="w-full text-white bg-custom-red hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center light:bg-primary-600 light:hover:bg-primary-700 light:focus:ring-primary-800">
                                Weigeren
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
