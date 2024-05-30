import React, {useEffect, useState} from "react";
import SidePanel from "../components/SidePanel";
import CreateWorkLocationContent from "../components/panel-contents/CreateWorkLocationContent";
import CreateButton from "../components/CreateButton";
import WorkLocationList from "../components/lists/WorkLocationList";
import EditPanelWorkLocationContent from "../components/panel-contents/EditWorkLocationContent";

function Worklocation() {
    const [showSidePanel, setShowSidePanel] = useState(false);
    const [sidePanelContent, setSidePanelContent] = useState("");
    const [workLocations, setWorkLocations] = useState([]);
    const [workLocationId, setWorkLocationId] = useState(null);


    useEffect(() => {
        fetch('/api/location')
            .then(res => res.json())
            .then(data => {
                setWorkLocations(data.data);
                console.log("Fetched workshops: ", data.data);
            })
            .catch(error => console.error('Error fetching data:', error));
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
            {sidePanelContent === "create" &&
                    <CreateWorkLocationContent setWorkLocations={setWorkLocations} setShowSidePanel={setShowSidePanel}/>}
                {sidePanelContent === "edit" &&
                    <EditPanelWorkLocationContent workLocationId={workLocationId} setShowSidePanel={setShowSidePanel}/>}
            </SidePanel>
            <WorkLocationList
                  setShowSidePanel={setShowSidePanel}
                  showSidePanel={showSidePanel}
                  setSidePanelContent={setSidePanelContent}
                  setWorkLocationId={setWorkLocationId}
                  workLocations={workLocations}
            />
        </div>
    );
}

export default Worklocation;