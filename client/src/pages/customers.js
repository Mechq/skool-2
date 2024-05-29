import React, { useEffect, useState } from "react";
import SidePanel from "../components/SidePanel";
import '../styles/customers.css';
import CreateButton from "../components/CreateButton";
import CreateCustomerPanelContent from "../components/panel-contents/CreateCustomerPanelContent";

function Customers() {
    const [showSidePanel, setShowSidePanel] = useState(false);
    const [sidePanelContent, setSidePanelContent] = useState("");
    return (
        <>
            <h1>Customers</h1>
            <CreateButton
                setShowSidePanel={setShowSidePanel}
                showSidePanel={showSidePanel}
                setSidePanelContent={setSidePanelContent}
            />
            <SidePanel showSidePanel={showSidePanel}>
                {sidePanelContent === "create" && <CreateCustomerPanelContent/>}
            </SidePanel>
        </>
    );
}

export default Customers;
