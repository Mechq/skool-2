import React, {useEffect, useState} from 'react';

function EditPanelContent_customers({customerId, setShowSidePanel}) {
    const [name, setName] = useState('');
    const [locationName, setLocationName] = useState('');
    const [contactName, setContactName] = useState('');
    const [street, setStreet] = useState('');
    const [houseNumber, setHouseNumber] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [locationId, setLocationId] = useState('');
    const [contactPersons, setContactPersons] = useState([]);


    useEffect(() => {
        if (customerId) {
            fetch(`/api/customer/${customerId}`)
                .then(res => res.json())
                .then(response => {
                    const data = response.data;
                    console.log('customerdata', data);
                    setName(data.name || '');
                    setContactName(data.contactName || '');
                    setEmail(data.email || '');
                    setPhoneNumber(data.phone || '');
                    setLocationName(data.locationName || '');
                    setStreet(data.street || '');
                    setHouseNumber(data.houseNumber || '');
                    setCity(data.city || '');
                    setPostalCode(data.postalCode || '');
                    setLocationId(data.locationId || '')
                    autoResize({target: document.getElementById('edit-description')});


                })
                .catch(error => console.error('Error fetching customer:', error));
            fetch(`/api/customer/contact/${customerId}`)
                .then(res => res.json())
                .then(response => {
                    const data = response.data;
                    console.log('contactPersons', data);
                    setContactPersons(data || []);
                })
                .catch(error => console.error('Error fetching contactPersons:', error));
        }
    }, [customerId]);


    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !locationName || !street || !houseNumber || !postalCode || !city || !email || !phoneNumber) {
            return; // Exit the function if any required field is empty
        }

        const customer = {
            name,
            locationName,
            street,
            houseNumber,
            city,
            postalCode,
            email,
            phoneNumber,
            locationId
        };

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
                setShowSidePanel(false);
            })
            .catch(error => console.error('Error:', error));


        console.log("aaaaaaaaa", contactPersons)

        fetch(`/api/customer/contact/${customerId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(contactPersons)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch(error => console.error('Error:', error));
    };

    const autoResize = (e) => {
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;
    };
    const handleAddContactPerson = () => {
        setContactPersons([...contactPersons, { name: '', email: '', phoneNumber: '' }]);
    };

    const handleContactPersonChange = (index, key, value) => {
        const newContactPersons = [...contactPersons];
        newContactPersons[index][key] = value;
        setContactPersons(newContactPersons);
    };

    const handleDeleteContactPerson = (index) => {
        const newContactPersons = contactPersons.filter((_, i) => i !== index);
        setContactPersons(newContactPersons);
    };

    return (
        <div>
            <header className='side-panel-title pt-4 pb-4 px-4 font-bold text-lg'>Bewerk klant</header>
            <div className='side-panel-content p-4'>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Naam</label>
                        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)}
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                               required/>
                    </div>
                    <div className="grid gap-6 mb-6 md:grid-cols-2">
                        <div>
                            <label htmlFor="locationName" className="block mb-2 text-sm font-medium text-gray-900">Locatie
                                naam</label>
                            <input type="text" id="locationName" value={locationName}
                                   onChange={(e) => setLocationName(e.target.value)}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                   required/>
                        </div>
                        <div>
                            <label htmlFor="street"
                                   className="block mb-2 text-sm font-medium text-gray-900">Straatnaam</label>
                            <input type="text" id="street" value={street} onChange={(e) => setStreet(e.target.value)}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                   required/>
                        </div>
                        <div>
                            <label htmlFor="houseNumber"
                                   className="block mb-2 text-sm font-medium text-gray-900">Huisnummer</label>
                            <input type="text" id="houseNumber" value={houseNumber}
                                   onChange={(e) => setHouseNumber(e.target.value)}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                   required/>
                        </div>
                        <div>
                            <label htmlFor="postalCode"
                                   className="block mb-2 text-sm font-medium text-gray-900">Postcode</label>
                            <input type="text" id="postalCode" value={postalCode}
                                   onChange={(e) => setPostalCode(e.target.value)}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                   required/>
                        </div>
                        <div>
                            <label htmlFor="city"
                                   className="block mb-2 text-sm font-medium text-gray-900">Woonplaats</label>
                            <input type="text" id="city" value={city} onChange={(e) => setCity(e.target.value)}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                   required/>
                        </div>
                        <div>
                            <label htmlFor="email"
                                   className="block mb-2 text-sm font-medium text-gray-900">E-mail</label>
                            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                   required/>
                        </div>
                        <div>
                            <label htmlFor="phoneNumber"
                                   className="block mb-2 text-sm font-medium text-gray-900">Telefoonnummer</label>
                            <input type="text" id="phoneNumber" value={phoneNumber}
                                   onChange={(e) => setPhoneNumber(e.target.value)}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                   required/>
                        </div>
                    </div>

                    <p className="mb-4 mt-8 text-lg font-medium text-gray-900 flex items-center">
                        Contactpersonen
                        <button
                            type="button"
                            onClick={handleAddContactPerson}
                            className="ml-2 text-black mt-1 font-medium rounded-full flex items-center justify-center"
                        >
                            <AiTwotonePlusCircle />
                        </button>
                    </p>
                    <div className="overflow-x-auto relative shadow-md sm:rounded-lg mb-6">
                        <table className="w-full text-sm text-left text-gray-500 light:text-gray-400">
                            <thead
                                className="text-xs text-gray-700 uppercase bg-gray-50 light:bg-gray-700 light:text-gray-400">
                            <tr>
                                <th scope="col" className="py-2 px-2">Naam</th>
                                <th scope="col" className="py-2 px-2">E-mail</th>
                                <th scope="col" className="py-2 px-2">Telefoonnummer</th>
                                <th scope="col" className="py-2 px-2">Verwijderen</th>
                            </tr>
                            </thead>
                            <tbody>
                            {contactPersons.map((contact, index) => (
                                <tr key={index} className="bg-white border-b light:bg-gray-800 light:border-gray-700">
                                    <td className="py-2 px-2">
                                        <input
                                            type="text"
                                            value={contact.name}
                                            onChange={(e) => handleContactPersonChange(index, 'name', e.target.value)}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            required
                                        />
                                    </td>
                                    <td className="py-2 px-2">
                                        <input
                                            type="email"
                                            value={contact.email}
                                            onChange={(e) => handleContactPersonChange(index, 'email', e.target.value)}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            required
                                        />
                                    </td>
                                    <td className="py-2 px-2">
                                        <input
                                            type="text"
                                            value={contact.phoneNumber}
                                            onChange={(e) => handleContactPersonChange(index, 'phoneNumber', e.target.value)}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            required
                                        />
                                    </td>
                                    <td className="py-2 px-2 justify-center">
                                        <button
                                            type="button"
                                            onClick={() => handleDeleteContactPerson(index)}
                                            className="justify-center"
                                        >
                                            <svg
                                                className="w-5 h-5 text-danger hover:text-red-600"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                                                />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    <button
                        type="submit"
                        className="text-white bg-brand-orange hover:bg-brand-orange focus:outline-none focus:ring-brand-orange font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                    >
                        Opslaan
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EditPanelContent_customers;
