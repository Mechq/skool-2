import React, { useState, useEffect } from "react";
import "../styles/EditWorkshopSidePanel.css";
import "../styles/workshopList.css";
import WorkshopEdit from "./WorkshopEdit"; // Import the WorkshopEdit component

function EditWorkshopSidePanel() {
    const [showSidePanel, setShowSidePanel] = useState(false);
    const [workshopId, setWorkshopId] = useState(null);
    const [workshops, setWorkshops] = useState([]);

    const onWorkshopEdit = (id) => {
        setWorkshopId(id);
        setShowSidePanel(true);
    };

    useEffect(() => {
        fetch('/api/workshop')
            .then(res => res.json())
            .then(data => {
                setWorkshops(data.data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <>
            <div>
                <h1>Workshops</h1>
                <ul className={"list"}>
                    {workshops.map((workshop, index) => (
                        <li key={index} onClick={() => onWorkshopEdit(workshop.id)}>{workshop.name}</li>
                    ))}
                </ul>
            </div>
            {showSidePanel && (
                <WorkshopEdit
                    workshopId={workshopId}
                    setShowSidePanel={setShowSidePanel}
                />
            )}
        </>
    );
}

export default EditWorkshopSidePanel;
