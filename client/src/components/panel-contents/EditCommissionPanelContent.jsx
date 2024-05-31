import React, {useEffect, useState} from "react";
import '../../styles/components/EditPanelContent.css'

export default function EditCommissionPanelContent({setShowSidePanel, commissionId}) {
    const [customerId, setCustomerId] = useState("");
    const [details, setDetails] = useState("");
    const [targetAudience, setTargetAudience] = useState("")

    const[rounds, setRounds] = useState([])
    const[types, setTypes] = useState([])

    const [customerIdValid, setCustomerIdValid] = useState(true);
    const [detailsValid, setDetailsValid] = useState(true);
    const [targetAudienceValid, setTargetAudienceValid] = useState(true);
    const[roundsValid, setRoundsValid] = useState(true)
    const[typesValid, setTypesValid] = useState(true)

    useEffect(() => {
        if (commissionId) {
            fetch(`/api/commission/${commissionId}`)
                .then(res => res.json())
                .then(response => {
                    const data = response.data;
                    setCustomerId(data.customerId || "");
                    setDetails(data.details || "");
                    setTargetAudience(data.targetAudience || "")
                })
                .catch(error => console.error('Error fetching commission:', error));
        }
    }, [commissionId]);

    console.log(details)

    useEffect(() => {
        if (commissionId) {
            fetch(`/api/round/${commissionId}`)
                .then(res => res.json())
                .then(response => {
                    const data = response.data;
                    // Assuming `data` is an array of objects
                    const _types = data.map(item => item.Type);
                    setTypes(_types);
                })
                .catch(error => console.error('Error fetching round:', error));
        }
    }, [commissionId]);

    console.log(types)

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //
    //     if (!subject) setSubject(false);
    //     if (!details) setDetailsValid(false);
    //     if (!name) setNameValid(false);
    //     if (!subject || !details) return;
    //
    //     const mailTemplate = {
    //         subject,
    //         details,
    //         name
    //     };
    //
    //     fetch(`/api/mailTemplate/${mailTemplateId}`, {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(mailTemplate),
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             console.log('Success:', data);
    //             setShowSidePanel(false); // Close the side panel after submission
    //         })
    //         .catch(error => console.error('Error:', error));
    // };
    // const autoResize = (e) => {
    //     e.target.style.height = 'auto';
    //     e.target.style.height = `${e.target.scrollHeight}px`;
    // };

    return (
        <div className='workshopEditContent'>
            <h1 className='side-panel-title'>Bewerk opdracht</h1>
            <div className='side-panel-content'>
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
                        placeholder={customerId}
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
                        placeholder={details}
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
                        placeholder={targetAudience}
                    />
                    <div>
                        <h2>Rondes</h2>
                        <ul>
                            {types.map((type, index) => (
                                <li key={index}>{type}</li>
                            ))}
                        </ul>
                    </div>
                </form>
            </div>
        </div>
    );
}

