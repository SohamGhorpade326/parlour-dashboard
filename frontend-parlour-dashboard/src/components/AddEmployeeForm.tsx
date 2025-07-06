'use client';

import { useState } from 'react';
import axios from 'axios';
import { getToken } from '../lib/auth';

export default function AddEmployeeForm({ onEmployeeAdded }: { onEmployeeAdded: () => void }) {
  const [name, setName] = useState('');

  const handleAddEmployee = async () => {
    if (!name.trim()) return alert('Please enter a valid name');

    try {
      const token = getToken();
      await axios.post('http://localhost:5000/api/employees', 
        { name },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      alert('Employee Added');
      setName('');
      onEmployeeAdded();  // Refresh employee list in parent
    } catch (err) {
      console.error(err);
      alert('Error adding employee');
    }
  };

  return (
    <div className="p-4 border rounded w-fit mb-4">
      <h2 className="text-lg font-bold mb-2">Add Employee</h2>
      <input
        type="text"
        placeholder="Employee Name"
        className="border p-2 mr-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleAddEmployee}
      >
        Add
      </button>
    </div>
  );
}
