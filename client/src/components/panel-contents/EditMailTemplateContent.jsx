import React, {useState, useEffect} from "react";
import '../../styles/components/EditPanelContent.css'

function EditMailTemplatePanelContent({mailTemplateId, setShowSidePanel}) {
    const [subject, setSubject] = useState("");
    const [cc, setCc] = useState("");
    const [details, setDetails] = useState("");
    const[name, setName] = useState("")

    const [subjectValid, setSubjectValid] = useState(true);
    const [ccValid, setCcValid] = useState(true);
    const [detailsValid, setDetailsValid] = useState(true);
    const[nameValid, setNameValid] = useState(true);

    useEffect(() => {
        if (mailTemplateId) {
            fetch(`/api/mailTemplate/${mailTemplateId}`)
                .then(res => res.json())
                .then(response => {
                    const data = response.data;
                    setSubject(data.subject || "");
                    setCc(data.cc || "");
                    setDetails(data.details || "");
                    setName(data.name || "")
                    autoResize({ target: document.getElementById('edit-details') });
                })
                .catch(error => console.error('Error fetching mail template:', error));
        }
    }, [mailTemplateId]);
    console.log(name)
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!subject) setSubject(false);
        // if (!cc) setCcValid(false);
        if (!details) setDetailsValid(false);
        if (!name) setNameValid(false);
        if (!subject || !details) return;

        const mailTemplate = {
            subject,
            cc: cc || null,
            details,
            name
        };

        fetch(`/api/mailTemplate/${mailTemplateId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(mailTemplate),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                setShowSidePanel(false); // Close the side panel after submission
            })
            .catch(error => console.error('Error:', error));
    };
    const autoResize = (e) => {
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;
    };

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
                    <input
                        type="text"
                        id="edit-cc"
                        name="cc"
                        value={cc}
                        onChange={(e) => {
                            setCc(e.target.value);
                            setCcValid(true);
                        }}
                        className={ccValid ? "" : "invalid"}
                        placeholder="Mail Template CC"
                    />
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
