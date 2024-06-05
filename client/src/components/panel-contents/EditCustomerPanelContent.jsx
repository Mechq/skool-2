import React, { useEffect, useState } from 'react';

function EditCustomerPanelContent({ customerId, setShowSidePanel }) {
    const [name, setName] = useState('');
    const [locationName, setLocationName] = useState('');
    const [contactName, setContactName] = useState('');
    const [street, setStreet] = useState('');
    const [houseNumber, setHouseNumber] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

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
                setLocationName(data.name || '');
                setStreet(data.street || '');
                setHouseNumber(data.houseNumber || '');
                setCity(data.city || '');
                setPostalCode(data.postalCode || '');
                autoResize({target: document.getElementById('edit-description')});

                
            })
            .catch(error => console.error('Error fetching customer:', error));
    }
}, [customerId]);


    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !locationName || !contactName || !street || !houseNumber || !postalCode || !city || !email || !phoneNumber) {
            return; // Exit the function if any required field is empty
        }

        const customer = {
            name,
            locationName,
            contactName,
            street,
            houseNumber,
            city,
            postalCode,
            email,
            phoneNumber
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
                setShowSidePanel(false); // Close the side panel after successful submission
            })
            .catch(error => console.error('Error:', error));
    };

    const autoResize = (e) => {
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;
    };

    return (
        <div>
            <h1 className='side-panel-title'>Bewerk klant</h1>
            <div className='side-panel-content'>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <div>
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Naam</label>
                            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                required />
                        </div>
                    </div>
                    <div className="grid gap-6 mb-6 md:grid-cols-2">
                        <div>
                            <label htmlFor="locationName" className="block mb-2 text-sm font-medium text-gray-900">Locatie naam</label>
                            <input type="text" id="locationName" value={locationName} onChange={(e) => setLocationName(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                required />
                        </div>
                        <div>
                            <label htmlFor="contactName" className="block mb-2 text-sm font-medium text-gray-900">Contact naam</label>
                            <input type="text" id="contactName" value={contactName} onChange={(e) => setContactName(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                required />
                        </div>
                        <div>
                            <label htmlFor="street" className="block mb-2 text-sm font-medium text-gray-900">Straatnaam</label>
                            <input type="text" id="street" value={street} onChange={(e) => setStreet(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                required />
                        </div>
                        <div>
                            <label htmlFor="houseNumber" className="block mb-2 text-sm font-medium text-gray-900">Huisnummer</label>
                            <input type="text" id="houseNumber" value={houseNumber} onChange={(e) => setHouseNumber(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                required />
                        </div>
                        <div>
                            <label htmlFor="postalCode" className="block mb-2 text-sm font-medium text-gray-900">Postcode</label>
                            <input type="text" id="postalCode" value={postalCode} onChange={(e) => setPostalCode(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                required />
                        </div>
                        <div>
                            <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900">Woonplaats</label>
                            <input type="text" id="city" value={city} onChange={(e) => setCity(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                required />
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">E-mail</label>
                            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                required />
                        </div>
                        <div>
                            <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-gray-900">Telefoonnummer</label>
                            <input type="text" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                required />
                        </div>
                    </div>
                    <button type="submit" className="text-white bg-brand-orange hover:bg-brand-orange focus:outline-none focus:ring-brand-orange font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EditCustomerPanelContent;
