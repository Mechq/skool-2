import React, { useEffect, useState } from "react";
import SidePanel from "../components/SidePanel";
import CreateWorkLocationContent from "../components/panel-contents/CreateWorkLocationContent";
import CreateButton from "../components/CreateButton";
import WorkLocationList from "../components/lists/WorkLocationList";
import EditPanelWorkLocationContent from "../components/panel-contents/EditWorkLocationContent";
import MailTemplateList from "../components/lists/MailTemplateList";

function Worklocation() {
    const [isOpen, setIsOpen] = useState(false);
    const [sidePanelContent, setSidePanelContent] = useState("");
    const [workLocations, setWorkLocations] = useState([]);
    const [workLocationId, setWorkLocationId] = useState(null);
    const [rotateSpan, setRotateSpan] = useState(false);

    useEffect(() => {
        fetch('/api/location')
            .then(res => res.json())
            .then(data => {
                setWorkLocations(data.data);
                console.log("Fetched work locations: ", data.data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [setIsOpen]);

    return (
        <div className='werklocatieContent'>
            <CreateButton
                setShowSidePanel={setIsOpen}
                showSidePanel={isOpen}
                setSidePanelContent={setSidePanelContent}
                rotateSpan={rotateSpan}
                setRotateSpan={setRotateSpan}
            />
            <h1 className="title">Werklocatie Aanmaken</h1>
            <SidePanel isOpen={isOpen} setIsOpen={setIsOpen}>
                {sidePanelContent === "create" &&
                    <CreateWorkLocationContent setWorkLocations={setWorkLocations} setShowSidePanel={setIsOpen}/>}
                {sidePanelContent === "edit" &&
                    <EditPanelWorkLocationContent workLocationId={workLocationId} setShowSidePanel={setIsOpen}/>}
            </SidePanel>
            <MailTemplateList
                setShowSidePanel={setIsOpen}
                setSidePanelContent={setSidePanelContent}
                setMailTemplateId={setWorkLocationId}
                mailTemplates={workLocations} // Pass workLocations as mailTemplates for demonstration
                setRotateSpan={setRotateSpan}
            />
        </div>
    );
}

export default Worklocation;