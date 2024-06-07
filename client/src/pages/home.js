import React from 'react';
import PageSecurity from "../PageSecurity";

function Home() {

    const user = PageSecurity();
    if (user === null) {
        return null;
    } else {
        console.log('Email:', user.email)
    }

    return (
        <>
            <h1>Welcome to Skool Workshop</h1>
        </>
    );
}

export default Home;