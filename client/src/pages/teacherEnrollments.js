import React, {useEffect, useState} from "react";
import List_teacherEnrollments from "../components/teacherEnrollments/List_teacherEnrollments";

export default function TeacherEnrollments() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [enrollments, setEnrollments] = useState([]);

    useEffect(() => {
        fetch("/api/enrollment")
            .then((res) => res.json())
            .then((data) => {
                setEnrollments(data.data);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, [setIsOpen]);

    return (
        <div>
            <List_teacherEnrollments
                isOpen={isOpen}
                enrollments={enrollments}
                setEnrollments={setEnrollments}
            />
        </div>
    );
}
