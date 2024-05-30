import React, {useEffect, useState} from "react";
import SidePanel from "../components/SidePanel";
import '../styles/customers.css';
import CreateButton from "../components/CreateButton";
import CreateCustomerPanelContent from "../components/panel-contents/CreateCustomerPanelContent";
import CustomerList from "../components/lists/CustomerList";
import EditCustomerPanelContent from "../components/panel-contents/EditCustomerPanelContent";

function Customers() {
    const [showSidePanel, setShowSidePanel] = useState(false);
    const [sidePanelContent, setSidePanelContent] = useState("");
    const [customers, setCustomers] = useState([]);
    const [customerId, setCustomerId] = useState(null);

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
        <>
            <h1>Customers</h1>
            <CreateButton
                setShowSidePanel={setShowSidePanel}
                showSidePanel={showSidePanel}
                setSidePanelContent={setSidePanelContent}
            />
            <CustomerList
                customers={customers}
                setShowSidePanel={setShowSidePanel}
                setCustomerId={setCustomerId}
                setSidePanelContent={setSidePanelContent}/>
            <SidePanel showSidePanel={showSidePanel}>
                {sidePanelContent === "create" && <CreateCustomerPanelContent/>}
                {sidePanelContent === "edit" && <EditCustomerPanelContent
                customerId={customerId}
                />}
            </SidePanel>
        </>
    );
}

export default Customers;
