import React, { useEffect, useState } from "react";
import '../../styles/components/EditPanelContent.css';

function EditPanelWorkLocationContent({ locationId, setShowSidePanel }) {
    const [name, setName] = useState("");
    const [street, setStreet] = useState("");
    const [houseNumber, setHouseNumber] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");

    const [nameValid, setNameValid] = useState(true);
    const [streetValid, setStreetValid] = useState(true);
    const [houseNumberValid, setHouseNumberValid] = useState(true);
    const [cityValid, setCityValid] = useState(true);
    const [postalCodeValid, setPostalCodeValid] = useState(true);

    useEffect(() => {
        if (locationId) {
            fetch(`/api/location/${locationId}`)
                .then(res => res.json())
                .then(response => {
                    const data = response.data;
                    setName(data.name || "");
                    setStreet(data.street || "");
                    setHouseNumber(data.houseNumber || "");
                    setCity(data.city || "");
                    setPostalCode(data.postalCode || "");
                })
                .catch(error => console.error('Error fetching location:', error));
        }
    }, [locationId]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name) setNameValid(false);
        if (!street) setStreetValid(false);
        if (!houseNumber) setHouseNumberValid(false);
        if (!city) setCityValid(false);
        if (!postalCode) setPostalCodeValid(false);

        const location = {
            name,
            street,
            houseNumber: parseInt(houseNumber),
            city,
            postalCode
        };

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
                setShowSidePanel(false);
            })
            .catch(error => console.error('Error:', error));
    };

    return (
        <div className='workLocationEditContent'>
            <h1 className='side-panel-title'>Edit Work Location</h1>
            <div className='side-panel-content'>
                <form className="form-container" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            id="edit-name"
                            name="name"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                                setNameValid(true);
                            }}
                            className={nameValid ? "" : "invalid"}
                            placeholder="Naam"
                        />
                        <input
                            type="text"
                            id="edit-street"
                            name="street"
                            value={street}
                            onChange={(e) => {
                                setStreet(e.target.value);
                                setStreetValid(true);
                            }}
                            className={streetValid ? "" : "invalid"}
                            placeholder="Straat"
                        />
                        <input
                            type="text"
                            id="edit-houseNumber"
                            name="houseNumber"
                            value={houseNumber}
                            onChange={(e) => {
                                setHouseNumber(e.target.value);
                                setHouseNumberValid(true);
                            }}
                            className={houseNumberValid ? "" : "invalid"}
                            placeholder="Huisnummer"
                        />
                        <input
                            type="text"
                            id="edit-city"
                            name="city"
                            value={city}
                            onChange={(e) => {
                                setCity(e.target.value);
                                setCityValid(true);
                            }}
                            className={cityValid ? "" : "invalid"}
                            placeholder="Stad"
                        />
                        <input
                            type="text"
                            id="edit-postalCode"
                            name="postalCode"
                            value={postalCode}
                            onChange={(e) => {
                                setPostalCode(e.target.value);
                                setPostalCodeValid(true);
                            }}
                            className={postalCodeValid ? "" : "invalid"}
                            placeholder="Postcode"
                        />
                    </div>
                    <button className="submit-fab fab-common" type="submit">Update</button>
                </form>
            </div>
        </div>
    );
}

export default EditPanelWorkLocationContent;
