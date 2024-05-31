import React, {useEffect, useState} from "react";
import "../styles/ModalScreen.css";
import {use} from "chai";

export default function CommissionRoundModalScreen({ roundType, onClose, onSave }) {
    const [editedRound, setEditedRound] = useState(roundType);
    const [workshops, setWorkshops] = useState([])
    const [duration, setDuration] = useState('')
    const [amountOfStudents, setAmountOfStudents] = useState('')
    const [amountOfTeachers, setAmountOfTeachers] = useState('')
    const [startTime, setStartTime] = useState('')

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

    useEffect(() => {
        if (Array.isArray(workshops)) {
            // setWorkshopsList(workshops);
            console.log(workshops, " is an array")
        } else {
            console.error('Workshops is not an array:', workshops);
        }
    }, [workshops]);

    const handleChange = (e) => {
        setEditedRound(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(editedRound);
    };
    if (roundType !== "workshopronde"){
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
    if (roundType === "workshopronde") {
        return (
            <div className="round-edit-modal">
                <div className="modal-content">
                <span className="close" onClick={onClose}>
                    &times;
                </span>
                    <h2>Edit Workshop</h2>
                    <ul className="list">
                        {workshops.map(workshop => (
                            <li key={workshop.id}>
                                {workshop.name}
                            </li>
                        ))}
                    </ul>
                    <button type="submit">Save</button>

                </div>
            </div>
        )
    }

}
