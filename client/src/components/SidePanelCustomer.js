import {React, useState, useEffect} from "react";

function SidePanelCustomer() {

    const [name, setName] = useState("");
    const [nameLocation, setNameLocation] = useState( "");
    const [streetAndHouseNumber, setStreetAndHouseNumber] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [city, setCity] = useState("");
    const [nameContact, setnameContact] = useState("");
    const [emailContact, setemailContact] = useState("");
    const [phoneNumberContact, setphoneNumberContact] = useState("");

    const [showSidePanel, setShowSidePanel] = useState(false); // New state

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(
            name,
            nameLocation,
            streetAndHouseNumber,
            postalCode,
            city,
            nameContact,
            emailContact,
            phoneNumberContact

        );

        // Create a new workshop object
        const customer = {
            name,
            nameLocation,
            streetAndHouseNumber,
            postalCode,
            city,
            nameContact,
            emailContact,
            phoneNumberContact
        };

        // Send a POST request to the backend
        fetch('/api/customer', { // replace '/api/workshops' with your actual endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(customer),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        setShowSidePanel(false); // Close the side panel
    };
    useEffect(() => {
        const sidePanel = document.querySelector('.side-panel');
        if (showSidePanel) {
            sidePanel.style.marginLeft = '70vw';
        } else {
            sidePanel.style.marginLeft = '100vw';
        }
    }, [showSidePanel]);

    return (
        <div id='side-panel-root'>
            <button className="fab fab-common" onClick={() => setShowSidePanel(!showSidePanel)}>
                <span className={showSidePanel ? "rotate" : ""}>{'+'}</span>
            </button>
            <div className="side-panel">
                <h1 className='side-panel-title'>Create Workshop</h1>

                <div className='side-panel-content'>
                    <form action="#" method="get" className="form-container">
                        <div className="row">
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Klant naam"
                            />
                        </div>
                        <div className="row">
                            <input
                                type="text"
                                id="nameLocation"
                                name="nameLocation"
                                value={nameLocation}
                                onChange={(e) => setNameLocation(e.target.value)}
                                placeholder="Locatie"
                            />
                            <input
                                type="text"
                                id="postalCode"
                                name="postalCode"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                                placeholder="Zip code"
                            />
                        </div>
                        <div className="row">

                            <input
                                type="text"
                                id="city"
                                name="city"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                placeholder="Stad"
                            />
                            <input
                                type="text"
                                id="streetAndHouseNumber"
                                name="streetAndHouseNumber"
                                value={streetAndHouseNumber}
                                onChange={(e) => setStreetAndHouseNumber(e.target.value)}
                                placeholder="Straat + huisnummer"
                            />

                        </div>
                        <div className="row">
                            <input
                                type="text"
                                id="nameContact"
                                name="nameContact"
                                value={nameContact}
                                onChange={(e) => setnameContact(e.target.value)}
                                placeholder="Contact persoon"
                            />
                            <input
                                type="text"
                                id="emailContact"
                                name="emailContact"
                                value={emailContact}
                                onChange={(e) => setemailContact(e.target.value)}
                                placeholder="Email"
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                id="phoneNumberContact"
                                name="phoneNumberContact"
                                value={phoneNumberContact}
                                onChange={(e) => setphoneNumberContact(e.target.value)}
                                placeholder="Telefoon nummer"
                            />
                        </div>

                        <button className="submit-fab fab-common" onClick={handleSubmit}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SidePanelCustomer;