import { useEffect } from "react";

export default function TeacherList({
    isOpen,
    setIsOpen,
    setSidePanelContent,
    setUserId,
    users,
    setUsers,
    setRotateSpan,
}) {

    useEffect(() => {
        fetch('/api/user')
            .then(res => res.json())
            .then(data => {
                setUsers(data.data);
                console.log("Fetched teachers: ", data.data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [isOpen]); // Add isOpen as a dependency

    const editTeacher = (id) => {
        setUserId(id);
        setSidePanelContent("edit");
        setIsOpen(true);
        setRotateSpan(true);
    };
    const formatDate = (date) => {
        if (!date) return "";
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString("nl-NL", options);
    }

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 light:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 light:bg-gray-700 light:text-gray-400">
                    <tr>
                        <th className="px-6 py-3">Workshopdocent</th>
                        <th className="px-6 py-3">Email</th>
                        <th className="px-6 py-3">Telefoonnummer</th>
                        <th className="px-6 py-3">Geboortedatum</th>
                        <th className="px-6 py-3">Bewerken</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}
                            className="odd:bg-white odd:light:bg-gray-900 even:bg-gray-50 even:light:bg-gray-800 border-b light:border-gray-700">
                            {/* <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap light:text-white">
                                {user.name}
                            </td> */}
                            <td className="px-6 py-4">{user.firstName + ' ' + user.lastName}</td>
                            <td className="px-6 py-4">{user.email}</td>
                            <td className="px-6 py-4">{user.phoneNumber}</td>
                            <td className="px-6 py-4">{formatDate(user.birthDate)}</td>
                            <td className="px-6 py-4">
                                <a href="#" onClick={(e) => {
                                    e.preventDefault();
                                    editTeacher(user.id);
                                }}
                                   className="font-medium text-[#f49700] light:text-[#f49700] hover:underline">Bewerken</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
