import React from 'react';
import PageSecurity from "../PageSecurity";

function Home() {

    const userEmail = PageSecurity();
    if (userEmail === null) {
        return null;
    } else {
        console.log('Email:', userEmail)
    }

    return (
        <>
            <h1>Welcome to Skool Workshop</h1>
        </>
    );
}

export default Home;