import React, {useEffect, useState} from "react";
import WorkshopList from "../components/lists/WorkshopList";
import CreatePanelContent from "../components/panel-contents/CreatePanelContent";
import SidePanel from "../components/SidePanel";
import EditPanelWorkshopContent from "../components/panel-contents/EditPanelWorkshopContent";
import CreateButton from "../components/CreateButton";
import PageSecurity from "../PageSecurity";

export default function Workshop() {
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

    const userEmail = PageSecurity();

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
                    <CreatePanelContent setWorkshops={setWorkshops} setShowSidePanel={setIsOpen}/>}
                {sidePanelContent === "edit" &&
                    <EditPanelWorkshopContent workshopId={workshopId} setShowSidePanel={setIsOpen}/>}
            </SidePanel>
            <WorkshopList
                setIsOpen={setIsOpen}
                isOpen={isOpen}
                setSidePanelContent={setSidePanelContent}
                setWorkshopId={setWorkshopId}
                workshops={workshops}
                setWorkshops={setWorkshops} // pass setWorkshops as prop
                setRotateSpan={setRotateSpan}
            />
        </div>
    );
}