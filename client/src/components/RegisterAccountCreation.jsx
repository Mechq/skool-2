import React, {useEffect, useState} from 'react';
import Datepicker from "tailwind-datepicker-react";

const dateOptions = {
    title: " ",
    autoHide: false,
    todayBtn: false,
    clearBtn: false,
    clearBtnText: "",
    maxDate: new Date("2030-01-01"),
    minDate: new Date(),
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
    icons: {
        // () => ReactElement | JSX.Element
        prev: () => <span>Vorige</span>,
        next: () => <span>Volgende</span>,
    },
    datepickerClassNames: "top-12",
    defaultDate: false,
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
    }
}

const AccountCreation = ({ formData, setFormData, nextStep }) => {

    const [firstName, setFirstName] = useState("");
    const [surName, setSurName] = useState("");
    const [phoneNr, setPhoneNr] = useState("");
    const [email, setEmail] = useState("");
    const [birthDate, setbirthDate] = useState("");
    const [password, setPassword] = useState("");

    const [firstNameValid, setFirstNameValid] = useState(true);
    const [surNameValid, setSurNameValid] = useState(true);
    const [phoneNrValid, setPhoneNrValid] = useState(true);
    const [emailValid, setEmailValid] = useState(true);
    const [birthDateValid, setBirthDateValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);

    const [show, setShow] = useState(false);
    const handleChange = (birthDate) => {
        setbirthDate(birthDate.getFullYear() + "-" + birthDate.getMonth() + "-" + birthDate.getDate());
        setBirthDateValid(true);
    };

    const handleClose = (state) => {
        setShow(state);
    };

    const handleRegister = (e) => {
        e.preventDefault();

        if (!firstName) setFirstNameValid(false);
        if (!surName) setSurNameValid(false);
        if (!phoneNr) setPhoneNrValid(false);
        if (!email) setEmailValid(false);
        if (!birthDate) setBirthDateValid(false);
        if (!password) setPasswordValid(false);

        if (!firstName || !surName || !phoneNr || !email || !password || !birthDate) return;

        console.log(firstName, surName, phoneNr, email, birthDate, password);

        setFormData ({
            ...formData,
            firstName: firstName,
            lastName: surName,
            phoneNumber: phoneNr,
            email: email,
            birthDate: birthDate,
            password: password
        });

        nextStep();
    }
    return (
        <>
                <form onSubmit={handleRegister}>
                    <h3 className="mb-4 text-lg font-medium leading-none text-gray-900 light:text-white">Invoice
                        details</h3>
                    <div className="grid gap-4 mb-4 sm:grid-cols-2">
                        <div>
                            <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 light:text-white">Voornaam</label>
                            <input type="text" name="firstName" id="firstName"
                                className={`bg-gray-50 border ${firstNameValid ? 'border-gray-300' : 'border-red-500'} text-gray-900 sm:text-sm rounded-lg focus:ring-brand-orange focus:border-brand-orange block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-brand-orange light:focus:border-brand-orange`}
                                placeholder="voornaam" required=""
                                value={firstName} onChange={(e) => {
                                    setFirstName(e.target.value);
                                    setFirstNameValid(true);
                                }} />
                        </div>
                        <div>
                            <label htmlFor="surName" className="block mb-2 text-sm font-medium text-gray-900 light:text-white">Achternaam</label>
                            <input type="text" name="surName" id="surName"
                                className={`bg-gray-50 border ${surNameValid ? 'border-gray-300' : 'border-red-500'} text-gray-900 sm:text-sm rounded-lg focus:ring-brand-orange focus:border-brand-orange block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-brand-orange light:focus:border-brand-orange`}
                                placeholder="achternaam" required=""
                                value={surName} onChange={(e) => {
                                    setSurName(e.target.value);
                                    setSurNameValid(true);
                                }} />
                        </div>
                        <div>
                            <label htmlFor="phoneNr" className="block mb-2 text-sm font-medium text-gray-900 light:text-white">Telefoonnummer</label>
                            <input type="number" name="phoneNr" id="phoneNr"
                                className={`bg-gray-50 border ${phoneNrValid ? 'border-gray-300' : 'border-red-500'} text-gray-900 sm:text-sm rounded-lg focus:ring-brand-orange focus:border-brand-orange block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-brand-orange light:focus:border-brand-orange`}
                                placeholder="0612345678" required=""
                                value={phoneNr} onChange={(e) => {
                                    setPhoneNr(e.target.value);
                                    setPhoneNrValid(true);
                                }} />
                        </div>
                        <div>
                        <label htmlFor="birthDate"
                           className="block mb-2 text-sm font-medium text-gray-900 light:text-white">Geboortedatum</label>
                            <Datepicker options={dateOptions} onChange={handleChange} show={show} setShow={handleClose} />   
                        </div> 
                    </div>
                    <div className="grid gap-4 mb-4 sm:grid-cols-2">
                        <div>
                                <label htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-gray-900 light:text-white">Email</label>
                                <input type="email" name="email" id="email"
                                    className={`bg-gray-50 border ${emailValid ? 'border-gray-300' : 'border-red-500'} text-gray-900 sm:text-sm rounded-lg focus:ring-brand-orange focus:border-brand-orange block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-brand-orange light:focus:border-brand-orange`}
                                    placeholder="name@bedrijf.com" required=""
                                    value={email} onChange={(e) => {
                                        setEmail(e.target.value);
                                        setEmailValid(true);
                                    }}/>
                        </div>
                    </div>
                    <div className="grid gap-4 mb-4 sm:grid-cols-2">
                        <div>
                            <label htmlFor="password"
                                className="block mb-2 text-sm font-medium text-gray-900 light:text-white">Password</label>
                            <input type="password" name="password" id="password"
                                className={`bg-gray-50 border ${passwordValid ? 'border-gray-300' : 'border-red-500'} text-gray-900 sm:text-sm rounded-lg focus:ring-brand-orange focus:border-brand-orange block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-brand-orange light:focus:border-brand-orange`}
                                placeholder="•••••••••" required=""
                                value={password} onChange={(e) => {
                                    setPassword(e.target.value);
                                    setPasswordValid(true);
                                }}/>
                        </div>
                    </div>
                    <button type="submit"
                    className="text-white bg-brand-orange hover:bg-hover-brand-orange focus:ring-4 focus:outline-none focus:ring-brand-orange-light font-medium rounded-lg text-sm px-5 py-2.5 text-center light:bg-brand-orange-light light:hover:bg-hover-brand-orange light:focus:ring-hover-brand-orange">
                        Volgende stap: Persoonlijke info
                    </button>
                </form>
        </>
    )
}

export default AccountCreation;