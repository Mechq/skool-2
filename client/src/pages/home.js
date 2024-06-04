import React from 'react';
import PageSecurity, {GetEmailFromToken} from "../PageSecurity";

function Home() {

    const pageSecurity = PageSecurity();
    if (pageSecurity === null) {
        return null;
    }

    return (
        <>
            <h1>Welcome to Skool Workshop</h1>
        </>
    );
}

export default Home;
