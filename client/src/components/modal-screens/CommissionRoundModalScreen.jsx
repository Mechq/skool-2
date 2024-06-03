import React, {useEffect, useState} from "react";
import "../../styles/ModalScreen.css";
import {use} from "chai";

export default function CommissionRoundModalScreen({ roundType, roundId, onClose, onSave }) {
    const [editedRound, setEditedRound] = useState(roundType);
    const [duration, setDuration] = useState('')
    const [amountOfStudents, setAmountOfStudents] = useState('')
    const [amountOfTeachers, setAmountOfTeachers] = useState('')
    const [startTime, setStartTime] = useState('')


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
                        value={duration}
                        onChange={handleChange}
                        placeholder="Tijdsduur"
                    />
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
                    <input
                        type="text"
                        value={startTime}
                        onChange={handleChange}
                        placeholder="Begintijd"
                    />
                    <button type="submit">Save</button>
                </form>
            </div>
        </div>
    );

}
