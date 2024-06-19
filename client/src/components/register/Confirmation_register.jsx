import { useState, useEffect, useRef } from "react";

export default function AccountConfirmation({ formData, postRequest }) {
    const [hasPosted, setHasPosted] = useState(false);
    const hasPostedRef = useRef(false);

    useEffect(() => {
        if (postRequest && !hasPosted && !hasPostedRef.current) {
            hasPostedRef.current = true;
            console.log('Posting data:', JSON.stringify(formData));

            const createDatabaseAccount = () => {
                return fetch('/api/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Failed to create database account');
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log('Database account created successfully:', data);
                    })
                    .catch(error => {
                        console.error('Error creating database account:', error);
                        throw error; // Re-throw error to propagate to outer catch block
                    });
            };

            const createUserLanguageQualifications = () => {
                return fetch(`/api/language/${formData.email}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ "languages": formData.userLanguages }),
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Failed to create user language qualifications');
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log('User language qualifications added successfully:', data);
                    })
                    .catch(error => {
                        console.error('Error adding user language qualifications:', error);
                        throw error; // Re-throw error to propagate to outer catch block
                    });
            };


            const handleAccountCreation = async () => {
                try {
                    await createDatabaseAccount();
                    await createUserLanguageQualifications();
                    setHasPosted(true);
                }
                catch (error) {
                    console.error('Error creating account:', error);
                }
            };

            handleAccountCreation();
        }
    }, [postRequest, hasPosted, formData]);

    return (
        <>
            <div>
                <h1>Account aangevraagd</h1>
            </div>

            <button onClick={() => window.location.replace("/login")}
                    className="text-white bg-brand-orange hover:bg-hover-brand-orange focus:ring-4 focus:outline-none focus:ring-brand-orange-light font-medium rounded-lg text-sm px-5 py-2.5 text-center light:bg-brand-orange-light light:hover:bg-hover-brand-orange light:focus:ring-hover-brand-orange">Terug
                Naar Login Scherm
            </button>
        </>
    );
}
