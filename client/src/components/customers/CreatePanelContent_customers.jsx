import React, {useState} from "react";

export default function CreatePanelContent_customers({setCustomers, setShowSidePanel}) {

    const [name, setName] = useState("");
    const [locationName, setLocationName] = useState("");
    const [contactName, setContactName] = useState("");
    const [street, setStreet] = useState("");
    const [houseNumber, setHouseNumber] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [city, setCity] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const [nameValid, setNameValid] = useState(true);
    const [locationNameValid, setLocationNameValid] = useState(true);
    const [contactNameValid, setContactNameValid] = useState(true);
    const [streetValid, setStreetValid] = useState(true);
    const [houseNumberValid, setHouseNumberValid] = useState(true);
    const [postalCodeValid, setPostalCodeValid] = useState(true);
    const [cityValid, setCityValid] = useState(true);
    const [emailValid, setEmailValid] = useState(true);
    const [phoneNumberValid, setPhoneNumberValid] = useState(true);

    const [locationId, setLocationId] = useState(null);

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
            city
        }

        fetch('/api/location', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(location),
        })
            .then(response => response.json())
            .then(data => {
                setLocationId(data.data.Id);

                const customer = {
                    name,
                    contactName,
                    email,
                    phone: parseInt(phoneNumber),
                    locationId: data.data.Id
                };
                fetch('/api/customer', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(customer),
                })
                    .then(response => response.json())
                    .then(data => {

                        fetch('/api/customer')
                            .then(res => res.json())
                            .then(data => {
                                setCustomers(data.data);
                                setShowSidePanel(false);
                            })
                            .catch(error => console.error('Error fetching data:', error));

                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });

            })
            .catch((error) => {
                console.error('Error:', error);
            });

        setName('');
        setLocationName('');
        setContactName('');
        setStreet('');
        setHouseNumber('');
        setPostalCode('');
        setCity('');
        setEmail('');
        setPhoneNumber('');
    };

    return (
        <div>
            <h1 className='side-panel-title'>Maak een klant aan</h1>
            <div className='side-panel-content'>
                <form>
                    <div className="mb-6">
                        <label htmlFor="name"
                               className="block mb-2 text-sm font-medium text-gray-900 light:text-white">Naam</label>
                        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)}
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500"
                               placeholder="Naam" required/>
                    </div>
                    <div className="grid gap-6 mb-6 md:grid-cols-2">
                        <div>
                            <label htmlFor="locationName"
                                   className="block mb-2 text-sm font-medium text-gray-900 light:text-white">Locatie
                                naam</label>
                            <input type="text" id="locationName" value={locationName}
                                   onChange={(e) => setLocationName(e.target.value)}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500"
                                   placeholder="Hoofdlocatie" required/>
                        </div>
                        <div>
                            <label htmlFor="contactName"
                                   className="block mb-2 text-sm font-medium text-gray-900 light:text-white">Contact
                                naam</label>
                            <input type="text" id="contactName" value={contactName}
                                   onChange={(e) => setContactName(e.target.value)}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500"
                                   placeholder="Naam contactpersoon" required/>
                        </div>
                        <div>
                            <label htmlFor="street"
                                   className="block mb-2 text-sm font-medium text-gray-900 light:text-white">Straatnaam</label>
                            <input type="text" id="street" value={street} onChange={(e) => setStreet(e.target.value)}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500"
                                   placeholder="Straat" required/>
                        </div>
                        <div>
                            <label htmlFor="houseNumber"
                                   className="block mb-2 text-sm font-medium text-gray-900 light:text-white">Huisnummer</label>
                            <input type="text" id="houseNumber" value={houseNumber}
                                   onChange={(e) => setHouseNumber(e.target.value)}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500"
                                   placeholder="1" required/>
                        </div>
                        <div>
                            <label htmlFor="postalCode"
                                   className="block mb-2 text-sm font-medium text-gray-900 light:text-white">Postcode</label>
                            <input type="text" id="postalCode" value={postalCode}
                                   onChange={(e) => setPostalCode(e.target.value)}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500"
                                   placeholder="1234 AB" required/>
                        </div>
                        <div>
                            <label htmlFor="city"
                                   className="block mb-2 text-sm font-medium text-gray-900 light:text-white">Woonplaats</label>
                            <input type="text" id="city" value={city} onChange={(e) => setCity(e.target.value)}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500"
                                   placeholder="Plaats" required/>
                        </div>
                        <div>
                            <label htmlFor="email"
                                   className="block mb-2 text-sm font-medium text-gray-900 light:text-white">E-mail</label>
                            <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500"
                                   placeholder="abcd@gmail.com" required/>
                        </div>
                        <div>
                            <label htmlFor="phoneNumber"
                                   className="block mb-2 text-sm font-medium text-gray-900 light:text-white">Telefoonnummer</label>
                            <input type="text" id="phoneNumber" value={phoneNumber}
                                   onChange={(e) => setPhoneNumber(e.target.value)}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500"
                                   placeholder="1234567890" required/>
                        </div>
                    </div>
                    <button type="submit" onClick={handleSubmit}
                            className="text-white bg-brand-orange hover:bg-brand-orange focus:outline-none focus:ring-brand-orange font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center light:bg-brand-orange light:hover:bg-brand-orange light:focus:ring-brand-orange">Opslaan
                    </button>
                </form>
            </div>
        </div>
    );
}