import React, {useEffect, useState} from "react";
import "../../styles/ModalScreen.css";
import {use} from "chai";

export default function CommissionRoundModalScreen({ roundType, roundId, onClose, onSave }) {
    const [editedRound, setEditedRound] = useState(roundType);
    const [duration, setDuration] = useState('')
    const [startTime, setStartTime] = useState('')
    const [order, setOrder] = useState('')
    const [endTime, setEndTime] = useState('')

    const handleChange = (e) => {
        setEditedRound(e.target.value);
    };
    useEffect(() => {
        fetch(`/api/round/${roundId}`)
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                setDuration(data.data.duration);
                setStartTime(data.data.startTime);
                setOrder(data.data.order);
                setEndTime(data.data.endTime);
            })
            .catch(error => console.error('Error:', error))
    }, [])

    useEffect(() => {
        if (startTime && duration >= 0) {
            const newEndTime = calculateEndTime(startTime, duration);
            setEndTime(newEndTime);
        }
    }, [startTime, duration]);

    const calculateEndTime = (startTime, duration) => {
        const [hours, minutes] = startTime.split(':').map(Number);
        const totalMinutes = hours * 60 + minutes + duration;
        const endHours = Math.floor(totalMinutes / 60) % 24;
        const endMinutes = totalMinutes % 60;

        return `${String(endHours).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}`;
    };

    const handleStartTimeChange = (e) => {
        setStartTime(e.target.value);
    };

    const handleDurationChange = (e) => {
        setDuration(Number(e.target.value));
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
                            handleDurationChange(e);
                        }}
                    />
                    <input
                        type="text"
                        value={startTime}
                        placeholder="Begintijd"
                        onChange={(e) => {
                            setStartTime(e.target.value);
                            handleStartTimeChange(e);
                        }}
                    />
                    <input
                        type="text"
                        value={endTime}
                        placeholder="Eind tijd"
                        readOnly
                    />
                    <button type="submit">Save</button>
                </form>
            </div>
        </div>
    );

}
