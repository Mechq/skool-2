import React, {useEffect, useState} from "react";
import "../../styles/ModalScreen.css";
import {use} from "chai";

export default function CommissionWorkshopRoundWorkshopEditModal({
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
        <div className="round-edit-modal">
            <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
                <h2>Bewerk {editedRound}</h2>
                <form>
                    <p>Leerlingen</p>
                    <input
                        type="text"
                        value={amountOfStudents}
                        placeholder={amountOfStudents}
                        onChange={(e) => {
                            setAmountOfStudents(e.target.value);
                            setValidAmountOfStudents(true);
                        }}
                    />
                    <p>Docenten</p>
                    <input
                        type="text"
                        value={amountOfTeachers}
                        placeholder={amountOfTeachers}
                        onChange={(e) => {
                            setAmountOfTeachers(e.target.value);
                            setValidAmountOfTeachers(true);
                        }}
                    />
                    <button
                        className="text-white bg-brand-orange hover:bg-brand-orange focus:outline-none focus:ring-brand-orange font-medium rounded-lg text-sm w-full sm:w-auto px-4 py-2.5 text-center light:bg-brand-orange light:hover:bg-brand-orange light:focus:ring-brand-orange mt-4"
                        type="submit" onClick={handleSubmit}>Opslaan
                    </button>
                </form>
            </div>
        </div>
    );

}
