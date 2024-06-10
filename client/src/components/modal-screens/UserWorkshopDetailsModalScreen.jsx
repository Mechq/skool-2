import React, { useState } from "react";

export default function UserWorkshopDetailsModalScreen({ onClose, workshop, commission }) {
    const [showWorkshopDetails, setShowWorkshopDetails] = useState(true);
    const [workshopRound, setWorkshopRound] = useState({});

    const getWorkshopRound = () => {
        fetch(`/api/workshop/${workshop.id}`)
            .then(res => res.json())
            .then(data => {
                setWorkshopRound(data.data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    const formatDate = (date) => {
        const formattedDate = new Date(date);
            return formattedDate.toLocaleDateString('nl-NL', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
            });
    };
    return (
        <>
            <div className="fixed inset-0 z-10 bg-gray-900 bg-opacity-15" onClick={onClose}/>

            <section className="w-full flex flex-col items-center justify-center fixed top-0 left-0 z-20 mt-20">
                <section
                    className="bg-center bg-no-repeat bg-gray-500 bg-blend-multiply w-full max-w-4xl"
                    style={{backgroundImage: `url(${workshop.picture})`}}
                >
                    <div className="px-4 mx-auto max-w-screen-xl text-center py-12 lg:py-24">
                        <h1 className="mb-4 text-3xl font-extrabold tracking-tight leading-none text-white md:text-4xl lg:text-5xl">
                            {workshop.name}
                        </h1>
                    </div>
                </section>
                <div className="w-full max-w-4xl">
                    <div className="w-full max-w-4xl">
                        <div
                            className="bg-white shadow light:border light:bg-gray-800 light:border-gray-700 rounded-none">
                            <div className="w-full max-w-4xl flex pb-6 pt-6">
                                <div
                                    className={`flex-1 flex items-center justify-center border-b-2 pb-6 hover:text-gray-600  ${showWorkshopDetails ? 'border-brand-orange' : 'border-black'}`}>
                                    <button
                                        onClick={() => setShowWorkshopDetails(true)}
                                    >
                                        Workshop Details
                                    </button>
                                </div>
                                <div
                                    className={`flex-1 flex items-center justify-center border-b-2 pb-6 hover:text-gray-600 ${!showWorkshopDetails ? 'border-brand-orange' : 'border-black'}`}>
                                    <button
                                        onClick={() => setShowWorkshopDetails(false)}
                                    >
                                        Opdracht Details
                                    </button>
                                </div>
                            </div>
                            <div className="p-6 space-y-4 sm:space-y-6">
                                {showWorkshopDetails ? (
                                    <>
                                        <h2 className=""><strong>Naam:</strong> <br/>
                                            {workshop.name}</h2>
                                        <h2 className=""><strong>Details:</strong> <br/>
                                            {workshop.description}</h2>
                                        <h2 className=""><strong>Materialen:</strong> <br/>
                                            {workshop.materials}</h2>
                                    </>
                                ) : (
                                    <>
                                        <h1 className=""><strong>Klant naam:</strong> <br/>
                                            {commission.customerId}</h1>
                                        <h2 className=""><strong>Datum:</strong> <br/>
                                            {formatDate(commission.date)}</h2>
                                        <h2 className=""><strong>Doelgroep:</strong> <br/>
                                            {workshop.targetAudience}</h2>
                                        <h2 className=""><strong>Docenten:</strong> <br/>
                                            {workshop.amountOfTeachers}</h2>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                </div>


            </section>
        </>
    );
}
