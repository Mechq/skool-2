import React, {useState} from 'react';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [emailValid, setEmailValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);
    const [error, setError] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();

        if (!email) setEmailValid(false);
        if (!password) setPasswordValid(false);

        if (!email || !password) return;

        const user = {
            email: email,
            password: password
        };

        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'Success') {
                    console.log('Login voltooid', data);
                    // Handle successful login (e.g., store the token, redirect, etc.)
                    setEmail("");
                    setPassword("");
                    window.location.href = "/";
                } else {
                    setError(data.message || 'Login gefaald');
                }
            })
            .catch((error) => {
                setError('Login gefaald');
                console.error('Error:', error);
            });
    }

    return (
        <section
            className="w-full h-full flex items-center justify-center bg-gray-50 light:bg-gray-900 fixed top-0 left-0">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto sm:max-w-lg">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 light:text-white">
                    <img className="w-40 h-16 mr-2"
                         src="https://skoolworkshop.nl/wp-content/uploads/2020/06/Skool-Workshop_Logo-200x65.png"
                         alt="logo"/>
                </a>
                <div className="w-full bg-white rounded-lg shadow light:border light:bg-gray-800 light:border-gray-700">
                    <div className="p-6 space-y-4 sm:space-y-6">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl light:text-white">
                            Log in
                        </h1>
                        {error && <p className="text-red-500">{error}</p>}
                        <form className="space-y-4 sm:space-y-6" onSubmit={handleLogin}>
                            <div>
                                <label htmlFor="email"
                                       className="block mb-2 text-sm font-medium text-gray-900 light:text-white">Email</label>
                                <input type="text" name="email" id="email"
                                       className={`bg-gray-50 border ${emailValid ? 'border-gray-300' : 'border-red-500'} text-gray-900 sm:text-sm rounded-lg focus:ring-brand-orange focus:border-brand-orange block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-brand-orange light:focus:border-brand-orange`}
                                       placeholder="name@company.com" required=""
                                       value={email} onChange={(e) => {
                                    setEmail(e.target.value);
                                    setEmailValid(true);
                                }}/>
                            </div>
                            <div>
                                <label htmlFor="password"
                                       className="block mb-2 text-sm font-medium text-gray-900 light:text-white">Wachtwoord</label>
                                <input type="password" name="password" id="password" placeholder="••••••••"
                                       className={`bg-gray-50 border ${passwordValid ? 'border-gray-300' : 'border-red-500'} text-gray-900 sm:text-sm rounded-lg focus:ring-brand-orange focus:border-brand-orange block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-brand-orange light:focus:border-brand-orange`}
                                       required=""
                                       value={password} onChange={(e) => {
                                    setPassword(e.target.value);
                                    setPasswordValid(true);
                                }}/>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start mr-16">
                                    <div className="flex items-center h-5">
                                        <input id="remember" aria-describedby="remember" type="checkbox"
                                               className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-brand-orange checked:bg-brand-orange light:bg-gray-700 light:border-gray-600 light:focus:ring-brand-orange light:ring-offset-gray-800"
                                               checked
                                               disabled/>
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="remember" className="text-gray-500 light:text-gray-300">Aangemeld
                                            blijven?</label>
                                    </div>
                                </div>
                                <a href="#"
                                   className="text-sm font-medium text-primary-600 hover:underline light:text-primary-500">Wachtwoord
                                    vergeten?</a>
                            </div>
                            <button type="submit"
                                    className="w-full text-black bg-brand-orange hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center light:bg-primary-600 light:hover:bg-primary-700 light:focus:ring-primary-800">Inloggen
                            </button>
                            <p className="text-sm font-light text-gray-500 light:text-gray-400">
                                Nog geen account? <a href="/register"
                                                     className="font-medium text-primary-600 hover:underline light:text-primary-500">Registreren</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
