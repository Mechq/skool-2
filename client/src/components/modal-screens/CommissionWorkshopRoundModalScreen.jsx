import React, { useEffect, useState } from "react";
import "../../styles/ModalScreen.css";

export default function CommissionWorkshopRoundModalScreen({ roundType, roundId, onClose, onSave, onWorkshopAdded }) {
    const [editedRound, setEditedRound] = useState(roundType);
    const [workshops, setWorkshops] = useState([]);
    const [selectedWorkshops, setSelectedWorkshops] = useState([]);

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
        fetch(`/api/workshopRound/workshop/${roundId}`)
            .then(res => res.json())
            .then(data => {
                const selectedWorkshopIds = data.data.map(workshop => workshop.id);
                setSelectedWorkshops(selectedWorkshopIds);
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

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(editedRound);

        fetch(`/api/workshopRound/workshop/${roundId}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch(error => console.error('Error:', error));


        const fetchPromises = selectedWorkshops.map(selectedWorkshopId => {

            console.log("Adding workshop to round: ", selectedWorkshopId, roundId)
            return fetch(`/api/workshopRound/${selectedWorkshopId}/${roundId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    workshopId: selectedWorkshopId,
                    roundId: roundId
                    //TODO add amountOfStudents and amountOfTeachers
                }),
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                })
                .catch(error => console.error('Error:', error));
        });

        Promise.all(fetchPromises)
            .then(() => {
                onWorkshopAdded();
                onClose();
            })
            .catch(error => {
                console.error('Error in one of the fetch calls:', error);
            });
    };

    return (
        <div className="round-edit-modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>
                    &times;
                </span>
                <h2>Edit Workshop</h2>
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
                <button type="submit" onClick={handleSubmit}>Save</button>
            </div>
        </div>
    );
}
