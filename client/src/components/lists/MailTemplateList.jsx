// import React from "react";
//
// export default function MailTemplateList({ setShowSidePanel, setSidePanelContent, setMailTemplateId, mailTemplates = [], setRotateSpan }) {
//
//     const editMailTemplate = (id) => {
//         setMailTemplateId(id);
//         setSidePanelContent("edit");
//         setShowSidePanel(true);
//         setRotateSpan(true); // add this line
//     };
//
//     const truncateDetails = (details, maxLength = 50) => {
//         if (details.length > maxLength) {
//             return details.substring(0, maxLength) + '...';
//         }
//         return details;
//     };
//
//     return (
//         <div>
//             <div className="flex-container">
//                 <div className="table-wrapper">
//                     <div className="table-responsive">
//                         <table className="mail-template-table">
//                             <thead className="table-header">
//                             <tr>
//                                 <th className="header-cell start">Name</th>
//                                 <th className="header-cell end">Subject</th>
//                                 <th className="header-cell end padded">Details</th>
//                             </tr>
//                             </thead>
//                             <tbody>
//                             {mailTemplates.map(mailTemplate => (
//                                 <tr key={mailTemplate.id} className="table-row" onClick={() => editMailTemplate(mailTemplate.id)}>
//                                     <td className="table-cell start">{mailTemplate.name}</td>
//                                     <td className="table-cell end">{mailTemplate.subject}</td>
//                                     <td className="table-cell end">{mailTemplate.cc}</td>
//                                     <td className="table-cell end padded">{truncateDetails(mailTemplate.details)}</td>
//                                 </tr>
//                             ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
