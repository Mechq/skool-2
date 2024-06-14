import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

import Datepicker from "tailwind-datepicker-react";

let maxDate = new Date();
maxDate.setFullYear(maxDate.getFullYear() - 18);

const dateOptions = {
    title: " ",
    autoHide: true,
    todayBtn: false,
    clearBtn: false,
    clearBtnText: "",
    maxDate: maxDate,
    minDate: new Date("1900-01-01"),
    theme: {
        background: "bg-white",
        todayBtn: true,
        clearBtn: "",
        icons: "",
        text: "",
        disabledText: "",
        input: "",
        inputIcon: "",
        selected: "bg-brand-orange",
    },
    datepickerClassNames: "top-12",
    defaultDate: maxDate,
    language: "nl",
    disabledDates: [],
    weekDays: ["Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"],
    inputNameProp: "date",
    inputIdProp: "date",
    inputPlaceholderProp: "Select Date",
    inputDateFormatProp: {
        day: "numeric",
        month: "long",
        year: "numeric"
    },
}

const AccountCreation = ({formData, setFormData, nextStep}) => {
    const {
        firstName,
        lastName,
        phoneNumber,
        birthDate,
        email,
        password,
        streetName,
        houseNumber,
        postalCode,
        city,
        country
    } = formData;
    const navigate = useNavigate();

    const [firstNameValid, setFirstNameValid] = useState(true);
    const [surNameValid, setSurNameValid] = useState(true);
    const [phoneNrValid, setPhoneNrValid] = useState(true);
    const [birthDateValid, setBirthDateValid] = useState(true);

    const [streetNameValid, setStreetNameValid] = useState(true);
    const [houseNumberValid, setHouseNumberValid] = useState(true);
    const [postalCodeValid, setPostalCodeValid] = useState(true);
    const [cityValid, setCityValid] = useState(true);
    const [countryValid, setCountryValid] = useState(true);

    const [emailValid, setEmailValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);

    const [show, setShow] = useState(false);

    const handleChange = (selectedDate) => {
        const formattedDate = selectedDate.getFullYear() + "-" + (selectedDate.getMonth() + 1) + "-" + selectedDate.getDate();
        setFormData({
            ...formData,
            birthDate: formattedDate
        });
        setBirthDateValid(true);
    };

    const handleClose = (state) => {
        setShow(state);
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!firstName) setFirstNameValid(false);
        if (!lastName) setSurNameValid(false);
        if (!phoneNumber) setPhoneNrValid(false);
        if (!birthDate) setBirthDateValid(false);

        if (!streetName) setStreetNameValid(false);
        if (!houseNumber) setHouseNumberValid(false);
        if (!postalCode) setPostalCodeValid(false);
        if (!city) setCityValid(false);
        if (!country) setCountryValid(false);

        if (!email) setEmailValid(false);
        if (!password) setPasswordValid(false);

        if (!firstName || !lastName || !phoneNumber || !birthDate || !streetName || !houseNumber || !postalCode || !city || !country || !email || !password) return;

        console.log(firstName, lastName, phoneNumber, birthDate, email, streetName, houseNumber, postalCode, city, country)

        try {
            const response = await fetch(`/api/user/email/${email}`, {
                method: 'GET',
            });

            console.log('Response status:', response.status);
            const responseBody = await response.json();
            console.log('Response body:', responseBody);

            if (responseBody.status === 200) {
                console.log('Email already exists');
                setEmailValid(false);
                return;
            } else {
                console.error('Unexpected response status:', response.status);
            }
        } catch (error) {
            console.error('Error checking email existence:', error);
        }

        setFormData({
            ...formData,
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            birthDate: birthDate,
            streetName: streetName,
            houseNumber: houseNumber,
            postalCode: postalCode,
            city: city,
            country: country,
            email: email,
            password: password
        });

        console.log('formData:', formData)

        nextStep();
    }

    return (
        <section className='px-6 py-8 mx-6'>
            <form onSubmit={handleRegister}>
                <h3 className="mb-4 text-lg font-medium leading-none text-gray-900 light:text-white">Registreren</h3>
                <div className="grid gap-4 mb-4 grid-cols-2">
                    <div>
                        <label htmlFor="firstName"
                               className="block mb-2 text-sm font-medium text-gray-900 light:text-white">Voornaam</label>
                        <input type="text" name="firstName" id="firstName"
                               className={`bg-gray-50 border ${firstNameValid ? 'border-gray-300' : 'border-red-500'} text-gray-900 sm:text-sm rounded-lg focus:ring-brand-orange focus:border-brand-orange block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-brand-orange light:focus:border-brand-orange`}
                               placeholder="voornaam" required=""
                               value={firstName} onChange={(e) => {
                            setFormData({...formData, firstName: e.target.value})
                            setFirstNameValid(true);
                        }}/>
                    </div>
                    <div>
                        <label htmlFor="surName"
                               className="block mb-2 text-sm font-medium text-gray-900 light:text-white">Achternaam</label>
                        <input type="text" name="surName" id="surName"
                               className={`bg-gray-50 border ${surNameValid ? 'border-gray-300' : 'border-red-500'} text-gray-900 sm:text-sm rounded-lg focus:ring-brand-orange focus:border-brand-orange block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-brand-orange light:focus:border-brand-orange`}
                               placeholder="achternaam" required=""
                               value={lastName} onChange={(e) => {
                            setFormData({...formData, lastName: e.target.value})
                            setSurNameValid(true);
                        }}/>
                    </div>
                </div>
                <div className="grid gap-4 mb-4 grid-cols-2">
                    <div>
                        <label htmlFor="phoneNr"
                               className="block mb-2 text-sm font-medium text-gray-900 light:text-white">Telefoonnummer</label>
                        <input type="number" name="phoneNr" id="phoneNr"
                               className={`bg-gray-50 border ${phoneNrValid ? 'border-gray-300' : 'border-red-500'} text-gray-900 sm:text-sm rounded-lg focus:ring-brand-orange focus:border-brand-orange block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-brand-orange light:focus:border-brand-orange`}
                               placeholder="0612345678" required=""
                               value={phoneNumber} onChange={(e) => {
                            setFormData({...formData, phoneNumber: e.target.value})
                            setPhoneNrValid(true);
                        }}/>
                    </div>
                    <div>
                        <label htmlFor="birthDate"
                               className="block mb-2 text-sm font-medium text-gray-900 light:text-white">Geboortedatum</label>
                        <Datepicker options={dateOptions} onChange={handleChange} show={show}
                                    setShow={handleClose}/>
                    </div>
                </div>


                <div className="grid gap-4 mb-4 grid-cols-1 md:grid-cols-2">
                    <div>
                        <label htmlFor="streetName"
                               className="block mb-2 text-sm font-medium text-gray-900 light:text-white">Straatnaam</label>
                        <input type="text" name="streetName" id="streetName"
                               className={`bg-gray-50 border ${streetNameValid ? 'border-gray-300' : 'border-red-500'} text-gray-900 sm:text-sm rounded-lg focus:ring-brand-orange focus:border-brand-orange block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-brand-orange light:focus:border-brand-orange`}
                               placeholder="straat" required=""
                               value={streetName} onChange={(e) => {
                            setFormData({...formData, streetName: e.target.value})
                            setStreetNameValid(true);
                        }}/>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-grow">
                            <label htmlFor="houseNumber"
                                   className="block mb-2 text-sm font-medium text-gray-900 light:text-white">Huisnummer</label>
                            <input type="text" name="houseNumber" id="houseNumber"
                                   className={`bg-gray-50 border ${houseNumberValid ? 'border-gray-300' : 'border-red-500'} text-gray-900 sm:text-sm rounded-lg focus:ring-brand-orange focus:border-brand-orange block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-brand-orange light:focus:border-brand-orange`}
                                   placeholder="0" required=""
                                   value={houseNumber} onChange={(e) => {
                                setFormData({...formData, houseNumber: e.target.value})
                                setHouseNumberValid(true);
                            }}/>
                        </div>
                        <div className="flex-grow">
                            <label htmlFor="postalCode"
                                   className="block mb-2 text-sm font-medium text-gray-900 light:text-white">Postcode</label>
                            <input type="text" name="postalCode" id="postalCode"
                                   className={`bg-gray-50 border ${postalCodeValid ? 'border-gray-300' : 'border-red-500'} text-gray-900 sm:text-sm rounded-lg focus:ring-brand-orange focus:border-brand-orange block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-brand-orange light:focus:border-brand-orange`}
                                   placeholder="1234AB" required=""
                                   value={postalCode} onChange={(e) => {
                                setFormData({...formData, postalCode: e.target.value})
                                setPostalCodeValid(true);
                            }}/>
                        </div>
                    </div>
                </div>


                <div className="grid gap-4 mb-4 grid-cols-2">
                    <div>
                        <label htmlFor="city"
                               className="block mb-2 text-sm font-medium text-gray-900 light:text-white">Stad</label>
                        <input type="text" name="city" id="city"
                               className={`bg-gray-50 border ${cityValid ? 'border-gray-300' : 'border-red-500'} text-gray-900 sm:text-sm rounded-lg focus:ring-brand-orange focus:border-brand-orange block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-brand-orange light:focus:border-brand-orange`}
                               placeholder="gilze" required=""
                               value={city} onChange={(e) => {
                            setFormData({...formData, city: e.target.value})
                            setCityValid(true);
                        }}/>
                    </div>
                    <div>
                        <label htmlFor="country"
                               className="block mb-2 text-sm font-medium text-gray-900 light:text-white">Land</label>
                        <input type="text" name="country" id="country"
                               className={`bg-gray-50 border ${countryValid ? 'border-gray-300' : 'border-red-500'} text-gray-900 sm:text-sm rounded-lg focus:ring-brand-orange focus:border-brand-orange block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-brand-orange light:focus:border-brand-orange`}
                               placeholder="nederland" required=""
                               value={country} onChange={(e) => {
                            setFormData({...formData, country: e.target.value})
                            setCountryValid(true);
                        }}/>
                    </div>
                </div>
                <div className="grid gap-4 mb-6"/>

                <div className="grid gap-4 mb-4">
                    <div>
                        <label htmlFor="email"
                               className="block mb-2 text-sm font-medium text-gray-900 light:text-white">Email</label>
                        <input type="email" name="email" id="email"
                               className={`bg-gray-50 border ${emailValid ? 'border-gray-300' : 'border-red-500'} text-gray-900 sm:text-sm rounded-lg focus:ring-brand-orange focus:border-brand-orange block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-brand-orange light:focus:border-brand-orange`}
                               placeholder="name@bedrijf.com" required=""
                               value={email} onChange={(e) => {
                            setFormData({...formData, email: e.target.value})
                            setEmailValid(true);
                        }}/>
                    </div>
                </div>
                <div className="grid gap-4 mb-4">
                    <div>
                        <label htmlFor="password"
                               className="block mb-2 text-sm font-medium text-gray-900 light:text-white">Wachtwoord</label>
                        <input type="password" name="password" id="password"
                               className={`bg-gray-50 border ${passwordValid ? 'border-gray-300' : 'border-red-500'} text-gray-900 sm:text-sm rounded-lg focus:ring-brand-orange focus:border-brand-orange block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-brand-orange light:focus:border-brand-orange`}
                               placeholder="•••••••••" required=""
                               value={password} onChange={(e) => {
                            setFormData({...formData, password: e.target.value})
                            setPasswordValid(true);
                        }}/>
                    </div>
                </div>

                <button
                    onClick={() => navigate('/login')}
                    className="text-white mr-3 bg-brand-orange hover:bg-hover-brand-orange focus:ring-4 focus:outline-none focus:ring-brand-orange-light font-medium rounded-lg text-sm px-5 py-2.5 text-center light:bg-brand-orange-light light:hover:bg-hover-brand-orange light:focus:ring-hover-brand-orange">Terug
                </button>
                <button type="submit"
                        className="text-white bg-brand-orange hover:bg-hover-brand-orange focus:ring-4 focus:outline-none focus:ring-brand-orange-light font-medium rounded-lg text-sm px-5 py-2.5 text-center light:bg-brand-orange-light light:hover:bg-hover-brand-orange light:focus:ring-hover-brand-orange">
                    Volgende stap
                </button>
            </form>
        </section>
    )
}

export default AccountCreation;