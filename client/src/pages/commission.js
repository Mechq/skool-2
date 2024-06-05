import React, {useEffect, useState} from "react";
import CommissionList from "../components/lists/CommissionList";
import SidePanel from "../components/SidePanel";
import CommissionPanelContent from "../components/panel-contents/CommissionPanelContent";
import CreateButton from "../components/CreateButton";
import EditCommissionPanelContent from "../components/panel-contents/EditCommissionPanelContent";

export default function Commission() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [sidePanelContent, setSidePanelContent] = useState("");
    const [commissions, setCommissions] = useState([]);
    const [commissionId, setCommissionId] = useState(null);
    const [rotateSpan, setRotateSpan] = useState(false);


    useEffect(() => {
        fetch('/api/commission')
            .then(res => res.json())
            .then(data => {
                setCommissions(data.data);
                console.log("Fetched commissions: ", data.data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [setIsOpen]);

    return (
        <>
            <CommissionList
                setIsOpen={setIsOpen}
                isOpen={isOpen}
                setSidePanelContent={setSidePanelContent}
                setCommissionId={setCommissionId}
                commissions={commissions}
                setCommissions={setCommissions} // pass setWorkshops as prop
                setRotateSpan={setRotateSpan}/>
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
                setRotateSpan={rotateSpan}>
                {sidePanelContent === "create" &&
                    <CommissionPanelContent setCommissions={setCommissions} setShowSidePanel={setIsOpen}/>}
                {sidePanelContent === "edit" &&
                    <EditCommissionPanelContent commissionId={commissionId} setShowSidePanel={setIsOpen}/>}
            </SidePanel>
        </>
    );
}