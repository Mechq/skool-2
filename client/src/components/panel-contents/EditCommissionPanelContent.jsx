import React, {useRef, useEffect, useState} from "react"
import Datepicker from "tailwind-datepicker-react"
import "../../styles/optionsRoundCreate.css"
import RoundEditModal from "../modal-screens/CommissionRoundModalScreen";
import WorkshopRoundEditModal from "../modal-screens/CommissionWorkshopRoundModalScreen";
import WorkshopRoundWorkshopEditModal from "../modal-screens/CommissionWorkshopRoundWorkshopEditModal"

const dateOptions = {
    title: " ",
    autoHide: false,
    todayBtn: false,
    clearBtn: false,
    clearBtnText: "",
    maxDate: new Date("2030-01-01"),
    minDate: new Date("1950-01-01"),
    theme: {
        background: "bg-gray-700 light:bg-white-800",
        todayBtn: "",
        clearBtn: "",
        icons: "",
        text: "",
        disabledText: "",
        input: "",
        inputIcon: "",
        selected: "",
    },
    icons: {
        // () => ReactElement | JSX.Element
        prev: () => <span>Vorige</span>,
        next: () => <span>Volgende</span>,
    },
    datepickerClassNames: "top-12",
    defaultDate: new Date("2022-01-01"),
    language: "en",
    disabledDates: [],
    weekDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
    inputNameProp: "date",
    inputIdProp: "date",
    inputPlaceholderProp: "Select Date",
    inputDateFormatProp: {
        day: "numeric",
        month: "long",
        year: "numeric"
    }
}

