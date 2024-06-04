import React, {useEffect, useState} from "react";
import CommissionList from "../components/lists/CommissionList";
import SidePanel from "../components/SidePanel";
import CommissionPanelContent from "../components/panel-contents/CommissionPanelContent";
import CreateButton from "../components/CreateButton";
import EditCommissionPanelContent from "../components/panel-contents/EditCommissionPanelContent";

export default function Commission() {
    const [showSidePanel, setShowSidePanel] = useState(false);
    const [sidePanelContent, setSidePanelContent] = useState("");
    const [commissions, setCommissions] = useState([]);
    const [commissionId, setCommissionId] = useState(null);


    useEffect(() => {
        fetch('/api/commission')
            .then(res => res.json())
            .then(data => {
                setCommissions(data.data);
                console.log("Fetched commissions: ", data.data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [showSidePanel]);

    return (
        <>
            <CommissionList
                commissions={commissions}
                setSidePanelContent={setSidePanelContent}
                setShowSidePanel={setShowSidePanel}
                setCommissionId={setCommissionId}/>
            <CreateButton
                setShowSidePanel={setShowSidePanel}
                showSidePanel={showSidePanel}
                setSidePanelContent={setSidePanelContent}
            />
            <SidePanel showSidePanel={showSidePanel}>
                {sidePanelContent === "create" &&
                    <CommissionPanelContent setCommissions={setCommissions} setShowSidePanel={setShowSidePanel}/>}
                {sidePanelContent === "edit" &&
                    <EditCommissionPanelContent commissionId={commissionId} setShowSidePanel={setShowSidePanel}/>}
            </SidePanel>
        </>
    );
}