import React, { useState } from "react";
import CreateWorkshopSidePanel from "../components/CreateWorkshopSidePanel";
import WorkshopList from "../components/workshopList";
import '../styles/workshops.css';

function Workshops() {
    const [showSidePanel, setShowSidePanel] = useState(false);

    return (
        <div className='workshopsContent'>
            <button className="fab fab-common" onClick={() => setShowSidePanel(!showSidePanel)}>
                <span className={showSidePanel ? "rotate" : ""}>{'+'}</span>
            </button>
            <WorkshopList/>
            <CreateWorkshopSidePanel showSidePanel={showSidePanel} setShowSidePanel={setShowSidePanel}/>
        </div>
    );
}

export default Workshops;