import React, {useEffect, useState} from "react";

export default function CommissionPanelContent() {
    const [details, setDetails] = useState("");
    const [targetAudience, setTargetAudience] = useState("");
    const [customerId, setCustomerId] = useState("");

    const [detailsValid, setDetailsValid] = useState(true);
    const [targetAudienceValid, setTargetAudienceValid] = useState(true);
    const [customerIdValid, setCustomerIdValid] = useState(true);

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
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        setCustomerId('')
        setTargetAudience('')
        setDetails('')

    };

    return (
        <div className='side-panel-content'>
            <h1 className='side-panel-title'>Create Opdracht</h1>
            <form action="#" method="get" className="form-container">
                <input
                    type="text"
                    id="customerId"
                    name="customerId"
                    value={customerId}
                    onChange={(e) => {
                        setCustomerId(e.target.value)
                        setCustomerIdValid(true); // Reset validation state
                    }}
                    className={customerIdValid ? "" : "invalid"}  // Apply CSS class
                    placeholder="Customer Id"
                />
                <input
                    type="text"
                    id="details"
                    name="details"
                    value={details}
                    onChange={(e) => {
                        setDetails(e.target.value)
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
                        setTargetAudience(e.target.value)
                        setTargetAudienceValid(true); // Reset validation state
                    }}
                    className={targetAudienceValid ? "" : "invalid"}  // Apply CSS class
                    placeholder="Doelgroep"
                />
                <button className="submit-fab fab-common" onClick={handleSubmit}>Aanmaken</button>
            </form>
        </div>
    );
}