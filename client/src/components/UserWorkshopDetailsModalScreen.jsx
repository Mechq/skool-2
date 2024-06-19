import ConfirmModal_openWorkshops from "./openWorkshops/ConfirmModal_openWorkshops";
import React, {useEffect, useState} from "react";
import {AiTwotoneCalendar, AiTwotoneClockCircle} from "react-icons/ai";
import {jwtDecode} from "jwt-decode";

export default function UserWorkshopDetailsModalScreen({ onClose, workshop, commission, onRefresh}) {
    const [activeTab, setActiveTab] = useState("workshop"); // Default active tab
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
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [confirmMessage, setConfirmMessage] = useState("");
    const [confirmAction, setConfirmAction] = useState(() => {});
    const [invitedWorkshop, setInvitedWorkshop] = useState(null);
    const [inviteState, setInviteState] = useState(null);
    const [buttonText, setButtonText] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            let decodedToken;
            const token = localStorage.getItem('token');
            if (token) {
                decodedToken = jwtDecode(token);
                setUser(decodedToken);
            }
            setLoading(false);

        };
        fetchData().then();
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
    const formatDate = (dateString) => {
        if (!dateString) return "";
        const options = {year: 'numeric', month: 'long', day: 'numeric'};
        return new Date(dateString).toLocaleDateString("nl-NL", options);
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

    useEffect(() => {
        if (workshop.status === "open") {
            setInviteState(true);
        }

        let buttonText = "Aanmelden";

        if (workshopRound) {
            if (workshopRound.amountOfTeachers <= enrollments.length) {
                buttonText = "Wachtrij";
            }

            for (const enrollment of enrollments) {
                if (enrollment.userId === userId) {
                    buttonText = "Afmelden";
                    break;
                }
            }
        }

        setButtonText(buttonText);
    }, [workshopRound, enrollments, workshop.status]);

    if (!user) {
        return null;
    }
    const userId = user.id;

    const handleModalConfirm = () => {
        if (confirmAction) {
            confirmAction();
        }
        setShowConfirmModal(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
console.log(commission)
        const checkDate = new Date(commission.date);
        const currentDate = new Date();
        const threeDaysInMillis = 3 * 24 * 60 * 60 * 1000;
    console.log("checkDate", checkDate)
        console.log("cure date",currentDate)
        const timeDifference = checkDate.getTime() - currentDate.getTime();
        try {
            if (buttonText === "Afmelden"         && timeDifference >= threeDaysInMillis
            ) {
                setConfirmMessage("Weet je zeker dat je je wilt afmelden voor deze workshop?");
                setConfirmAction(() => () => {
                    fetch(`/api/enrollment/${workshopRound.id}/${userId}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                        .then((response) => {
                            if (!response.ok) {
                                return response.json().then((error) => {
                                    throw new Error(error.message);
                                });
                            }
                            return response.json();
                        })
                        .then(() => {
                            onClose();
                        })
                        .catch((error) => console.error("Error:", error))
                        .finally(onRefresh);
                });
                setShowConfirmModal(true);
                const placeholders = { FirstName: user.firstName, Customer: customer.name, ExecutionDate: formatDate(commission.date), StartTime: times.startTime, FirstRoundStartTime: times.startTime, LastRoundEndTime: times.endTime, Workshop: workshop.name, City: location.city };
                const emailContent = replaceTemplatePlaceholders(mailTemplateCancel.content, placeholders);
                const emailSubject = replaceTemplatePlaceholders(mailTemplateCancel.subject, placeholders);
                sendEmail(user.email, emailSubject, emailContent);
            } else if (buttonText === "Afmelden" && timeDifference < threeDaysInMillis) {
                alert("Je kunt je niet meer afmelden voor deze workshop, omdat deze binnen 3 dagen plaatsvindt.");
            } else if (buttonText === "Aanmelden" || buttonText === "Wachtrij") {
                setConfirmMessage("Weet je zeker dat je je wilt aanmelden voor deze workshop?");
                setConfirmAction(() => () => {
                    fetch(`/api/workshop/commission/${workshop.workshopId}/${commission.id}`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ userId }),
                    })
                        .then((response) => {
                            if (!response.ok) {
                                return response.json().then((error) => {
                                    throw new Error(error.message);
                                });
                            }
                            return response.json();
                        })
                        .then(() => {
                            onClose();
                        })
                        .catch((error) => console.error("Error:", error))
                        .finally(onRefresh);
                });
                setShowConfirmModal(true);
                const placeholders = { FirstName: user.firstName, Customer: customer.name, ExecutionDate: formatDate(commission.date), StartTime: times.startTime, FirstRoundStartTime: times.startTime, LastRoundEndTime: times.endTime, Workshop: workshop.name, City: location.city };
                if (buttonText === "Aanmelden") {
                    const emailContent = replaceTemplatePlaceholders(mailTemplateConfirm.content, placeholders);
                    const emailSubject = replaceTemplatePlaceholders(mailTemplateConfirm.subject, placeholders);
                    sendEmail(user.email, emailSubject, emailContent);
                } else if (buttonText === 'Wachtrij') {
                    const emailContent = replaceTemplatePlaceholders(mailTemplateBackup.content, placeholders);
                    const emailSubject = replaceTemplatePlaceholders(mailTemplateBackup.subject, placeholders);
                    console.log(emailContent)
                    sendEmail(user.email, emailSubject, emailContent);
                }
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="fixed inset-0 z-10 bg-gray-900 bg-opacity-15" onClick={onClose}/>

            <section className="w-full flex flex-col items-center justify-center fixed top-0 left-0 z-20 mt-20 overflow-y-auto max-h-full">
                <section
                    className="bg-center bg-no-repeat bg-gray-500 bg-blend-multiply w-full max-w-4xl"
                    style={{backgroundImage: `url(${workshop.picture})`}}
                >
                    <div className="px-4 mx-auto max-w-screen-xl text-center py-12 md:py-24">
                        <h1 className="mb-4 text-3xl font-extrabold tracking-tight leading-none text-white md:text-4xl lg:text-5xl">
                            {workshop.name}
                        </h1>
                    </div>
                </section>
                <div className="w-full max-w-4xl">
                    <div className="bg-white shadow light:border light:bg-gray-800 light:border-gray-700 rounded-none">
                        <div className="w-full max-w-4xl flex pb-6 pt-6">
                            <div className={`flex-1 flex items-center justify-center border-b-2 pb-6 hover:text-gray-600 ${showWorkshopDetails ? 'border-brand-orange' : 'border-black'}`}>
                                <button
                                    onClick={() => { setShowWorkshopDetails(true); setActiveTab('workshop'); }}
                                >
                                    Workshop Details
                                </button>
                            </div>
                            <div className={`flex-1 flex items-center justify-center border-b-2 pb-6 hover:text-gray-600 ${!showWorkshopDetails ? 'border-brand-orange' : 'border-black'}`}>
                                <button
                                    onClick={() => { setShowWorkshopDetails(false); setActiveTab('commission'); }}
                                >
                                    Opdracht Details
                                </button>
                            </div>
                        </div>
                        <div className="p-6 space-y-4 sm:space-y-6">
                            {showWorkshopDetails ? (
                                <>
                                    <h2><strong>Naam:</strong> <br />{workshop.name}</h2>
                                    <h2><strong>Details:</strong> <br />{workshop.description}</h2>
                                    <h2><strong>Materialen:</strong> <br />{workshop.materials}</h2>
                                </>
                            ) : (
                                <>
                                    <div className="md:w-full px-4 mb-4">
                                        <h1 className="font-bold text-4xl mb-2">{customer.name}</h1>
                                        <div className="flex items-center">
                                            <AiTwotoneCalendar className="mr-2"/>
                                            <p>{formatDate(commission.date)}</p>
                                        </div>
                                        <div className="flex items-center">
                                            <AiTwotoneClockCircle className="mr-2"/>
                                            <p>{times.startTime} - {times.endTime}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col md:flex-row">
                                        <div className="md:w-1/2 px-4 mb-4">
                                            <h1 className="font-bold text-lg">Opdracht Informatie</h1>
                                            <p><strong>Details:</strong> {workshop.details}</p>
                                            <p><strong>Doelgroep:</strong> {workshop.targetAudience}</p>
                                            <p><strong>Leerjaar en niveau:</strong> {workshop.grade}</p>
                                            <p><strong>Docenten:</strong> {workshopRound.amountOfTeachers}</p>
                                            <p><strong>Leerlingen:</strong> {workshopRound.amountOfStudents}</p>
                                        </div>
                                        <div className="md:w-1/2 px-4 mb-4">
                                            <h1 className="font-bold text-lg">Locatie Informatie</h1>
                                            <p><strong>Naam:</strong> {location.name}</p>
                                            <p><strong>Adres:</strong> {location.street} {location.houseNumber}, {location.city} {location.postalCode}</p>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                        {!inviteState && (
                            <div className="flex justify-center" onClick={handleSubmit}>
                                <button className="bg-brand-orange text-white font-bold py-4 px-8 rounded focus:outline-none hover:bg-hover-brand-orange focus:shadow-outline m-5 mt-8">
                                    {buttonText}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Confirmation modal for enrollment or cancellation */}
            <ConfirmModal_openWorkshops
                isOpen={showConfirmModal}
                onClose={() => setShowConfirmModal(false)}
                onConfirm={handleModalConfirm}
                message={confirmMessage}
            />
        </>
    );
}
