import React, {useState, useEffect} from "react";
import "../../styles/components/WorkshopList.css";

export default function WorkshopList({setShowSidePanel, setSidePanelContent, setWorkshopId}) {
    const [workshops, setWorkshops] = useState([]);

    useEffect(() => {
        fetch('/api/workshop')
            .then(res => res.json())
            .then(data => {
                setWorkshops(data.data);
                console.log("Fetched workshops: ", data.data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const editWorkshop = (id) => {
        setWorkshopId(id);
        setSidePanelContent("edit");
        setShowSidePanel(true);
    };

    return (
        <div>
            <h1>Workshops</h1>
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
