import React, {useEffect, useState} from "react";
import CommissionList from "../components/lists/CommissionList";
import SidePanel from "../components/SidePanel";
import CommissionPanelContent from "../components/panel-contents/CommissionPanelContent";
import CreateButton from "../components/CreateButton";


export default function Commission() {
    const [showSidePanel, setShowSidePanel] = useState(false);
    const [sidePanelContent, setSidePanelContent] = useState("");
    return (
        <>
            <h1>Opdracht</h1>
            <CommissionList />

            <CreateButton
                setShowSidePanel={setShowSidePanel}
                showSidePanel={showSidePanel}
                setSidePanelContent={setSidePanelContent}
                />
            <SidePanel showSidePanel={showSidePanel}>
                {sidePanelContent === "create" && <CommissionPanelContent/>}
            </SidePanel>
        </>
    );
}