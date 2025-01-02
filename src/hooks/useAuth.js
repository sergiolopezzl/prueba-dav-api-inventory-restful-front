import { useContext } from 'react';
import { AuthContext } from '@context/AuthContext'; // Importamos el contexto

const useAuth = () => {
  const { token, saveToken, removeToken } = useContext(AuthContext); // Usamos el contexto de autenticación

  const login = async (username, password) => {
    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const { token } = data;
        
        saveToken(token); // Guardamos el token en el contexto y en localStorage
        return token;
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      console.error("Login error:", error.message);
      throw error;
    }
  };

  const logout = () => {
    removeToken(); // Elimina el token cuando se cierra sesión
  };

  return {
    token,
    login,
    logout,
  };
};

export default useAuth;
