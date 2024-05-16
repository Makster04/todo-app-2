import React, { createContext, useContext, useState } from 'react';

interface User {
  username: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => void;
  logout: () => void;
  authorize: (capability: string) => boolean;
}

const defaultUser: User | null = null;

const AuthContext = createContext<AuthContextType>({
  user: defaultUser,
  login: () => {},
  logout: () => {},
  authorize: () => false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(defaultUser);

  const login = (username: string, password: string) => {

    if (username === 'admin' && password === 'password') {
      setUser({ username, role: 'admin' });
    } else if (username === 'user' && password === 'password') {
      setUser({ username, role: 'user' });
    }
  };

  const logout = () => {
    setUser(defaultUser);
  };

  const authorize = (capability: string) => {
    return user !== null && user.role === 'admin';
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, authorize }}>
      {children}
    </AuthContext.Provider>
  );
};
