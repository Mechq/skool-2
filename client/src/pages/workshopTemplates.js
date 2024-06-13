import React, {useEffect, useState} from "react";
import List_workshopTemplates from "../components/workshopTemplates/List_workshopTemplates";
import CreatePanelContent_workshopTemplates from "../components/workshopTemplates/CreatePanelContent_workshopTemplates";
import SidePanel from "../components/SidePanel";
import EditPanelContent_workshopTemplates from "../components/workshopTemplates/EditPanelContent_workshopTemplates";
import CreateButton from "../components/CreateButton";

export default function WorkshopTemplates() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [sidePanelContent, setSidePanelContent] = useState("");
    const [workshopId, setWorkshopId] = useState(null);
    const [workshops, setWorkshops] = useState([]);
    const [rotateSpan, setRotateSpan] = useState(false);

    useEffect(() => {
        fetch('/api/workshop')
            .then(res => res.json())
            .then(data => {
                setWorkshops(data.data);
                console.log("Fetched workshops: ", data.data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [setIsOpen]);

    return (
        <div>
            <CreateButton
                setShowSidePanel={setIsOpen}
                showSidePanel={isOpen}
                setSidePanelContent={setSidePanelContent}
                rotateSpan={rotateSpan}
                setRotateSpan={setRotateSpan}
            />

            <SidePanel isOpen={isOpen}
                       setIsOpen={setIsOpen}
                       rotateSpan={rotateSpan}
                       setRotateSpan={setRotateSpan}>
                {sidePanelContent === "create" &&
                    <CreatePanelContent_workshopTemplates setWorkshops={setWorkshops} setShowSidePanel={setIsOpen}/>}
                {sidePanelContent === "edit" &&
                    <EditPanelContent_workshopTemplates workshopId={workshopId} setShowSidePanel={setIsOpen}/>}
            </SidePanel>
            <List_workshopTemplates
                setIsOpen={setIsOpen}
                isOpen={isOpen}
                setSidePanelContent={setSidePanelContent}
                setWorkshopId={setWorkshopId}
                workshops={workshops}
                setWorkshops={setWorkshops}
                setRotateSpan={setRotateSpan}
            />
        </div>
    );
}