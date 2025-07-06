'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { socket } from '../../utils/socket';
import PunchCard from '../../components/PunchCard';

export default function AttendancePage() {
  const [employees, setEmployees] = useState<any[]>([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      const res = await axios.get('http://localhost:5000/api/employees', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setEmployees(res.data);
    };

    fetchEmployees();
  }, []);

  return (
    <div className="p-4 grid grid-cols-4 gap-4">
      {employees.map((emp) => (
        <PunchCard key={emp._id} employee={emp} />
      ))}
    </div>
  );
}
