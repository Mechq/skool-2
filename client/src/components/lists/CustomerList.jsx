import React from "react";

export default function CustomerList({setShowSidePanel, setSidePanelContent, setCustomerId ,customers}) {

    const editCustomer = (id) => {
        setCustomerId(id);
        setSidePanelContent("edit");
        setShowSidePanel(true);
    }

    return (
        <div>
            <ul className="list">
                {customers.map(customer => (
                    <li key={customer.id} onClick={() =>editCustomer(customer.id)}>
                        {customer.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}
