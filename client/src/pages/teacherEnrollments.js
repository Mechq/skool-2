import React, {useEffect, useState} from "react";
import EnrollmentList from "../components/teacherEnrollments/EnrollmentList";

export default function TeacherEnrollments() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [enrollments, setEnrollments] = useState([]);

    useEffect(() => {
        fetch("/api/enrollment")
            .then((res) => res.json())
            .then((data) => {
                setEnrollments(data.data);
                console.log("Fetched enrollments: ", data.data);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, [setIsOpen]);

    return (
        <div>
            <EnrollmentList
                isOpen={isOpen}
                enrollments={enrollments}
                setEnrollments={setEnrollments}
            />
        </div>
    );
}
