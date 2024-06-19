import React, { useEffect, useState } from "react";
import 'quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';

function EditMailTemplatePanelContent({ mailTemplateId, setShowSidePanel }) {
    const modules = {
        toolbar: [
            ["bold", "italic", "underline", "strike", "blockquote"],
            ["link", "image"],
            [{ "color": ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466", 'custom-color'] }],
        ]
    };

    const handleProcedureContentChange = (content) => {
        console.log("content---->", content);
        setContent(content);
    };

    const formats = [
        "header", "height", "bold", "italic",
        "underline", "strike", "blockquote",
        "list", "color", "bullet", "indent",
        "link", "image", "align", "size",
    ];

    const [subject, setSubject] = useState("");
    const [cc, setCc] = useState("");
    const [content, setContent] = useState("");
    const [name, setName] = useState("");

    const [contentValid, setContentValid] = useState(true);
    const [nameValid, setNameValid] = useState(true);

    useEffect(() => {
        if (mailTemplateId) {
            fetch(`/api/mailTemplate/${mailTemplateId}`)
                .then(res => res.json())
                .then(response => {
                    const data = response.data;
                    setSubject(data.subject || "");
                    setCc(data.cc || "");
                    setContent(data.content || "");  // Removed convertNewlinesToHtml function call
                    setName(data.name || "");
                })
                .catch(error => console.error('Error fetching mail template:', error));
        }
    }, [mailTemplateId]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!subject) setSubject(false);
        if (!content) setContentValid(false);
        if (!name) setNameValid(false);
        if (!subject || !content || !name) return;

        const mailTemplate = {
            subject,
            cc: cc || null,
            content, // Directly use the HTML content from ReactQuill
            name
        };
    console.log("mailTemplate---->", mailTemplate)
        fetch(`/api/mailTemplate/${mailTemplateId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(mailTemplate),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                setShowSidePanel(false);
            })
            .catch(error => console.error('Error:', error));
    };

    return (
        <div className="px-6">
            <header className="pt-4 pb-4 font-bold text-lg">Mail template bewerken</header>
            <form>
                <div className="mb-6">
                    <label htmlFor="templateName" className="block mb-2 text-sm font-medium text-gray-900">Template naam</label>
                    <input type="text" id="templateName" value={name} onChange={e => setName(e.target.value)}
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-brand-orange-light focus:border-blue-500 block w-full p-2.5"
                           placeholder="Bevestigings mail" required/>
                </div>
                <div className="mb-6">
                    <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900">Onderwerp</label>
                    <input type="text" id="subject" value={subject} onChange={e => setSubject(e.target.value)}
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-brand-orange-light focus:border-blue-500 block w-full p-2.5"
                           placeholder="Bevestiging {workshop} op {executionDate}" required/>
                </div>
                <div className="mb-6">
                    <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-900">Inhoud</label>

                    <ReactQuill className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-brand-orange-light focus:border-blue-500 block w-full p-2.5"
                                theme="snow"
                                modules={modules}
                                formats={formats}
                                placeholder="Beste {firstName}..."
                                onChange={handleProcedureContentChange}
                                value={content}
                    />

                </div>
                <button type="submit" onClick={handleSubmit}
                        className="text-white bg-brand-orange hover:bg-brand-orange focus:outline-none focus:ring-brand-orange font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                    Opslaan
                </button>
            </form>
        </div>
    );
}

export default EditMailTemplatePanelContent;
