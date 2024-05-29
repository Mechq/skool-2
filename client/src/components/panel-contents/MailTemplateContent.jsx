import React, {useEffect, useState} from "react";

export default function MailTemplateContent() {
    const [subject, setSubject] = useState("");
    const [cc, setCc] = useState("");
    const [details, setDetails] = useState("");

    const [subjectValid, setSubjectValid] = useState(true);
    const [ccValid, setCcValid] = useState(true);
    const [detailsValid, setDetailsValid] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation
        if (!subject) setSubjectValid(false);
        if (!cc) setCcValid(false);
        if (!details) setDetailsValid(false);

        if (!subject || !cc || !details) return;

        const mailTemplate = {
            subject,
            cc,
            details
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
        setCc('')
        setDetails('')

    };

    return (
        <div className='side-panel-content'>
            <h1 className='side-panel-title'>Create Mail Template</h1>
            <form action="#" method="get" className="form-container">
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
                <input
                    type="text"
                    id="cc"
                    name="cc"
                    value={cc}
                    onChange={(e) => {
                        setCc(e.target.value)
                        setCcValid(true); // Reset validation state
                    }}
                    className={ccValid ? "" : "invalid"}  // Apply CSS class
                    placeholder="standaard CC"
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
                <button className="submit-fab fab-common" onClick={handleSubmit}>Aanmaken</button>
            </form>
        </div>
    );
}