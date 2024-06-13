import {useState, useEffect} from "react";

export default function AccountConfirmation({formData, postRequest}) {
    const [hasPosted, setHasPosted] = useState(false);

    useEffect(() => {
        if (postRequest && !hasPosted) {
            console.log('Posting data:', JSON.stringify(formData));
            const createDatabaseAccount = (formData) => {
                fetch('/api/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                })
                    .then(response => {
                        if (!response.ok) {
                            throw response;
                        }
                        return response.json();
                    })
                    .then(data => {
                        setHasPosted(true);
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            };

            const createUserLanguageQualifications = (formData) => {
                fetch(`/api/language/${formData.email}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({"languages": formData.userLanguages}),
                })
                    .then(response => {
                        if (!response.ok) {
                            throw response;
                        }
                        return response.json();
                    })
                    .then(data => {
                        setHasPosted(true);
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            };

            createDatabaseAccount(formData);
            createUserLanguageQualifications(formData);
        }
    }, [postRequest, hasPosted, formData]);

    return (
        <>
            <div>
                <h1>Account aangemaakt</h1>
            </div>

            <button onClick={() => window.location.replace("/login")}
                    className="text-white bg-brand-orange hover:bg-hover-brand-orange focus:ring-4 focus:outline-none focus:ring-brand-orange-light font-medium rounded-lg text-sm px-5 py-2.5 text-center light:bg-brand-orange-light light:hover:bg-hover-brand-orange light:focus:ring-hover-brand-orange">Terug
                Naar Login Scherm
            </button>
        </>
    );
}
