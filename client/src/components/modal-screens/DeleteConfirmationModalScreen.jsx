import React from "react";

export default function DeleteConfirmationModalScreen({ onClose, onSave, workshopId, workshopName }) {
    const handleDelete = () => {
        fetch(`/api/workshop/${workshopId}`, {
            method: 'DELETE',
        })
            .then(() => {
                console.log('Workshop deleted');
                onSave();
            })
            .catch((error) => console.error("Error:", error));
    };

    console.log("workshopId", workshopId);
    return (
        <>
            <div className="fixed inset-0 z-10 bg-gray-900 bg-opacity-15" onClick={onClose} />
            <section className="w-full h-full flex items-center justify-center fixed top-0 left-0 z-20">
                <div className="flex flex-col items-center justify-center w-80">
                    <div className="w-full bg-white rounded-lg shadow light:border light:bg-gray-800 light:border-gray-700">
                        <div className="p-6 space-y-4 sm:space-y-6">
                            <span className="close text-xl" onClick={onClose}>&times;</span>
                            <h1 className="text-xl font-medium m-0 p-0" style={{ marginTop: 0 }}>Workshop verwijderen</h1>
                            <h2 className="">Weet u zeker dat u de workshop <br />
                                '<strong>{workshopName}</strong>' wilt verwijderen?</h2>
                            <button type="delete" onClick={handleDelete}
                                    className="w-full text-white bg-custom-red hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center light:bg-primary-600 light:hover:bg-primary-700 light:focus:ring-primary-800">
                                Verwijderen
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
