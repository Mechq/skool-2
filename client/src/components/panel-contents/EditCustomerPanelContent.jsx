import React, {useEffect, useState} from "react";
// import '../../styles/components/EditPanelContent.css'

export default function EditCustomerPanelContent({customerId, setShowSidePanel}) {

    const [name, setName] = useState(""); // Name state
    const [locationName, setLocationName] = useState(""); // Location state
    const [contactName, setContactName] = useState("");  // Contact name state
    const [street, setStreet] = useState("");  // Street state
    const [houseNumber, setHouseNumber] = useState("");  // House number state
    const [postalCode, setPostalCode] = useState("");  // Postal code state
    const [city, setCity] = useState("");  // City state
    const [email, setEmail] = useState("");  // Email state
    const [phoneNumber, setPhoneNumber] = useState("");  // Phone number state
const[locationId, setLocationId] = useState(null)

    const [nameValid, setNameValid] = useState(true); // Name validation state
    const [locationNameValid, setLocationNameValid] = useState(true); // Location validation state
    const [contactNameValid, setContactNameValid] = useState(true);  // Contact name validation state
    const [streetValid, setStreetValid] = useState(true);  // Street validation state
    const [houseNumberValid, setHouseNumberValid] = useState(true);  // House number validation state
    const [postalCodeValid, setPostalCodeValid] = useState(true);  // Postal code validation state
    const [cityValid, setCityValid] = useState(true);  // City validation state
    const [emailValid, setEmailValid] = useState(true);  // Email validation state
    const [phoneNumberValid, setPhoneNumberValid] = useState(true); // Phone number validation state


    useEffect(() => {
        if (customerId) {
            fetch(`/api/customer/${customerId}`)
                .then(res => res.json())
                .then(response => {
                    const data = response.data;
                    setEmail(data.email || "");
                    setContactName(data.contactName || "");
                    setName(data.name || "");
                    setPhoneNumber(data.phone || "")
                    const locationId = data.locationId || null;
                    setLocationId(locationId);
                        if (locationId){
                            fetch(`/api/location/${locationId}`)
                                .then(res => res.json())
                                .then(response => {
                                    const data = response.data;
                                    setLocationName(data.name || "");
                                    setStreet(data.street || "");
                                    setHouseNumber(data.houseNumber || "");
                                    setPostalCode(data.postalCode || "");
                                    setCity(data.city || "");
                                })
                                .catch(error => console.error('Error fetching location:', error));
                        }

                })
                .catch(error => console.error('Error fetching customer:', error));
        }
    }, [customerId]);

    const handleSubmit = (e) => {
    e.preventDefault();

    if (!name) setNameValid(false);
    if (!locationName) setLocationNameValid(false);
    if (!contactName) setContactNameValid(false);
    if (!street) setStreetValid(false);
    if (!houseNumber) setHouseNumberValid(false);
    if (!postalCode) setPostalCodeValid(false);
    if (!city) setCityValid(false);
    if (!email) setEmailValid(false);
    if (!phoneNumber) setPhoneNumberValid(false);

    if (!name || !locationName || !contactName || !street || !houseNumber || !postalCode || !city || !email || !phoneNumber) return;

    const location = {
        name: locationName,
        street,
        houseNumber: parseInt(houseNumber),
        postalCode: postalCode,
        city,
    }

    const customer = {
        name,
        contactName,
        email,
        phone: parseInt(phoneNumber),
    };
    console.log('customer', customer);
    console.log('location', location);
    console.log('customerId', customerId);
    console.log('locationId', locationId);

    fetch(`/api/customer/${customerId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(customer),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            // After the customer update is successful, update the location
            fetch(`/api/location/${locationId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(location),
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                    setShowSidePanel(false); // Close the side panel after submission
                })
                .catch(error => console.error('Error:', error));
        })
        .catch(error => console.error('Error:', error));
};


    return (
        <div>
            <h1 className='side-panel-title'>Edit Klant</h1>
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
                            placeholder={name}
                        />
                        <input
                            type="text"
                            id="locationName"
                            name="locationName"
                            value={locationName}
                            onChange={(e) => {
                                setLocationName(e.target.value);
                                setLocationNameValid(true); // Reset validation state
                            }}
                            className={locationNameValid ? "" : "invalid"}  // Apply CSS class
                            placeholder={locationName}
                        />
                        <input
                            type="text"
                            id="contactName"
                            name="contactName"
                            value={contactName}
                            onChange={(e) => {
                                setContactName(e.target.value);
                                setContactNameValid(true); // Reset validation state
                            }}
                            className={contactNameValid ? "" : "invalid"}  // Apply CSS class
                            placeholder={contactName}
                        />
                        <div className="row">
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
                                placeholder={street}
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
                                placeholder={houseNumber}
                            />
                        </div>
                        <div className="row">
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
                                placeholder={postalCode}
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
                                placeholder={city}
                            />
                        </div>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setEmailValid(true);  // Reset validation state
                            }}
                            className={emailValid ? "" : "invalid"}  // Apply CSS class
                            placeholder={email}
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
                            placeholder={phoneNumber}
                        />
                    </div>
                    <button className="submit-fab fab-common" onClick={handleSubmit}>Opslaan</button>
                </form>
            </div>
        </div>
    );
}

