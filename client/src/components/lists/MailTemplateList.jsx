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
import React from "react";

export default function MailTemplateList({ setShowSidePanel, setSidePanelContent, setMailTemplateId, mailTemplates = [], setRotateSpan }) {

    const editMailTemplate = (id) => {
        setMailTemplateId(id);
        setSidePanelContent("edit");
        setShowSidePanel(true);
        setRotateSpan(true);
    };

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mr-6 ml-6">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 light:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 light:bg-gray-700 light:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">Template Naam</th>
                        <th scope="col" className="px-6 py-3">Onderwerp</th>
                        <th scope="col" className="px-6 py-3"></th>
                        <th scope="col" className="px-6 py-3">Created At</th>
                        <th scope="col" className="px-6 py-3">Bewerken</th>
                    </tr>
                </thead>
                <tbody>
                    {mailTemplates.map((template, index) => (
                        <tr key={template.id} className={`odd:bg-white odd:light:bg-gray-900 even:bg-gray-50 even:light:bg-gray-800 border-b light:border-gray-700`}>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap light:text-white">
                                {template.name}
                            </th>
                            <td className="px-6 py-4">{template.subject}</td>
                            <td className="px-6 py-4">{template.category}</td>
                            <td className="px-6 py-4">{template.createdAt}</td>
                            <td className="px-6 py-4">
                                <a href="#" onClick={() => {
                                    editMailTemplate(template.id);
                                }} className="font-medium text-[#f49700] light:text-[#f49700] hover:underline">Bewerken</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}