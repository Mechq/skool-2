import React, { useEffect, useState } from 'react';

function App() {
    const [data, setData] = useState({ workshops: [] });

    useEffect(() => {
        fetch('/api')
            .then(res => res.json())
            .then(data => setData(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div>

            {(typeof data.workshops === 'undefined') ? (
                <p>Loading...</p>
            ) : (
                data.workshops.map((workshop, index) => (
                    <div key={index}>
                        <h2>{workshop.name}</h2>
                        <p>{workshop.description}</p>
                    </div>
                ))
            )}
        </div>
    );
}

export default App;
