import React, { useEffect, useState } from "react";

export default function WorkshopDetailsModalScreen({ onClose, userId }) {
    const [commission, setCommission] = useState({});
    const [workshop, setWorkshop] = useState("")
        
    
    console.log("userId", userId);

    useEffect(() => {
        fetch(`/api/commission/${userId}`)
            .then(res => res.json())
            .then(data => {
                setCommission(data.data);
                console.log("Fetched commission: ", commission);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [userId]);


    return (
        <>
            <div className="fixed inset-0 z-10 bg-gray-900 bg-opacity-15" onClick={onClose} />
            <section className="w-full h-full flex items-center justify-center fixed top-0 left-0 z-20">
                <div className="flex flex-col items-center justify-center w-3/4 h-3/4 max-w-4xl">
                    <div className="w-full bg-white rounded-lg shadow light:border light:bg-gray-800 light:border-gray-700">
                        <div className="p-6 space-y-4 sm:space-y-6">
                            <span className="close text-xl cursor-pointer" onClick={onClose}>&times;</span>
                            <h1 className="text-xl font-medium m-0 p-0" style={{ marginTop: 0 }}><strong>{workshop.name}</strong></h1>
                            <h2 className=""><strong>Naam:</strong> <br />
                                {workshop.name}</h2>
                            <h2 className=""><strong>Details:</strong> <br />
                                {workshop.description}</h2>
                                <h2 className=""><strong>Materialen:</strong> <br />
                                {workshop.materials}</h2>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
