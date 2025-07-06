'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function EmployeeList() {
  const [employees, setEmployees] = useState<any[]>([]);

  useEffect(() => {
    // Only run in browser
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (!token) return;

      axios.get('http://localhost:5000/api/employees', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => setEmployees(res.data))
      .catch(err => console.error(err));
    }
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {employees.map(emp => (
        <div key={emp._id} className="border rounded p-4">
          {emp.name}
        </div>
      ))}
    </div>
  );
}
