'use client';

export default function AttendanceLog({ logs }: { logs: any[] }) {
  return (
    <div>
      <h2 className="text-xl mb-2">Attendance Logs</h2>
      {logs.map((log) => (
        <div key={log._id} className="border p-2 mb-2">
          {log.employee?.name} - {log.status} - {new Date(log.timestamp).toLocaleString()}
        </div>
      ))}
    </div>
  );
}
