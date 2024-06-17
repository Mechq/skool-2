import React, { useEffect, useState } from "react";
import { AiTwotoneCalendar, AiTwotoneClockCircle } from "react-icons/ai";
import {jwtDecode} from "jwt-decode";

export default function UserWorkshopDetailsModalScreen({ onClose, workshop, commission, onRefresh }) {
    const [showWorkshopDetails, setShowWorkshopDetails] = useState(true);
    const [workshopRound, setWorkshopRound] = useState({});
    const [customer, setCustomer] = useState({});
    const [location, setLocation] = useState({});
    const [enrollments, setEnrollments] = useState([]);
    const [times, setTimes] = useState({});
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [mailTemplateBackup, setMailTemplateBackup] = useState({});
    const [mailTemplateCancel, setMailTemplateCancel] = useState({});
    const [mailTemplateConfirm, setMailTemplateConfirm] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                const decodedToken = jwtDecode(token);
                setUser(decodedToken);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const [workshopRoundData, customerData, locationData, enrollmentsData, timesData] = await Promise.all([
                    fetch(`/api/workshop/commission/${workshop.workshopId}/${commission.id}`).then(res => res.json()),
                    fetch(`/api/customer/${commission.customerId}`).then(res => res.json()),
                    fetch(`/api/location/${commission.locationId}`).then(res => res.json()),
                    fetch(`/api/workshop/enrollment/${workshop.workshopId}/${commission.id}`).then(res => res.json()),
                    fetch(`/api/commission/time/${commission.id}`).then(res => res.json())
                ]);

                setWorkshopRound(workshopRoundData.data);
                setCustomer(customerData.data);
                setLocation(locationData.data);
                setEnrollments(enrollmentsData.data);
                setTimes(timesData.data);
            } catch (error) {
                console.error('Error fetching initial data:', error);
            }
        };

        fetchInitialData();
    }, [workshop.workshopId, commission.id, commission.customerId, commission.locationId]);

    const fetchEmailTemplate = async (templateId) => {
        try {
            const res = await fetch(`/api/mailTemplate/${templateId}`);
            if (!res.ok) {
                throw new Error('Failed to fetch email template');
            }
            const data = await res.json();
            return { content: data.data.content, subject: data.data.subject };
        } catch (error) {
            console.error('Error fetching email template:', error);
            return null;
        }
    };

    const replaceTemplatePlaceholders = (template, placeholders) => {
        if (typeof template !== 'string') {
            throw new Error('Template is not a string');
        }
        return template.replace(/{(FirstName|Customer|ExecutionDate|StartTime|FirstRoundStartTime|LastRoundEndTime|Workshop|City|Reden)}/g, (_, key) => placeholders[key] || '');
    };


    const sendEmail = async (email, subject, message) => {
        try {
            const response = await fetch('/api/mail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, subject, message }),
            });
            if (!response.ok) {
                throw new Error('Failed to send email');
            }
            const emailData = await response.json();
            console.log('Email sent successfully:', emailData);
            alert('Send Successfully!');
        } catch (error) {
            console.error('Error sending email:', error);
        }
    };

    const fetchTemplates = async () => {
        try {
            const [backup, cancel, confirm] = await Promise.all([
                fetchEmailTemplate(10),
                fetchEmailTemplate(11),
                fetchEmailTemplate(12)
            ]);
            setMailTemplateBackup(backup);
            setMailTemplateCancel(cancel);
            setMailTemplateConfirm(confirm);
        } catch (error) {
            console.error('Error fetching templates:', error);
        }
    };

    useEffect(() => {
        fetchTemplates();
    }, []);

    if (!user) {
        return null;
    }
    const userId = user.id;

    const buttonText = enrollments.some(enrollment => enrollment.userId === userId)
        ? "Afmelden"
        : (workshopRound.amountOfTeachers <= enrollments.length ? "Wachtrij" : "Aanmelden");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const checkDate = new Date(commission.commissionDate);
        const currentDate = new Date();
        const threeDaysInMillis = 3 * 24 * 60 * 60 * 1000;

        const timeDifference = checkDate.getTime() - currentDate.getTime();
        //&& timeDifference >= threeDaysInMillis
        try {
            if (buttonText === "Afmelden") {
                const response = await fetch(`/api/enrollment/${workshopRound.id}/${userId}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.message);
                }
                onClose();
                const placeholders = { FirstName: user.firstName, Customer: customer.name, ExecutionDate: formatDate(commission.date), StartTime: times.startTime, FirstRoundStartTime: times.startTime, LastRoundEndTime: times.endTime, Workshop: workshop.name, City: location.city };
                const emailContent = replaceTemplatePlaceholders(mailTemplateCancel.content, placeholders);
                sendEmail(user.email, mailTemplateCancel.subject, emailContent);
            } else if (buttonText === "Afmelden" && timeDifference < threeDaysInMillis) {
                alert("Je kunt je niet meer afmelden voor deze workshop, omdat deze binnen 3 dagen plaatsvindt.");
            } else if (buttonText === "Aanmelden" || buttonText === "Wachtrij") {
                const response = await fetch(`/api/workshop/commission/${workshop.workshopId}/${commission.id}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ userId }),
                });
                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.message);
                }
                onClose();
                const placeholders = { FirstName: user.firstName, Customer: customer.name, ExecutionDate: formatDate(commission.date), StartTime: times.startTime, FirstRoundStartTime: times.startTime, LastRoundEndTime: times.endTime, Workshop: workshop.name, City: location.city };
                if (buttonText === "Aanmelden") {
                    const emailContent = replaceTemplatePlaceholders(mailTemplateConfirm.content, placeholders);
                    sendEmail(user.email, mailTemplateConfirm.subject, emailContent);
                } else if (buttonText === 'Wachtrij') {
                    const emailContent = replaceTemplatePlaceholders(mailTemplateBackup.content, placeholders);
                    sendEmail(user.email, mailTemplateBackup.subject, emailContent);
                }
            }
        } catch (error) {
            console.error("Error:", error);
        }
        onRefresh();
    };


    if (loading) {
        return <div>Loading...</div>;
    }

    const formatDate = (date) => {
        const formattedDate = new Date(date);
        return formattedDate.toLocaleDateString('nl-NL', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        });
    };

    return (
        <>
            <div className="fixed inset-0 z-10 bg-gray-900 bg-opacity-15" onClick={onClose} />
            <section className="w-full flex flex-col items-center justify-center fixed top-0 left-0 z-20 mt-20">
                <section
                    className="bg-center bg-no-repeat bg-gray-500 bg-blend-multiply w-full max-w-4xl"
                    style={{ backgroundImage: `url(${workshop.picture})` }}
                >
                    <div className="px-4 mx-auto max-w-screen-xl text-center py-12 lg:py-24">
                        <h1 className="mb-4 text-3xl font-extrabold tracking-tight leading-none text-white md:text-4xl lg:text-5xl">
                            {workshop.name}
                        </h1>
                    </div>
                </section>
                <div className="w-full max-w-4xl">
                    <div className="bg-white shadow light:border light:bg-gray-800 light:border-gray-700 rounded-none">
                        <div className="w-full max-w-4xl flex pb-6 pt-6">
                            <div
                                className={`flex-1 flex items-center justify-center border-b-2 pb-6 hover:text-gray-600 ${showWorkshopDetails ? 'border-brand-orange' : 'border-black'}`}
                            >
                                <button onClick={() => setShowWorkshopDetails(true)}>
                                    Workshop Details
                                </button>
                            </div>
                            <div
                                className={`flex-1 flex items-center justify-center border-b-2 pb-6 hover:text-gray-600 ${!showWorkshopDetails ? 'border-brand-orange' : 'border-black'}`}
                            >
                                <button onClick={() => setShowWorkshopDetails(false)}>
                                    Opdracht Details
                                </button>
                            </div>
                        </div>
                        <div className="p-6 space-y-4 sm:space-y-6">
                            {showWorkshopDetails ? (
                                <>
                                    <h2><strong>Naam:</strong><br />{workshop.name}</h2>
                                    <h2><strong>Details:</strong><br />{workshop.description}</h2>
                                    <h2><strong>Materialen:</strong><br />{workshop.materials}</h2>
                                </>
                            ) : (
                                <>
                                    <div className="md:w-full px-4 mb-4">
                                        <h1 className="font-bold text-4xl mb-2">{customer.name}</h1>
                                        <div className="flex items-center">
                                            <AiTwotoneCalendar className="mr-2" />
                                            <p>{formatDate(commission.date)}</p>
                                        </div>
                                        <div className="flex items-center">
                                            <AiTwotoneClockCircle className="mr-2" />
                                            <p>{times.startTime} - {times.endTime}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col md:flex-row">
                                        <div className="md:w-1/2 px-4 mb-4">
                                            <h1 className="font-bold text-lg">Opdracht Informatie</h1>
                                            <p><strong>Details:</strong> {workshop.details}</p>
                                            <p><strong>Doelgroep:</strong> {workshop.targetAudience}</p>
                                            <p><strong>Docenten:</strong> {workshopRound.amountOfTeachers}</p>
                                            <p><strong>Leerlingen:</strong> {workshopRound.amountOfStudents}</p>
                                        </div>
                                        <div className="md:w-1/2 px-4 mb-4">
                                            <h1 className="font-bold text-lg">Locatie Informatie</h1>
                                            <p><strong>Naam:</strong> {location.name}</p>
                                            <p>
                                                <strong>Adres:</strong> {location.street} {location.houseNumber}, {location.city} {location.postalCode}
                                            </p>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="flex justify-center" onClick={handleSubmit}>
                            <button className="bg-brand-orange text-white font-bold py-4 px-8 rounded focus:outline-none hover:bg-hover-brand-orange focus:shadow-outline m-5 mt-8">
                                {buttonText}
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
