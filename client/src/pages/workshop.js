import React, {useState, useEffect} from "react";
import WorkshopList from "../components/lists/WorkshopList";
import CreatePanelContent from "../components/panel-contents/CreatePanelContent";
import SidePanel from "../components/SidePanel";
import EditPanelContent from "../components/panel-contents/EditPanelContent";
import CreateButton from "../components/CreateButton";

export default function Workshop() {
    const [showSidePanel, setShowSidePanel] = useState(false);
    const [sidePanelContent, setSidePanelContent] = useState("");
    const [workshopId, setWorkshopId] = useState(null);
    const [workshops, setWorkshops] = useState([]);

    useEffect(() => {
        fetch('/api/workshop')
            .then(res => res.json())
            .then(data => {
                setWorkshops(data.data);
                console.log("Fetched workshops: ", data.data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [showSidePanel]);

    return (
        <div>
            <CreateButton
                setShowSidePanel={setShowSidePanel}
                showSidePanel={showSidePanel}
                setSidePanelContent={setSidePanelContent}
            />
            <SidePanel showSidePanel={showSidePanel}>
                {sidePanelContent === "create" && <CreatePanelContent setWorkshops={setWorkshops}/>}
                {sidePanelContent === "edit" &&
                    <EditPanelContent workshopId={workshopId} setShowSidePanel={setShowSidePanel}/>}
            </SidePanel>
            <WorkshopList
                setShowSidePanel={setShowSidePanel}
                showSidePanel={showSidePanel}
                setSidePanelContent={setSidePanelContent}
                setWorkshopId={setWorkshopId}
                workshops={workshops}
            />
        </div>
    );
}