import React, { useEffect, useState } from "react";

export default function InviteTeacherModalScreen({ onClose, onSave, commissionWorkshop }) {
    const [users, setUsers] = useState([]);
    const [selectedTeacher, setSelectedTeacher] = useState("");

    console.log('commissionWorkshop', commissionWorkshop);

    useEffect(() => {
        fetch(`/api/teacherWorkshopQualification/workshop/${commissionWorkshop.workshopId}`)
        .then(res => res.json())
        .then(data => {
            console.log(commissionWorkshop.workshopId)
            console.log("Fetched users: ", data.data);
            setUsers(data.data);
        })
    }, [])

    const handleInvite = () => {
        // Handle invite logic here
    };

    const formatDate = (date) => {
        if (!date) return "";
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString("nl-NL", options);
    }

    return (
        <>
            <div className="fixed inset-0 z-10 bg-gray-900 bg-opacity-15" onClick={onClose} />
            <section className="w-full h-full flex items-center justify-center fixed top-0 left-0 z-20">
                <div className="flex flex-col items-center justify-center w-80">
                    <div className="w-full bg-white rounded-lg shadow light:border light:bg-gray-800 light:border-gray-700">
                        <div className="p-6 space-y-4 sm:space-y-6">
                            <span className="close text-xl" onClick={onClose}>&times;</span>
                            <h1 className="text-xl font-medium m-0 p-0" style={{ marginTop: 0 }}>{'Docent uitnodigen voor workshop ' + commissionWorkshop.workshopName}</h1>
                            <h2 className="">
                                {'Datum: ' + formatDate(commissionWorkshop.date)}
                                <br />
                                {'Klant: ' + commissionWorkshop.customerName}
                            </h2>

                            <label htmlFor="teacherSelect" className="block mb-2">Selecteer docent:</label>
                            <select id="teacherSelect" className="w-full mb-4" value={selectedTeacher} onChange={(e) => setSelectedTeacher(e.target.value)}>
                                <option value="">Selecteer een docent</option>
                                {users.map(user => (
                                    <option key={user.id} value={user.id}>{user.firstName} {user.lastName}</option>
                                ))}
                            </select>

                            <button type="delete" onClick={handleInvite}
                                    className="w-full text-white bg-custom-red hover:bg-primary-700 focus:ring-4 :outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center light:bg-primary-600 light:hover:bg-primary-700 light:focus:ring-primary-800">
                                Verwijderen
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
