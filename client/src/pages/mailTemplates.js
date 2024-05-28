import React, {useEffect, useState} from "react";
import SidePanel from "../components/SidePanel";
import MailTemplateList from "../components/mailTemplateList";
import '../styles/mailTemplates.css';

function MailTemplates() {
    const [showSidePanel, setShowSidePanel] = useState(false);

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
        console.log('Onderwerp' + subject)
        if (!cc) setCcValid(false);
        if (!details) setDetailsValid(false);

        // If any field is invalid, stop the form submission
        if (!subject || !cc || !details) return;

        console.log(
            subject,
            cc,
            details
        );

        // Create a new mail template object
        const mailTemplate = {
            subject,
            cc,
            details
        };

        // Send a POST request to the backend
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

        setShowSidePanel(false); // Close the side panel

        setSubject('')
        setCc('')
        setDetails('')

    };

    useEffect(() => {
        const sidePanel = document.querySelector('.side-panel');
        if (showSidePanel) {
            sidePanel.style.right = '0'; // Slide in
        } else {
            sidePanel.style.right = '-30%'; // Slide out
            // Reset validation states
            setSubjectValid(true);
            setCcValid(true);
            setDetailsValid(true);
        }
    }, [showSidePanel]);

    return (
        <div className='mailTemplatesContent'>
            <button className="fab fab-common" onClick={() => {
                setShowSidePanel(!showSidePanel)
                setSubject('')
                setCc('')
                setDetails('')
                }}>
                <span className={showSidePanel ? "rotate" : ""}>{'+'}</span>
            </button>
            <MailTemplateList/>
            <SidePanel showSidePanel={showSidePanel} setShowSidePanel={setShowSidePanel}>
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
            </SidePanel>
        </div>
    );
}

export default MailTemplates;