export default function EditCommissionPanelContent({ setShowSidePanel, commissionId }) {
    const [customerId, setCustomerId] = useState("");
    const [details, setDetails] = useState("");
    const [targetAudience, setTargetAudience] = useState("");
    const [selectedCustomerName, setSelectedCustomerName] = useState("");
    const[selectedCustomerId, setSelectedCustomerId] = useState("");
    const [customers, setCustomers] = useState([]);
    const [locationName, setLocationName] = useState("");
    const [roundIds, setRoundIds] = useState([]);
    const [types, setTypes] = useState([]);
    const [workshopRoundWorkshops, setWorkshopRoundWorkshops] = useState({}); // Updated to store workshops for each roundId
    const [editedWorkshopId, setEditedWorkshopId] = useState(""); // New state to store the edited workshop ID
    const [editedRoundId, setEditedRoundId] = useState(""); // State to store the edited round ID
    const [showOptions, setShowOptions] = useState(false); // New state for showing options
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingRoundType, setEditingRoundType] = useState("");
    const [editedRoundType, setEditedRoundType] = useState("");
    const [locationNameValid, setLocationNameValid] = useState(true);
    const [customerIdValid, setCustomerIdValid] = useState(true);
    const [detailsValid, setDetailsValid] = useState(true);
    const [targetAudienceValid, setTargetAudienceValid] = useState(true);
    const [customerNameValid, setCustomerNameValid] = useState(true);
    const [date, setDate] = useState("");
    const [dateValid, setDateValid] = useState(true);
    const[startTimes, setStartTimes] = useState([]);
    const[endTimes, setEndTimes] = useState([]);
    const [orders, setOrders] = useState([]);
    const optionsRef = useRef(null);

    const [show, setShow] = useState(false); // No need to specify type for useState

    const handleChange = (selectedDate) => {
        console.log(selectedDate);
    }

    const handleClose = (state) => {
        setShow(state);
    }

    useEffect(() => {
        if (commissionId) {
            fetch(`/api/commission/${commissionId}`)
                .then((res) => res.json())
                .then((response) => {
                    const data = response.data;
                    setCustomerId(data.customerId || "");
                    setDetails(data.details || "");
                    setTargetAudience(data.targetAudience || "");
                    setDate(data.date ? data.date.substring(0, 10) : "");
                })
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
                        console.log("Fetched selected commissions customer:", customer)
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
        if (selectedCustomerId) {
            fetch(`/api/location/default/${selectedCustomerId}`)
                .then(response => response.json())
                .then(data => {
                    const locationData = data.data;
                    const locationName = locationData ? locationData.name || "" : "";
                    setLocationName(locationName);
                })
                .catch((error) => {
                    console.error('Error:', error);
                    setLocationName(""); // Ensure locationName is always defined
                });
        }
    }, [selectedCustomerId]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (optionsRef.current && !optionsRef.current.contains(event.target)) {
                // Clicked outside the options list, so close it
                setShowOptions(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [optionsRef]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Trying to submit commission");
        if (!customerId || !details || !targetAudience) return;
        console.log("Submitting commission");
        const commission = {
            customerId,
            details,
            targetAudience,
            date: "2022-02-20",
        };

        fetch(`/api/commission/${commissionId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(commission),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
                setShowSidePanel(false); // Close the side panel after submission
            })
            .catch((error) => console.error("Error:", error));
    };

    const addRound = (e) => {
        e.preventDefault();
        setShowOptions(!showOptions);
    };

    const handleOptionClick = (option) => {
        console.log("Adding round of type", option);
        setShowOptions(false);
        let order = 0
        if(orders.length > 0){
            order = orders[orders.length - 1] + 1
        }
        let latestEndTime = ''
        fetch(`/api/round/endTime/${commissionId}`, {

        })
            .then((response) => response.json())
            .then((data) => {
                latestEndTime = data.data.endTime || '';

                const requestBody = JSON.stringify({ type: option, order, startTime: latestEndTime});

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
                        fetchRoundData(); // Refresh data after adding a round
                    })
                    .catch((error) => console.error("Error:", error));
            })
            .then(() => {
                fetchRoundData(); // Refresh data after adding a round
            })
            .catch((error) => console.error("Error:", error));

    };

    const editRound = (type, id, parentId = null) => {
        setEditingRoundType(type);
        setEditedRoundType(type);
        if (type === "workshop") {
            setEditedWorkshopId(id);
            setEditedRoundId(parentId); // Pass the parent workshop round ID as the round ID
        } else {
            setEditedRoundId(id);
        }
        setShowEditModal(true);
        console.log("Editing round", type, id);
    };

    const handleModalClose = () => {
        setShowEditModal(false);
    };

    const handleModalSave = (editedType) => {
        setShowEditModal(false);
    };

    const handleUpdate = () => {
        fetchRoundData();
    };

    return (
        <div className="px-6">


            <header className="pt-4 pb-4 font-bold text-lg">Opdracht bewerken</header>
            <form>
                <div className="mb-6">
                    <label htmlFor="workshopName"
                           className="block mb-2 text-sm font-medium text-gray-900 light:text-white">Kies een
                        Klant</label>
                    <select id="workshopName" value={selectedCustomerId} // Corrected line
                            onChange={(e) => {
                                setSelectedCustomerId(e.target.value);
                            }} required
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
                    <input type="text" id="details" value={details} required
                           onChange={(e) => setDetails(e.target.value)}
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500"
                    />

                </div>
                <div className="mb-6">
                    <label htmlFor="targetAudience"
                           className="block mb-2 text-sm font-medium text-gray-900 light:text-white">Doelgroep
                        opdracht</label>
                    <input id="targetAudience" value={targetAudience}
                           onChange={(e) => setTargetAudience(e.target.value)}
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500"
                           placeholder="Doelgroep"></input>
                </div>
                <div className="mb-6">
                    <label htmlFor="targetAudience"
                           className="block mb-2 text-sm font-medium text-gray-900 light:text-white">Doelgroep
                        opdracht</label>
                    <input id="targetAudience" value={targetAudience}
                           onChange={(e) => setTargetAudience(e.target.value)}
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500"
                           placeholder="Doelgroep"></input>
                </div>

                <div className="mb-6">
                    <label htmlFor="targetAudience"
                           className="block mb-2 text-sm font-medium text-gray-900 light:text-white">Datum</label>
                    <Datepicker options={dateOptions} onChange={handleChange} show={show} setShow={handleClose}/>
                </div>

                <button type="submit" onClick={handleSubmit}
                        className="text-white bg-brand-orange hover:bg-brand-orange focus:outline-none focus:ring-brand-orange font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center light:bg-brand-orange light:hover:bg-brand-orange light:focus:ring-brand-orange">Submit
                </button>


            </form>
            <h3 className="pt-4 pb-4 font-bold text-lg">Rondes</h3>
            <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
    focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400
    light:text-white light:focus:ring-blue-500 light:focus:border-blue-500">
                <ul>
                    {types.map((type, index) => (
                        <li key={index} className="border-b border-gray-300 m-3 hover:bg-gray-100 hover:cursor-pointer">
                <span onClick={() => editRound(type, roundIds[index])}>
                    {type} - Tijd {startTimes[index]} - {endTimes[index]}
                </span>
                            {type === "Workshopronde" && workshopRoundWorkshops[roundIds[index]] && (
                                <ul className="pl-4 mt-2">
                                    {workshopRoundWorkshops[roundIds[index]].map((workshop) => (
                                        <li
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                editRound("workshop", workshop.id, roundIds[index]); // Pass the parent workshop round ID
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
                <button  className="text-white bg-brand-orange hover:bg-brand-orange focus:outline-none focus:ring-brand-orange font-medium rounded-lg text-sm w-full sm:w-auto px-4 py-2.5 text-center light:bg-brand-orange light:hover:bg-brand-orange light:focus:ring-brand-orange"
                    type="button" onClick={addRound}>+</button>
                {showOptions && (
                    <div ref={optionsRef} className="options-list">
                        <ul>
                            <li onClick={() => handleOptionClick("Pauze")}>Pauze toevoegen</li>
                            <li onClick={() => handleOptionClick("Afsluiting")}>Afsluiting toevoegen</li>
                            <li onClick={() => handleOptionClick("Warming up")}>Warmingup toevoegen</li>
                            <li onClick={() => handleOptionClick("Workshopronde")}>Workshopronde toevoegen</li>
                        </ul>
                    </div>
                )}
            </div>


            {showEditModal && editedRoundType === "Workshopronde" && (
                <WorkshopRoundEditModal
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
                    commissionId={commissionId}
                    onEdit={handleUpdate}
                />
            )}
            {showEditModal && editedRoundType === "workshop" && (
                <WorkshopRoundWorkshopEditModal
                    roundType={editedRoundType}
                    roundId={editedRoundId} // Pass the parent workshop round ID as the round ID
                    workshopId={editedWorkshopId} // Pass the workshop ID
                    onClose={handleModalClose}
                    onSave={handleModalSave}
                    onEdit={handleUpdate}
                />
            )}
        </div>
    );
}