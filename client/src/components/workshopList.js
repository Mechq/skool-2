import {React, useState, useEffect} from "react";
import "../styles/workshopList.css";
function WorkshopList() {
    const [workshopNames, setWorkshopNames] = useState([]);
    useEffect(() => {
        fetch('/api/workshop')
            .then(res => res.json())
            .then(data => setWorkshopNames(data.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);
    console.log(workshopNames);

    return (
        <div>
            <h1>Workshops</h1>
            <ul className={"list"}>
                {workshopNames.map(workshopName => (
                    <li key={workshopName.id}>{workshopName.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default WorkshopList;