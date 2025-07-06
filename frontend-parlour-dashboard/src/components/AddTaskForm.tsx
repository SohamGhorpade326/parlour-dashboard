'use client';

import { useState } from 'react';
import axios from 'axios';
import { getToken } from '../lib/auth';
import { Employee } from '../types';

interface AddTaskFormProps {
  employees: Employee[];
  onTaskAdded: () => void;
}

export default function AddTaskForm({ employees, onTaskAdded }: AddTaskFormProps) {
  const [title, setTitle] = useState('');
  const [assignedTo, setAssignedTo] = useState('');

  const handleAddTask = async () => {
    if (!title.trim()) return alert('Please enter a task title');
    if (!assignedTo) return alert('Please select an employee');

    try {
      const token = getToken();
      await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tasks`,
        { title, assignedTo },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      alert('Task Added');
      setTitle('');
      setAssignedTo('');
      onTaskAdded();
    } catch (err) {
      console.error(err);
      alert('Error adding task');
    }
  };

  return (
    <div className="p-4 border rounded w-fit mb-4 mt-6">
      <h2 className="text-lg font-bold mb-2">Add Task</h2>
      <input
        type="text"
        placeholder="Task Title"
        className="border p-2 mr-2 mb-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <select
        className="border p-2 mr-2 mb-2"
        value={assignedTo}
        onChange={(e) => setAssignedTo(e.target.value)}
      >
        <option value="">Assign To</option>
        {employees.map(emp => (
          <option key={emp._id} value={emp._id}>
            {emp.name}
          </option>
        ))}
      </select>
      <br />
      <button
        className="bg-green-500 text-white px-4 py-2 rounded"
        onClick={handleAddTask}
      >
        Add Task
      </button>
    </div>
  );
}
