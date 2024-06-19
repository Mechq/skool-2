import React, {useEffect, useState} from "react";
import "../../styles/ModalScreen.css";

export default function RoundEditModal_commissions({roundType, roundId, onClose, onSave, onEdit}) {
    const [editedRound, setEditedRound] = useState(roundType);
    const [duration, setDuration] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        fetch(`/api/round/${roundId}`)
            .then(response => response.json())
            .then(data => {
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
                onEdit()
            })
            .catch(error => console.error('Error:', error))
        onSave(editedRound);
    };

    if (loading) return (<div>Loading...</div>);

    else {
        return (
            <div className="round-edit-modal fixed inset-0 z-10 flex items-center justify-center bg-gray-900 bg-opacity-15">
                <div className="modal-content bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto">
            <span className="close text-xl cursor-pointer" onClick={onClose}>
                &times;
            </span>
                    <header className="text-xl font-medium mb-4">Bewerk {editedRound}</header>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="startTime" className="block mb-2 text-sm font-medium text-gray-900 light:text-white">Starttijd</label>
                            <input
                                id="startTime"
                                type="text"
                                value={startTime}
                                placeholder="Starttijd"
                                onChange={(e) => {
                                    setStartTime(e.target.value);
                                    handleStartTimeChange(e);
                                }}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-brand-orange-light focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-brand-orange-light light:focus:border-blue-500"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="duration" className="block mb-2 text-sm font-medium text-gray-900 light:text-white">Tijdsduur (minuten)</label>
                            <input
                                id="duration"
                                type="text"
                                value={duration}
                                placeholder="Tijdsduur"
                                onChange={(e) => {
                                    setDuration(e.target.value);
                                    handleDurationChange(e);
                                }}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-brand-orange-light focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-brand-orange-light light:focus:border-blue-500"
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="endTime" className="block mb-2 text-sm font-medium text-gray-900 light:text-white">Eindtijd</label>
                            <input
                                id="endTime"
                                type="text"
                                value={endTime}
                                placeholder="Eindtijd"
                                readOnly
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-brand-orange-light focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-brand-orange-light light:focus:border-blue-500"
                            />
                        </div>
                        <button
                            type="submit"
                            className="text-white bg-brand-orange hover:bg-brand-orange-hover focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center light:bg-blue-600 light:hover:bg-blue-700 light:focus:ring-blue-800"
                        >
                            Opslaan
                        </button>
                    </form>
                </div>
            </div>
        );


    }
}
