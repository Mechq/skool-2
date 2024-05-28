import {React, useState, useEffect} from "react";
import "../styles/CreateMailTemplateSidePanel.css";


function CreateMailTemplateSidePanel() {
    console.log('CreateMailTemplateSidePanel');
    const [subject, setSubject] = useState("");
    const [cc, setCc] = useState("");
    const [details, setDetails] = useState("");


    const [showSidePanel, setShowSidePanel] = useState(false);

    const [validSubject, setValidSubject] = useState(true);
    const [validCc, setValidCc] = useState(true);
    const [validDetails, setValidDetails] = useState(true);

    const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
        subject,
        cc,
        details
    );

        if (!subject) setValidSubject(false);
        if (!details) setValidDetails(false);
        if (!cc) setValidCc(false);


        // If any field is invalid, stop the form submission
        if (!subject || !details || !cc) return;

    // Create a new mailTemplate object
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


    setSubject(""); // Clear the subject field
    setCc(""); // Clear the cc field
    setDetails(""); // Clear the details field
    setShowSidePanel(false); // Close the side panel
};

    useEffect(() => {
        const sidePanel = document.querySelector('.side-panel');
        if (showSidePanel) {
            sidePanel.style.marginLeft = '70vw';
        } else {
            sidePanel.style.marginLeft = '100vw';
        }
    }, [showSidePanel]);



    useEffect(() => {
        const sidePanel = document.querySelector('.side-panel');
        if (showSidePanel) {
            sidePanel.style.right = '0'; // Slide in
        } else {
            sidePanel.style.right = '-30%'; // Slide out
            // Reset validation states
            setValidCc(true);
            setValidDetails(true);
            setValidSubject(true);
        }
    }, [showSidePanel]);

    return (
        <div id='side-panel-root'>
            <button className="fab fab-common" onClick={() => setShowSidePanel(!showSidePanel)}>
                <span className={showSidePanel ? "rotate" : ""}>{'+'}</span>
            </button>
            <div className="side-panel">
                <h1 className='side-panel-title'>Create Mail Template</h1>

                <div className='side-panel-content'>
                    <form action="#" method="get" className="form-container">
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={subject}
                            onChange={(e) => {
                                setSubject(e.target.value);
                                setValidSubject(true);  // Reset validation state
                            }}
                            className={validSubject ? "" : "invalid"}
                            placeholder="Mail onderwerp"
                        />
                        <input
                            type="text"
                            id="cc"
                            name="cc"
                            value={cc}
                            onChange={(e) => {
                                setCc(e.target.value);
                                setValidCc(true);  // Reset validation state
                            }}
                            className={validCc ? "" : "invalid"}
                            placeholder="standaard CC"
                        />
                        <textarea
                            id="details"
                            name="details"
                            value={details}
                            onChange={(e) => {
                                setDetails(e.target.value);
                                setValidDetails(true);  // Reset validation state
                            }}
                            className={validDetails ? "" : "invalid"}
                            placeholder="Mail bericht"
                        />
                        <button className="submit-fab fab-common" onClick={handleSubmit}>Aanmaken</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateMailTemplateSidePanel;