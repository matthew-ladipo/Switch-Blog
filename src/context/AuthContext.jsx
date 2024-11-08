import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext({
  auth: null,
  setAuth: () => {},
});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const reloadPage = () => {
    window.location.reload();
  }

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(auth));
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth, reloadPage }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
