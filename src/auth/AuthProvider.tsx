import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext, User } from './AuthContext';


export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();

  const URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
      const response = await fetch(`${URL}authentication/login`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();
      const loggedInUser: User = {

          id: data.user.id,
          firstName: data.user.firstname,
          lastName: data.user.lastname,
          email: data.user.email,
          subjects: data.user.subjects,
          schedule: data.user.schedule,
          role: data.user.role as 'STUDENT' | 'TEACHER' | 'ADMIN',
          isActive: data.user.isActive
      };
    
    setUser(loggedInUser);
    localStorage.setItem('user', JSON.stringify(loggedInUser));
    setIsLoggedIn(true);

    const roleRoutes: { [key: string]: string } = {
      STUDENT: '/student-home',
      TEACHER: '/teacher-home',
      ADMIN: '/admin-home',
    };

    const route = roleRoutes[data.user.role];
    navigate(route);
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/');
  };

  const updateUser = (newUserData: Partial<User>) => {
    if(user) {
      const updatedUser = { ...user, ...newUserData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
