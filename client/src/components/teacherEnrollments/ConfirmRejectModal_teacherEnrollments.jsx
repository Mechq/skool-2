import React from "react";

export default function ConfirmRejectModal_teacherEnrollments({onClose, onConfirm, enrollment, setEnrollments}) {
    const handleReject = () => {
        fetch(`/api/enrollment/${enrollment.enrollmentId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({status: 'geweigerd'}),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                // Refresh enrollments after successful update
                fetch('/api/enrollment')
                    .then(res => res.json())
                    .then(data => {
                        setEnrollments(data.data);
                        onConfirm();
                    })
                    .catch(error => console.error('Error fetching data:', error));
            })
            .catch((error) => console.error("Error updating enrollment:", error));
    };

    const formatDate = (date) => {
        const formattedDate = new Date(date);
        return formattedDate.toLocaleDateString('nl-NL', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        });
    };

    console.log(enrollment)

    return (
        <>
            <div className="fixed inset-0 z-10 bg-gray-900 bg-opacity-15" onClick={onClose}/>
            <section className="w-full h-full flex items-center justify-center fixed top-0 left-0 z-20">
                <div className="flex flex-col items-center justify-center w-80">
                    <div
                        className="w-full bg-white rounded-lg shadow light:border light:bg-gray-800 light:border-gray-700">
                        <div className="p-6 space-y-4 sm:space-y-6">
                            <span className="close text-xl" onClick={() => {
                                console.log('Close button clicked');
                                onClose();
                            }}>&times;</span>
                            <h1 className="text-xl font-medium m-0 p-0" style={{marginTop: 0}}>Workshop verwijderen</h1>
                            <h2 className="">Weet u zeker dat u de inschrijving van <strong>{enrollment.firstName + ' ' + enrollment.lastName}</strong> voor de workshop<br/>
                                '<strong>{enrollment.workshopName}</strong>' op <strong>{formatDate(enrollment.date)}</strong><br/>
                                wilt weigeren?
                            </h2>
                            <button type="delete" onClick={handleReject}
                                    className="w-full text-white bg-custom-red hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center light:bg-primary-600 light:hover:bg-primary-700 light:focus:ring-primary-800">
                                Weigeren
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
