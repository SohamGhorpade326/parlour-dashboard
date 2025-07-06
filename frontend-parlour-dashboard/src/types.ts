// src/types.ts

export interface AttendanceLogEntry {
  _id: string;
  employee: {
    _id: string;
    name: string;
  };
  status: string;
  timestamp: string;
}
export interface Employee {
  _id: string;
  name: string;
  role: string;
}


export interface Task {
  _id: string;
  title: string;
  assignedTo?: {
    _id: string;
    name: string;
  };
}

