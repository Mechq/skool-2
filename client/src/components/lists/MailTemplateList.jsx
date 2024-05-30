import {React} from "react";

function MailTemplateList({setShowSidePanel, setSidePanelContent, setMailTemplateId, mailTemplates}) {
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