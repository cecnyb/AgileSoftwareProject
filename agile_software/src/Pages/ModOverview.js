import React, { useEffect, useState } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import StudentComponent from '../Components/StudentComponent';

function StudentPage() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const db = getFirestore();
        const teacherDocRef = doc(db, 'users', 'oWE1rNMoTAVGHRIQzI9x'); // Replace 'teacherId' with the actual teacher document ID
        const teacherDoc = await getDoc(teacherDocRef);

        if (teacherDoc.exists()) {
          const teacherData = teacherDoc.data();
          const fetchedStudents = teacherData.students || [];
          console.log(fetchedStudents);
          setStudents(fetchedStudents);
        }
        else{console.log("Error:teacherDoc does not exist")}
      } catch (error) {
        setError(error.message);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div>
        <header>
            <h1>Your students</h1>
        </header>
        <div className="container">
        {error && <p>Error: {error}</p>}
        {students.map((student, index) => (
            <StudentComponent key={index} name={student} />
            ))}
        </div>
    </div>
  );
}

export default StudentPage;
