import React, { useEffect, useState } from "react"
import RoundEditModal from "../modal-screens/CommissionRoundModalScreen";
import WorkshopRoundEditModal from "../modal-screens/CommissionWorkshopRoundModalScreen";
import WorkshopRoundWorkshopEditModal from "../modal-screens/CommissionWorkshopRoundWorkshopEditModal"

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
                    const data = response.data;
                    if (data && data.length > 0) { // Check if data is not empty
                        const customer = data[0]; // Extract the first customer
                        setSelectedCustomerName(customer.name || "");
                        setSelectedCustomerId(customer.id || "");
                    } else {
                        // Handle case when no customer is found
                        setSelectedCustomerName("");
                        setSelectedCustomerId("");
                    }
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

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!customerId) setCustomerIdValid(false);
        if (!details) setDetailsValid(false);
        if (!targetAudience) setTargetAudienceValid(false);
        if (!date) setDateValid(false);
        if (!customerId || !details || !targetAudience || !date) return;

        const commission = {
            customerId,
            details,
            targetAudience,
            date,
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
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label
                            htmlFor="customer"
                            className="block mb-2 text-sm font-medium text-gray-900 light:text-white"
                        >
                            Kies een klant
                        </label>
                        <select
                            id="customerName"
                            value={selectedCustomerName} // Change value to selectedCustomer
                            onChange={(e) => {
                                setCustomerId(e.target.value);
                            }}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            <option value="" disabled>
                                {selectedCustomerName}
                            </option>
                            {customers.map((customer) => (
                                <option key={customer.id} value={customer.id}>
                                    {customer.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label
                            htmlFor="details"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Opdracht details
                        </label>
                        <input
                            type="text"
                            id="details"
                            value={details}
                            required
                            onChange={(e) => setDetails(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                </div>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label
                            htmlFor="targetAudience"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Opdracht doelgroep
                        </label>
                        <input
                            type="text"
                            id="targetAudience"
                            value={targetAudience}
                            required
                            onChange={(e) => setTargetAudience(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                </div>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label
                            htmlFor="date"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Workshop datum
                        </label>
                        <input
                            type="text"
                            id="date"
                            value={date}
                            required
                            onChange={(e) => setDate(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                </div>
                <div>
                    <h2>Rondes</h2>
                    <ul>
                        {types.map((type, index) => (
                            <li key={index}>
                <span onClick={() => editRound(type, roundIds[index])}>
                  {type} - Tijd {startTimes[index]} - {endTimes[index]}
                </span>
                                {type === "Workshopronde" && workshopRoundWorkshops[roundIds[index]] && (
                                    <ul>
                                        {workshopRoundWorkshops[roundIds[index]].map((workshop) => (
                                            <li
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    editRound("workshop", workshop.id, roundIds[index]); // Pass the parent workshop round ID
                                                }}
                                                key={workshop.id}
                                            >
                                                {workshop.name}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                    <div style={{ position: "relative" }}>
                        <button type="button" onClick={addRound}>+</button>
                        {showOptions && (
                            <div className="options-list">
                                <ul>
                                    <li onClick={() => handleOptionClick("Pauze")}>Pauze toevoegen</li>
                                    <li onClick={() => handleOptionClick("Afsluiting")}>Afsluiting toevoegen</li>
                                    <li onClick={() => handleOptionClick("Warming up")}>Warmingup toevoegen</li>
                                    <li onClick={() => handleOptionClick("Workshopronde")}>Workshopronde toevoegen</li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
                <button type="button" onClick={handleSubmit}>Opslaan</button>
            </form>

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