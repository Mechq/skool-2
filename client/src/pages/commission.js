import React, {useEffect, useState} from "react";
import CommissionList from "../components/lists/CommissionList";
import CreateWorkshopButton from "../components/CreateWorkshopButton";
import MailTemplateList from "../components/lists/MailTemplateList";
import SidePanel from "../components/SidePanel";
import MailTemplateContent from "../components/panel-contents/MailTemplateContent";


export default function Commission() {
    const [showSidePanel, setShowSidePanel] = useState(false);
    const [sidePanelContent, setSidePanelContent] = useState("");
    return (
        <>
            <h1>Opdracht</h1>
            <CommissionList />

            <CreateWorkshopButton
                setShowSidePanel={setShowSidePanel}
                showSidePanel={showSidePanel}
                setSidePanelContent={setSidePanelContent}
                />
            <SidePanel showSidePanel={showSidePanel}>
                {sidePanelContent === "create" && <MailTemplateContent/>}
            </SidePanel>
        </>
    );
}