import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext, User } from './AuthContext';


export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();

  const apiUrl = "http://localhost:3000/" 

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const response = await fetch(`${apiUrl}authentication/login`, {
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
    const loggedInUser = {
        id: data.user.id,
        firstName: data.user.firstname,
        lastName: data.user.lastname,
        email: data.user.email,
        subjects: data.user.subjects,
        schedule: data.user.schedule,
        role: data.user.role as 'STUDENT' | 'TEACHER',
    };
    
    setUser(loggedInUser);
    localStorage.setItem('user', JSON.stringify(loggedInUser));
    setIsLoggedIn(true);

    if (data.user.role === 'STUDENT') {
        navigate('/student-home');
    } else if (data.user.role === 'TEACHER') {
        navigate('/teacher-home');
    }
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
