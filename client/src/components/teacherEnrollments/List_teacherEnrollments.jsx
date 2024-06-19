import React, { useEffect, useState } from "react";
import ConfirmRejectModal_teacherEnrollments from "./ConfirmRejectModal_teacherEnrollments";
import ConfirmAcceptModal_teacherEnrollments from "./ConfirmAcceptModal_teacherEnrollments";

export default function List_teacherEnrollments({
    isOpen,
    enrollments,
    setEnrollments,
}) {
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [showAcceptModal, setShowAcceptModal] = useState(false);
    const [enrollmentToReject, setEnrollmentToReject] = useState({});
    const [enrollmentToAccept, setEnrollmentToAccept] = useState({});
    const [rejectedMail, setRejectedMail] = useState({});
    const [acceptedMail, setAcceptedMail] = useState({});
    const [reminderMail, setReminderMail] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [rejectedResponse, acceptedResponse, reminderResponse, enrollmentsResponse] = await Promise.all([
                    fetch(`/api/mailTemplate/15`),
                    fetch(`/api/mailTemplate/16`),
                    fetch(`/api/mailTemplate/13`),
                    fetch(`/api/enrollment`)
                ]);

                const rejectedData = await rejectedResponse.json();
                const acceptedData = await acceptedResponse.json();
                const reminderData = await reminderResponse.json();
                const enrollmentsData = await enrollmentsResponse.json();

                setRejectedMail(rejectedData.data);
                setAcceptedMail(acceptedData.data);
                setReminderMail(reminderData.data);
                setEnrollments(enrollmentsData.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [setEnrollments]);

    const formatDate = (date) => {
        if (!date) return "";
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString("nl-NL", options);
    };

    // Group and sort enrollments by commissionId and workshopName
    const groupedEnrollments = enrollments
        .sort((a, b) => {
            if (a.commissionId !== b.commissionId) {
                return a.commissionId - b.commissionId;
            }
            return a.workshopName.localeCompare(b.workshopName);
        })
        .reduce((acc, enrollment) => {
            const { commissionId, date, workshopName, firstName, lastName } = enrollment;
            const groupKey = `${commissionId}-${workshopName}`;
            if (!acc[groupKey]) {
                acc[groupKey] = {
                    commissionDetails: `${firstName} ${lastName} - ${workshopName}`,
                    enrollments: []
                };
            }
            acc[groupKey].enrollments.push(enrollment);
            return acc;
        }, {});

    const handleRejectClick = (e, enrollment) => {
        e.preventDefault();
        e.stopPropagation();
        setEnrollmentToReject(enrollment);
        setShowRejectModal(true);
    };

    const handleAcceptClick = (e, enrollment) => {
        e.preventDefault();
        e.stopPropagation();
        setEnrollmentToAccept(enrollment);
        setShowAcceptModal(true);
    };

    const handleRejectModalClose = () => {
        setShowRejectModal(false);
    };

    const handleAcceptModalClose = () => {
        setShowAcceptModal(false);
    };

    const replaceTemplatePlaceholders = (template, placeholders) => {
        if (typeof template !== 'string') {
            throw new Error('Template is not a string');
        }
        return template.replace(/{(FirstName|Workshop|Customer|ExecutionDate|Reason)}/g, (_, key) => placeholders[key] || '');
    };

    const handleSubmit = (enrollment, status, reason) => {
        if (status === "geaccepteerd") {
            let emailBody = replaceTemplatePlaceholders(acceptedMail.content, {
                FirstName: enrollment.firstName,
                Workshop: enrollment.workshopName,
                ExecutionDate: formatDate(enrollment.date),
            });
            let subjectBody = replaceTemplatePlaceholders(acceptedMail.subject, {
                Workshop: enrollment.workshopName,
                ExecutionDate: formatDate(enrollment.date),
            });

            fetch('/api/mail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: enrollment.email,
                    subject: subjectBody,
                    message: emailBody
                })
            })
                .then(res => res.json())
                .catch(error => console.error('Error sending email:', error));

            emailBody = replaceTemplatePlaceholders(reminderMail.content, {
                FirstName: enrollment.firstName,
                ExecutionDate: formatDate(enrollment.date),
                startTime: enrollment.startTime
            });
            subjectBody = replaceTemplatePlaceholders(reminderMail.subject, {
                Workshop: enrollment.workshopName,
                ExecutionDate: formatDate(enrollment.date),
                City: enrollment.city
            });
            fetch('/api/schedule-mail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: enrollment.email,
                    subject: subjectBody,
                    message: emailBody,
                    eventDate: enrollment.date
                })
            })
                .then(res => res.json())
                .catch(error => console.error('Error sending email:', error));

        } else if (status === "geweigerd") {
            const emailBody = replaceTemplatePlaceholders(rejectedMail.content, {
                FirstName: enrollment.firstName,
                Workshop: enrollment.workshopName,
                Customer: enrollment.customer,
                ExecutionDate: formatDate(enrollment.date),
                Reason: reason // Pass the reason here
            });
            const subjectBody = replaceTemplatePlaceholders(rejectedMail.subject, {
                Workshop: enrollment.workshopName,
                ExecutionDate: formatDate(enrollment.date),
            });

            fetch('/api/mail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: enrollment.email,
                    subject: subjectBody,
                    message: emailBody
                })
            })
                .then(res => res.json())
                .catch(error => console.error('Error sending email:', error));
        }
    };

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            {Object.keys(groupedEnrollments).map((groupKey) => (
                <div key={groupKey} className="mb-8"> {/* Added margin bottom for separation */}
                    <div className="flex justify-between items-center my-4 mx-6">
                        <h2 className="text-lg font-semibold">
                            {groupedEnrollments[groupKey].commissionDetails}
                        </h2>
                        <div className="flex gap-2">
                            <button
                                onClick={(e) => handleAcceptClick(e, groupedEnrollments[groupKey].enrollments[0])}
                                className="bg-custom-blue text-white text-sm font-semibold px-2 py-1 rounded"
                            >
                                Accepteren
                            </button>
                            <button
                                onClick={(e) => handleRejectClick(e, groupedEnrollments[groupKey].enrollments[0])}
                                className="bg-custom-red text-white text-sm font-semibold px-2 py-1 rounded"
                            >
                                Weigeren
                            </button>
                        </div>
                    </div>
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 light:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 light:bg-gray-700 light:text-gray-400">
                        <tr>
                            <th className="px-6 py-3">Klant</th>
                            <th className="px-6 py-3">Datum</th>
                        </tr>
                        </thead>
                        <tbody>
                        {groupedEnrollments[groupKey].enrollments.map((enrollment) => (
                            <tr
                                key={enrollment.id}
                                className="odd:bg-white odd:light:bg-gray-900 even:bg-gray-50 even:light:bg-gray-800 border-b light:border-gray-700"
                            >
                                <td className="px-6 py-4">
                                    {enrollment.customer}
                                </td>
                                <td className="px-6 py-4">
                                    {formatDate(enrollment.date)}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    {showRejectModal && (
                        <div>
                            <ConfirmRejectModal_teacherEnrollments
                                onClose={handleRejectModalClose}
                                onConfirm={(reason) => handleSubmit(enrollmentToReject, 'geweigerd', reason)}
                                enrollment={enrollmentToReject}
                                setEnrollments={setEnrollments}
                            />
                        </div>
                    )}
                    {showAcceptModal && (
                        <div>
                            <ConfirmAcceptModal_teacherEnrollments
                                onClose={handleAcceptModalClose}
                                onConfirm={() => handleSubmit(enrollmentToAccept, 'geaccepteerd')}
                                enrollment={enrollmentToAccept}
                                setEnrollments={setEnrollments}
                            />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
