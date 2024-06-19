import React, {useEffect, useState} from "react";
import ListFooter from "../ListFooter";

export default function List_teachers({
                                          isOpen,
                                          setIsOpen,
                                          setSidePanelContent,
                                          setUserId,
                                          users,
                                          setUsers,
                                          setRotateSpan,
                                      }) {

    const [activeAccordions, setActiveAccordions] = useState([1]); // Defaulting Geaccepteerd to be open

    const fetchUsers = () => {
        fetch("/api/user")
            .then((res) => res.json())
            .then((data) => {
                setUsers(data.data);
                console.log("Fetched teachers: ", data.data);
            })
            .catch((error) => console.error("Error fetching data:", error));
    };
    const fetchEmailTemplate = () => {
        return fetch('/api/mailTemplate/17')
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to fetch email template');
                }
                return res.json();
            })
            .then(data => {
                console.log("Fetched mail template:", data);
                // Ensure to return the template content string
                return {content: data.data.content, subject: data.data.subject};
            })
            .catch(error => console.error('Error fetching data:', error));
    };

    const replaceTemplatePlaceholders = (template, placeholders) => {
        if (typeof template !== 'string') {
            throw new Error('Template is not a string');
        }
        return template.replace(/{(FirstName|PictureLink)}/g, (_, key) => {
            return placeholders[key] || '';
        });
    };


    useEffect(() => {
        fetchUsers();
    }, [isOpen]);

    const editTeacher = (id) => {
        setUserId(id);
        setSidePanelContent("edit");
        setIsOpen(true);
        setRotateSpan(true);
    };

    const formatDate = (date) => {
        if (!date) return "";
        const options = {year: "numeric", month: "long", day: "numeric"};
        return new Date(date).toLocaleDateString("nl-NL", options);
    };

    const acceptedTeachers = users.filter((user) => user.isAccepted === 1);
    const pendingTeachers = users.filter((user) => user.isAccepted === 0);

    const handleRejectClick = (e, userId) => {
        e.preventDefault();
        fetch(`/api/user/delete/${userId}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then((data) => {

                fetchUsers();

            })
            .catch((error) => console.error("Error rejecting user:", error));
    };

    const handleAcceptClick = (e, user) => {
        e.preventDefault();
        fetch(`/api/user/accept/${user.id}`, {
            method: "POST",
        })
            .then((res) => res.json())
            .then(async (data) => {
                fetchUsers();


                const {content, subject} = await fetchEmailTemplate();

                // Log template to check its type
                console.log("Template type:", typeof content);
                console.log("Template content:", content);

                const placeholders = {
                    FirstName: user.firstName,
                };
                const emailBody = replaceTemplatePlaceholders(content, placeholders);
                const mailData = {
                    email: user.email,
                    subject: subject,
                    message: emailBody,
                };
                const emailResponse = await fetch('/api/mail', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(mailData),
                });

                if (!emailResponse.ok) {
                    throw new Error('Failed to send email');
                }
                const emailData = await emailResponse.json();
                console.log('Email sent successfully:', emailData);
                alert("Send Successfully!");


            })
            .catch((error) => console.error("Error accepting user:", error));
    };
    const toggleAccordion = (index) => {
        if (activeAccordions.includes(index)) {
            setActiveAccordions(activeAccordions.filter((item) => item !== index));
        } else {
            setActiveAccordions([...activeAccordions, index]);
        }
    };

    const renderAccordionItem = (title, users, index, isActive) => (
        <div key={index} className="mb-4">
            <h2>
                <button
                    type="button"
                    onClick={() => toggleAccordion(index)}
                    className={`flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border ${isActive ? 'rounded-t-lg' : ''} ${isActive ? '' : 'border-b-0'} border-gray-200 focus:ring-4 focus:ring-gray-200 light:focus:ring-gray-800 light:border-gray-700 light:text-gray-400 hover:bg-gray-100 light:hover:bg-gray-800 gap-3`}
                    aria-expanded={isActive}
                    aria-controls={`accordion-collapse-body-${index}`}
                >
                    <span>{title}</span>
                    <svg
                        className={`w-3 h-3 ${isActive ? 'rotate-180' : ''} shrink-0`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                    >
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
                    </svg>
                </button>
            </h2>
            <div
                id={`accordion-collapse-body-${index}`}
                className={`p-5 border border-gray-200 light:border-gray-700 light:bg-gray-900 ${isActive ? '' : 'hidden'} ${isActive && index === 0 ? 'rounded-b-lg' : ''}`}
                aria-labelledby={`accordion-collapse-heading-${index}`}
            >
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 light:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 light:bg-gray-700 light:text-gray-400">
                    <tr>
                        <th className="px-6 py-3">Workshopdocent</th>
                        <th className="px-6 py-3">Email</th>
                        <th className="px-6 py-3 hidden lg:table-cell">Telefoonnummer</th>
                        <th className="px-6 py-3 hidden lg:table-cell">Geboortedatum</th>
                        <th className="px-6 py-3">Bewerken</th>
                        {isActive && <th className="px-6 py-3 text-right">Actie</th>}
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user) => (
                        <tr
                            key={user.id}
                            className="odd:bg-white odd:light:bg-gray-900 even:bg-gray-50 even:light:bg-gray-800 border-b light:border-gray-700"
                        >
                            <td className="px-6 py-4">{user.firstName + " " + user.lastName}</td>
                            <td className="px-6 py-4">{user.email}</td>
                            <td className="px-6 py-4 hidden lg:table-cell">{user.phoneNumber}</td>
                            <td className="px-6 py-4 hidden lg:table-cell">{formatDate(user.birthDate)}</td>
                            <td className="px-6 py-4">
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        editTeacher(user.id);
                                    }}
                                    className="font-medium text-[#f49700] light:text-[#f49700] hover:underline"
                                >
                                    Bewerken
                                </a>
                            </td>
                            {isActive && (
                                <td className="px-6 py-4 text-right">
                                    <button
                                        onClick={(e) => handleAcceptClick(e, user)}
                                        className="bg-custom-blue text-white px-2 py-1 rounded mr-2"
                                    >
                                        Accepteren
                                    </button>
                                    <button
                                        onClick={(e) => handleRejectClick(e, user)}
                                        className="bg-custom-red text-white px-2 py-1 rounded"
                                    >
                                        Weigeren
                                    </button>
                                </td>
                            )}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    return (
        <div className="relative overflow-x-auto shadow-md rounded-lg mx-3">
            {renderAccordionItem('Aanvragen', pendingTeachers, 0, activeAccordions.includes(0))}
            {renderAccordionItem('Geaccepteerd', acceptedTeachers, 1, activeAccordions.includes(1))}
        </div>
    );

}
