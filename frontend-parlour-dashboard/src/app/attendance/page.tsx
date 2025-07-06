'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import PunchCard from '../../components/PunchCard';
import { Employee } from '../../types';

export default function AttendancePage() {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/employees`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setEmployees(res.data);
      } catch (err) {
        console.error(err);
      }
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
