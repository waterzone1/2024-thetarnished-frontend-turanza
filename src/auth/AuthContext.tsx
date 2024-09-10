import { createContext } from 'react';

export interface ScheduleEntry {
  scheduleid: string;
  start_time: string;
  end_time: string;
  teacherid: string;
  dayofweek: string;
}

export interface User {
  id: BigInteger;
  firstName: string;
  lastName: string;
  email: string;
  subjects: {
    subjectid: string;
    subjectname: string;
  }[];
  schedule?: ScheduleEntry[];
  role: 'STUDENT' | 'TEACHER';
}

export interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (newUserData: Partial<User>) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);