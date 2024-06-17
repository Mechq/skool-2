import React from "react";

export default function ConfirmModal_openWorkshops({ isOpen, onClose, onConfirm, message }) {
    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 z-10 bg-gray-900 bg-opacity-50" onClick={onClose} />
            <section className="w-full h-full flex items-center justify-center fixed top-0 left-0 z-20">
                <div className="flex flex-col items-center justify-center w-80">
                    <div className="w-full bg-white rounded-lg shadow light:border light:bg-gray-800 light:border-gray-700">
                        <div className="p-6 space-y-4 sm:space-y-6">
                            <span className="close text-xl" onClick={onClose}>&times;</span>
                            <h1 className="text-xl font-medium m-0 p-0">Bevestiging</h1>
                            <p>{message}</p>
                            <div className="flex justify-end space-x-4">
                                <button
                                    onClick={onClose}
                                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
                                    Annuleren
                                </button>
                                <button
                                    onClick={onConfirm}
                                    className="bg-custom-blue hover:bg-custom-blue text-white font-bold py-2 px-4 rounded">
                                    Bevestigen
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
