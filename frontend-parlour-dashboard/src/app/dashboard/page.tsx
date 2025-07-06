'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken } from '../../lib/auth';
import AddEmployeeForm from '../../components/AddEmployeeForm';
import AddTaskForm from '../../components/AddTaskForm';
import { useRouter } from 'next/navigation';
export default function Dashboard() {
  const [employees, setEmployees] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [attendanceLogs, setAttendanceLogs] = useState<any[]>([]);
  const [role, setRole] = useState<string>('');
  const router = useRouter();

  const fetchEmployees = async () => {
    try {
      const token = getToken();
      const res = await axios.get('http://localhost:5000/api/employees', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTasks = async () => {
    try {
      const token = getToken();
      const res = await axios.get('http://localhost:5000/api/tasks', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAttendance = async () => {
    try {
      const token = getToken();
      const res = await axios.get('http://localhost:5000/api/attendance', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAttendanceLogs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchRole = async () => {
    try {
      const token = getToken();
      const res = await axios.get('http://localhost:5000/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRole(res.data.role);
    } catch (err) {
      console.error(err);
    }
  };
  const handleUpdateEmployee = async (id: string) => {
  const name = prompt('Enter new name:');
  if (!name) return;

  try {
    const token = getToken();
    await axios.put(`http://localhost:5000/api/employees/${id}`, { name }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchEmployees();
  } catch (err) {
    console.error(err);
    alert('Error updating employee');
  }
};

const handleDeleteEmployee = async (id: string) => {
  if (!confirm('Are you sure you want to delete this employee?')) return;

  try {
    const token = getToken();
    await axios.delete(`http://localhost:5000/api/employees/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchEmployees();
  } catch (err) {
    console.error(err);
    alert('Error deleting employee');
  }
};

const handleUpdateTask = async (id: string) => {
  const title = prompt('Enter new task title:');
  if (!title) return;

  try {
    const token = getToken();
    await axios.put(`http://localhost:5000/api/tasks/${id}`, { title }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchTasks();
  } catch (err) {
    console.error(err);
    alert('Error updating task');
  }
};

const handleDeleteTask = async (id: string) => {
  if (!confirm('Are you sure you want to delete this task?')) return;

  try {
    const token = getToken();
    await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchTasks();
  } catch (err) {
    console.error(err);
    alert('Error deleting task');
  }
};


  useEffect(() => {
    fetchEmployees();
    fetchTasks();
    fetchAttendance();
    fetchRole();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard ({role})</h1>

      {/* Only Super Admin can add employees and tasks */}
      {role === 'Super Admin' && (
        <>
          <AddEmployeeForm onEmployeeAdded={fetchEmployees} />
          <AddTaskForm employees={employees} onTaskAdded={fetchTasks} />
        </>
      )}

      {/* Employee List */}
      <h2 className="text-xl font-semibold mt-6 mb-2">Employees</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
  {employees.map(emp => (
    <div key={emp._id} className="border rounded p-4">
      <p>{emp.name}</p>
      {role === 'Super Admin' && (
        <div className="mt-2 flex gap-2">
          <button
            className="bg-yellow-500 text-white px-2 py-1 rounded"
            onClick={() => handleUpdateEmployee(emp._id)}
          >
            Edit
          </button>
          <button
            className="bg-red-500 text-white px-2 py-1 rounded"
            onClick={() => handleDeleteEmployee(emp._id)}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  ))}
</div>

      {/* Tasks */}
      <h2 className="text-xl font-semibold mt-6 mb-2">Tasks</h2>
<ul>
  {tasks.map(task => (
    <li key={task._id} className="mb-2">
      {task.title} - Assigned to {task.assignedTo?.name || 'Unassigned'}
      {role === 'Super Admin' && (
        <>
          <button
            className="bg-yellow-500 text-white px-2 py-1 rounded ml-2"
            onClick={() => handleUpdateTask(task._id)}
          >
            Edit
          </button>
          <button
            className="bg-red-500 text-white px-2 py-1 rounded ml-2"
            onClick={() => handleDeleteTask(task._id)}
          >
            Delete
          </button>
        </>
      )}
    </li>
  ))}
</ul>


      {/* Attendance Logs */}
      <h2 className="text-xl font-semibold mt-6 mb-2">Attendance Logs</h2>
      <ul>
        {attendanceLogs.map((log, index) => (
          <li key={index}>
            {log.employee?.name || 'Unknown'} - {log.status} - {new Date(log.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
      <div>
      {/* existing dashboard content */}

      <button
        className="bg-purple-500 text-white px-4 py-2 rounded mt-4"
        onClick={() => router.push('/attendance')}
      >
        Go to Attendance Page
      </button>
    </div>
    </div>
  );
}
