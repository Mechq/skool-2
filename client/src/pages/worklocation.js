import React, { useEffect, useState } from "react";
import SidePanel from "../components/SidePanel";
import CreateWorkLocationContent from "../components/panel-contents/CreateWorkLocationContent";

function Worklocation() {
    const [showSidePanel, setShowSidePanel] = useState(false);
    const [sidePanelContent, setSidePanelContent] = useState("");

    useEffect(() => {
        console.log("Side panel state: ", showSidePanel);
    }, [showSidePanel]);

    return (
        <div>
            <button className="fab fab-common" onClick={() => setShowSidePanel(!showSidePanel)}>
                <span className={showSidePanel ? "rotate" : ""}>{'+'}</span>
            </button>
            {/* <LocationList /> Assuming you have a LocationList component */}
            <h1 className="title">Werklocatie Aanmaken</h1>
            <SidePanel showSidePanel={showSidePanel}>
                {sidePanelContent === "create" && <CreateWorkLocationContent/>}
            </SidePanel>
        </div>
    );
}

export default Worklocation;