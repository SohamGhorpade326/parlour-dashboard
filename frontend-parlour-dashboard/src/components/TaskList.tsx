'use client';

import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { getToken } from '../lib/auth';
import { Task } from '../types';

interface TaskListProps {
  role: string;
}

export default function TaskList({ role }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const token = getToken();

  const fetchTasks = useCallback(async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  }, [token]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch (err) {
      console.error(err);
      alert('Error deleting task');
    }
  };

  return (
    <div>
      <h2 className="text-xl mb-2">Tasks</h2>
      {tasks.map((task) => (
        <div key={task._id} className="border p-2 mb-2 flex justify-between">
          {task.title} - {task.assignedTo?.name || 'Unassigned'}
          {role === 'Super Admin' && (
            <button onClick={() => handleDelete(task._id)} className="text-red-500">
              Delete
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
