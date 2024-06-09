import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AccountCreation from "../components/RegisterPageOne";
import PersonalDetails from "../components/RegisterPageTwo";
import AccountConfirmation from '../components/RegisterConfirmation';

const RegistrationFlow = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        birthDate: '',
        streetName: '',
        houseNumber: '',
        postalCode: '',
        city: '',
        country: '',
        email: '',
        password: '',
        btwNumber: '',
        kvkNumber: '',
        hasDriversLicense: false,
        hasCar: false,
        isZZPer: true,
        iban: ''
    });
    const [postRequest, setPostRequest] = useState(false);

    useEffect(() => {
        const location = {
            pathname: window.location.pathname,
            search: window.location.search,
            hash: `#step${step}` // Use a unique identifier for each step
        };
        navigate(location);
    }, [step, navigate]);

    const handleBackButtonClick = () => {
        if (step > 1) {
            setStep(step - 1);
        } else {
            navigate('/login');
        }
    };

    useEffect(() => {
        window.onpopstate = handleBackButtonClick;
        return () => {
            window.onpopstate = null; // Cleanup when the component unmounts
        };
    }, [step]);

    const nextStep = () => {
        setStep(step + 1);
    };

    const createAccount = () => {
        setPostRequest(true);
        setStep(step + 1);
        console.log(formData);
    };

    const stepBack = () => {
        setStep(step - 1);
    };

    return (
        <div className="flex justify-center items-center h-screen overflow-auto">
            <section className="">
                <div className="p-5 min-w-full top-0 left-0 ">
                    <ol className="flex items-center w-full text-sm font-medium text-center text-gray-500 light:text-gray-400 sm:text-base">
                        <li className={`flex md:w-full items-center ${step === 1 ? 'text-brand-orange light:text-blue-500' : 'text-gray-500 light:text-gray-400'} sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 light:after:border-gray-700`}>
                            <span
                                className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 light:after:text-gray-500">
                                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                                </svg>
                                Persoonlijke <span className="hidden sm:inline-flex sm:ms-2">Informatie</span>
                            </span>
                        </li>
                        <li className={`flex md:w-full items-center ${step === 2 ? 'text-brand-orange light:text-orange-500' : 'text-gray-500 light:text-gray-400'} after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 light:after:border-gray-700`}>
                            <span
                                className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 light:after:text-gray-500">
                                <span className="me-2">{step === 2 ?
                                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5" aria-hidden="true"
                                         xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                                    </svg> : '2'}</span>
                                Zakelijke <span className="hidden sm:inline-flex sm:ms-2">Informatie</span>
                            </span>
                        </li>
                        <li className={`flex items-center ${step === 3 ? 'text-brand-orange light:text-orange-500' : 'text-gray-500 light:text-gray-400'}`}>
                            <span className="me-2">{step === 3 ?
                                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                                </svg> : '3'}</span>
                            Bevestiging
                        </li>
                    </ol>
                </div>

                <div
                    className="max-w-3xl bg-white rounded-lg shadow light:border light:bg-gray-800 light:border-gray-700 mt-4">
                    <div>
                        {step === 1 &&
                            <AccountCreation formData={formData} setFormData={setFormData} nextStep={nextStep}/>}
                        {step === 2 &&
                            <PersonalDetails formData={formData} setFormData={setFormData} createAccount={createAccount}
                                             stepBack={stepBack}/>}
                        {step === 3 && <AccountConfirmation formData={formData} postRequest={postRequest}/>}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default RegistrationFlow;
