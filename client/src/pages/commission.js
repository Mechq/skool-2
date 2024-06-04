import React, {useEffect, useState} from "react";
import CommissionList from "../components/lists/CommissionList";
import SidePanel from "../components/SidePanel";
import CommissionPanelContent from "../components/panel-contents/CommissionPanelContent";
import CreateButton from "../components/CreateButton";
import PageSecurity from "../PageSecurity";

export default function Commission() {
    const [showSidePanel, setShowSidePanel] = useState(false);
    const [sidePanelContent, setSidePanelContent] = useState("");
    const [commissions, setCommissions] = useState([]);

    useEffect(() => {
        fetch('/api/commission')
            .then(res => res.json())
            .then(data => {
                setCommissions(data.data);
                console.log("Fetched commissions: ", data.data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [showSidePanel]);

    const pageSecurity = PageSecurity();
    if (pageSecurity === null) {
        return null;
    }

    return (
        <>
            <h1>Opdracht</h1>
            <CommissionList commissions={commissions}/>
            <CreateButton
                setShowSidePanel={setShowSidePanel}
                showSidePanel={showSidePanel}
                setSidePanelContent={setSidePanelContent}
            />
            <SidePanel showSidePanel={showSidePanel}>
                {sidePanelContent === "create" &&
                    <CommissionPanelContent setCommissions={setCommissions} setShowSidePanel={setShowSidePanel}/>}
            </SidePanel>
        </>
    );
}