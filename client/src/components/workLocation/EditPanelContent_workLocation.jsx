import React, {useEffect, useState} from "react";

function EditPanelWorkLocationContent({setWorkLocations, locationId, setShowSidePanel}) {
    const [name, setName] = useState("");
    const [street, setStreet] = useState("");
    const [houseNumber, setHouseNumber] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [description, setDescription] = useState("");
    const [selectedCustomerId, setSelectedCustomerId] = useState("");
    const [customers, setCustomers] = useState([]); // Customers state

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
                    setDescription(data.description || "");
                    setSelectedCustomerId(data.customerId || "");
                    autoResize({target: document.getElementById('edit-description')});
                })
                .catch(error => console.error('Error fetching work locations:', error));
        }

        fetch('/api/customer', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                setCustomers(data.data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [locationId]);

    const handleCustomerChange = (e) => {
        setSelectedCustomerId(e.target.value);
    }

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
            postalCode,
            description,
            customerId: selectedCustomerId // Include the selected customer ID
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
                fetch('/api/location')
                    .then(res => res.json())
                    .then(data => {
                        setWorkLocations(data.data);
                        setShowSidePanel(false);
                    })
                    .catch(error => console.error('Error fetching data:', error));
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
                           className="block mb-2 text-sm font-medium text-gray-900 light:text-white">Locatie
                        naam</label>
                    <input type="text" id="locationName" value={name} onChange={(e) => setName(e.target.value)}
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-brand-orange-light focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-brand-orange-light light:focus:border-blue-500"
                           placeholder="Hoofdkantoor A" required/>
                </div>
                <div className="mb-6">
                    <label htmlFor="customerName"
                           className="block mb-2 text-sm font-medium text-gray-900 light:text-white">Klant naam</label>
                    <select id="customer" value={selectedCustomerId} onChange={handleCustomerChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-brand-orange-light focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-brand-orange-light light:focus:border-blue-500"
                            required>
                        <option value="" disabled>Selecteer klant</option>
                        {customers.map((customer) => (
                            <option key={customer.id} value={customer.id}>
                                {customer.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label htmlFor="street"
                               className="block mb-2 text-sm font-medium text-gray-900 light:text-white">Straat</label>
                        <input type="text" id="street" value={name} onChange={(e) => setName(e.target.value)}
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-brand-orange-light focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-brand-orange-light light:focus:border-blue-500"
                               placeholder="Dorpstraat" required/>
                    </div>
                    <div>
                        <label htmlFor="houseNumber"
                               className="block mb-2 text-sm font-medium text-gray-900 light:text-white">Huisnummer</label>
                        <input type="text" id="houseNumber" value={street} onChange={(e) => setStreet(e.target.value)}
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-brand-orange-light focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-brand-orange-light light:focus:border-blue-500"
                               placeholder="1" required/>
                    </div>
                    <div>
                        <label htmlFor="postalCode"
                               className="block mb-2 text-sm font-medium text-gray-900 light:text-white">Postcode</label>
                        <input type="text" id="postalCode" value={houseNumber}
                               onChange={(e) => setHouseNumber(e.target.value)}
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-brand-orange-light focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-brand-orange-light light:focus:border-blue-500"
                               placeholder="1234 AB" required/>
                    </div>
                    <div>
                        <label htmlFor="city"
                               className="block mb-2 text-sm font-medium text-gray-900 light:text-white">City</label>
                        <input type="text" id="city" value={city} onChange={(e) => setCity(e.target.value)}
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-brand-orange-light focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-brand-orange-light light:focus:border-blue-500"
                               placeholder="Roelofarendsveen" required/>
                    </div>
                </div>
                <div className="mb-6">
                    <label htmlFor="description"
                           className="block mb-2 text-sm font-medium text-gray-900 light:text-white">Beschrijving
                        locatie</label>
                    <textarea id="description"
                              value={description}
                              onChange={(e) => {
                                  setDescription(e.target.value);
                              }}
                              rows="2"
                              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-brand-orange-light focus:border-blue-500 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-brand-orange-light light:focus:border-blue-500"
                              placeholder="Beschrijving...">
                    </textarea>
                </div>
                <button type="submit" onClick={handleSubmit}
                        className="text-white bg-brand-orange hover:bg-brand-orange focus:outline-none focus:ring-brand-orange font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center light:bg-brand-orange light:hover:bg-brand-orange light:focus:ring-brand-orange">Opslaan
                </button>
            </form>
        </div>
    );
}

export default EditPanelWorkLocationContent;
