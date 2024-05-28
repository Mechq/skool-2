import React, { useEffect, useState } from "react";
import SidePanel from "../components/SidePanel";
import CustomerList from "../components/customerList";
import '../styles/customers.css';

function Customers() {
    const [showSidePanel, setShowSidePanel] = useState(false);

    const [organizationName, setOrganizationName] = useState("");
    const [contactPerson, setContactPerson] = useState("");
    const [locationName, setLocationName] = useState("");
    const [address, setAddress] = useState("");  // Address state
    const [email, setEmail] = useState("");  // Email state
    const [postcode, setPostcode] = useState("");  // Postcode state
    const [phoneNumber, setPhoneNumber] = useState("");  // Phone number state

    const [organizationNameValid, setOrganizationNameValid] = useState(true);
    const [contactPersonValid, setContactPersonValid] = useState(true);
    const [locationNameValid, setLocationNameValid] = useState(true);
    const [addressValid, setAddressValid] = useState(true);  // Address validation state
    const [emailValid, setEmailValid] = useState(true);  // Email validation state
    const [postcodeValid, setPostcodeValid] = useState(true);  // Postcode validation state
    const [phoneNumberValid, setPhoneNumberValid] = useState(true);  // Phone number validation state

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation
        if (!organizationName) setOrganizationNameValid(false);
        if (!contactPerson) setContactPersonValid(false);
        if (!locationName) setLocationNameValid(false);
        if (!address) setAddressValid(false);
        if (!email) setEmailValid(false);
        if (!postcode) setPostcodeValid(false);
        if (!phoneNumber) setPhoneNumberValid(false);

        // If any field is invalid, stop the form submission
        if (!organizationName || !contactPerson || !locationName || !address || !email || !postcode || !phoneNumber) return;

        // Create a new customer object
        const customer = {
            organizationName,
            contactPerson,
            locationName,
            address,
            email,
            postcode,
            phoneNumber
        };

        // Send a POST request to the backend
        fetch('/api/customer', {
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

        setOrganizationName('');
        setContactPerson('');
        setLocationName('');
        setAddress('');
        setEmail('');
        setPostcode('');
        setPhoneNumber('');
    };

    useEffect(() => {
        const sidePanel = document.querySelector('.side-panel');
        if (showSidePanel) {
            sidePanel.style.right = '0'; // Slide in
        } else {
            sidePanel.style.right = '-30%'; // Slide out
            // Reset validation states
            setOrganizationNameValid(true);
            setContactPersonValid(true);
            setLocationNameValid(true);
            setAddressValid(true);
            setEmailValid(true);
            setPostcodeValid(true);
            setPhoneNumberValid(true);
        }
    }, [showSidePanel]);

    return (
        <div className='customersContent'>
            <button className="fab fab-common" onClick={() => setShowSidePanel(!showSidePanel)}>
                <span className={showSidePanel ? "rotate" : ""}>{'+'}</span>
            </button>
            <customerList/>
            <h1 className="title">Klanten Aanmaken</h1>
            <SidePanel showSidePanel={showSidePanel} setShowSidePanel={setShowSidePanel}>
            <h1 className='side-panel-title'>Create Client</h1>
                <div className='side-panel-content'>
                    <form action="#" method="get" className="form-container">
                        <div className="form-group">
                            <div className="row">
                                <input
                                    type="text"
                                    id="organizationName"
                                    name="organizationName"
                                    value={organizationName}
                                    onChange={(e) => {
                                        setOrganizationName(e.target.value);
                                        setOrganizationNameValid(true);  // Reset validation state
                                    }}
                                    className={organizationNameValid ? "" : "invalid"}  // Apply CSS class
                                    placeholder="Naam organisatie"
                                />
                                <input
                                    type="text"
                                    id="contactPerson"
                                    name="contactPerson"
                                    value={contactPerson}
                                    onChange={(e) => {
                                        setContactPerson(e.target.value);
                                        setContactPersonValid(true);  // Reset validation state
                                    }}
                                    className={contactPersonValid ? "" : "invalid"}  // Apply CSS class
                                    placeholder="Contactpersoon"
                                />
                            </div>
                            <input
                                type="text"
                                id="locationName"
                                name="locationName"
                                value={locationName}
                                onChange={(e) => {
                                    setLocationName(e.target.value);
                                    setLocationNameValid(true);  // Reset validation state
                                }}
                                className={locationNameValid ? "" : "invalid"}  // Apply CSS class
                                placeholder="Naam locatie"
                            />
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={address}
                                onChange={(e) => {
                                    setAddress(e.target.value);
                                    setAddressValid(true);  // Reset validation state
                                }}
                                className={addressValid ? "" : "invalid"}  // Apply CSS class
                                placeholder="Adresgegevens"
                            />
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setEmailValid(true);  // Reset validation state
                                }}
                                className={emailValid ? "" : "invalid"}  // Apply CSS class
                                placeholder="Emailadres"
                            />
                            <input
                                type="text"
                                id="postcode"
                                name="postcode"
                                value={postcode}
                                onChange={(e) => {
                                    setPostcode(e.target.value);
                                    setPostcodeValid(true);  // Reset validation state
                                }}
                                className={postcodeValid ? "" : "invalid"}  // Apply CSS class
                                placeholder="Postcodeadres"
                            />
                            <input
                                type="text"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={phoneNumber}
                                onChange={(e) => {
                                    setPhoneNumber(e.target.value);
                                    setPhoneNumberValid(true);  // Reset validation state
                                }}
                                className={phoneNumberValid ? "" : "invalid"}  // Apply CSS class
                                placeholder="Telefoonnummer contactpersoon"
                            />
                        </div>
                        <button className="submit-fab fab-common" onClick={handleSubmit}>Aanmaken</button>
                    </form>
                </div>
            </SidePanel>
        </div>
    );
}

export default Customers;
