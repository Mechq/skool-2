import React, { useEffect, useState } from "react";
import "../../styles/components/EditPanelContent.css";
import "../../styles/optionsRoundCreate.css";
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
                    const workshopRoundIds = _roundIds.filter((_, index) => _types[index] === "workshopronde");
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
    console.log("fffffffffffffffffffffffff", startTimes, endTimes)

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
        console.log(order)
        const requestBody = JSON.stringify({ type: option, order });

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

    const handleWorkshopAdded = () => {
        fetchRoundData();
    };

    return (
        <div className="workshopEditContent">
            <h1 className="side-panel-title">Bewerk opdracht</h1>
            <div className="side-panel-content">
                <form action="#" method="get" className="form-container">
                    {/* Form fields */}
                    <select
                        id="customerId"
                        name="customerId"
                        value={selectedCustomerName} // Change value to selectedCustomer
                        onChange={(e) => {
                            setCustomerId(e.target.value);
                            setCustomerIdValid(true); // Reset validation state
                        }}
                        className={customerIdValid ? "" : "invalid"}  // Apply CSS class
                    >
                        <option value="" disabled>{selectedCustomerName}</option>
                        {customers.map(customer => (
                            <option key={customer.id} value={customer.id}>
                                {customer.name}
                            </option>
                        ))}
                    </select>

                    <input
                        type="text"
                        id="details"
                        name="details"
                        value={details}
                        onChange={(e) => {
                            setDetails(e.target.value)
                            setDetailsValid(true); // Reset validation state
                        }}
                        className={detailsValid ? "" : "invalid"}  // Apply CSS class
                        placeholder={details}
                    />
                    <textarea
                        id="targetAudience"
                        name="targetAudience"
                        value={targetAudience}
                        onChange={(e) => {
                            setTargetAudience(e.target.value)
                            setTargetAudienceValid(true); // Reset validation state
                        }}
                        className={targetAudienceValid ? "" : "invalid"}  // Apply CSS class
                        placeholder={targetAudience}
                    />

                    <input
                    type="text"
                    id="date"
                    name="date"
                    value={date}
                    onChange={(e) => {
                        setDate(e.target.value)
                        setDateValid(true); // Reset validation state
                    }}
                    className={dateValid ? "" : "invalid"}  // Apply CSS class
                    placeholder={date}
                />
                    <div>
                        <h2>Rondes</h2>
                        <ul>
                            {types.map((type, index) => (
                                <li key={index}>
            <span onClick={() => editRound(type, roundIds[index])}>
                {type} - Time {startTimes[index]} - {endTimes[index]}
            </span>
                                    {type === "workshopronde" && workshopRoundWorkshops[roundIds[index]] && (
                                        <ul>
                                            {workshopRoundWorkshops[roundIds[index]].map((workshop) => (
                                                <li onClick={(e) => {
                                                    e.stopPropagation();
                                                    editRound("workshop", workshop.id, roundIds[index]); // Pass the parent workshop round ID
                                                }}
                                                    key={workshop.id}>{workshop.name}</li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            ))}
                        </ul>
                        <div style={{position: "relative"}}>
                            <button onClick={addRound}>+</button>
                            {showOptions && (
                                <div className="options-list">
                                    <ul>
                                        <li onClick={() => handleOptionClick("Pauze")}>Pauze toevoegen</li>
                                        <li onClick={() => handleOptionClick("Afsluiting")}>Afsluiting toevoegen</li>
                                        <li onClick={() => handleOptionClick("Warmingup")}>Warmingup toevoegen</li>
                                        <li onClick={() => handleOptionClick("workshopronde")}>workshop ronde
                                            toevoegen
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>

                    <button onClick={handleSubmit}>Opslaan</button>
                </form>
            </div>
            {showEditModal && editedRoundType === "workshopronde" && (
                <WorkshopRoundEditModal
                    roundType={editedRoundType}
                    roundId={editedRoundId}
                    onClose={handleModalClose}
                    onSave={handleModalSave}
                    onWorkshopAdded={handleWorkshopAdded}
                />
            )}
            {showEditModal && editedRoundType !== "workshopronde" && editedRoundType !== "workshop" && (
                <RoundEditModal
                    roundType={editedRoundType}
                    roundId={editedRoundId}
                    onClose={handleModalClose}
                    onSave={handleModalSave}
                    commissionId={commissionId}
                />
            )}
            {showEditModal && editedRoundType === "workshop" && (
                <WorkshopRoundWorkshopEditModal
                    roundType={editedRoundType}
                    roundId={editedRoundId} // Pass the parent workshop round ID as the round ID
                    workshopId={editedWorkshopId} // Pass the workshop ID
                    onClose={handleModalClose}
                    onSave={handleModalSave}
                />
            )}
        </div>
    );

}
