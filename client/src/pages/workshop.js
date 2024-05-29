import React, {useState, useEffect} from "react";
import CreateWorkshopButton from "../components/CreateWorkshopButton";
import WorkshopList from "../components/WorkshopList";
import CreatePanelContent from "../components/panel-contents/CreatePanelContent";
import SidePanel from "../components/SidePanel";
import EditPanelContent from "../components/panel-contents/EditPanelContent";

export default function Workshop() {
    const [showSidePanel, setShowSidePanel] = useState(false);
    const [sidePanelContent, setSidePanelContent] = useState("");
    const [workshopId, setWorkshopId] = useState(null);

    useEffect(() => {
        console.log("Side panel state: ", showSidePanel);
    }, [showSidePanel]);

    return (
        <div>
            <CreateWorkshopButton
                setShowSidePanel={setShowSidePanel}
                showSidePanel={showSidePanel}
                setSidePanelContent={setSidePanelContent}
            />
            <SidePanel showSidePanel={showSidePanel}>
                {sidePanelContent === "create" && <CreatePanelContent/>}
                {sidePanelContent === "edit" &&
                    <EditPanelContent workshopId={workshopId} setShowSidePanel={setShowSidePanel}/>}
            </SidePanel>
            <WorkshopList
                setShowSidePanel={setShowSidePanel}
                showSidePanel={showSidePanel}
                setSidePanelContent={setSidePanelContent}
                setWorkshopId={setWorkshopId} // Ensure WorkshopList sets the workshopId
            />
        </div>
    );
}
