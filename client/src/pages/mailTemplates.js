import React, {useState, useEffect} from "react";
import MailTemplateList from "../components//lists/MailTemplateList";
import SidePanel from "../components/SidePanel";
import MailTemplateContent from "../components/panel-contents/MailTemplateContent";
import CreateButton from "../components/CreateButton";

export default function MailTemplates() {
    const [showSidePanel, setShowSidePanel] = useState(false);
    const [sidePanelContent, setSidePanelContent] = useState("");
    const [workshopId, setWorkshopId] = useState(null);

    return (
        <>
            <CreateButton
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
