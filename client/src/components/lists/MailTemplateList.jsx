import {React, useState, useEffect} from "react";

function MailTemplateList() {
    const [mailTemplates, setMailTemplates] = useState([]);
    useEffect(() => {
        fetch('/api/mailTemplate')
            .then(res => res.json())
            .then(data => setMailTemplates(data.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);
    console.log(mailTemplates);

    return (
        <div>
            <h1>Mail Templates</h1>
            <ul className={"list"}>
                {mailTemplates.map(mailTemplate => (
                    <li key={mailTemplate.id}>{mailTemplate.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default MailTemplateList;