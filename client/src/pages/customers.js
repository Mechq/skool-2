import React, { useEffect, useState } from "react";
import List_customers from "../components/customers/List_customers";
import CreatePanelContent_customers from "../components/customers/CreatePanelContent_customers";
import EditPanelContent_customers from "../components/customers/EditPanelContent_customers";
import SidePanel from "../components/SidePanel";
import CreateButton from "../components/CreateButton";

export function Customers() {
    const [isOpen, setIsOpen] = useState(false);
    const [sidePanelContent, setSidePanelContent] = useState("");
    const [customerId, setCustomerId] = useState(null);
    const [customers, setCustomers] = useState([]);
    const [rotateSpan, setRotateSpan] = useState(false);

    useEffect(() => {
        fetch('/api/customer')
            .then(res => res.json())
            .then(data => {
                setCustomers(data.data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div>
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
                       setRotateSpan={setRotateSpan}>
                {sidePanelContent === "create" &&
                    <CreatePanelContent_customers setCustomers={setCustomers} setShowSidePanel={setIsOpen}/>}
                {sidePanelContent === "edit" &&
                    <EditPanelContent_customers customerId={customerId} setShowSidePanel={setIsOpen}/>}
            </SidePanel>
            <List_customers customers={customers}
                            setIsOpen={setIsOpen}
                            isOpen={isOpen}
                            setSidePanelContent={setSidePanelContent}
                            setCustomerId={setCustomerId}
                            setRotateSpan={setRotateSpan}
                            setCustomers={setCustomers}
                          />
        </div>
    );
}

export default Customers;
