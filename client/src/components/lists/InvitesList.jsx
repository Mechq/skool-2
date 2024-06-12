import { useEffect } from "react";

export default function TeacherList({
    setInviteId,
    invites,
    setInvites,
    user
}) {

    useEffect(() => {
        fetch(`/api/invite/user/${user.id}`)
            .then(res => res.json())
            .then(data => {
                setInvites(data.data);
                console.log("Fetched invites: ", data.data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []); 

    

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
                </tbody>
            </table>
        </div>
    );
}
