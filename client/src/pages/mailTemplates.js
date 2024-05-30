import React, {useEffect, useState} from "react";
import MailTemplateList from "../components//lists/MailTemplateList";
import SidePanel from "../components/SidePanel";
import MailTemplateContent from "../components/panel-contents/MailTemplateContent";
import CreateButton from "../components/CreateButton";
import EditMailTemplateContent from "../components/panel-contents/EditMailTemplateContent";

export default function MailTemplates() {
    const [showSidePanel, setShowSidePanel] = useState(false);
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
    }, [showSidePanel]);

    return (
        <>
            <CreateButton
                setShowSidePanel={setShowSidePanel}
                showSidePanel={showSidePanel}
                setSidePanelContent={setSidePanelContent}
                rotateSpan={rotateSpan}
                setRotateSpan={setRotateSpan}
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
                mailTemplates={mailTemplates}
                setRotateSpan={setRotateSpan}
            />
        </>
    );
}