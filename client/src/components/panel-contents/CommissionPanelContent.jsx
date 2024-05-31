import React, { useEffect, useState } from "react";

export default function CommissionPanelContent({ setShowSidePanel, setCommissions }) {
    const [details, setDetails] = useState("");
    const [targetAudience, setTargetAudience] = useState("");
    const [customerId, setCustomerId] = useState("");

    const [detailsValid, setDetailsValid] = useState(true);
    const [targetAudienceValid, setTargetAudienceValid] = useState(true);
    const [customerIdValid, setCustomerIdValid] = useState(true);

    const [customers, setCustomers] = useState([]); // Customers state

    useEffect(() => {
        fetch('/api/customer')
            .then(response => response.json())
            .then(data => {
                setCustomers(data.data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation
        if (!details) setDetailsValid(false);
        if (!targetAudience) setTargetAudienceValid(false);
        if (!customerId) setCustomerIdValid(false);

        if (!details || !targetAudience || !customerId) return;

        const commission = {
            details,
            targetAudience,
            customerId
        };

        fetch('/api/commission', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(commission),
        })
            .then(response => {
                if (!response.ok) {
                    throw response;
                }
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
                setCustomerId('');
                setTargetAudience('');
                setDetails('');

                fetch('/api/commission')
                    .then(res => res.json())
                    .then(data => {
                        setCommissions(data.data);
                        setShowSidePanel(false);
                    })
                    .catch(error => console.error('Error fetching data:', error));
            })
            .catch((error) => {
                console.error('Error:', error);
                setCustomerIdValid(false); // Set customerId as invalid
            });
    };

    return (
        <div className='side-panel-content'>
            <h1 className='side-panel-title'>Create Opdracht</h1>
            <form action="#" method="get" className="form-container">
                <select
                    id="customerId"
                    name="customerId"
                    value={customerId}
                    onChange={(e) => {
                        setCustomerId(e.target.value);
                        setCustomerIdValid(true); // Reset validation state
                    }}
                    className={customerIdValid ? "" : "invalid"}  // Apply CSS class
                >
                    <option value="" disabled>Select Customer</option>
                    {customers.map(customer => (
                        <option key={customer.id} value={customer.id}>
                            {customer.name}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    id="details"
                    name="details"
                    value={details}
                    onChange={(e) => {
                        setDetails(e.target.value);
                        setDetailsValid(true); // Reset validation state
                    }}
                    className={detailsValid ? "" : "invalid"}  // Apply CSS class
                    placeholder="Details"
                />
                <textarea
                    id="targetAudience"
                    name="targetAudience"
                    value={targetAudience}
                    onChange={(e) => {
                        setTargetAudience(e.target.value);
                        setTargetAudienceValid(true); // Reset validation state
                    }}
                    className={targetAudienceValid ? "" : "invalid"}  // Apply CSS class
                    placeholder="Doelgroep"
                />
            </form>
            <button className="submit-fab fab-common saveButton" onClick={handleSubmit}>Aanmaken</button>
        </div>
    );
}
