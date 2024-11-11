// frontend/src/App.js

import React, { useState } from 'react';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [grade, setGrade] = useState('');
  const [editingId, setEditingId] = useState(null);

  const saveStudent = () => {
    if (!name || !age || !grade) return;

    if (editingId !== null) {
      setStudents(students.map(student =>
        student.id === editingId ? { id: editingId, name, age, grade } : student
      ));
      setEditingId(null);
    } else {
      setStudents([...students, { id: Date.now(), name, age, grade }]);
    }

    setName('');
    setAge('');
    setGrade('');
  };

  const editStudent = (student) => {
    setName(student.name);
    setAge(student.age);
    setGrade(student.grade);
    setEditingId(student.id);
  };

  const deleteStudent = (id) => {
    setStudents(students.filter(student => student.id !== id));
  };

  return (
    <div className="App">
      <h1>Student Management System</h1>
      <h2>Student List</h2>

      <div className="form-group">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <input
          type="text"
          placeholder="Grade"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
        />
        <button onClick={saveStudent}>
          {editingId ? "Update Student" : "Add Student"}
        </button>
      </div>

      <ul>
        {students.map(student => (
          <li key={student.id}>
            {`${student.name} - Age: ${student.age}, Grade: ${student.grade}`}
            <button onClick={() => editStudent(student)}>Edit</button>
            <button onClick={() => deleteStudent(student.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
