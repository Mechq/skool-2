import {React, useState, useEffect} from "react";

function MailTemplateList() {
    const [mailTemplateSubjects, setMailTemplateSubjects] = useState([]);
    useEffect(() => {
        fetch('/api/mailTemplate')
            .then(res => res.json())
            .then(data => setMailTemplateSubjects(data.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);
    console.log(mailTemplateSubjects);

    return (
        <div>
            <h1>Mail Templates</h1>
            <ul className={"list"}>
                {mailTemplateSubjects.map(mailTemplateSubject => (
                    <li key={mailTemplateSubject.id}>{mailTemplateSubject.subject}</li>
                ))}
            </ul>
        </div>
    );
}

export default MailTemplateList;