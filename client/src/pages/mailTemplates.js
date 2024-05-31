import React, {useEffect, useState} from "react";
import MailTemplateList from "../components//lists/MailTemplateList";
import SidePanel from "../components/SidePanel";
import MailTemplateContent from "../components/panel-contents/MailTemplateContent";
import CreateButton from "../components/CreateButton";
import EditMailTemplateContent from "../components/panel-contents/EditMailTemplateContent";
import EditPanelWorkshopContent from "../components/panel-contents/EditPanelWorkshopContent";
import WorkshopList from "../components/lists/WorkshopList";

export default function MailTemplates() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [sidePanelContent, setSidePanelContent] = useState("");
    const [mailTemplateId, setMailTemplateId] = useState(null);
    const [mailTemplates, setMailTemplates] = useState([]);
    const [rotateSpan, setRotateSpan] = useState(false);

    useEffect(() => {
        fetch('/api/mailTemplate/')
            .then(res => res.json())
            .then(data => {
                setMailTemplates(data.data);
                console.log("Fetched mailTemplates: ", data.data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [isOpen]);

    return (
        <div>
            <h1 id={"header"}>Workshops</h1>
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
                    <MailTemplateContent  setShowSidePanel={setIsOpen}/>}
                {sidePanelContent === "edit" &&
                    <EditMailTemplateContent mailTemplateId={mailTemplateId} setShowSidePanel={setIsOpen}/>}
            </SidePanel>
            <WorkshopList
                setShowSidePanel={setIsOpen}
                showSidePanel={isOpen}
                setSidePanelContent={setSidePanelContent}
                setWorkshopId={setMailTemplateId}
                workshops={mailTemplates}
                setRotateSpan={setRotateSpan}
            />
        </div>
    );
}