import React, {useState, useEffect} from "react";
import MailTemplateList from "../components//lists/MailTemplateList";
import SidePanel from "../components/SidePanel";
import MailTemplateContent from "../components/panel-contents/MailTemplateContent";
import CreateButton from "../components/CreateButton";
import EditMailTemplateContent from "../components/panel-contents/EditMailTemplateContent";

export default function MailTemplates() {
    const [showSidePanel, setShowSidePanel] = useState(false);
    const [sidePanelContent, setSidePanelContent] = useState("");
    const [mailTemplateId, setMailTemplateId] = useState(null);

    useEffect(() => {
        console.log("Side panel state: ", showSidePanel);
    }, [showSidePanel]);

    return (
        <>
            <CreateButton
                setShowSidePanel={setShowSidePanel}
                showSidePanel={showSidePanel}
                setSidePanelContent={setSidePanelContent}
            />

            <SidePanel showSidePanel={showSidePanel}>
                {sidePanelContent === "create" && <MailTemplateContent/>}
                {sidePanelContent === "edit" &&
                    <EditMailTemplateContent mailTemplateId={mailTemplateId} setShowSidePanel={setShowSidePanel}/>}
            </SidePanel>
            <MailTemplateList
                setShowSidePanel={setShowSidePanel}
                showSidePanel={showSidePanel}
                setSidePanelContent={setSidePanelContent}
                setMailTemplateId={setMailTemplateId}
            />
        </>
    );
}