import React, { useEffect, useState } from "react";
import MailTemplateList from "../components/lists/MailTemplateList";
import SidePanel from "../components/SidePanel";
import MailTemplateContent from "../components/panel-contents/MailTemplateContent";
import CreateButton from "../components/CreateButton";
import EditMailTemplateContent from "../components/panel-contents/EditMailTemplateContent";

export default function MailTemplates() {
    const [isOpen, setIsOpen] = useState(false);
    const [sidePanelContent, setSidePanelContent] = useState("");
    const [mailTemplateId, setMailTemplateId] = useState(null);
    const [mailTemplates, setMailTemplates] = useState([]);
    const [rotateSpan, setRotateSpan] = useState(false);

    useEffect(() => {
        fetch('/api/mailTemplate/')
            .then(res => res.json())
            .then(data => {
                setMailTemplates(data.data);
                console.log("Fetched mailTemplates: ", data.data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [isOpen]);

    return (
        <div>
            <CreateButton
                setShowSidePanel={setIsOpen}
                showSidePanel={isOpen}
                setSidePanelContent={setSidePanelContent}
                rotateSpan={rotateSpan}
                setRotateSpan={setRotateSpan}
            />

            <SidePanel isOpen={isOpen}
                       setIsOpen={setIsOpen}
                       rotateSpan={rotateSpan}
                       setRotateSpan={setRotateSpan}>
                {sidePanelContent === "create" &&
                    <MailTemplateContent setShowSidePanel={setIsOpen} />}
                {sidePanelContent === "edit" &&
                    <EditMailTemplateContent mailTemplateId={mailTemplateId} setShowSidePanel={setIsOpen} />}
            </SidePanel>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
                                        setMailTemplateId(template.id);
                                        setSidePanelContent("edit");
                                        setIsOpen(true);
                                    }} className="font-medium text-[#f49700] light:text-[#f49700] hover:underline">Bewerken</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
