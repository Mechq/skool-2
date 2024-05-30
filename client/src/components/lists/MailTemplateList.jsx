import React from "react";

export default function MailTemplateList({ setShowSidePanel, setSidePanelContent, setMailTemplateId, mailTemplates = [], setRotateSpan }) {

    const editMailTemplate = (id) => {
        setMailTemplateId(id);
        setSidePanelContent("edit");
        setShowSidePanel(true);
        setRotateSpan(true); // add this line
    };

    return (
        <div>
            <div className="flex-container">
                <div className="table-wrapper">
                    <div className="table-responsive">
                        <table className="mail-template-table">
                            <thead className="table-header">
                            <tr>
                                <th className="header-cell start">Name</th>
                                <th className="header-cell end">Subject</th>
                                <th className="header-cell end">CC</th>
                                <th className="header-cell end padded">Details</th>
                            </tr>
                            </thead>
                            <tbody>
                            {mailTemplates.map(mailTemplate => (
                                <tr key={mailTemplate.id} className="table-row" onClick={() => editMailTemplate(mailTemplate.id)}>
                                    <td className="table-cell start">{mailTemplate.name}</td>
                                    <td className="table-cell end">{mailTemplate.subject}</td>
                                    <td className="table-cell end">{mailTemplate.cc}</td>
                                    <td className="table-cell end padded">{mailTemplate.details}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}



// import {React} from "react";

// function MailTemplateList({setShowSidePanel, setSidePanelContent, setMailTemplateId, mailTemplates}) {
//     const editMailTemplate = (id) => {
//         setMailTemplateId(id);
//         setSidePanelContent("edit");
//         setShowSidePanel(true);
//     };

//     return (
//         <div>
//             <h1>Mail Templates</h1>
//             <ul className={"list"}>
//                 {mailTemplates.map(mailTemplate => (
//                     <li key={mailTemplate.id} onClick={() => editMailTemplate(mailTemplate.id)}>
//                         {mailTemplate.name}</li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

// export default MailTemplateList;