import React, {useEffect, useState} from "react";
import "../../styles/ModalScreen.css";
import {use} from "chai";

export default function CommissionWorkshopRoundWorkshopEditModal({ roundType, workshopId, onClose, onSave }) {
    const [editedRound, setEditedRound] = useState(roundType);
    const [amountOfStudents, setAmountOfStudents] = useState('')
    const [amountOfTeachers, setAmountOfTeachers] = useState('')


    const handleChange = (e) => {
        setEditedRound(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(editedRound);
    };

        return (
            <div className="round-edit-modal">
                <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
                    <h2>Edit {editedRound}</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={amountOfStudents}
                            onChange={handleChange}
                            placeholder="Aantal leerlingen"
                        />
                        <input
                            type="text"
                            value={amountOfTeachers}
                            onChange={handleChange}
                            placeholder="Aantal docenten"
                        />
                        <button type="submit">Save</button>
                    </form>
                </div>
            </div>
        );

}
