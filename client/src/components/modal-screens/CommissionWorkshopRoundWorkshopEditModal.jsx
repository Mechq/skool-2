import React, {useEffect, useState} from "react";
import "../../styles/ModalScreen.css";
import {use} from "chai";

export default function CommissionWorkshopRoundWorkshopEditModal({ roundType, roundId, workshopId, onClose, onSave }) {
    const [editedRound, setEditedRound] = useState(roundType);
    const [amountOfStudents, setAmountOfStudents] = useState('')
    const [amountOfTeachers, setAmountOfTeachers] = useState('')

    const [validAmountOfStudents, setValidAmountOfStudents] = useState(false);
    const [validAmountOfTeachers, setValidAmountOfTeachers] = useState(false);
    console.log("roundId", roundId)


    useEffect(() => {
        fetch(`/api/workshopRound/${workshopId}/${roundId}`)
            .then(res => res.json())
            .then(data => {
                console.log("Fetched workshop round: ", data.data);
                setAmountOfStudents(data.data.amountOfStudents);
                setAmountOfTeachers(data.data.amountOfTeachers);
            })
            .catch(error => console.error('Error fetching data:', error));

    }, []);
console.log("amountOfStudents", amountOfStudents)
    console.log("amountOfTeachers", amountOfTeachers)
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!amountOfTeachers) setValidAmountOfTeachers(false);
        if (!amountOfStudents) setValidAmountOfStudents(false);
        if (!amountOfTeachers || !amountOfStudents) return;

        const WorkshopRoundWorkshop = {
            amountOfTeachers,
            amountOfStudents,

        };

        fetch(`/api/workshopRound/${workshopId}/${roundId}`, { // add api route
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(WorkshopRoundWorkshop),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
                onSave(editedRound);
            })
            .catch((error) => console.error("Error:", error));


    };

        return (
            <div className="round-edit-modal">
                <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
                    <h2>Edit {editedRound}</h2>
                    <form>
                        <input
                            type="text"
                            value={amountOfStudents}
                            placeholder={amountOfStudents}
                            onChange={(e) => {
                                setAmountOfStudents(e.target.value);
                                setValidAmountOfStudents(true);  // Reset validation state
                            }}
                        />
                        <input
                            type="text"
                            value={amountOfTeachers}
                            placeholder={amountOfTeachers}
                            onChange={(e) => {
                                setAmountOfTeachers(e.target.value);
                                setValidAmountOfTeachers(true);  // Reset validation state
                            }}
                        />
                        <button type="submit" onClick={handleSubmit}>Save</button>
                    </form>
                </div>
            </div>
        );

}