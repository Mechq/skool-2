import React, {useEffect, useState} from "react";

export default function InviteModal_workshops({onClose, onSave, commissionWorkshop}) {
    console.log(commissionWorkshop)
    const [users, setUsers] = useState([]);
    const [selectedTeacher, setSelectedTeacher] = useState("");
    const [ mailTemplate, setMailTemplate] = useState({});
    const [times, setTimes] = useState({});
    const [locationId, setLocationId] = useState(null);
    const [locationCity, setLocationCity] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [usersResponse, mailTemplateResponse, timesResponse, commissionResponse] = await Promise.all([
                    fetch(`/api/teacherWorkshopQualification/workshop/${commissionWorkshop.workshopId}`).then(res => res.json()),
                    fetch(`/api/mailTemplate/14`).then(res => res.json()),
                    fetch(`/api/commission/time/${commissionWorkshop.commissionId}`).then(res => res.json()),
                    fetch(`/api/commission/${commissionWorkshop.commissionId}`).then(res => res.json())
                ]);

                setUsers(usersResponse.data);
                setMailTemplate(mailTemplateResponse.data);
                setTimes(timesResponse.data);
                setLocationId(commissionResponse.data.locationId);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [commissionWorkshop.workshopId, commissionWorkshop.commissionId]);

    useEffect(() => {
        const fetchLocation = async () => {
            if (locationId) {
                try {
                    const locationResponse = await fetch(`/api/location/${locationId}`).then(res => res.json());
                    setLocationCity(locationResponse.data.city);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
        };

        fetchLocation();
    }, [locationId]);



    const replaceTemplatePlaceholders = (template, placeholders) => {
        if (typeof template !== 'string') {
            throw new Error('Template is not a string');
        }
        return template.replace(/{(FirstName|ExecutionDate|FirstRoundStartTime|LastRoundEndTime|Workshop|City)}/g, (_, key) => placeholders[key] || '');
    };

    const handleInvite = async () => {
        const selectedTeacherNum = parseInt(selectedTeacher, 10); // Assuming selectedTeacher is a string

        // Ensure selectedTeacher is a valid number and find the user
        if (isNaN(selectedTeacherNum)) {
            console.error('Invalid selectedTeacher ID');
            return;
        }

        const selectedUser = users.find(user => user.id === selectedTeacherNum);
        if (!selectedUser) {
            console.error('User not found');
            return;
        }

        const emailBody = replaceTemplatePlaceholders(mailTemplate.content, {
            FirstName: selectedUser.firstName,
            ExecutionDate: formatDate(commissionWorkshop.date),
            FirstRoundStartTime: times.startTime,
            LastRoundEndTime: times.endTime,
            Workshop: commissionWorkshop.workshopName,
            City: locationCity
        });

        const subjectBody = replaceTemplatePlaceholders(mailTemplate.subject, {
            Workshop: commissionWorkshop.workshopName,
            ExecutionDate: formatDate(commissionWorkshop.date),
            City: locationCity
        })
        console.log({
            email: selectedUser.email,});
        console.log({subject: mailTemplate.subject,})
        console.log({message: emailBody})

        try {
            const inviteResponse = await fetch(`/api/invite/workshop/${commissionWorkshop.commissionWorkshopId}/user/${selectedTeacherNum}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId: selectedTeacherNum }) // Include the body in the POST request
            });

            if (!inviteResponse.ok) {
                throw new Error('Failed to send invite');
            }

            onClose();

            const emailResponse = await fetch('/api/mail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: selectedUser.email,
                    subject: subjectBody,
                    message: emailBody
                })
            });

            if (!emailResponse.ok) {
                throw new Error('Failed to send email');
            }

            console.log('Email sent');
        } catch (error) {
            console.error('Error:', error);
        }
    };



    const formatDate = (date) => {
        if (!date) return "";
        const options = {year: 'numeric', month: 'long', day: 'numeric'};
        return new Date(date).toLocaleDateString("nl-NL", options);
    }

    return (
        <>
            <div className="fixed inset-0 z-10 bg-gray-900 bg-opacity-15" onClick={onClose} />
            <section className="w-full h-full flex items-center justify-center fixed top-0 left-0 z-20">
                <div className="flex flex-col items-center justify-center w-80">
                    <div className="w-full bg-white rounded-lg shadow light:bg-gray-800 light:border light:border-gray-700">
                        <div className="p-6 space-y-4 sm:space-y-6">
                            <span className="close text-xl" onClick={onClose}>
                                &times;
                            </span>
                            <h1 className="text-xl font-medium m-0 p-0" style={{ marginTop: 0 }}>
                                {'Docent uitnodigen voor workshop ' + commissionWorkshop.workshopName}
                            </h1>
                            <h2>
                                {'Datum: ' + formatDate(commissionWorkshop.date)}
                                <br />
                                {'Klant: ' + commissionWorkshop.customerName}
                            </h2>

                            <label htmlFor="teacherSelect" className="block mb-2 text-sm font-medium text-gray-900 light:text-white">
                                Selecteer docent:
                            </label>
                            <select
                                id="teacherSelect"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500"
                                value={selectedTeacher}
                                onChange={(e) => setSelectedTeacher(e.target.value)}
                            >
                                <option value="">Selecteer een docent</option>
                                {users.map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {user.firstName} {user.lastName}
                                    </option>
                                ))}
                            </select>

                            <button
                                type="button"
                                onClick={handleInvite}
                                className="w-full text-white bg-brand-orange hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center light:bg-primary-600 light:hover:bg-primary-700 light:focus:ring-primary-800"
                            >
                                Uitnodigen
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}