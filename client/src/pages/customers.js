import React, { useEffect, useState } from "react";
import CustomerList from "../components/lists/CustomerList";
import CreateCustomerPanelContent from "../components/panel-contents/CreateCustomerPanelContent";
import EditCustomerPanelContent from "../components/panel-contents/EditCustomerPanelContent";
import SidePanel from "../components/SidePanel";
import CreateButton from "../components/CreateButton";
import CreateCustomerPanelContent from "../components/panel-contents/CreateCustomerPanelContent";
import CustomerList from "../components/lists/CustomerList";
import EditCustomerPanelContent from "../components/panel-contents/EditCustomerPanelContent";

export function Customers() {
    const [isOpen, setIsOpen] = useState(false);
    const [sidePanelContent, setSidePanelContent] = useState("");
    const [customerId, setCustomerId] = useState(null);
    const [customers, setCustomers] = useState([]);
    const [customerId, setCustomerId] = useState(null);
    const [rotateSpan, setRotateSpan] = useState(false);

    useEffect(() => {
        fetch('/api/customer')
            .then(res => res.json())
            .then(data => {
                setCustomers(data.data);
                console.log("Fetched customers: ", data.data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div>
            <h1>Customers</h1>
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
                    <CreateCustomerPanelContent setCustomers={setCustomers} setShowSidePanel={setIsOpen}/>}
                {sidePanelContent === "edit" &&
                    <EditCustomerPanelContent customerId={customerId} setShowSidePanel={setIsOpen}/>}
            </SidePanel>
            <CustomerList customers={customers}
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
