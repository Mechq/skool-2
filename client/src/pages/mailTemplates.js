import React, {useState, useEffect} from "react";
import MailTemplateList from "../components/MailTemplateList";
import CreateButton from "../components/CreateButton";
import SidePanel from "../components/SidePanel";
import EditPanelContent from "../components/panel-contents/EditMailTemplatePanelContent";
import CreatePanelContent from "../components/panel-contents/CreatePanelContent";

export default function MailTemplates() {
    const [showSidePanel, setShowSidePanel] = useState(false);
    const [sidePanelContent, setSidePanelContent] = useState("");
    const [mailTemplateId, setMailTemplateId] = useState(null);

    useEffect(() => {
        console.log("Side panel state: ", showSidePanel);
    }, [showSidePanel]);

    return (
        <div>
            <CreateButton
                setShowSidePanel={setShowSidePanel}
                showSidePanel={showSidePanel}
                setSidePanelContent={setSidePanelContent}
            />
            <SidePanel showSidePanel={showSidePanel}>
                {sidePanelContent === "create" && <CreatePanelContent/>}
                {sidePanelContent === "edit" &&
                    <EditPanelContent mailTemplateId={mailTemplateId} setShowSidePanel={setShowSidePanel}/>}
            </SidePanel>
            <MailTemplateList
                setShowSidePanel={setShowSidePanel}
                showSidePanel={showSidePanel}
                setSidePanelContent={setSidePanelContent}
                setMailTemplateId={setMailTemplateId}/>
        </div>
    );
}
