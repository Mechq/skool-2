import React, {useEffect, useState} from "react";
import 'quill/dist/quill.snow.css'
import ReactQuill from 'react-quill'

function EditMailTemplatePanelContent({mailTemplateId, setShowSidePanel}) {

    var modules = {
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

      var formats = [
        "header", "height", "bold", "italic",
        "underline", "strike", "blockquote",
        "list", "color", "bullet", "indent",
        "link", "image", "align", "size",
      ];

    const [subject, setSubject] = useState("");
    const [cc, setCc] = useState("");
    const [content, setContent] = useState("");
    const [name, setName] = useState("")

    const [subjectValid, setSubjectValid] = useState(true);
    const [ccValid, setCcValid] = useState(true);
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
                    setContent(data.content || "");
                    setName(data.name || "")
                    autoResize({target: document.getElementById('edit-content')});
                })
                .catch(error => console.error('Error fetching mail template:', error));
        }
    }, [mailTemplateId]);
    console.log(name)
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!subject) setSubject(false);
        // if (!cc) setCcValid(false);
        if (!content) setContentValid(false);
        if (!name) setNameValid(false);
        if (!subject || !content) return;

        const mailTemplate = {
            subject,
            cc: cc || null,
            content,
            name
        };

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
                setShowSidePanel(false); // Close the side panel after submission
            })
            .catch(error => console.error('Error:', error));
    };
    const autoResize = (e) => {
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;
    };

    return (
        <div className="px-6">
        <header className="pt-4 pb-4 font-bold text-lg">Mail template aanmaken</header>
        <form>
            <div className="mb-6">
                <label htmlFor="templateName"
                       className="block mb-2 text-sm font-medium text-gray-900 light:text-white">Template
                    naam</label>
                <input type="text" id="templateName" value={name} onChange={e => setName(e.target.value)}
                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500"
                       placeholder="Bevestigings mail" required/>
            </div>
            <div className="mb-6">
                <label htmlFor="subject"
                       className="block mb-2 text-sm font-medium text-gray-900 light:text-white">Onderwerp</label>
                <input type="text" id="subject" value={subject} onChange={e => setSubject(e.target.value)}
                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500"
                       placeholder="Bevestiging {workshop} op {executionDate}" required/>
            </div>
            <div
                className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 light:bg-gray-700 light:border-gray-600">
                <div >
                    <h1 style={{ textAlign: "center" }}>Mail Details</h1>
                    <div style={{ display: "grid", justifyContent: "center"}}>
                        <ReactQuill
                            theme="snow"
                            modules={modules}
                            formats={formats}
                            placeholder="Beste {firstName}..."
                            onChange={handleProcedureContentChange}
                            value={content}
                            style={{ height: "220px" }}
                            >
                        </ReactQuill>
                    </div>
                </div>
                {/* <div className="flex items-center justify-between px-3 py-2 border-b light:border-gray-600">
                    <div
                        className="flex flex-wrap items-center divide-gray-200 sm:divide-x sm:rtl:divide-x-reverse light:divide-gray-600">
                        <div className="flex items-center space-x-1 rtl:space-x-reverse sm:pe-4">
                            <button type="button"
                                    className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 light:text-gray-400 light:hover:text-white light:hover:bg-gray-600">
                                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                     fill="currentColor" viewBox="0 0 16 20">
                                    <path
                                        d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z"/>
                                    <path
                                        d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z"/>
                                </svg>
                                <span className="sr-only">Bold</span>
                            </button>
                        </div>
                        <div className="flex flex-wrap items-center space-x-1 rtl:space-x-reverse sm:ps-4">
                            <button type="button"
                                    className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 light:text-gray-400 light:hover:text-white light:hover:bg-gray-600">
                                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                     fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z"/>
                                    <path
                                        d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/>
                                </svg>
                                <span className="sr-only">Italic</span>
                            </button>
                        </div>
                        <div className="flex flex-wrap items-center space-x-1 rtl:space-x-reverse sm:ps-4">
                            <button type="button"
                                    className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 light:text-gray-400 light:hover:text-white light:hover:bg-gray-600">
                                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                     fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z"/>
                                    <path
                                        d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/>
                                </svg>
                                <span className="sr-only">Underline</span>
                            </button>
                        </div>
                    </div>
                </div> */}
                {/* <div className="px-4 py-2 bg-white rounded-b-lg light:bg-gray-800">
                    <label htmlFor="content" className="sr-only">Publish post</label>
                    <textarea id="content" rows="20" value={content} onChange={e => setContent(e.target.value)}
                              className="block w-full px-0 text-sm text-gray-800 bg-white border-0 light:bg-gray-800 focus:ring-0 light:text-white light:placeholder-gray-400"
                              placeholder="Beste {firstName}..." required></textarea>
                </div> */}
            </div>
            <button type="submit" onClick={handleSubmit}
                    className="text-white bg-brand-orange hover:bg-brand-orange focus:outline-none focus:ring-brand-orange font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center light:bg-brand-orange light:hover:bg-brand-orange light:focus:ring-brand-orange">Submit
            </button>
        </form>
    </div>


        //
        // <div className='workshopEditContent'>
        //     <h1 className='side-panel-title'>Edit Mail Template</h1>
        //     <div className='side-panel-content'>
        //         <form className="form-container" onSubmit={handleSubmit}>
        //             <div>
        //                 <input
        //                     type="text"
        //                     id="edit-name"
        //                     name="name"
        //                     value={name}
        //                     onChange={(e) => {
        //                         setName(e.target.value);
        //                         setNameValid(true);
        //                     }}
        //                     className={nameValid ? "" : "invalid"}
        //                     placeholder="Name"
        //                 />
        //             </div>
        //             <div className="row">
        //                 <input
        //                     type="text"
        //                     id="edit-subject"
        //                     name="subject"
        //                     value={subject}
        //                     onChange={(e) => {
        //                         setSubject(e.target.value);
        //                         setSubjectValid(true);
        //                     }}
        //                     className={subjectValid ? "" : "invalid"}
        //                     placeholder="Mail Template Subject"
        //                 />
        //             </div>
        //             <input
        //                 type="text"
        //                 id="edit-cc"
        //                 name="cc"
        //                 value={cc}
        //                 onChange={(e) => {
        //                     setCc(e.target.value);
        //                     setCcValid(true);
        //                 }}
        //                 className={ccValid ? "" : "invalid"}
        //                 placeholder="Mail Template CC"
        //             />
        //             <textarea
        //                 id="edit-content"
        //                 name="content"
        //                 value={content}
        //                 onChange={(e) => {
        //                     setContent(e.target.value);
        //                     setContentValid(true);
        //                     autoResize(e);
        //                 }}
        //                 className={contentValid ? "" : "invalid"}
        //                 placeholder="Mail Template Message"
        //             />
        //             <button className="submit-fab fab-common" type="submit">Update</button>
        //         </form>
        //     </div>
        // </div>
    );
}

export default EditMailTemplatePanelContent;
