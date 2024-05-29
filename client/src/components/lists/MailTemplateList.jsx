import {React, useState, useEffect} from "react";

function MailTemplateList({setShowSidePanel, setSidePanelContent, setMailTemplateId}) {
    const [mailTemplates, setMailTemplates] = useState([]);

    useEffect(() => {
        fetch('/api/mailTemplate')
            .then(res => res.json())
            .then(data => setMailTemplates(data.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);
    console.log(mailTemplates);


    const editMailTemplate = (id) => {
        setMailTemplateId(id);
        setSidePanelContent("edit");
        setShowSidePanel(true);
    };


    return (
        <div>
            <h1>Mail Templates</h1>
            <ul className={"list"}>
                {mailTemplates.map(mailTemplate => (
                    <li key={mailTemplate.id} onClick={() => editMailTemplate(mailTemplate.id)}>
                        {mailTemplate.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default MailTemplateList;