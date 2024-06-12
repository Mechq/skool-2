import React, { useEffect, useState } from "react";

function EditPanelWorkshopContent({ locationId, setShowSidePanel }) {
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
                    autoResize({ target: document.getElementById('edit-description') });
                })
                .catch(error => console.error('Error fetching workshop:', error));
        }
    }, [locationId]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name) setNameValid(false);
        if (!street) setStreetValid(false);
        if (!houseNumber) setHouseNumberValid(false);
        if (!city) setCityValid(false);
        if (!postalCode) setPostalCodeValid(false);

        if (!name || !street || !houseNumber || !city || !postalCode) {
            return;
        }

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
                setShowSidePanel(false); // Close the side panel after submission
            })
            .catch(error => console.error('Error:', error));
    };

    const autoResize = (e) => {
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;
    };

    return (
            <div className="px-6">
            <header className="pt-4 pb-4 font-bold text-lg">Werklocatie bewerken</header>
            <form>
                <div className="mb-6">
                    <label htmlFor="locationName"
                           className="block mb-2 text-sm font-medium text-gray-900 light:text-white">Locatie naam</label>
                    <input type="text" id="locationName" value={name} onChange={(e) => setName(e.target.value)}
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500"
                           placeholder="Hoofdkantoor A" required/>
                </div>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label htmlFor="street"
                               className="block mb-2 text-sm font-medium text-gray-900 light:text-white">Straat</label>
                        <input type="text" id="street" value={name} onChange={(e) => setName(e.target.value)}
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500"
                               placeholder="Dorpstraat" required/>
                    </div>
                    <div>
                        <label htmlFor="houseNumber"
                               className="block mb-2 text-sm font-medium text-gray-900 light:text-white">Huisnummer</label>
                        <input type="text" id="houseNumber" value={street} onChange={(e) => setStreet(e.target.value)}
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500"
                               placeholder="1" required/>
                    </div>
                    <div>
                        <label htmlFor="postalCode"
                               className="block mb-2 text-sm font-medium text-gray-900 light:text-white">Postcode</label>
                        <input type="text" id="postalCode" value={houseNumber}
                               onChange={(e) => setHouseNumber(e.target.value)}
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500"
                               placeholder="1234 AB" required/>
                    </div>
                    <div>
                        <label htmlFor="city"
                               className="block mb-2 text-sm font-medium text-gray-900 light:text-white">City</label>
                        <input type="text" id="city" value={city} onChange={(e) => setCity(e.target.value)}
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500"
                               placeholder="Roelofarendsveen" required/>
                    </div>
                </div>
                <button type="submit" onClick={handleSubmit}
                        className="text-white bg-brand-orange hover:bg-brand-orange focus:outline-none focus:ring-brand-orange font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center light:bg-brand-orange light:hover:bg-brand-orange light:focus:ring-brand-orange">Opslaan
                </button>
            </form>
        </div>
    );
}

export default EditPanelWorkshopContent;
