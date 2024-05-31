import React, {useEffect, useState} from "react";
import '../../styles/components/EditPanelContent.css'
import '../../styles/optionsRoundCreate.css'

export default function EditCommissionPanelContent({setShowSidePanel, commissionId}) {
    const [customerId, setCustomerId] = useState("");
    const [details, setDetails] = useState("");
    const [targetAudience, setTargetAudience] = useState("")
    const [selectedCustomer, setSelectedCustomer] = useState("")
    const [customers, setCustomers] = useState([])

    const[rounds, setRounds] = useState([])
    const[types, setTypes] = useState([])

    const [showOptions, setShowOptions] = useState(false); // New state for showing options


    const [customerIdValid, setCustomerIdValid] = useState(true);
    const [detailsValid, setDetailsValid] = useState(true);
    const [targetAudienceValid, setTargetAudienceValid] = useState(true);
    const[roundsValid, setRoundsValid] = useState(true)
    const[typesValid, setTypesValid] = useState(true)
    const[customerNameValid, setCustomerNameValid] = useState(true)

    useEffect(() => {
        if (commissionId) {
            fetch(`/api/commission/${commissionId}`)
                .then(res => res.json())
                .then(response => {
                    const data = response.data;
                    setCustomerId(data.customerId || "");
                    setDetails(data.details || "");
                    setTargetAudience(data.targetAudience || "")
                })
                .catch(error => console.error('Error fetching commission:', error));
        }
    }, [commissionId]);

    console.log(details)

    useEffect(() => {
        if (commissionId) {
            fetch(`/api/round/${commissionId}`)
                .then(res => res.json())
                .then(response => {
                    const data = response.data;
                    // Assuming `data` is an array of objects
                    const _types = data.map(item => item.type);
                    setTypes(_types);
                })
                .catch(error => console.error('Error fetching round:', error));
        }
    }, [commissionId]);

    useEffect(() => {
        if (commissionId) {
            fetch(`/api/commission/customer/${commissionId}`)
                .then(res => res.json())
                .then(response => {
                    const data = response.data;
                    setSelectedCustomer(data.name || "");
                })
                .catch(error => console.error('Error fetching round:', error));
        }
    }, [commissionId]);

    useEffect(() => {
        fetch('/api/customer')
            .then(response => response.json())
            .then(data => {
                setCustomers(data.data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);




    const handleSubmit = (e) => {
        e.preventDefault();

        if (!customerId) setCustomerIdValid(false);
        if (!details) setDetailsValid(false);
        if (!targetAudience) setTargetAudienceValid(false);
        if (!customerId || !details || !targetAudience) return;

        const commission = {
            customerId,
            details,
            targetAudience
        };

        fetch(`/api/commission/${commissionId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(commission),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                setShowSidePanel(false); // Close the side panel after submission
            })
            .catch(error => console.error('Error:', error));
    };

    const addRound = (e) => {
        e.preventDefault()
        setShowOptions(!showOptions);
    }

    const handleOptionClick = (option) => {
        console.log(option);
        setShowOptions(false);

        const requestBody = JSON.stringify({ type: option });

        fetch(`/api/round/${commissionId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: requestBody,
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                setTypes(prevTypes => [...prevTypes, option]);
            })
            .catch(error => console.error('Error:', error));
    };



    return (
        <div className='workshopEditContent'>
            <h1 className='side-panel-title'>Bewerk opdracht</h1>
            <div className='side-panel-content'>
                <form action="#" method="get" className="form-container">
                    <select
                        id="customerId"
                        name="customerId"
                        value={selectedCustomer} // Change value to selectedCustomer
                        onChange={(e) => {
                            setCustomerId(e.target.value);
                            setCustomerIdValid(true); // Reset validation state
                        }}
                        className={customerIdValid ? "" : "invalid"}  // Apply CSS class
                    >
                        <option value="" disabled>{selectedCustomer}</option>
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
                    <div>
                        <h2>Rondes</h2>
                        <ul>
                            {types.map((type, index) => (
                                <li key={index}>{type}</li>
                            ))}
                        </ul>
                        <div style={{position: 'relative'}}>
                            <button onClick={addRound}>+</button>
                            {showOptions && (
                                <div className="options-list">
                                    <ul>
                                        <li onClick={() => handleOptionClick("pauze")}>pauze toevoegen</li>
                                        <li onClick={() => handleOptionClick("afsluiting")}>afsluiting
                                            toevoegen
                                        </li>
                                        <li onClick={() => handleOptionClick("warmingup")}>warmingup
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
        </div>
    );
}

