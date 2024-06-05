import React, { useState } from 'react';
import AccountCreation from "../components/RegisterAccountCreation"
import PersonalDetails from "../components/RegisterPersonalDetails"
import AccountConfirmation from '../components/RegisterConfirmation';

const RegistrationFlow = () => {
    const [step, setStep] = useState(1);
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
      
    return (
      <>
        <ol className="flex items-center w-full mb-4 sm:mb-5">
          <li className="flex w-full items-center text-brand-orange light:text-brand-orange-light after:content-[''] after:w-full after:h-1 after:border-b after:border-brand-orange-light after:border-4 after:inline-block light:after:border-brand-orange-light">
            <div className="flex items-center justify-center w-10 h-10 bg-brand-orange-light rounded-full lg:h-12 lg:w-12 light:bg-brand-orange-light shrink-0">
              <svg className="w-4 h-4 text-brand-orange lg:w-6 lg:h-6 light:text-brand-orange-light"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                <path
                  d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z"/>
              </svg>
            </div>
          </li>
          {step === 1 &&
            <li className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block light:after:border-gray-700">
              <div
              className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 light:bg-gray-700 shrink-0">
                <svg className="w-4 h-4 text-brand-orange lg:w-6 lg:h-6 light:text-brand-orange-light"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 14">
                  <path
                  d="M18 0H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM2 12V6h16v6H2Z"/>
                  <path d="M6 8H4a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2Zm8 0H9a1 1 0 0 0 0 2h5a1 1 0 1 0 0-2Z"/>
                </svg>
              </div>
            </li>
                } 
                {step > 1 &&
                  <li className="flex w-full items-center text-brand-orange light:text-brand-orange-light after:content-[''] after:w-full after:h-1 after:border-b after:border-brand-orange-light after:border-4 after:inline-block light:after:border-brand-orange-light">
                    <div
                        className="flex items-center justify-center w-10 h-10 bg-brand-orange-light rounded-full lg:h-12 lg:w-12 light:bg-brand-orange-light shrink-0">
                        <svg className="w-4 h-4 text-brand-orange lg:w-6 lg:h-6 light:text-brand-orange-light"
                             aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 14">
                            <path
                                d="M18 0H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM2 12V6h16v6H2Z"/>
                            <path d="M6 8H4a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2Zm8 0H9a1 1 0 0 0 0 2h5a1 1 0 1 0 0-2Z"/>
                        </svg>
                    </div>
                </li>
                }
                {step < 3 &&
                <li className="flex items-center w-full">
                    <div
                        className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 light:bg-gray-700 shrink-0">
                        <svg className="w-4 h-4 text-brand-orange lg:w-6 lg:h-6 light:text-brand-orange-light"
                             xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                             viewBox="0 0 24 24">
                            <path fill-rule="evenodd"
                                  d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z"
                                  clip-rule="evenodd"/>
                        </svg>

                    </div>
                </li>
                }
                {step === 3 && 
                <li className="flex items-center w-full">
                <div
                    className="flex w-full items-center text-brand-orange light:text-brand-orange-light">
                    <svg className="w-4 h-4 text-brand-orange lg:w-6 lg:h-6 light:text-brand-orange-light"
                         xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                         viewBox="0 0 24 24">
                        <path fill-rule="evenodd"
                              d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z"
                              clip-rule="evenodd"/>
                    </svg>

                </div>
            </li>}
          </ol>
      <div className="w-full bg-white rounded-lg shadow light:border light:bg-gray-800 light:border-gray-700">
        <div>
            {step === 1 && <AccountCreation formData={formData} setFormData={setFormData} nextStep={nextStep} />}
            {step === 2 && <PersonalDetails formData={formData} setFormData={setFormData} createAccount={createAccount}/>}
            {step === 3 && <AccountConfirmation formData={formData} />}
            
        </div>
      </div>
      </>
    );

  };
  
  export default RegistrationFlow;