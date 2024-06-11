import React, { useEffect, useState } from "react";
import EnrollmentList from "../components/lists/EnrollmentList";

export default function Workshop() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [enrollmentId, setEnrollmentId] = useState(null);
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
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        setEnrollmentId={setEnrollmentId}
        enrollments={enrollments}
        setEnrollments={setEnrollments} // pass setWorkshops as prop
      />
    </div>
  );
}
