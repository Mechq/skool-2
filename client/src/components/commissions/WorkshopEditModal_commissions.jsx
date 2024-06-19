import React, {useEffect, useState} from "react";
import "../../styles/ModalScreen.css";
import {use} from "chai";

export default function WorkshopEditModal_commissions({
                                                                     roundType,
                                                                     roundId,
                                                                     commissionId,
                                                                     workshopId,
                                                                     onClose,
                                                                     onSave,
                                                                     onEdit
                                                                 }) {
    const [editedRound, setEditedRound] = useState(roundType);
    const [amountOfStudents, setAmountOfStudents] = useState('')
    const [amountOfTeachers, setAmountOfTeachers] = useState('')

    const [validAmountOfStudents, setValidAmountOfStudents] = useState(false);
    const [validAmountOfTeachers, setValidAmountOfTeachers] = useState(false);


    useEffect(() => {
        fetch(`/api/workshop/commission/${workshopId}/${commissionId}`)
            .then(res => res.json())
            .then(data => {
                setAmountOfStudents(data.data.amountOfStudents);
                setAmountOfTeachers(data.data.amountOfTeachers);
            })
            .catch(error => console.error('Error fetching data:', error));

    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!amountOfTeachers) setValidAmountOfTeachers(false);
        if (!amountOfStudents) setValidAmountOfStudents(false);
        if (!amountOfTeachers || !amountOfStudents) return;

        const WorkshopRoundWorkshop = {
            amountOfTeachers,
            amountOfStudents,
        };

        fetch(`/api/workshopRound/${workshopId}/${commissionId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(WorkshopRoundWorkshop),
        })
            .then((response) => response.json())
            .then((data) => {
                onSave(editedRound);
                onEdit()
            })
            .catch((error) => console.error("Error:", error));
    };

    return (
        <div className="round-edit-modal fixed inset-0 z-10 flex items-center justify-center bg-gray-900 bg-opacity-15">
            <div className="modal-content bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto">
            <span className="close text-xl cursor-pointer" onClick={onClose}>
                &times;
            </span>
                <h2 className="text-xl font-medium mb-4">Bewerk {editedRound}</h2>
                <form>
                    <div className="mb-4">
                        <label htmlFor="amountOfStudents" className="block mb-2 text-sm font-medium text-gray-900 light:text-white">Leerlingen</label>
                        <input
                            id="amountOfStudents"
                            type="text"
                            value={amountOfStudents}
                            placeholder={amountOfStudents}
                            onChange={(e) => {
                                setAmountOfStudents(e.target.value);
                                setValidAmountOfStudents(true);
                            }}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="amountOfTeachers" className="block mb-2 text-sm font-medium text-gray-900 light:text-white">Docenten</label>
                        <input
                            id="amountOfTeachers"
                            type="text"
                            value={amountOfTeachers}
                            placeholder={amountOfTeachers}
                            onChange={(e) => {
                                setAmountOfTeachers(e.target.value);
                                setValidAmountOfTeachers(true);
                            }}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500"
                        />
                    </div>
                    <button
                        className="text-white bg-brand-orange hover:bg-brand-orange-hover focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center light:bg-blue-600 light:hover:bg-blue-700 light:focus:ring-blue-800"
                        type="submit" onClick={handleSubmit}>
                        Opslaan
                    </button>
                </form>
            </div>
        </div>
    );


}
