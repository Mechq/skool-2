import React, {useEffect, useState} from "react";
import "../styles/ModalScreen.css";
import {use} from "chai";

export default function CommissionWorkshopRoundModalScreen({ roundType, onClose, onSave }) {
    const [editedRound, setEditedRound] = useState(roundType);
    const [workshops, setWorkshops] = useState([])

    useEffect(() => {
        fetch('/api/workshop')
            .then(res => res.json())
            .then(data => {
                setWorkshops(data.data);

                console.log("Fetched workshops: ", data.data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);
    // console.log(workshops)

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
                    <h2>Edit Workshop</h2>
                    <ul className="workshopList">
                        {workshops.map(workshop => (
                            <li key={workshop.id}>
                                <label>
                                    <input
                                        type="checkbox"
                                        // checked={selectedWorkshops.includes(workshop.id)}
                                        // onChange={() => handleCheckboxChange(workshop.id)}
                                    />
                                    {workshop.name}
                                </label>
                            </li>
                        ))}
                    </ul>
                    <button type="submit">Save</button>

                </div>
            </div>
        )


}
