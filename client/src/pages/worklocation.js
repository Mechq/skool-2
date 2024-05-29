import React, { useEffect, useState } from "react";
import SidePanel from "../components/SidePanel";
import CreateWorkLocationContent from "../components/panel-contents/CreateWorkLocationContent";
import CreateButton from "../components/CreateButton";

function Worklocation() {
    const [showSidePanel, setShowSidePanel] = useState(false);
    const [sidePanelContent, setSidePanelContent] = useState("");

    useEffect(() => {
        console.log("Side panel state: ", showSidePanel);
    }, [showSidePanel]);

    return (
        <div className='werklocatieContent'>
            <CreateButton
                setShowSidePanel={setShowSidePanel}
                showSidePanel={showSidePanel}
                setSidePanelContent={setSidePanelContent}
            />
            <h1 className="title">Werklocatie Aanmaken</h1>
            <SidePanel showSidePanel={showSidePanel} setShowSidePanel={setShowSidePanel}>
                {sidePanelContent === "create" && <CreateWorkLocationContent/>}
            </SidePanel>
        </div>
    );
}

export default Worklocation;