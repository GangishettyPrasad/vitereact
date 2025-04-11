import React, { useState } from 'react';

const AdvancedCrudGuide = () => {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: 'Rahul',
      marks: [{ subject: 'Math', score: 80 }, { subject: 'Science', score: 85 }],
    },
    {
      id: 2,
      name: 'Anjali',
      marks: [{ subject: 'Math', score: 90 }, { subject: 'Science', score: 88 }],
    }
  ]);

  // 🔁 Add New Student
  const addStudent = () => {
    const newStudent = {
      id: students.length + 1,
      name: 'New Student',
      marks: [{ subject: 'Math', score: 70 }]
    };
    setStudents([...students, newStudent]);
  };

  // ✏️ Update Student Name
  const updateStudentName = (id, newName) => {
    setStudents(
      students.map(student =>
        student.id === id ? { ...student, name: newName } : student
      )
    );
  };

  // ❌ Delete Student
  const deleteStudent = (id) => {
    setStudents(students.filter(student => student.id !== id));
  };

  // 🔁 Add Subject Mark to Student
  const addSubjectMark = (id, subject, score) => {
    setStudents(
      students.map(student =>
        student.id === id
          ? {
              ...student,
              marks: [...student.marks, { subject, score }]
            }
          : student
      )
    );
  };

  return (
    <div style={{ padding: '2rem', backgroundColor: '#fef9e7', fontFamily: 'Segoe UI' }}>
      <h2 style={{ color: '#8e44ad' }}>🔄 Advanced CRUD with Nested Structures (Telugu JSX Guide)</h2>

      <h3 style={{ color: '#1f618d' }}>💡 CRUD అంటే ఏమిటి?</h3>
      <p>
        <strong>CRUD</strong> అంటే <code>Create, Read, Update, Delete</code>. ఇది అన్ని real-world apps లో basic concept.
        Nested structures అంటే object లో object లేదా array లో array ఉండడం.
      </p>

      {/* 📌 Example – Nested Structure */}
      <h3 style={{ color: '#117864' }}>📌 Nested Object Structure Example</h3>
      <pre style={{ background: '#eafaf1', padding: '1rem' }}>
        <code>{`{
  id: 1,
  name: 'Rahul',
  marks: [
    { subject: 'Math', score: 80 },
    { subject: 'Science', score: 85 }
  ]
}`}</code>
      </pre>

      {/* 🔁 Add */}
      <h3 style={{ color: '#b9770e' }}>1️⃣ Add New Student</h3>
      <button onClick={addStudent}>➕ Add Student</button>

      {/* ✏️ Update */}
      <h3 style={{ color: '#b9770e' }}>2️⃣ Update Student Name</h3>
      <button onClick={() => updateStudentName(1, 'Rahul Reddy')}>✏️ Update Rahul's Name</button>

      {/* ❌ Delete */}
      <h3 style={{ color: '#b9770e' }}>3️⃣ Delete Student</h3>
      <button onClick={() => deleteStudent(2)}>❌ Delete Anjali</button>

      {/* ➕ Add Mark */}
      <h3 style={{ color: '#b9770e' }}>4️⃣ Add New Mark to Rahul</h3>
      <button onClick={() => addSubjectMark(1, 'English', 78)}>➕ Add English Mark</button>

      {/* 📋 Display */}
      <h3 style={{ color: '#1f618d' }}>📋 Current Students</h3>
      <ul>
        {students.map(student => (
          <li key={student.id} style={{ marginBottom: '1rem' }}>
            <strong>{student.name}</strong>
            <ul>
              {student.marks.map((mark, index) => (
                <li key={index}>
                  {mark.subject}: {mark.score}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <p style={{ marginTop: '2rem', color: '#6c3483', fontWeight: 'bold' }}>
        👉 నెక్స్ట్ స్టెప్: <strong>💡 Optional Chaining & Safe Accessing</strong> visual JSX explanation కావాలా? Ready చేయమంటారా?
      </p>
    </div>
  );
};

export default AdvancedCrudGuide;
