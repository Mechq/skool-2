import React from "react";
import ListFooter from "../ListFooter";

export default function List_mailTemplates({
                                             setShowSidePanel,
                                             setSidePanelContent,
                                             setMailTemplateId,
                                             mailTemplates = [],
                                             setRotateSpan
                                         }) {

    const editMailTemplate = (id) => {
        setMailTemplateId(id);
        setSidePanelContent("edit");
        setShowSidePanel(true);
        setRotateSpan(true);
    };

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 light:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 light:bg-gray-700 light:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">Template Naam</th>
                    <th scope="col" className="px-6 py-3">Onderwerp</th>
                    <th scope="col" className="px-6 py-3"></th>
                    <th scope="col" className="px-6 py-3">Bewerken</th>
                </tr>
                </thead>
                <tbody>
                {mailTemplates.map((template) => (
                    <tr key={template.id}
                        className={`odd:bg-white odd:light:bg-gray-900 even:bg-gray-50 even:light:bg-gray-800 border-b light:border-gray-700`}>
                        <th scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap light:text-white">
                            {template.name}
                        </th>
                        <td className="px-6 py-4">{template.subject}</td>
                        <td className="px-6 py-4">{template.category}</td>
                        <td className="px-6 py-4">
                            <a href="#" onClick={() => {
                                editMailTemplate(template.id);
                            }} className="font-medium text-[#f49700] light:text-[#f49700] hover:underline">Bewerken</a>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <ListFooter
                amountOfRows={mailTemplates?.length}
                totaalAantalString={'mail templates'}
            />
        </div>
    );
}