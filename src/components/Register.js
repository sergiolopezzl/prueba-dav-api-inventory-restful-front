import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'; // Importamos useRouter para manejar la redirección
import styles from '@styles/Login.module.css'; // Importamos el archivo de estilos

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // Campo para confirmar contraseña
  const [error, setError] = useState('');
  const [registered, setRegistered] = useState(false); // Nuevo estado para manejar el registro
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones
    if (!username.trim()) {
      setError('Username cannot be empty');
      return;
    }
    if (!password.trim()) {
      setError('Password cannot be empty');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        alert('User registered successfully!');
        setRegistered(true); // Cambiamos el estado para indicar que el registro fue exitoso
      } else {
        const errorText = await response.text();
        setError(`Registration failed: ${errorText}`);
      }
    } catch (error) {
      setError(`An error occurred: ${error.message}`);
    }
  };

  useEffect(() => {
    if (registered) {
      router.push('/Login'); // Redirigir al login después de un registro exitoso
    }
  }, [registered, router]);

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h2 className={styles.title}>Register</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={styles.input}
          />
          <button type="submit" className={styles.submitBtn}>Register</button>
        </form>
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </div>
  );
};

export default Register;
