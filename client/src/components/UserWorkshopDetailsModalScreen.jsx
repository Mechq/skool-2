import React, {useEffect, useState} from "react";
import {AiTwotoneCalendar, AiTwotoneClockCircle} from "react-icons/ai";
import {jwtDecode} from "jwt-decode";


export default function UserWorkshopDetailsModalScreen({onClose, workshop, commission, onRefresh}) {


    const [showWorkshopDetails, setShowWorkshopDetails] = useState(true);
    const [workshopRound, setWorkshopRound] = useState({});
    const [customer, setCustomer] = useState({});
    const [location, setLocation] = useState({});
    const [enrollments, setEnrollments] = useState([]);
    const [times, setTimes] = useState({});
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

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


    const formatDate = (date) => {
        const formattedDate = new Date(date);
        return formattedDate.toLocaleDateString('nl-NL', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        });
    };
    useEffect(() => {

        const fetchWorkshopRound = fetch(`/api/workshop/commission/${workshop.workshopId}/${commission.id}`)
            .then(res => res.json())
            .then(data => {
                setWorkshopRound(data.data);
            })
            .catch(error => console.error('Error fetching workshop round data:', error));

        const fetchCustomer = fetch(`/api/customer/${commission.customerId}`)
            .then(res => res.json())
            .then(data => {
                setCustomer(data.data);
            })
            .catch(error => console.error('Error fetching customer data:', error));

        const fetchLocation = fetch(`/api/location/${commission.locationId}`)
            .then(res => res.json())
            .then(data => {
                setLocation(data.data);
            })
            .catch(error => console.error('Error fetching location data:', error));

        const fetchEnrollments = fetch(`/api/workshop/enrollment/${workshop.workshopId}/${commission.id}`)
            .then(res => res.json())
            .then(data => {
                setEnrollments(data.data);
            })
            .catch(error => console.error('Error fetching location data:', error));

        const fetchTimes = fetch(`/api/commission/time/${commission.id}`)
            .then(res => res.json())
            .then(data => {
                setTimes(data.data);
            })
            .catch(error => console.error('Error fetching location data:', error));


        Promise.all([fetchWorkshopRound, fetchCustomer, fetchLocation, fetchEnrollments, fetchTimes])
            .then(() => {
            })
            .catch(error => {
                console.error('Error in fetching one or more resources:', error);
            });
    }, []);

    if (!user) {
        return null;
    }
    const userId = user.id;


    let buttonText = "";


    if (workshopRound && workshopRound.amountOfTeachers <= enrollments.length) {
        buttonText = "Wachtrij";
    } else if (workshopRound && workshopRound.amountOfTeachers > enrollments.length) {
        buttonText = "Aanmelden";
    }
    enrollments.map((enrollment) => {
        if (enrollment.userId === userId) {
            buttonText = "Afmelden";

        } else {}
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        if (buttonText === "Afmelden") {
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
                .catch((error) => console.error("Error:", error));
        } else if (buttonText === "Aanmelden" || buttonText === "Wachtrij") {
            fetch(`/api/workshop/commission/${workshop.workshopId}/${commission.id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({userId}),
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
                .catch((error) => console.error("Error:", error));
        }
        onRefresh();
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="fixed inset-0 z-10 bg-gray-900 bg-opacity-15" onClick={onClose}/>

            <section className="w-full flex flex-col items-center justify-center fixed top-0 left-0 z-20 mt-20">
                <section
                    className="bg-center bg-no-repeat bg-gray-500 bg-blend-multiply w-full max-w-4xl"
                    style={{backgroundImage: `url(${workshop.picture})`}}
                >
                    <div className="px-4 mx-auto max-w-screen-xl text-center py-12 lg:py-24">
                        <h1 className="mb-4 text-3xl font-extrabold tracking-tight leading-none text-white md:text-4xl lg:text-5xl">
                            {workshop.name}
                        </h1>
                    </div>
                </section>
                <div className="w-full max-w-4xl">
                    <div
                        className="bg-white shadow light:border light:bg-gray-800 light:border-gray-700 rounded-none">
                        <div className="w-full max-w-4xl flex pb-6 pt-6">
                            <div
                                className={`flex-1 flex items-center justify-center border-b-2 pb-6 hover:text-gray-600  ${showWorkshopDetails ? 'border-brand-orange' : 'border-black'}`}>
                                <button
                                    onClick={() => setShowWorkshopDetails(true)}
                                >
                                    Workshop Details
                                </button>
                            </div>
                            <div
                                className={`flex-1 flex items-center justify-center border-b-2 pb-6 hover:text-gray-600 ${!showWorkshopDetails ? 'border-brand-orange' : 'border-black'}`}>
                                <button
                                    onClick={() => setShowWorkshopDetails(false)}
                                >
                                    Opdracht Details
                                </button>
                            </div>
                        </div>
                        <div className="p-6 space-y-4 sm:space-y-6">
                            {showWorkshopDetails ? (
                                <>
                                    <h2 className=""><strong>Naam:</strong> <br/>
                                        {workshop.name}</h2>
                                    <h2 className=""><strong>Details:</strong> <br/>
                                        {workshop.description}</h2>
                                    <h2 className=""><strong>Materialen:</strong> <br/>
                                        {workshop.materials}</h2>
                                </>
                            ) : (
                                <>
                                    <div className="md:w-full px-4 mb-4">
                                        <h1 className="font-bold text-4xl mb-2">{customer.name}</h1>
                                        <div
                                            className="flex items-center"> {/* Adding a flex container for alignment */}
                                            <AiTwotoneCalendar className="mr-2"/>
                                            <p>{formatDate(commission.date)}</p>
                                        </div>
                                        <div
                                            className="flex items-center"> {/* Adding a flex container for alignment */}
                                            <AiTwotoneClockCircle className="mr-2"/>
                                            <p>{times.startTime} - {times.endTime}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col md:flex-row">
                                        {/* Commissions Data */}
                                        <div className="md:w-1/2 px-4 mb-4">
                                            <h1 className="font-bold text-lg">Opdracht Informatie</h1>
                                            <p><strong>Details:</strong> {workshop.details}</p>
                                            <p><strong>Doelgroep:</strong> {workshop.targetAudience}</p>
                                            <p><strong>Leerjaar en niveau:</strong> {workshop.grade}</p>

                                            <p><strong>Docenten:</strong> {workshopRound.amountOfTeachers}</p>
                                            <p><strong>Leerlingen:</strong> {workshopRound.amountOfStudents}</p>
                                        </div>

                                        {/* Location Data */}
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
                        <div className="flex justify-center"
                             onClick={handleSubmit}
                        >
                            <button
                                className="bg-brand-orange text-white font-bold py-4 px-8 rounded focus:outline-none hover:bg-hover-brand-orange focus:shadow-outline m-5 mt-8"
                            >
                                {buttonText}
                            </button>
                        </div>
                    </div>

                </div>


            </section>
        </>
    );
}
