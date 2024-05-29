import {React, useState, useEffect} from "react";

export default function MailTemplateList({setShowSidePanel, setSidePanelContent, setMailTemplateId}) {
    const [mailTemplates, setMailTemplates] = useState([]);
    useEffect(() => {
        fetch('/api/mailTemplate')
            .then(res => res.json())
            .then(data => {
                setMailTemplates(data.data)
                console.log("Fetched mail templates: ", data.data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);
    const editMailTemplate = (id) => {
        setMailTemplateId(id);
        setSidePanelContent("edit");
        setShowSidePanel(true);
    };
    console.log(mailTemplates);

    return (
        <div>
            <h1>Mail Templates</h1>
            <ul className={"list"}>
                {mailTemplates.map(mailTemplate => (
                    <li key={mailTemplate.id} onClick={() => editMailTemplate(mailTemplate.id)}>
                    {mailTemplate.subject}
                </li>
                ))}
            </ul>
        </div>
    );
} 
