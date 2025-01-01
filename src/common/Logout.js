import React, { useContext } from 'react';
import { AuthContext } from '@context/AuthContext'; // Importamos el contexto de autenticación
import { useRouter } from 'next/router'; // Usamos Next.js router para redirigir
import styles from '@styles/Logout.module.css'; // Importamos los estilos específicos para logout

const Logout = () => {
  const { removeToken } = useContext(AuthContext); // Obtenemos removeToken desde el contexto
  const router = useRouter();

  const handleLogout = () => {
    removeToken(); // Eliminamos el token del contexto y localStorage
    router.push('/Login'); // Redirigimos al login
  };

  return (
    <div className={styles.logoutContainer}>
      <button onClick={handleLogout} className={styles.logoutButton}>
        Logout
      </button>
    </div>
  );
};

export default Logout;
