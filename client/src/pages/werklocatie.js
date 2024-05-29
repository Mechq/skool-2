import React, { useEffect, useState } from "react";
import SidePanel from "../components/SidePanel";
// import LocationList from "../components/LocationList"; // Assuming you have a LocationList component
// import '../styles/werklocatie.css';

function Werklocatie() {
    const [showSidePanel, setShowSidePanel] = useState(false);
    const [sidePanelContent, setSidePanelContent] = useState("");
    const [workshopId, setWorkshopId] = useState(null);

    useEffect(() => {
        console.log("Side panel state: ", showSidePanel);
    }, [showSidePanel]);

    return (
        <div className='werklocatieContent'>
            <button className="fab fab-common" onClick={() => setShowSidePanel(!showSidePanel)}>
                <span className={showSidePanel ? "rotate" : ""}>{'+'}</span>
            </button>
            {/* <LocationList /> Assuming you have a LocationList component */}
            <h1 className="title">Werklocatie Aanmaken</h1>
            <SidePanel showSidePanel={showSidePanel} setShowSidePanel={setShowSidePanel}>

            </SidePanel>
        </div>
    );
}

export default Werklocatie;