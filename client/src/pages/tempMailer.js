import React, {useState} from 'react';

export default function Login() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();


        const mailData = {
            email: email,
            message: message,
        };

        fetch('/api/mail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(mailData),
        })
            .then((res) => {
                console.log(res);
                if (res.status > 199 && res.status < 300) {
                    alert("Send Successfully !");
                }
            });

    }

    return (
        <section
            className="w-full h-full flex items-center justify-center  light:bg-gray-900 fixed top-0 left-0">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto sm:max-w-lg">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 light:text-white">
                    <img className="w-40 h-13 mr-2"
                         src="https://skoolworkshop.nl/wp-content/uploads/2020/06/Skool-Workshop_Logo-200x65.png"
                         alt="logo"/>
                </a>
                <div className="w-full bg-white rounded-lg shadow light:border light:bg-gray-800 light:border-gray-700">
                    <div className="p-6 space-y-4 sm:space-y-6">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl light:text-white">
                            Mail sender
                        </h1>
                        {error && <p className="text-red-500">{error}</p>}
                        <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email"
                                       className="block mb-2 text-sm font-medium text-gray-900 light:text-white">Email</label>
                                <input type="text" name="email" id="email"
                                       className={`bg-gray-50 border text-gray-900 sm:text-sm rounded-lg focus:ring-brand-orange focus:border-brand-orange block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-brand-orange light:focus:border-brand-orange`}
                                       placeholder="name@company.com" required=""
                                       value={email} onChange={(e) => {
                                    setEmail(e.target.value);
                                }}/>
                            </div>
                            <div>
                                <label htmlFor="message"
                                       className="block mb-2 text-sm font-medium text-gray-900 light:text-white">Body</label>
                                <input type="text" name="message" id="message" placeholder=""
                                       className={`bg-gray-50 border ${message ? 'border-gray-300' : 'border-red-500'} text-gray-900 sm:text-sm rounded-lg focus:ring-brand-orange focus:border-brand-orange block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-brand-orange light:focus:border-brand-orange`}
                                       required=""
                                       value={message} onChange={(e) => {
                                    setMessage(e.target.value);
                                }}/>
                            </div>
                            <button type="submit"
                                    className="w-full text-black bg-brand-orange hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center light:bg-primary-600 light:hover:bg-primary-700 light:focus:ring-primary-800">Inloggen
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
