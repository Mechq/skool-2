import React, {useEffect, useState} from "react";
import "../../styles/ModalScreen.css";
import {use} from "chai";

export default function CommissionRoundModalScreen({ roundType, roundId, onClose, onSave }) {
    const [editedRound, setEditedRound] = useState(roundType);
    const [duration, setDuration] = useState('')
    const [startTime, setStartTime] = useState('')


    const handleChange = (e) => {
        setEditedRound(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`/api/round/${roundId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                duration: parseInt(duration),
                startTime
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch(error => console.error('Error:', error))

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
                        placeholder="Tijdsduur"
                        onChange={(e) => {
                            setDuration(e.target.value);
                        }}
                    />
                    <input
                        type="text"
                        value={startTime}
                        placeholder="Begintijd"
                        onChange={(e) => {
                            setStartTime(e.target.value);
                        }}
                    />
                    <button type="submit">Save</button>
                </form>
            </div>
        </div>
    );

}
