import React, { useEffect, useState } from 'react';


function Home() {

    const [data, setData] = useState({ workshops: [] });

    useEffect(() => {
        fetch('/api')
            .then(res => res.json())
            .then(data => setData(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <>
            <h1>Welcome to Skool Workshop</h1>
        </>


    );
}

export default Home;