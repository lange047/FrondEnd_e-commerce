'use client';
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// Tipagem definida para evitar 'any'
interface User {
  email: string;
  role: 'ADMIN' | 'CLIENTE';
}

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAdmin(false);
  }, []);

  const login = useCallback((token: string) => {
    localStorage.setItem('token', token);
    try {
      // Decodificação nativa evita dependência externa (jwt-decode)
      const payload = JSON.parse(window.atob(token.split('.')[1]));
      setUser({ email: payload.email, role: payload.role });
      setIsAdmin(payload.role === 'ADMIN');
    } catch {
      // O bloco catch vazio não gera avisos de "unused-vars"
      logout();
    }
  }, [logout]);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      Promise.resolve().then(() => login(savedToken));
    }
  }, [login]);

  return (
    <AuthContext.Provider value={{ user, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  return context;
};