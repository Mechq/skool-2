import React, {useEffect, useState} from "react";
import SidePanel from "../components/SidePanel";
import CreatePanelContent_workLocation from "../components/workLocation/CreatePanelContent_workLocation";
import CreateButton from "../components/CreateButton";
import List_workLocation from "../components/workLocation/List_workLocation";
import EditPanelWorkLocationContent from "../components/workLocation/EditPanelContent_workLocation";

export default function WorkLocation() {
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
            <SidePanel isOpen={isOpen} setIsOpen={setIsOpen}>
                {sidePanelContent === "create" &&
                    <CreatePanelContent_workLocation setWorkLocations={setWorkLocations} setShowSidePanel={setIsOpen}/>}
                {sidePanelContent === "edit" &&
                    <EditPanelWorkLocationContent setWorkLocations={setWorkLocations} locationId={workLocationId}
                                                  setShowSidePanel={setIsOpen}/>}
            </SidePanel>
            <List_workLocation
                setShowSidePanel={setIsOpen}
                setSidePanelContent={setSidePanelContent}
                setWorkLocationId={setWorkLocationId}
                workLocations={workLocations}
                setRotateSpan={setRotateSpan}
            />
        </div>
    );
}

