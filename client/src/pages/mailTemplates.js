import React, {useState, useEffect} from "react";
import MailTemplateList from "../components/lists/MailTemplateList";
import CreateWorkshopButton from "../components/CreateWorkshopButton";
import SidePanel from "../components/SidePanel";
import MailTemplateContent from "../components/panel-contents/MailTemplateContent";

export default function MailTemplates() {
    const [showSidePanel, setShowSidePanel] = useState(false);
    const [sidePanelContent, setSidePanelContent] = useState("");
    const [workshopId, setWorkshopId] = useState(null);

    return (
        <>
            <CreateWorkshopButton
                setShowSidePanel={setShowSidePanel}
                showSidePanel={showSidePanel}
                setSidePanelContent={setSidePanelContent}
            />
            <MailTemplateList/>
            <SidePanel showSidePanel={showSidePanel}>
                {sidePanelContent === "create" && <MailTemplateContent/>}
            </SidePanel>
        </>
    );
}
