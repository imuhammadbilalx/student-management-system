import React, { useState, useEffect } from 'react';
import './styles.css';
import { db } from './firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';

function App() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({ name: '', roll: '', class: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const studentsCollectionRef = collection(db, 'students');

  // Fetch students from Firestore
  const fetchStudents = async () => {
    const data = await getDocs(studentsCollectionRef);
    setStudents(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Add or Update Student
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      const studentDoc = doc(db, 'students', editId);
      await updateDoc(studentDoc, formData);
      setIsEditing(false);
      setEditId(null);
    } else {
      await addDoc(studentsCollectionRef, formData);
    }
    setFormData({ name: '', roll: '', class: '' });
    fetchStudents();
  };

  // Delete Student
  const handleDelete = async (id) => {
    const studentDoc = doc(db, 'students', id);
    await deleteDoc(studentDoc);
    fetchStudents();
  };

  // Edit Student
  const handleEdit = (student) => {
    setFormData({ name: student.name, roll: student.roll, class: student.class });
    setIsEditing(true);
    setEditId(student.id);
  };

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.roll.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.class.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Student Management System</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by Name, Roll, or Class"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-bar"
      />

      {/* Form to Add/Edit Students */}
      <form onSubmit={handleSubmit} className="student-form">
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Roll Number"
          value={formData.roll}
          onChange={(e) => setFormData({ ...formData, roll: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Class"
          value={formData.class}
          onChange={(e) => setFormData({ ...formData, class: e.target.value })}
          required
        />
        <button type="submit" className="btn">{isEditing ? 'Update Student' : 'Add Student'}</button>
      </form>

      {/* Student List */}
      <h2>Students List</h2>
      <table className="student-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Roll Number</th>
            <th>Class</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.roll}</td>
              <td>{student.class}</td>
              <td>
                <button className="btn edit" onClick={() => handleEdit(student)}>Edit</button>
                <button className="btn delete" onClick={() => handleDelete(student.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
