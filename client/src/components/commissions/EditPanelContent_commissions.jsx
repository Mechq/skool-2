import React, {useEffect, useRef, useState} from "react"
import "../../styles/optionsRoundCreate.css"
import RoundEditModal from "./RoundEditModal_commissions";
import WorkshopRoundEditModal_commissions from "./WorkshopRoundEditModal_commissions";
import WorkshopRoundWorkshopEditModal from "./WorkshopEditModal_commissions"
import {AiTwotonePlusCircle} from "react-icons/ai";
import { use } from "chai";
import DatePicker from "react-multi-date-picker";
import {FaCalendarPlus} from "react-icons/fa";

export default function EditPanelContent_commissions({setShowSidePanel, commissionId}) {
    const [customerId, setCustomerId] = useState("");
    const [details, setDetails] = useState("");
    const [targetAudience, setTargetAudience] = useState("");
    const [selectedCustomerName, setSelectedCustomerName] = useState("");
    const [selectedCustomerId, setSelectedCustomerId] = useState("");
    const [customers, setCustomers] = useState([]);
    const [locationName, setLocationName] = useState("");
    const [roundIds, setRoundIds] = useState([]);
    const [types, setTypes] = useState([]);
    const [workshopRoundWorkshops, setWorkshopRoundWorkshops] = useState({});
    const [editedWorkshopId, setEditedWorkshopId] = useState("");
    const [editedRoundId, setEditedRoundId] = useState("");
    const [showOptions, setShowOptions] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingRoundType, setEditingRoundType] = useState("");
    const [editedRoundType, setEditedRoundType] = useState("");
    const [dates, setDates] = useState([]);
    const [date, setDate] = useState("");
    const [startTimes, setStartTimes] = useState([]);
    const [endTimes, setEndTimes] = useState([]);
    const [orders, setOrders] = useState([]);
    const optionsRef = useRef(null);
    const [locations, setLocations] = useState([]);
    const [selectedLocationId, setSelectedLocationId] = useState("");
    const [locationId, setLocationId] = useState("");
    const [grade, setGrade] = useState("");
    const [contactPeople, setContactPeople] = useState([]);
    const [contactPersonId, setContactPersonId] = useState("");

    const [value, setValue] = useState([new Date()]);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [show, setShow] = useState(false);

    const handleClose = (state) => {
        setShow(state);
    }

    useEffect(() => {
        if (commissionId) {
            fetch(`/api/commission/${commissionId}`)
                .then((res) => res.json())
                .then((response) => {
                    const data = response.data[0];
                    console.log(data)
                    setCustomerId(data.customerId || "");
                    setDetails(data.details || "");
                    setTargetAudience(data.targetAudience || "");
                    setLocationId(data.locationId || "");
                    setGrade(data.grade || "")
                    const datesArray = data.dates ? data.dates.split(',').map(date => new Date(date.trim())) : [];
                    setValue(datesArray);                })
                .catch((error) => console.error("Error fetching commission:", error));
        }
    }, [commissionId]);


    const fetchRoundData = () => {
        if (commissionId) {
            fetch(`/api/round/commission/${commissionId}`)
                .then((res) => res.json())
                .then((response) => {
                    const data = response.data;

                    const _types = data.map((item) => item.type);
                    setTypes(_types);

                    const _startTimes = data.map((item) => item.startTime);
                    setStartTimes(_startTimes);

                    const _endTimes = data.map((item) => item.endTime);
                    setEndTimes(_endTimes);

                    const _orders = data.map((item) => item.order);
                    setOrders(_orders);

                    const _roundIds = data.map((item) => item.id);
                    setRoundIds(_roundIds);
                    const workshopRoundIds = _roundIds.filter((_, index) => _types[index] === "Workshopronde");
                    workshopRoundIds.forEach((roundId) => {
                        fetch(`/api/workshopRound/workshop/${roundId}`)
                            .then((res) => res.json())
                            .then((response) => {
                                const data = response.data;
                                setWorkshopRoundWorkshops((prevWorkshops) => ({
                                    ...prevWorkshops,
                                    [roundId]: data,
                                }));
                            })
                            .catch((error) => console.error("Error fetching workshops:", error));
                    });
                })
                .catch((error) => console.error("Error fetching round:", error));
        }
    };
    useEffect(() => {
        fetchRoundData();
    }, [commissionId]);
    useEffect(() => {
        if (commissionId) {
            fetch(`/api/commission/customer/${commissionId}`)
                .then((res) => res.json())
                .then((response) => {
                    const customer = response.data
                    setSelectedCustomerName(customer.name || "");
                    setSelectedCustomerId(customer.id || "");
                })
                .catch((error) => console.error("Error fetching customer:", error));
        }
    }, [commissionId]);

    useEffect(() => {
        fetch("/api/customer")
            .then((response) => response.json())
            .then((data) => {
                setCustomers(data.data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, []);

    useEffect(() => {
        if (locationId) {
            fetch(`/api/location/${locationId}`)
                .then(response => response.json())
                .then(data => {
                    const location = data.data;
                    setLocationName(location.name || "");
                })
                .catch((error) => {
                    console.error('Error:', error);
                    setLocationName("");
                });
        }
    }, [selectedCustomerId]);

    useEffect(() => {
        if (customerId) {
            fetch(`/api/customer/contact/${customerId}`)
                .then(response => response.json())
                .then(data => {
                    setContactPeople(data.data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                    setContactPeople([]);
                });
        }
    }, [customerId]);

    useEffect(() => {
        if (customerId) {
            fetch(`/api/location/customer/${selectedCustomerId}`)
                .then(response => response.json())
                .then(data => {
                    setLocations(Array.isArray(data.data) ? data.data : []);
                })
                .catch((error) => {
                    console.error('Error:', error);
                    setLocationName("");
                });
        }
    }, [selectedCustomerId]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (optionsRef.current && !optionsRef.current.contains(event.target)) {
                setShowOptions(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [optionsRef]);

    const handleLocationChange = (e) => {
        setSelectedLocationId(e.target.value);
    }

    const handleContactPersonChange = (e) => {
        setContactPersonId(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formattedDates = value.map(formatCustomDate);
        if (!customerId || !details || !targetAudience) return;
        const commission = {
            customerId,
            details,
            targetAudience,
            locationId: selectedLocationId,
            date,
            grade,
            contactPersonId
        };
        setShowSidePanel(false);

        fetch(`/api/commission/${commissionId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(commission),
        })
            .then((response) => response.json())
            .then((data) => {
            })
            .catch((error) => console.error("Error:", error));
        fetch(`/api/commission/date/${commissionId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formattedDates),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("posted dates", data)
            })
            .catch((error) => console.error("Error:", error));
    };

    const addRound = (e) => {
        e.preventDefault();
        setShowOptions(!showOptions);
    };

    const handleOptionClick = (option) => {


        setShowOptions(false);
        let order = 0
        if (orders.length > 0) {
            order = orders[orders.length - 1] + 1
        }
        let latestEndTime = ''
        fetch(`/api/round/endTime/${commissionId}`, {})
            .then((response) => response.json())
            .then((data) => {
                latestEndTime = data.data.endTime || '';

                const requestBody = JSON.stringify({type: option, order, startTime: latestEndTime});

                fetch(`/api/round/${commissionId}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: requestBody,
                })
                    .then((response) => response.json())
                    .then((data) => {
                        setTypes((prevTypes) => [...prevTypes, option]);
                        setRoundIds(prevRoundIds => [...prevRoundIds, data.data.insertId]);
                    })
                    .then(() => {
                        fetchRoundData();
                    })
                    .catch((error) => console.error("Error:", error));
            })
            .then(() => {
                fetchRoundData();
            })
            .catch((error) => console.error("Error:", error));

    };

    const editRound = (type, id, parentId = null) => {
        setEditingRoundType(type);
        setEditedRoundType(type);
        if (type === "workshop") {
            setEditedWorkshopId(id);
            setEditedRoundId(parentId);
        } else {
            setEditedRoundId(id);
        }
        setShowEditModal(true);
    };

    const handleModalClose = () => {
        setShowEditModal(false);
    };

    const handleModalSave = () => {
        setShowEditModal(false);
    };

    const handleUpdate = () => {
        fetchRoundData();
    };

    const handleChange = (index, value) => {
        console.log("value: ", value + " index: ", index);
        const newDates = [...dates];
        newDates[index] = value;
        setDates(newDates);
    };

    const handleCustomerChange = async (e) => {
        const selectedCustomerId = e.target.value;
        setCustomerId(selectedCustomerId);

        // Clear previous locations and location name
        setLocations([]);
        setLocationName("");

        try {
            // Fetch default location name for the selected customer
            const defaultLocationResponse = await fetch(`/api/location/default/${selectedCustomerId}`);
            const defaultLocationData = await defaultLocationResponse.json();
            const defaultLocationName = defaultLocationData.data ? defaultLocationData.data.name || "" : "";
            const defaultLocationId = defaultLocationData.data ? defaultLocationData.data.id || "" : "";
            setLocationName(defaultLocationName);
            setSelectedLocationId(defaultLocationId);
            console.log("-----------", defaultLocationId, defaultLocationName)

            // Fetch locations for the selected customer
            const locationsResponse = await fetch(`/api/location/customer/${selectedCustomerId}`);
            const locationsData = await locationsResponse.json();
            // Ensure that locationsData.data is an array before setting it to the state
            setLocations(Array.isArray(locationsData.data) ? locationsData.data : []);

        } catch (error) {
            console.error('Error:', error);
            setLocationName(""); // Ensure locationName is always defined
        }
    };

    const workshopRoundIndex = (type, index) => {
        if (type === "Workshopronde") {
            let workshopIndex = 1;
            for (let i = 0; i < index; i++) {
                if (types[i] === "Workshopronde") {
                    workshopIndex++;
                }
            }
            return workshopIndex;
        }
        return "";
    };



    const formatCustomDate = (date) => {
        if (date instanceof Date) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        } else {
            const { year, month, day } = date;
            return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        }
    };
    const handleDateChange = (dates) => {
        const formattedDates = dates.map(date => {
            if (date instanceof Date) {
                return date;
            } else if (date && date.toDate) {
                return date.toDate();
            } else {
                return new Date(date);
            }
        });
        setValue(formattedDates);
        setShowDatePicker(false); // Close DatePicker after selecting dates
    };

    return (
        <div className="px-6">
            <header className="pt-4 pb-4 font-bold text-lg">Opdracht bewerken</header>
            <form>
                <div className="mb-6">
                    <label htmlFor="workshopName"
                           className="block mb-2 text-sm font-medium text-gray-900 light:text-white">Kies een
                        Klant</label>
                    <select id="workshopName" required={true} onChange={handleCustomerChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500">
                        <option value="" disabled>{selectedCustomerName}</option>
                        {customers.map((customer) => (
                            <option key={customer.id} value={customer.id}>{customer.name}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-6">
                    <label htmlFor="details"
                           className="block mb-2 text-sm font-medium text-gray-900 light:text-white">Opdracht
                        details</label>
                    <input type="text" id="details" value={details} required={true}
                           onChange={(e) => setDetails(e.target.value)}
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500"
                    />

                </div>
                <div className="mb-6">
                    <label htmlFor="targetAudience"
                           className="block mb-2 text-sm font-medium text-gray-900 light:text-white">Doelgroep
                        opdracht</label>
                    <input id="targetAudience" value={targetAudience} required={true}
                           onChange={(e) => setTargetAudience(e.target.value)}
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500"
                           placeholder="Doelgroep"></input>
                </div>
                <div className="mb-6">
                    <label htmlFor="grade"
                           className="block mb-2 text-sm font-medium text-gray-900 light:text-white">Leerjaar en niveau
                    </label>
                    <input id="targetAudience" value={grade} required={true}
                           onChange={(e) => setGrade(e.target.value)}
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500"
                           placeholder="Leerjaar en niveau"></input>
                </div>

                <select id="location" value={selectedLocationId} onChange={handleLocationChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500"
                        required>
                    {locationName && (
                        <option value={locationName}>
                            {locationName}
                        </option>
                    )}
                    {locations.map((location) => (
                        <option key={location.id} value={location.id}>
                            {location.name}
                        </option>
                    ))}
                </select>

                <div className="mb-6">
                    <label htmlFor="contactPerson"
                           className="block mb-2 text-sm font-medium text-gray-900 light:text-white">Contactpersoon</label>
                    <select id="contactPerson" onChange={handleContactPersonChange} value={contactPersonId}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500"
                            required>
                        <option value="" disabled>Kies een contactpersoon</option>
                        {contactPeople.map((contactPerson) => (
                            <option key={contactPerson.id} value={contactPerson.id}>
                                {contactPerson.name}
                            </option>
                        ))}
                    </select>
                </div>


                <div>
                    <h2 className="text-lg font-medium text-gray-900 light:text-white mt-6">Datums:</h2>
                    <button
                        type="button"
                        className="inline-flex items-center px-2 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none mt-2"
                        onClick={() => setShowDatePicker(!showDatePicker)}
                    >
                        <FaCalendarPlus className="mr-2"/>
                        Voeg datum toe
                    </button>
                    {showDatePicker && (
                        <DatePicker
                            value={value}
                            onChange={handleDateChange}
                            multiple
                            sort
                            style={{marginTop: '10px'}}
                            portal
                            portalTarget={document.body}
                        />
                    )}
                </div>

                <div className="mt-2">
                    <ol className="list-disc list-inside mt-2">
                        {value.map((date, index) => (
                            <li key={index} className="text-s text-gray-700 light:text-gray-300">
                                {formatCustomDate(date)}
                            </li>
                        ))}
                    </ol>
                </div>


                <button type="submit" onClick={handleSubmit}
                        className="text-white bg-brand-orange hover:bg-brand-orange focus:outline-none focus:ring-brand-orange font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-6 light:bg-brand-orange light:hover:bg-brand-orange light:focus:ring-brand-orange">Opslaan
                </button>


            </form>
            <h3 className="pt-4 pb-4 font-bold text-lg">Rondes</h3>
            <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
    focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400
    light:text-white light:focus:ring-blue-500 light:focus:border-blue-500">
                <ul>
                    {types.map((type, index) => (
                        <li key={index} className="border-b border-gray-300 m-3 hover:bg-gray-100 hover:cursor-pointer"
                            onClick={() => editRound(type, roundIds[index])}>
            <span>
                {type === "Workshopronde" ? `${type} ${workshopRoundIndex(type, index)} - Tijd ${startTimes[index]} - ${endTimes[index]}` : `${type} - Tijd ${startTimes[index]} - ${endTimes[index]}`}
            </span>
                            {type === "Workshopronde" && workshopRoundWorkshops[roundIds[index]] && (
                                <ul className="pl-4 mt-2">
                                    {workshopRoundWorkshops[roundIds[index]].map((workshop) => (
                                        <li
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                editRound("workshop", workshop.id, roundIds[index]);
                                            }}
                                            key={workshop.id}
                                            className={"hover:bg-gray-200 hover:cursor-pointer"}
                                        >
                                            {workshop.name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </div>


            <div style={{position: "relative"}}>
                <button
                    className="text-white bg-brand-orange hover:bg-brand-orange focus:outline-none focus:ring-brand-orange font-medium rounded-lg text-sm w-full sm:w-auto px-4 py-2.5 text-center light:bg-brand-orange light:hover:bg-brand-orange light:focus:ring-brand-orange mt-4"
                    type="button" onClick={addRound}>+
                </button>
                {showOptions && (
                    <div ref={optionsRef} className="options-list">
                        <ul>
                            <li onClick={() => handleOptionClick("Pauze")}>Pauze toevoegen</li>
                            <li onClick={() => handleOptionClick("Afsluiting")}>Afsluiting toevoegen</li>
                            <li onClick={() => handleOptionClick("Warming up")}>Warming-up toevoegen</li>
                            <li onClick={() => handleOptionClick("Workshopronde")}>Workshopronde toevoegen</li>
                        </ul>
                    </div>
                )}
            </div>


            {showEditModal && editedRoundType === "Workshopronde" && (
                <WorkshopRoundEditModal_commissions
                    roundType={editedRoundType}
                    roundId={editedRoundId}
                    onClose={handleModalClose}
                    onSave={handleModalSave}
                    onWorkshopAdded={handleUpdate}
                />
            )}
            {showEditModal && editedRoundType !== "Workshopronde" && editedRoundType !== "workshop" && (
                <RoundEditModal
                    roundType={editedRoundType}
                    roundId={editedRoundId}
                    onClose={handleModalClose}
                    onSave={handleModalSave}
                    onEdit={handleUpdate}
                />
            )}
            {showEditModal && editedRoundType === "workshop" && (
                <WorkshopRoundWorkshopEditModal
                    roundType={editedRoundType}
                    roundId={editedRoundId}
                    commissionId={commissionId}
                    workshopId={editedWorkshopId}
                    onClose={handleModalClose}
                    onSave={handleModalSave}
                    onEdit={handleUpdate}
                />
            )}
        </div>
    );
}