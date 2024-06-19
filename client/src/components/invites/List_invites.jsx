import React, { useEffect, useState } from "react";
import Success_toasts from "../toasts/Success_toasts";
import Warning_toasts from "../toasts/Warning_toasts";
import ConfirmAcceptModal_invites from "./ConfirmAcceptModal_invites";
import ConfirmRejectModal_invites from "./ConfirmRejectModal_invites.jsx";

export default function List_invites({ invites, setInvites, user }) {
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [showAcceptModal, setShowAcceptModal] = useState(false);
    const [inviteToReject, setInviteToReject] = useState(null);
    const [inviteToAccept, setInviteToAccept] = useState(null);
    const [toasts, setToasts] = useState([]);

    useEffect(() => {
        fetch(`/api/invite/user/${user.id}`)
            .then(res => res.json())
            .then(data => setInvites(data.data))
            .catch(error => console.error('Error fetching data:', error));
    }, [user.id, setInvites]);

    const formatDate = (dateString) => {
        if (!dateString) return "";
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString("nl-NL", options);
    };

    const handleConfirmAccept = () => {
        setShowAcceptModal(false);
        fetch(`/api/invite/user/${user.id}`)
            .then(res => res.json())
            .then(data => {
                setInvites(data.data);
                setToasts(prevToasts => [...prevToasts, { id: Date.now(), type: 'success', message: 'Uitnodiging succesvol geaccepteerd' }]);
            })
            .catch(error => console.error('Error fetching data:', error));
    };

    const handleConfirmReject = () => {
        setShowRejectModal(false);
        fetch(`/api/invite/user/${user.id}`)
            .then(res => res.json())
            .then(data => {
                setInvites(data.data);
                setToasts(prevToasts => [...prevToasts, { id: Date.now(), type: 'warning', message: 'Uitnodiging geweigerd' }]);
            })
            .catch(error => console.error('Error fetching data:', error));
    };

    const handleAcceptClick = (invite) => {
        setInviteToAccept(invite);
        setShowAcceptModal(true);
    };

    const handleRejectClick = (invite) => {
        setInviteToReject(invite);
        setShowRejectModal(true);
    };

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 light:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 light:bg-gray-700 light:text-gray-400">
                <tr>
                    <th className="px-6 py-3">Workshop</th>
                    <th className="px-6 py-3">Klant</th>
                    <th className="px-6 py-3">Locatie</th>
                    <th className="px-6 py-3">Datum</th>
                    <th className="px-6 py-3">Acties</th>
                </tr>
                </thead>
                <tbody>
                {invites.map((invite, index) => (
                    <tr
                        key={`${invite.inviteId}-${index}`}
                        className="odd:bg-white odd:light:bg-gray-900 even:bg-gray-50 even:light:bg-gray-800 border-b light:border-gray-700"
                    >
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap light:text-white">
                            {invite.name}
                        </td>
                        <td className="px-6 py-4">{invite.customerName}</td>
                        <td className="px-6 py-4">{invite.locationName}</td>
                        <td className="px-6 py-4">{formatDate(invite.commissionDate)}</td>
                        <td className="px-6 py-4">
                            <button
                                className="bg-custom-blue hover:bg-custom-blue text-white font-bold py-2 px-4 mr-2 rounded"
                                onClick={() => handleAcceptClick(invite)}>
                                Accepteren
                            </button>
                            <button
                                className="bg-custom-red hover:bg-custom-red text-white font-bold py-2 px-4 rounded"
                                onClick={() => handleRejectClick(invite)}>
                                Weigeren
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {showAcceptModal && (
                <ConfirmAcceptModal_invites
                    onClose={() => setShowAcceptModal(false)}
                    onConfirm={handleConfirmAccept}
                    invite={inviteToAccept}
                    setInvites={setInvites}
                />
            )}

            {showRejectModal && (
                <ConfirmRejectModal_invites
                    onClose={() => setShowRejectModal(false)}
                    onConfirm={() => {
                        handleConfirmReject();
                        setShowRejectModal(false); // Close modal after confirming reject
                    }}
                    invite={inviteToReject}
                    setInvites={setInvites}
                />
            )}
            <div className="fixed right-5 bottom-5 space-y-2">
                {toasts.map(toast => {
                    if (toast.type === 'success') {
                        return (
                            <Success_toasts
                                key={toast.id}
                                message={toast.message}
                                onClose={() => setToasts(prevToasts => prevToasts.filter(t => t.id !== toast.id))}
                            />
                        );
                    } else if (toast.type === 'warning') {
                        return (
                            <Warning_toasts
                                key={toast.id}
                                message={toast.message}
                                onClose={() => setToasts(prevToasts => prevToasts.filter(t => t.id !== toast.id))}
                            />
                        );
                    }
                    return null;
                })}
            </div>
        </div>
    );
}
