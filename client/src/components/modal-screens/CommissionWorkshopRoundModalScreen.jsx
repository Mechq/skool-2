import React, { useEffect, useState } from "react";
import "../../styles/ModalScreen.css";

export default function CommissionWorkshopRoundModalScreen({ roundType, roundId, onClose, onSave, onWorkshopAdded }) {
    const [editedRound, setEditedRound] = useState(roundType);
    const [workshops, setWorkshops] = useState([]);
    const [selectedWorkshops, setSelectedWorkshops] = useState([]);
    const [duration, setDuration] = useState('');
    const [startTime, setStartTime] = useState('')
    const [order, setOrder] = useState('')
    const [endTime, setEndTime] = useState('')
    const [commissionId, setCommissionId] = useState('')
    const [initSelectedWorkshops, setInitSelectedWorkshops] = useState([])

    const [validDuration, setValidDuration] = useState(false);
    const [validStartTime, setValidStartTime] = useState(false);

    useEffect(() => {
        fetch('/api/workshop')
            .then(res => res.json())
            .then(data => {
                setWorkshops(data.data);
                console.log("Fetched workshops: ", data.data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    useEffect(() => {
        fetch(`/api/round/${roundId}`)
            .then(res => res.json())
            .then(data => {
                setDuration(data.data.duration);
                setStartTime(data.data.startTime);
                setEndTime(data.data.endTime);
                setCommissionId(data.data.commissionId);
                console.log("Fetched workshops: ", data.data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);


    useEffect(() => {
        fetch(`/api/workshopRound/workshop/${roundId}`)
            .then(res => res.json())
            .then(data => {
                const selectedWorkshopIds = data.data.map(workshop => workshop.id);
                setSelectedWorkshops(selectedWorkshopIds);
                setInitSelectedWorkshops(selectedWorkshopIds);
                console.log("Fetched selected workshops: ", selectedWorkshopIds);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [roundId]);

    const handleCheckboxChange = (workshopId) => {
        setSelectedWorkshops(prevSelectedWorkshops => {
            if (prevSelectedWorkshops.includes(workshopId)) {
                return prevSelectedWorkshops.filter(id => id !== workshopId);
            } else {
                return [...prevSelectedWorkshops, workshopId];
            }
        });
    };

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
        onSave(editedRound);

        // First, update the round duration and start time
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

                // After updating the round, delete associated workshops
                fetch(`/api/workshopRound/workshop/${roundId}`, {
                    method: 'DELETE',
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Delete Success:', data);

                        // After deleting workshops, add selected workshops to the round
                        const fetchPromises = selectedWorkshops.map(selectedWorkshopId => {
                            console.log("Adding workshop to round: ", selectedWorkshopId, roundId)
                            return fetch(`/api/workshopRound/${selectedWorkshopId}/${roundId}`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    workshopId: selectedWorkshopId,
                                    roundId: roundId,
                                    commissionId: commissionId
                                }),
                            })
                                .then(response => response.json())
                                .then(data => {
                                    console.log('Success:', data);
                                })
                                .catch(error => console.error('Error:', error));
                        });

                        // After adding workshops, execute necessary follow-up actions
                        Promise.all(fetchPromises)
                            .then(() => {
                                onWorkshopAdded();
                                onClose();
                            })
                            .catch(error => {
                                console.error('Error in one of the fetch calls:', error);
                            });
                    })
                    .catch(error => console.error('Delete Error:', error));
            })
            .catch(error => console.error('PUT Error:', error));


        console.log("initSelectedWorkshops", initSelectedWorkshops)
        console.log("selectedWorkshops", selectedWorkshops)
        // init = [44,23]
        // selected = [44,23, 12]
        //
        initSelectedWorkshops.forEach(initSelectedWorkshopId => {
            if (!selectedWorkshops.includes(initSelectedWorkshopId)) {
                console.log("deleting workshop", initSelectedWorkshopId)
                fetch(`/api/workshopRound/${initSelectedWorkshopId}/${commissionId}`, {
                    method: 'DELETE',
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Success:', data);
                    })
                    .catch(error => console.error('Error:', error));
            }
        })
    };


    return (
        <div className="round-edit-modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>
                    &times;
                </span>
                <h2>Bewerk Workshop</h2>
                <form>
                    <p>Starttijd</p>
                    <input
                        type="text"
                        value={startTime}
                        placeholder="Starttijd"
                        onChange={(e) => {
                            setStartTime(e.target.value);
                            setValidStartTime(true);
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
                            setValidDuration(true);
                            handleDurationChange(e)
                        }}
                    />
                    <input
                        type="text"
                        value={endTime}
                        placeholder="Eindtijd"
                        readOnly
                    />
                </form>
                <ul className="workshopList">
                    {workshops.map(workshop => (
                        <li key={workshop.id}>
                            <label>
                            <input
                                    type="checkbox"
                                    checked={selectedWorkshops.includes(workshop.id)}
                                    onChange={() => handleCheckboxChange(workshop.id)}
                                />
                                {workshop.name}
                            </label>
                        </li>
                    ))}
                </ul>
                <button                     className="text-white bg-brand-orange hover:bg-brand-orange focus:outline-none focus:ring-brand-orange font-medium rounded-lg text-sm w-full sm:w-auto px-4 py-2.5 text-center light:bg-brand-orange light:hover:bg-brand-orange light:focus:ring-brand-orange mt-4"
                                            type="submit" onClick={handleSubmit}>Opslaan</button>
            </div>
        </div>
    );
}
