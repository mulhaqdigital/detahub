import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Admin credentials
  const adminUsers = [
    {
      username: 'sedapdibedai@gmail.com',
      password: 'pnpadmin123',
      role: 'Super Admin'
    },
    {
      username: 'deta@mulhaq.org',
      password: 'admin123',
      role: 'Admin'
    }
  ];

  const login = (username, password) => {
    // Check credentials against admin users
    const adminUser = adminUsers.find(
      user => user.username === username && user.password === password
    );

    if (adminUser) {
      setIsAuthenticated(true);
      setUser({ 
        username: adminUser.username,
        role: adminUser.role 
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); 