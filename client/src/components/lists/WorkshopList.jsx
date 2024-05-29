import React from "react";
import "../../styles/components/WorkshopList.css";

export default function WorkshopList({setShowSidePanel, setSidePanelContent, setWorkshopId, workshops}) {

    const editWorkshop = (id) => {
        setWorkshopId(id);
        setSidePanelContent("edit");
        setShowSidePanel(true);
    };

    return (
        <div>
            <ul className="list">
                {workshops.map(workshop => (
                    <li key={workshop.id} onClick={() => editWorkshop(workshop.id)}>
                        {workshop.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}
