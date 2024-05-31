import React, {useEffect, useState} from "react";
import '../../styles/components/EditPanelContent.css'

function EditCommissionPanelContent({setShowSidePanel, commissionId}) {
    const [customerId, setCustomerId] = useState("");
    const [details, setDetails] = useState("");
    const [targetAudience, setTargetAudience] = useState("")

    const[rounds, setRounds] = useState([])
    const[type, setType] = useState([])

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
                    // setRounds(data.round || []);
                    setType(data.Type || [])
                })
                .catch(error => console.error('Error fetching round:', error));
        }
    }, [commissionId]);

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
            <h1 className='side-panel-title'>Edit Mail Template</h1>
            <div className='side-panel-content'>
                <form className="form-container" onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="text"
                            id="edit-name"
                            name="name"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                                setNameValid(true);
                            }}
                            className={nameValid ? "" : "invalid"}
                            placeholder="Name"
                        />
                    </div>
                    <div className="row">
                        <input
                            type="text"
                            id="edit-subject"
                            name="subject"
                            value={subject}
                            onChange={(e) => {
                                setSubject(e.target.value);
                                setSubjectValid(true);
                            }}
                            className={subjectValid ? "" : "invalid"}
                            placeholder="Mail Template Subject"
                        />
                    </div>
                    <textarea
                        id="edit-details"
                        name="details"
                        value={details}
                        onChange={(e) => {
                            setDetails(e.target.value);
                            setDetailsValid(true);
                            autoResize(e);
                        }}
                        className={detailsValid ? "" : "invalid"}
                        placeholder="Mail Template Message"
                    />
                    <button className="submit-fab fab-common" type="submit">Update</button>
                </form>
            </div>
        </div>
    );
}

export default EditMailTemplatePanelContent;
