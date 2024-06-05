import React, {useEffect, useState} from "react";
import "../../styles/ModalScreen.css";
import {use} from "chai";

export default function CommissionRoundModalScreen({ roundType, roundId, onClose, onSave, commissionId, onEdit }) {
    const [editedRound, setEditedRound] = useState(roundType);
    const [duration, setDuration] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        fetch(`/api/round/${roundId}`)
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                setDuration(data.data.duration);
                setStartTime(data.data.startTime);
                setEndTime(data.data.endTime);
                setLoading(false)
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
                startTime,
                endTime
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                onEdit()
            })
            .catch(error => console.error('Error:', error))
        onSave(editedRound);
    };

    if (loading) return (<div>Loading...</div>);
    else{
    return (
        <div className="round-edit-modal">
            <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
                <header>Bewerk {editedRound}</header>

                <form onSubmit={handleSubmit}>
                    <p>Starttijd</p>
                    <input
                        type="text"
                        value={startTime}
                        placeholder="Starttijd"
                        onChange={(e) => {
                            setStartTime(e.target.value);
                            handleStartTimeChange(e);
                        }}
                    />
<p>Tijdsduur</p>
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
                        value={endTime}
                        placeholder="Eindtijd"
                        readOnly
                    />
                    <button className="text-white bg-brand-orange hover:bg-brand-orange focus:outline-none focus:ring-brand-orange font-medium rounded-lg text-sm w-full sm:w-auto px-4 py-2.5 text-center light:bg-brand-orange light:hover:bg-brand-orange light:focus:ring-brand-orange mt-4"
                        type="submit">Opslaan</button>
                </form>
            </div>
        </div>
    );

}}
