import React, { useEffect, useState } from "react";
import SidePanel from "../components/SidePanel";
// import LocationList from "../components/LocationList"; // Assuming you have a LocationList component
import '../styles/werklocatie.css';

function Werklocatie() {
    const [showSidePanel, setShowSidePanel] = useState(false);

    const [name, setName] = useState(""); // Name state
    const [street, setStreet] = useState("");  // Street state
    const [houseNumber, setHouseNumber] = useState("");  // House number state
    const [city, setCity] = useState("");  // City state
    const [postalCode, setPostalCode] = useState("");  // Postal code state

    const [nameValid, setNameValid] = useState(true); // Name validation state
    const [streetValid, setStreetValid] = useState(true);  // Street validation state
    const [houseNumberValid, setHouseNumberValid] = useState(true);  // House number validation state
    const [cityValid, setCityValid] = useState(true);  // City validation state
    const [postalCodeValid, setPostalCodeValid] = useState(true);  // Postal code validation state

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation
        if (!name) setNameValid(false);
        if (!street) setStreetValid(false);
        if (!houseNumber) setHouseNumberValid(false);
        if (!city) setCityValid(false);
        if (!postalCode) setPostalCodeValid(false);

        // If any field is invalid, stop the form submission
        if (!name || !street || !houseNumber || !city || !postalCode) return;

        // Create a new location object
        const location = {
            name,
            street,
            houseNumber,
            city,
            postalCode
        };

        // Send a POST request to the backend
        fetch('/api/location', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(location),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        setShowSidePanel(false); // Close the side panel

        // Reset fields
        setName('');
        setStreet('');
        setHouseNumber('');
        setCity('');
        setPostalCode('');
    };

    useEffect(() => {
        const sidePanel = document.querySelector('.side-panel');
        if (showSidePanel) {
            sidePanel.style.right = '0'; // Slide in
        } else {
            sidePanel.style.right = '-30%'; // Slide out
            // Reset validation states
            setNameValid(true);
            setStreetValid(true);
            setHouseNumberValid(true);
            setCityValid(true);
            setPostalCodeValid(true);
        }
    }, [showSidePanel]);

    return (
        <div className='werklocatieContent'>
            <button className="fab fab-common" onClick={() => setShowSidePanel(!showSidePanel)}>
                <span className={showSidePanel ? "rotate" : ""}>{'+'}</span>
            </button>
            {/* <LocationList /> Assuming you have a LocationList component */}
            <h1 className="title">Werklocatie Aanmaken</h1>
            <SidePanel showSidePanel={showSidePanel} setShowSidePanel={setShowSidePanel}>
                <h1 className='side-panel-title'>Create Work Location</h1>
                <div className='side-panel-content'>
                    <form action="#" method="get" className="form-container">
                        <div className="form-group">
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                    setNameValid(true); // Reset validation state
                                }}
                                className={nameValid ? "" : "invalid"}  // Apply CSS class
                                placeholder="Naam"
                            />
                            <input
                                type="text"
                                id="street"
                                name="street"
                                value={street}
                                onChange={(e) => {
                                    setStreet(e.target.value);
                                    setStreetValid(true);  // Reset validation state
                                }}
                                className={streetValid ? "" : "invalid"}  // Apply CSS class
                                placeholder="Straat"
                            />
                            <input
                                type="text"
                                id="houseNumber"
                                name="houseNumber"
                                value={houseNumber}
                                onChange={(e) => {
                                    setHouseNumber(e.target.value);
                                    setHouseNumberValid(true);  // Reset validation state
                                }}
                                className={houseNumberValid ? "" : "invalid"}  // Apply CSS class
                                placeholder="Huisnummer"
                            />
                            <input
                                type="text"
                                id="city"
                                name="city"
                                value={city}
                                onChange={(e) => {
                                    setCity(e.target.value);
                                    setCityValid(true);  // Reset validation state
                                }}
                                className={cityValid ? "" : "invalid"}  // Apply CSS class
                                placeholder="Stad"
                            />
                            <input
                                type="text"
                                id="postalCode"
                                name="postalCode"
                                value={postalCode}
                                onChange={(e) => {
                                    setPostalCode(e.target.value);
                                    setPostalCodeValid(true);  // Reset validation state
                                }}
                                className={postalCodeValid ? "" : "invalid"}  // Apply CSS class
                                placeholder="Postcode"
                            />
                        </div>
                        <button className="submit-fab fab-common" onClick={handleSubmit}>Aanmaken</button>
                    </form>
                </div>
            </SidePanel>
        </div>
    );
}

export default Werklocatie;
