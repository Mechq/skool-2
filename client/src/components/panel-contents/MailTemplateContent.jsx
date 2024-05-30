import React, {useState} from "react";
import '../../styles/components/saveButton.css'
import '../../styles/components/CreatePanelContent.css'

export default function MailTemplateContent() {
    const [subject, setSubject] = useState("");
    const [details, setDetails] = useState("");
    const [name, setName] = useState("");

    const [subjectValid, setSubjectValid] = useState(true);
    const [detailsValid, setDetailsValid] = useState(true);
    const [nameValid, setNameValid] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation
        if (!subject) setSubjectValid(false);
        if (!details) setDetailsValid(false);
        if (!name) setNameValid(false);
        if (!subject || !details) return;

        const mailTemplate = {
            subject,
            details,
            name
        };

        fetch('/api/mailTemplate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(mailTemplate),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        setSubject('')
        setDetails('')
        setName('')

    };

    return (
        <div className='side-panel-content'>
            <h1 className='side-panel-title'>Create Mail Template</h1>
            <form action="#" method="get" className="form-container">
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value)
                        setNameValid(true); // Reset validation state
                    }}
                    className={nameValid ? "" : "invalid"}  // Apply CSS class
                    placeholder="Naam"
                />
                <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={subject}
                    onChange={(e) => {
                        setSubject(e.target.value)
                        setSubjectValid(true); // Reset validation state
                    }}
                    className={subjectValid ? "" : "invalid"}  // Apply CSS class
                    placeholder="Mail onderwerp"
                />
                <textarea
                    id="details"
                    name="details"
                    value={details}
                    onChange={(e) => {
                        setDetails(e.target.value)
                        setDetailsValid(true); // Reset validation state
                    }}
                    className={detailsValid ? "" : "invalid"}  // Apply CSS class
                    placeholder="Mail bericht"
                />
            </form>
            <button className="submit-fab fab-common saveButton" onClick={handleSubmit}>Aanmaken</button>
        </div>
    );
}