import {useEffect} from "react";

export default function InvitesList({
                                        invites,
                                        setInvites,
                                        user
                                    }) {

    useEffect(() => {
        fetch(`/api/invite/user/${user.id}`)
            .then(res => res.json())
            .then(data => {
                setInvites(data.data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const formatDate = (dateString) => {
        if (!dateString) return "";
        const options = {year: 'numeric', month: 'long', day: 'numeric'};
        return new Date(dateString).toLocaleDateString("nl-NL", options);
    };

    const handleAccept = (status, invite, userId) => {
        fetch(`/api/invite/${invite.inviteId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({status}),
        })
            .then((res) => res.json())
            .then(() => {
                fetch(`/api/invite/user/${user.id}`)
                    .then(res => res.json())
                    .then(data => {
                        setInvites(data.data);
                    })
                    .catch(error => console.error('Error fetching data:', error));
            })
            .catch((error) => console.error("Error updating invite:", error));

        fetch('/api/enrollment', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: userId,
                commissionWorkshopId: invite.commissionWorkshopId,
            }),

        })
            .then((res) => res.json())
            .catch((error) => console.error("Error updating invite:", error));
    };

    const handleReject = (inviteId) => {
        fetch(`/api/invite/${inviteId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then(() => {
                fetch(`/api/invite/user/${user.id}`)
                    .then(res => res.json())
                    .then(data => {
                        setInvites(data.data);
                    })
                    .catch(error => console.error('Error fetching data:', error));
            })
            .catch((error) => console.error("Error updating invite:", error));
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
                {invites.map((invite) => (
                    <tr
                        key={invite.inviteId}
                        className="odd:bg-white odd:light:bg-gray-900 even:bg-gray-50 even:light:bg-gray-800 border-b light:border-gray-700"
                    >
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap light:text-white">
                            {invite.customerName}
                        </td>
                        <td className="px-6 py-4">{invite.workshopName}</td>
                        <td className="px-6 py-4">{invite.locationName}</td>
                        <td className="px-6 py-4">{formatDate(invite.date)}</td>
                        <td className="px-6 py-4">
                            <button
                                className="bg-custom-blue hover:bg-custom-blue text-white font-bold py-2 px-4 mr-2 rounded"
                                onClick={() => handleAccept("geaccepteerd", invite, user.id)}>
                                Accepteren
                            </button>
                            <button className="bg-custom-red hover:bg-custom-red text-white font-bold py-2 px-4 rounded"
                                    onClick={() => handleReject(invite.inviteId)}>
                                Weigeren
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
