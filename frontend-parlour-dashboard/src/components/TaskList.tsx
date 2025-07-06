'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken } from '../lib/auth';

export default function TaskList({ role }: { role: string }) {
  const [tasks, setTasks] = useState<any[]>([]);
  const token = getToken();

  const fetchTasks = async () => {
    const res = await axios.get('http://localhost:5000/api/tasks', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h2 className="text-xl mb-2">Tasks</h2>
      {tasks.map((task) => (
        <div key={task._id} className="border p-2 mb-2 flex justify-between">
          {task.title} - {task.assignedTo?.name || 'Unassigned'}
          {role === 'Super Admin' && (
            <button onClick={() => {
              axios.delete(`http://localhost:5000/api/tasks/${task._id}`, {
                headers: { Authorization: `Bearer ${token}` },
              }).then(fetchTasks);
            }} className="text-red-500">Delete</button>
          )}
        </div>
      ))}
    </div>
  );
}
