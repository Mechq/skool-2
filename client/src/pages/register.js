import React, { useState } from 'react';
import AccountCreation from "../components/RegisterAccountCreation";
import PersonalDetails from "../components/RegisterPersonalDetails";
import AccountConfirmation from '../components/RegisterConfirmation';

const RegistrationFlow = () => {
    const [step, setStep] = useState(1);
    const postRequest = true;
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        birthDate: "",
        email: "",
        password: "",
        street: "",
        houseNumber: "",
        postalCode: "",
        city: "",
        kvkNumber: "",
        btwNumber: "",
        iban: "",
        workshops: ""
    });

    const nextStep = () => {
        console.log("returned data: " + formData)
        setStep(step + 1);
    };

    const createAccount = () => {
        setStep(step + 1);
        console.log(formData);
    };

    const stepBack = () => {
        setFormData({
            firstName: "",
            lastName: "",
            phoneNumber: "",
            birthDate: "",
            email: "",
            password: "",
            street: "",
            houseNumber: "",
            postalCode: "",
            city: "",
            kvkNumber: "",
            btwNumber: "",
            iban: "",
            workshops: ""
        });

        setStep(step - 1);
    }

    return (
        <div className="flex justify-center items-center h-screen overflow-auto">
            <section className="">
                <div className="p-5 min-w-full top-0 left-0 ">
                    <ol className="flex items-center w-full text-sm font-medium text-center text-gray-500 light:text-gray-400 sm:text-base">
                        <li className="flex md:w-full items-center text-brand-orange light:text-blue-500 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 light:after:border-gray-700">
                            <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 light:after:text-gray-500">
                                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                                </svg>
                                Personal <span className="hidden sm:inline-flex sm:ms-2">Info</span>
                            </span>
                        </li>
                        <li className="flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 light:after:border-gray-700">
                            <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 light:after:text-gray-500">
                                <span className="me-2">2</span>
                                Account <span className="hidden sm:inline-flex sm:ms-2">Info</span>
                            </span>
                        </li>
                        <li className="flex items-center">
                            <span className="me-2">3</span>
                            Confirmation
                        </li>
                    </ol>
                </div>

                <div className="max-w-3xl bg-white rounded-lg shadow light:border light:bg-gray-800 light:border-gray-700 mt-4">
                    <div>
                        {step === 1 && <AccountCreation formData={formData} setFormData={setFormData} nextStep={nextStep} />}
                        {step === 2 && <PersonalDetails formData={formData} setFormData={setFormData} createAccount={createAccount} stepBack={stepBack} />}
                        {step === 3 && <AccountConfirmation formData={formData} postRequest={postRequest} />}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default RegistrationFlow;
