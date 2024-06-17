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

            const fetchEmailTemplate = () => {
                return fetch('/api/mailTemplate/17')
                    .then(res => {
                        if (!res.ok) {
                            throw new Error('Failed to fetch email template');
                        }
                        return res.json();
                    })
                    .then(data => {
                        console.log("Fetched mail template:", data);
                        // Ensure to return the template content string
                        return { content: data.data.content, subject: data.data.subject };
                    })
                    .catch(error => console.error('Error fetching data:', error));
            };

            const replaceTemplatePlaceholders = (template, placeholders) => {
                if (typeof template !== 'string') {
                    throw new Error('Template is not a string');
                }
                return template.replace(/{(FirstName|PictureLink)}/g, (_, key) => {
                    return placeholders[key] || '';
                });
            };

            const handleAccountCreation = async () => {
                try {
                    await createDatabaseAccount();
                    await createUserLanguageQualifications();
                    const { content, subject } = await fetchEmailTemplate();

                    // Log template to check its type
                    console.log("Template type:", typeof content);
                    console.log("Template content:", content);

                    const placeholders = {
                        FirstName: formData.firstName,
                        PictureLink: 'https://skoolworkshop.nl/wp-content/uploads/2020/06/Skool-Workshop_Logo-200x65.png'
                    };
                    const emailBody = replaceTemplatePlaceholders(content, placeholders);

                    const mailData = {
                        email: formData.email,
                        subject: subject,
                        message: emailBody,
                    };

                    const emailResponse = await fetch('/api/mail', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(mailData),
                    });

                    if (!emailResponse.ok) {
                        throw new Error('Failed to send email');
                    }

                    const emailData = await emailResponse.json();
                    console.log('Email sent successfully:', emailData);
                    alert("Send Successfully!");
                    setHasPosted(true);
                } catch (error) {
                    console.error('Error:', error);
                }
            };

            handleAccountCreation();
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
