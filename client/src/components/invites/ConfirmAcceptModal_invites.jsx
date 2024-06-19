import React, {useState } from "react";

export default function ConfirmAcceptModal_invites({ onClose, onConfirm, invite, setInvites }) {
    const [isOpen, setIsOpen] = useState(true);

    const handleAccept = () => {

        fetch(`/api/invite/${invite.inviteId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: 'geaccepteerd' }),
        })
            .then((res) => res.json())
            .then(() => {
                fetch(`/api/invite/user/${invite.userId}`)
                    .then(res => res.json())
                    .then(data => {
                        setInvites(data.data);
                        onConfirm();
                    })
                    .catch(error => console.error('Error fetching data:', error));
            })
            .catch((error) => console.error("Error updating invite:", error));
    };

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
            <div className="fixed inset-0 z-10 bg-gray-900 bg-opacity-15" onClick={onClose} />
            <section className="w-full h-full flex items-center justify-center fixed top-0 left-0 z-20">
                <div className="flex flex-col items-center justify-center w-70">
                    <div className="w-full bg-white rounded-lg shadow light:border light:bg-gray-800 light:border-gray-700">
                        <div className="p-6 space-y-4 sm:space-y-6">
                            <span className="close text-xl" onClick={onClose}>&times;</span>
                            <h1 className="text-xl font-medium m-0 p-0" style={{ marginTop: 0 }}>Uitnodiging accepteren</h1>
                            <h2 className="">Weet u zeker dat u de uitnodiging
                                voor de workshop<br />
                                <strong>{invite.name}</strong>
                                op <strong>{formatDate(invite.commissionDate)}</strong> wilt accepteren?
                            </h2>

                            <button type="submit" onClick={handleAccept}
                                    className="w-full text-white bg-custom-blue hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center light:bg-primary-600 light:hover:bg-primary-700 light:focus:ring-primary-800">
                                Accepteren
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
