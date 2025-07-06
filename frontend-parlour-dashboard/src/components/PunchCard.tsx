'use client';

import { socket } from '../utils/socket';
import { useState } from 'react';

export default function PunchCard({ employee }: { employee: any }) {
  const [status, setStatus] = useState<'In' | 'Out'>('Out');

  const handlePunch = () => {
    const newStatus = status === 'Out' ? 'In' : 'Out';
    socket.emit('punch', { employeeId: employee._id, status: newStatus });
    setStatus(newStatus);
  };

  return (
    <div className="border p-4 text-center">
      <h3>{employee.name}</h3>
      <button className="bg-green-500 text-white px-4 py-2 mt-2" onClick={handlePunch}>
        {status === 'Out' ? 'Punch In' : 'Punch Out'}
      </button>
    </div>
  );
}
