import { useState, useEffect } from "react";

export default function AccountConfirmation({ formData, postRequest }) {
    const [hasPosted, setHasPosted] = useState(false);

    useEffect(() => {
        if (postRequest && !hasPosted) {
            const createDatabaseAccount = async (formData) => {
                try {
                    const response = await fetch('/api/register', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(formData),
                    });

                    if (!response.ok) {
                        throw response;
                    }

                    const data = await response.json();
                    console.log('Success:', data);
                    setHasPosted(true); // Mark the post request as completed
                } catch (error) {
                    console.error('Error:', error);
                }
            };

            createDatabaseAccount(formData);
        }
    }, [postRequest, hasPosted, formData]); // Dependency array includes hasPosted

    return (
        <div>
            <h1>Account aangemaakt</h1>
        </div>
    );
}
