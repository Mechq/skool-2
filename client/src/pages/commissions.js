import React, {useEffect, useState} from "react";
import List_commissions from "../components/commissions/List_commissions";
import SidePanel from "../components/SidePanel";
import CreatePanelContent from "../components/commissions/CreatePanelContent_commissions";
import CreateButton from "../components/CreateButton";
import EditPanelContent_commissions from "../components/commissions/EditPanelContent_commissions";

export default function Commissions() {
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
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [setIsOpen]);

    return (
        <>
            <List_commissions
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
                    <CreatePanelContent setCommissions={setCommissions} setShowSidePanel={setIsOpen}/>}
                {sidePanelContent === "edit" &&
                    <EditPanelContent_commissions commissionId={commissionId} setShowSidePanel={setIsOpen}/>}
            </SidePanel>
        </>
    );
}